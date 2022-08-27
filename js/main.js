let headerSwitchTheme = document.querySelector(".header__back-switch")
let body = document.querySelector("body")

headerSwitchTheme.addEventListener("click", function () {
    body.classList.toggle("back_dark")
})