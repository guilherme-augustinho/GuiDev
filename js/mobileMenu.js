const menuToggle = document.getElementById("mobile-menu");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
});