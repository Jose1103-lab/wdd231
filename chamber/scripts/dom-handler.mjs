import { fetchWeatherData, urlGetter, fetchData, loadLastSeen, fetchDiscover } from "./data.mjs";

// this function will be used to fetch the data from form url
function formData() {
    try {
        const data = urlGetter();
        const commerce = document.querySelector("#thanks");
        const container = document.createElement("div");
        // container.classList.add("");
        container.innerHTML = `<div class="form-data">
        <img src="images/check.png" alt="check image" loading="lazy" class="done" width="150">
        <h2>Process Completed</h2>
            <ul>
                <li>${data.get("lastn")}, ${data.get("firstn")}</li>
                <li>${data.get("email")}</li>
                <li>${data.get("phone")}</li>
                <li>${data.get("orgname")}</li>
                <li><span class="tile-title">Submitted:</span> ${data.get("date")}</li>
            </ul>
    
            <p>Thank you for your submission, we will get back to you as soon as possible.</p>
        </div>`
        commerce.appendChild(container);
        // return;
    } catch (error) { }
}

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

// this function opens and closes modals
function modalHandler(elementId, noModal) {
    const elmodal = document.querySelector(`${elementId}`);
    const elmodalClose = document.querySelectorAll(".close");
    const elmodalOpen = document.querySelectorAll(".open");

    elmodalClose[`${noModal}`].addEventListener("click", () => {
        elmodal.close();
    });
    elmodalOpen[`${noModal}`].addEventListener("click", () => {
        elmodal.showModal();
    })
}

// this function handles the elements construction for the weather section 
function weatherBuilder() {
    fetchWeatherData().then(([weatherData, weatherDataf]) => {
        console.log(`Weather api status: ${weatherData.cod}`);
        const weather = document.querySelector(".weather");
        const date = [new Date(weatherData.sys.sunrise * 1000), new Date(weatherData.sys.sunset * 1000)];
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const forecast = document.querySelector(".forecast");

        try {
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
            <li><span class="tile-title">${days[date[0].getDay() + 1]}: </span>${convertUnit(weatherDataf.list[2].main.feels_like)}°F</li>
            </ul>`;

        } catch (error) {
            console.info(`Warning! ${error}`);
        }
    })
}

// this function loads the year in the footer
function yearLoader() {
    const date = new Date();
    const year = date.getFullYear();
    document.querySelector("#year").textContent = year;

    try {
        const submissiondata = document.querySelector("#submissionDate")
        submissiondata.value = date.toLocaleDateString();
    } catch (error) {
    }
}

function memberInformation() {
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
}

function loadDiscover() {
    loadLastSeen();

    try {
        fetchDiscover().then(data => {
            const container = document.querySelector(".dc-menu");
            const recentContainer = document.querySelector(".recent-vw");

            data.forEach(market => {
                const card = document.createElement("div");
                if (market.id === loadLastSeen()) {
                    card.classList.add("dc-card-recent");
                    card.innerHTML = `<img src="images/data/${market.image}" alt="${market.name}">
                    <h3>${market.category}</h3>
                    <p>${market.description}</p>
                    <p><span class="tile-title">City: </span>${market.city}</p>
                    `;
                    recentContainer.appendChild(card);

                }
                card.innerHTML = '';
                card.classList.add("dc-card");
                card.innerHTML = `<img src="images/data/${market.image}" alt="${market.name}">
                <h3>${market.category}</h3>
                <p>${market.description}</p>
                <p><span class="tile-title">City: </span>${market.city}</p>
                <button onclick="location.href=${market.link}">Explore</button>
                `;

                container.appendChild(card);
            })
        });
    } catch (error) {
        console.log("something happened!")
    }
}

export { formData, weatherBuilder, viewChanger, memberInformation, modalHandler, menuToggler, schemaColorChanger, yearLoader, loadDiscover };