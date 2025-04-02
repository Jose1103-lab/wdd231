import { fetchWeatherData, urlGetter } from "./data.mjs";

function formData() {
    const data = urlGetter();
    const commerce = document.querySelector("#thanks");
    const container = document.createElement("div");
    // container.classList.add("");
    container.innerHTML = `<div class="form-data">
    <img src="images/check.png" alt="check image" loading="lazy" width="150">
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
}
; // this function will be used to fetch the data from form url

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
            console.info(`CHECK THIS: ${error}`);
        }
    })
}

// this function loads the year in the footer
function yearLoader() {
    const date = new Date();
    const year = date.getFullYear();
    document.querySelector("#year").textContent = year;
    
    console.log(date);
    return date
}


export { formData, weatherBuilder, viewChanger, modalHandler, menuToggler, schemaColorChanger, yearLoader };