
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

export { fetchWeatherData , urlGetter };