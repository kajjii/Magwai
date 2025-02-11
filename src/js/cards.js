import { $ } from "./helpers.js"
import { cardsApi } from "./api.js"
import { cardItem } from "./template.js"

document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = $(".cards__list")
    const fetchNextBtn = $("#fetch-next-page")

    async function getInitialData() {
        const instance = await cardsApi.getCards()
        instance.render((data) => {
            cardsContainer.insertAdjacentHTML(
                "afterbegin",
                data?.map((post) => cardItem({ ...post })).join("")
            )
        })
    }

    getInitialData()

    fetchNextBtn.addEventListener("click", async () => {
        const instance = await cardsApi.fetchNextPage()

        instance.render((data) => {
            cardsContainer.insertAdjacentHTML(
                "beforeend",
                data?.map((post) => cardItem({ ...post })).join("")
            )
        })
    })
})
