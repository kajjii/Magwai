export const cardItem = ({title, body, img}) => {
    return (
       ` <li class="cards__item">
            <img src=${img} alt="card" class="cards__item-img">
            <div class="cards__item-wrapper">
                <h3 class="cards__item-name">${title}</h3>
                <p class="cards__item-subtitle">How to increase your productivity with a Music</p>
                <p class="cards__item-text">${body}…</p>
                <p class="cards__item-date">Posted by <strong>Eugenia</strong>, on July  24, 2019</p>
                <button class="cards__item-more">Continue reading</button>
            </div>
        </li>`
    )
}