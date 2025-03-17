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
    menu.classList.toggle("show");    
}

function schemaColorChanger() {
    const body = document.querySelector("body");
    body.classList.toggle('dark');
}

const schemaColor = document.querySelector("#bg-toggler").addEventListener("click", schemaColorChanger);
const view = document.querySelector("#view-toggler").addEventListener("click", viewChanger);
const schema = document.querySelector("#menu-toggler").addEventListener("click", menuToggler);

