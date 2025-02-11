export const $ = (selector) => document.querySelector(selector)
export const $all = (selector) => document.querySelectorAll(selector) 

export const getRandom = (length) => {
    return Math.floor(Math.random() * length)
}