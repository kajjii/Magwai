const pathToImg = new Array(10)
    .fill("/images/cards")
    .map((item, i) => item + `/${i + 1}.jpg`)

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
    end = 5

    getCards = async () => {
        this.data = await api(
            `https://jsonplaceholder.typicode.com/posts?_start=${this.start}&_end=${this.end}`,
            {
                select: async (data) => {
                    const { getRandom } = await import("./helpers")

                    return data.map((item) => ({
                        ...item,
                        img: pathToImg[getRandom(pathToImg.length)],
                    }))
                },
            }
        )

        return this
    }

    fetchNextPage = async () => {
        this.start = this.end
        this.end += 5
        await this.getCards()

        return this
    }

    render = (cb) => {
        cb(this.data)

        return this
    }
}

export const cardsApi = new CardsApi()
