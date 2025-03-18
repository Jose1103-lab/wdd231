function viewChanger() {
    const grid = document.querySelector("grid");
    const list = document.querySelector("list");

    if (grid.classList.contains("active")) {
        grid.classList.remove("active");
        list.classList.add("active");
    } else {
        grid.classList.add("active");
        list.classList.remove("active");
    }
}

function menuToggler() {
    const menu = document.querySelector("#menu");
    const button = document.querySelector("#menu-toggler");
    menu.classList.toggle("show");   
    button.classList.toggle("show");   
}

function schemaColorChanger() {
    const body = [document.querySelector("footer"), document.querySelector("main")]; //experimental feature
    body[0].classList.toggle('dark');
    body[1].classList.toggle('dark');
}

const schemaColor = document.querySelector("#bg-toggler").addEventListener("click", schemaColorChanger);
const view = document.querySelector(".view-toggler").addEventListener("click", viewChanger);
const schema = document.querySelector("#menu-toggler").addEventListener("click", menuToggler);

