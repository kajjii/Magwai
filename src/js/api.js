import { $all, getRandom } from "./helpers.js"
import { createSkeleton } from "./skeleton.js"


const pathToImg = new Array(10)
    .fill("/images/cards")
    .map((item, i) => item + `/${i + 1}.webp`)

export const api = async (url, options = {}) => {
    let fetchOptions = options
    const select = options?.select
    delete options?.select

    if (
        options?.method !== "GET" &&
        options?.method !== "HEAD" &&
        options?.json
    ) {
        const { json, ...otherOptions } = options

        fetchOptions = { ...otherOptions, body: JSON.stringify(json) }
    }

    try {
        const res = await fetch(url, fetchOptions)

        if (!res.ok) {
            throw new Error("Ошибка получения данных")
        }

        const data = await res.json()

        if (select) {
            return select(data)
        }

        return data
    } catch (err) {
        console.log(err)
        if (options?.defaultValue) {
            return options.defaultValue
        }
    }
}

class CardsApi {
    data = []
    start = 0
    end = 10
    renderCb = null

    showSkeleton(container, flag = false) {
        const amountTotalCards = flag ? 10 : 5
        new Array(amountTotalCards).fill("").forEach(() => {
            container.insertAdjacentHTML("beforeend", createSkeleton())
        })
    }

    removeSkeleton() {
        $all(".skeleton").forEach((node) => node.remove())
    }

    getCards = async () => {
        const posts = await api(
            `https://jsonplaceholder.typicode.com/posts?_start=${this.start}&_end=${this.end}`,
            {
                select: async (data) => {
                    return data.map((item) => ({
                        ...item,
                        img: pathToImg[getRandom(pathToImg.length)],
                    }))
                },
            }
        )

        this.data = [...this.data, ...posts]

        return this
    }

    fetchNextPage = async () => {
        this.start = this.end
        this.end += 5
        await this.getCards()

        return this
    }

}

export const cardsApi = new CardsApi()
