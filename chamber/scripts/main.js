import { viewChanger, menuToggler, schemaColorChanger } from "./dom-handler.mjs";
// import {  } from "./scripts/data.mjs"; // this module imports the data response to be consumed

// const dataw = window.location.search;
// console.log(dataw);
// console.log("done");


// this module will be migrated to the data.mjs, such file will be handling the fetch request for apis, json, etc
async function fetchData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data;
}

async function fetchWeatherData() {
    // I fetched the current weather and the forecast data from the openweathermap api
    const responsew = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=20.50&lon=-70.50&unit=imperial&appid=df6e48afc4d27d7b531c008874d59cde");
    const responsef = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=20.50&lon=-70.50&unit=imperial&appid=df6e48afc4d27d7b531c008874d59cde");
    const weatherData = await responsew.json();
    const weatherDataf = await responsef.json();
    // console.log(weatherData);
    // console.log(weatherDataf);
    return [weatherData, weatherDataf];
}

// this module will be exported from the dom-handler file -------------------------------------
const date = new Date();
const year = date.getFullYear();
document.querySelector("#year").textContent = year;


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
    console.log('Some features were not loaded')
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
                console.log(` event\' data not needed ${error}`)   
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
                console.log(`preview\' data not needed ${error}`)
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
                console.log('Businesses\' data not needed')
            }
            console.log('done')
        });
    })
} catch (error) {
    console.error('Businesses\' data was not loaded')
}

try {
    fetchWeatherData().then(([weatherData, weatherDataf]) => {
        const weather = document.querySelector(".weather");
        const date = [new Date(weatherData.sys.sunrise * 1000), new Date(weatherData.sys.sunset * 1000)];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const forecast = document.querySelector(".forecast");
        weather.innerHTML = "";
        forecast.innerHTML = "";

        // this function converts the temperature from kelvin to fahrenheit
        function convertUnit(temp) { return ((temp - 273.15) * 9 / 5 + 32).toFixed(2); }

        // this the the weather data to be displayed
        weather.innerHTML = `<h3>Current Weather</h3>
        <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description} icon" loading="lazy" width="50">
        <ul>
        <li><span class="tile-title">Weather: </span>${weatherData.weather[0].description}</li>
        <li><span class="tile-title">Location: </span>${weatherData.name}</li>
        <li><span class="tile-title">Temperature: </span>${convertUnit(weatherData.main.temp)}°F</li>
        <li><span class="tile-title">Humidity: </span>${weatherData.main.humidity}%</li>
        <li><span class="tile-title">Wind: </span>${weatherData.wind.speed}m/s</li>
        <li><span class="tile-title">Sunrise: </span>${date[0].toLocaleTimeString()}</li>
        <li><span class="tile-title">Sunset: </span>${date[1].toLocaleTimeString()}</li>
        </ul>`;

        // this the the forecast data to be displayed
        forecast.innerHTML = `<h3>Forecast</h3>
        <ul>
        <li><img src="https://openweathermap.org/img/w/${weatherDataf.list[0].weather[0].icon}.png" alt="${weatherData.weather[0].description} icon" loading="lazy" width="50"></li>
        <li><span class="tile-title">Today: </span>${convertUnit(weatherDataf.list[0].main.feels_like)}°F</li>
        <li><img src="https://openweathermap.org/img/w/${weatherDataf.list[1].weather[0].icon}.png" alt="${weatherData.weather[0].description} icon" loading="lazy" width="50"></li>
        <li><span class="tile-title">Tomorrow: </span>${convertUnit(weatherDataf.list[1].main.feels_like)}°F</li>
        <li><img src="https://openweathermap.org/img/w/${weatherDataf.list[2].weather[0].icon}.png" alt="${weatherData.weather[0].description} icon" loading="lazy" width="50"></li>
        <li><span class="tile-title">${days[date[0].getDay()+1]}: </span>${convertUnit(weatherDataf.list[2].main.feels_like)}°F</li>
        </ul>`;


        console.log(`Weather api status: ${weatherData.cod}`);
    })


} catch (error) {
    console.log(`check this: ${error}`)

}