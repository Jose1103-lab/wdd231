//this function changer the view to grid or list
function viewChanger(identifier) {
    const container = document.querySelector("#commerce");

    if (container.classList.contains("list") && identifier === "g") {
        container.classList.remove("list");
        container.classList.add("grid");
    }
    if (container.classList.contains("grid") && identifier === "l") {
        container.classList.remove("grid");
        container.classList.add("list");
    }
}

// this function toggles the menu on the header for mobile view.
function menuToggler() {
    const menu = document.querySelector("#menu");
    const button = document.querySelector("#menu-toggler");
    menu.classList.toggle("show");
    button.classList.toggle("show");
}

// this function toggles the dark mode on the body
function schemaColorChanger() {
    if (localStorage.getItem("schema") === "dark") {
        localStorage.removeItem("schema");
    }/* else { //experimental feature working on it
        const localSchema = localStorage.setItem("schema", "dark");
    }*/

    try {
        const body = [
            document.querySelector("footer"),
            document.querySelector("main"),
            document.querySelector(".view-toggler"),
            document.querySelector("#commerce")
        ]; //experimental feature
        body[0].classList.toggle('dark');
        body[1].classList.toggle('dark');
        body[2].classList.toggle('dark');
        body[3].classList.toggle('dark');
    } catch (error) {
        console.log('Some item were not found for the dark mode')
    }
}


export { viewChanger, menuToggler, schemaColorChanger };