import { viewChanger, menuToggler, schemaColorChanger } from "./dom-handler.mjs";
// import {  } from "./scripts/data.mjs"; // this module imports the data response to be consumed


// this module will be migrated to the data.mjs, such file will be handling the fetch request for apis, json, etc
async function fetchData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data;
}

// this module will be exported from the dom-handler file -------------------------------------
// const date = new Date();
// const year = date.getFullYear();
// document.querySelector("#year").textContent = year;

try {
    const schemaChecker = localStorage.getItem("schema"); // with the feature i will look for the preffered schema color saved in the local storage 
    if (schemaChecker === "dark") { schemaColorChanger(); }

    const schemaColor = document.querySelector("#bg-toggler").addEventListener("click", schemaColorChanger);
    const gridView = document.querySelector("#grid").addEventListener("click", () => { viewChanger("g") });
    const listView = document.querySelector("#list").addEventListener("click", () => { viewChanger('l') });
    const schema = document.querySelector("#menu-toggler").addEventListener("click", menuToggler);
    // this module will be migrated to the dom-handler.mjs, such file will be handling the dom manipulation for all pages 
}
catch (error) {
    console.log('Some features were not loaded')
}

try {
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
                <li><span class="tile-title">Site: </span><a href="${member.website}" target="_blank" >${member.name}</a></li>
                </ul>
            </div>
        `;
        try {
            container.appendChild(card);
        } catch (error) {
            console.log('Businesses\' data not needed')
        }
        });
    })
} catch (error) {
    console.error('Businesses\' data was not loaded')
}