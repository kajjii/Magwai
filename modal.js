window.addEventListener("DOMContentLoaded", () => {
    const menuList = document.querySelector(".menu__list")
    const menuLink = document.querySelectorAll(".menu__link")
    const burger = document.querySelector(".burger")

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_active")
        menuList.classList.toggle("menu__list-active")
    })

    menuLink.forEach((item) => {
        item.addEventListener("click", () => {
            burger.classList.toggle("burger_active")
            menuList.classList.toggle("menu__list-active")
        })
    })
})
