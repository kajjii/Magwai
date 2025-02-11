export const createSkeleton = () => {
    return (
       ` <li class="cards__item skeleton">
            <div class="skeleton-img"></div>
            <div class="cards__item-wrapper">
                <div class="skeleton-name"></div>
                <div class="skeleton-subtitle"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-date"></div>
                <div class="skeleton-more"></div>
            </div>
        </li>`
    )
}