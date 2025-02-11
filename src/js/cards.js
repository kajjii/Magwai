import { $ } from "./helpers.js"
import { cardsApi } from "./api.js"
import { cardItem } from "./template.js"

document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = $(".cards__list")
    const fetchNextBtn = $("#fetch-next-page")

    const errorHolder = document.createElement("div")
    errorHolder.classList.add("server-error")

    function showServerError() {
        errorHolder.innerHTML = `
          <div class="server-error-placeholder">
            <h2 class="server-error-title">Упс! Что-то пошло не так</h2>
            <p class="server-error-description">Не удалось подключиться к серверу.
             Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.</p>
            <button class="server-error-retry">Повторить попытку</button>
          </div>
        `;
        cardsContainer.appendChild(errorHolder)
        fetchNextBtn.disabled = true
        const retryButton = $('.server-error-retry');
        retryButton.addEventListener('click', () => {
          getInitialData();
        });
    }

    function removeServerError() {
        cardsContainer.innerHTML = ""; 
    }
    
    const renderCard = (data = []) => {
        if (!data.data) return
        cardsContainer.innerHTML = data.data
            ?.map((post) => cardItem({ ...post }))
            .join("")
    }

    async function getInitialData() {
        try {
            removeServerError()
            cardsApi.showSkeleton(cardsContainer, true)
            await cardsApi.getCards().then((data) => {
                renderCard(data)
            })
            fetchNextBtn.disabled = false
        } catch (err) {
            console.log(err)
            showServerError()
            fetchNextBtn.disabled = true
        } finally {
            cardsApi.removeSkeleton()
        }
    }

    getInitialData()

    fetchNextBtn.addEventListener("click", async () => {
        try {
            cardsApi.showSkeleton(cardsContainer)
            const data = await cardsApi.fetchNextPage()
            renderCard(data)
            fetchNextBtn.disabled = false
        } catch (err) {
            showServerError()
            fetchNextBtn.disabled = true
        } finally {
            cardsApi.removeSkeleton()
            if(cardsApi.data.length >= 30) {
                fetchNextBtn.disabled = true
            }
        }
    })
})
