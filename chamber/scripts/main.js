import { formData, weatherBuilder, modalHandler, viewChanger, menuToggler, yearLoader, memberInformation, schemaColorChanger } from "./dom-handler.mjs";

const getTitle = document.title; // this is experimental (ft-1001)

yearLoader();
memberInformation();
weatherBuilder();
//FIXME: (ft-1001) experimental feature applied to the join page 
if (getTitle.includes("Join")) {
    formData();
}

//FIXME: (ft-1002) experimental feature applied to the dicover page
// CORS proxy is used to bypass CORS restrictions when fetching the RSS feed
// this module will be migrated to the data.mjs, such file will be handling the fetch request for local news.
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
const rssUrl = 'https://www.diariolibre.com/rss/economia.xml';


fetch("data/fact.json")
    .then(response => response.json())
    .then(data => {
        const factsContainer = document.querySelector(".curiosity"); 
        const factsLength = data.length;
        const factsLimit = factsLength > 1 ? 1 : factsLength; // Limit to 5 items   
        console.log(data)
        let counter = 0; 
        // data.forEach(item => {
        //     if (counter >= factsLimit) return;
        //     const title = item.title;
        //     const link = item.link;
        //     const newsItem = document.createElement("div");
        //     newsItem.classList.add("curiority-card"); 
        //     newsItem.innerHTML = `
        //         <img src="${item.image}" alt="News Image" loading="lazy" width="200" height="100">
        //           <a href="${link}" target="_blank">
        //         <h4>${title}</h4>Read more</a>
        //         `;
        //     factsContainer.appendChild(newsItem);
        //     // console.log(`Title: ${title}\nLink: ${link}\n`);
        //     counter++; 
        // });
    })

fetch(proxyUrl + rssUrl)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        const items = data.querySelectorAll("item");
        const itemsLength = items.length;
        const itemsLimit = itemsLength > 3 ? 3 : itemsLength; // Limit to 5 items   
        let counter = 0; 
        items.forEach(item => {
            if (counter >= itemsLimit) return;
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const newsContainer = document.querySelector(".news");
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-card"); 
            const mediaContent = item.getElementsByTagName("media:content")[0];
            const imageUrl = mediaContent ? mediaContent.getAttribute("url") : "default-image.jpg"; 
            newsItem.innerHTML = `
            <a href="${link}" target="_blank">
                <div class="news-card-title">
                <img src="${imageUrl}" alt="News Image" loading="lazy" width="200" height="100">
                <h4>${title}</h4>Read more</a>
                </div>
                `;
            newsContainer.appendChild(newsItem);
            // console.log(`Title: ${title}\nLink: ${link}\n`);
            counter++; 
        });
    })
    .catch(err => console.error(`Error fetching RSS (check the "Cors parse" because it needs authorization): ${err}`));

const schema = document.querySelector("#menu-toggler").addEventListener("click", menuToggler);
const schemaColor = document.querySelector("#bg-toggler").addEventListener("click", schemaColorChanger);

// this module will be migrated to the dom-handler.mjs, such file will be handling the dom manipulation for all pages 
const schemaChecker = localStorage.getItem("schema"); // with the feature i will look for the preferred schema color saved in the local storage 
if (schemaChecker === "dark") { schemaColorChanger(); }

// this module will be migrated to the data.mjs, such file will be handling the fetch request for apis, json, etc

try {
    modalHandler("#gd-modal", 0);
    modalHandler("#sl-modal", 1);
    modalHandler("#bz-modal", 2);
    modalHandler("#np-modal", 3);
} catch (error) {
    console.log('Some modals were not loaded')
}

try {
    const gridView = document.querySelector("#grid").addEventListener("click", () => { viewChanger("g") });
    const listView = document.querySelector("#list").addEventListener("click", () => { viewChanger('l') });
}
catch (error) {
    console.log('List or Grid buttons were not loaded')
}

