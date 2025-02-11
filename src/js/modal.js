import {$, $all} from './helpers.js'

window.addEventListener("DOMContentLoaded", () => {
    const menuList = $(".menu__list")
    const menuLink = $all(".menu__link")
    const menuBurger = $(".menu__burger")

    menuBurger.addEventListener("click", () => {
        menuBurger.classList.toggle("menu__burger-active")
        menuList.classList.toggle("menu__list-active")
    })

    menuLink.forEach((item) => {
        item.addEventListener("click", () => {
            menuBurger.classList.toggle("menu__burger-active")
            menuList.classList.toggle("menu__list-active")
        })
    })
})
