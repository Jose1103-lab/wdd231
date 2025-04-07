// this fetch the weather information from the APi
async function fetchWeatherData() {
    // I fetched the current weather and the forecast data from the openweathermap api
    const responsew = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=20.50&lon=-70.50&unit=imperial&appid=df6e48afc4d27d7b531c008874d59cde");
    const responsef = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=20.50&lon=-70.50&unit=imperial&appid=df6e48afc4d27d7b531c008874d59cde");
    const weatherData = await responsew.json();
    const weatherDataf = await responsef.json();
    // console.log([weatherData, weatherDataf]);
    return [weatherData, weatherDataf];
}

// this function will be used to fetch the data from form url
function urlGetter() {
    const data = new URLSearchParams(window.location.search);

    return data;
}

async function fetchData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data;
}

//FIXME: (ft-1003) experimental feature applied to the dicover page
function factGetter() {
    fetch("data/fact.json")
        .then(response => response.json())
        .then(data => {
            const factsContainer = document.querySelector(".curiosity");
            const facts = data.facts.flatMap(category => category.items);
            const factsLength = facts.length;
            const factsLimit = Math.min(factsLength, 1); 
            for (let i = 0; i < factsLength && i < factsLimit; i++) {
                const newsItem = document.createElement("div");
                const randomIndex = Math.floor(Math.random() * factsLength);
                const fact = facts[randomIndex];
                newsItem.classList.add("curiority-card");
                newsItem.innerHTML = `
                    <h4 class="card-curiosity">${fact.fact}</h4>
                    <img src="${fact.image}" alt="${fact.fact}" loading="lazy">
                    <p class="card-curiosity">${fact.description}</p>
                `;
                factsContainer.appendChild(newsItem);
            }
        });
}

//FIXME: (ft-1002) experimental feature applied to the dicover page
function newsGetter() {
    // CORS proxy is used to bypass CORS restrictions when fetching the RSS feed
    // this module will be migrated to the data.mjs, such file will be handling the fetch request for local news.
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
    const rssUrl = 'https://www.diariolibre.com/rss/economia.xml';
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
}

//FIXME: (ft-1004) experimental feature applied to the dicover page
async function fetchDiscover() {
    const response = await fetch("data/discover.json");
    const data = await response.json();
    return data;
}

function loadLastSeen() {
    const lastSeen = localStorage.getItem("last-seen");
    console.log(lastSeen);
    return lastSeen;
}

function saveLastSeen(id) {
    const lastSeen = localStorage.setItem("last-seen", id);

    return 'success';
}

export { fetchWeatherData, urlGetter, fetchData, newsGetter, factGetter, saveLastSeen, loadLastSeen, fetchDiscover};