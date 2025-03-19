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

function menuToggler() {
    const menu = document.querySelector("#menu");
    const button = document.querySelector("#menu-toggler");
    menu.classList.toggle("show");
    button.classList.toggle("show");
}

function schemaColorChanger() {
    const body = [document.querySelector("footer"), document.querySelector("main"), document.querySelector(".view-toggler")]; //experimental feature
    body[0].classList.toggle('dark');
    body[1].classList.toggle('dark');
    body[2].classList.toggle('dark');
}

async function fetchData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
        return data;
}

const schemaColor = document.querySelector("#bg-toggler").addEventListener("click", schemaColorChanger);
const gridView = document.querySelector("#grid").addEventListener("click", () => {viewChanger("g")});
const listView = document.querySelector("#list").addEventListener("click", () => {viewChanger('l')});
const schema = document.querySelector("#menu-toggler").addEventListener("click", menuToggler);

fetchData().then(data => {
    const container = document.querySelector("#commerce");
    data.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("tile");

        card.innerHTML = `<img src="images/data/${member.image}" alt="${member.name}">
            <div id="tile-info">
            <h2>${member.name}</h2>
            <ul>
            <li><span class="tile-title">Category: </span>${member.membership_level}</li>
                <li><span class="tile-title">Adrress: </span>${member.address}</li>
                <li><span class="tile-title">Phone: </span>${member.phone}</li>
                <li><span class="tile-title">Email: </span>${member.email}</li>
                <li><span class="tile-title">Site: </span><a href="${member.website}" target="_blank">${member.name}</a></li>
            </ul>
            </div>
        `;
        container.appendChild(card);
    });
})