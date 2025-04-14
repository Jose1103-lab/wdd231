
let featureArray = [];
let billboardArray = [];

async function movieFectch() {
    const movieData = await fetch("https://rest-api-deply.onrender.com/movies");
    const data = await movieData.json();
    return data;
}

async function dateFetch() {
    const showtimeData = await fetch(`data/showtime.json`);
    const showData = await showtimeData.json();
    return showData;
}



export { movieFectch, dateFetch, featureArray, billboardArray };