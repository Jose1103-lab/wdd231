import { weatherBuilder, modalHandler, viewChanger, menuToggler, yearLoader,schemaColorChanger } from "./dom-handler.mjs";

// import {  } from "./scripts/data.mjs"; // this module imports the data response to be consumed

weatherBuilder();
yearLoader()

try {
    modalHandler("#gd-modal", 0);
    modalHandler("#sl-modal", 1);
    modalHandler("#bz-modal", 2);
    modalHandler("#np-modal", 3);
} catch (error) {
    console.log('Some modals were not loaded')
}

// this module will be migrated to the data.mjs, such file will be handling the fetch request for apis, json, etc
async function fetchData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data;
}

const schema = document.querySelector("#menu-toggler").addEventListener("click", menuToggler);
const schemaColor = document.querySelector("#bg-toggler").addEventListener("click", schemaColorChanger);

// this module will be migrated to the dom-handler.mjs, such file will be handling the dom manipulation for all pages 
const schemaChecker = localStorage.getItem("schema"); // with the feature i will look for the preferred schema color saved in the local storage 
if (schemaChecker === "dark") { schemaColorChanger(); }


try {
    const gridView = document.querySelector("#grid").addEventListener("click", () => { viewChanger("g") });
    const listView = document.querySelector("#list").addEventListener("click", () => { viewChanger('l') });
}
catch (error) {
    console.log('List or Grid buttons were not loaded')
}

try {
    fetchData().then(data => {

        let counter = 0;
        data.forEach(member => {
            // these tries will be replaced with something more efficient
            try {
                if (member.event.status) {
                    const events = document.querySelector(".event-cards-container");
                    const card = document.createElement("div");
                    card.classList.add("event-card");
                    card.innerHTML = `<img src="images/data/${member.event.cover}" alt="${member.event.name}  picture">
                    <h3>${member.event.name}</h3>
                    <p><span class="tile-title">Date: </span>${member.event.date}</p>    
                    <p><span class="tile-title">Location: </span> ${member.event.location}</p>`;
                    events.appendChild(card);
                }

            } catch (error) {
                // console.log(` event\'s data not needed`)   
            }

            try {
                const container2 = document.querySelector(".sec-section");
                if (member.membership_level === "Gold" && counter < 3) {
                    const card2 = document.createElement("div");
                    card2.classList.add("main-tile");
                    card2.innerHTML = `<h3>${member.name}</h3>
                    <span>~${member.membership_level}~</span>
                    <ul>
                    <li><span class="tile-title">Phone: </span>${member.phone}</li>
                    <li><span class="tile-title">Site: </span><a href="${member.website}" target="_blank" >${member.name}</a></li>
                    </ul>
                    </div>
                    `;
                    container2.appendChild(card2);
                    counter++;
                }
            } catch (error) {
                // console.log(`preview\'s data not needed`)
            }

            try {
                const container = document.querySelector("#commerce");
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
                container.appendChild(card);
            } catch (error) {
                // console.log('Business\'s data not needed')
            }
        });
    })
} catch (error) {
    console.error('Businesses\' data was not loaded')
}

