
async function movieFectch() {
    const movieData = await fetch("https://rest-api-deply.onrender.com/movies");
    const data = await movieData.json();
    return data;
}

movieFectch().then((data) => {
    const movie = document.querySelector("#fetch");
    console.log(data); //! for testing

    data.forEach(element => {
        const movieContainer = document.createElement("div");
        movieContainer.innerHTML = `
        <img src="${element.poster}" alt="movie image" width="200">
        <h3>${element.title}</h3>
        <p>${element.duration} min</p>
        <p>${element.rate}</p>
        <p>${element.genre[0]}</p>
        <p>${element.year}</p>
        <p>${element.director}</p>
        `
        movie.appendChild(movieContainer);
    });
});


// director
// duration
// genre - Array(1)
// id
// poster
// rate
// title
// year