
async function movieFectch() {
    const movieData = await fetch("https://rest-api-deply.onrender.com/movies");
    const data = await movieData.json();
    return data;
}

movieFectch().then((data) => {
    const movie = document.querySelector("#billboard-list");
    console.log(data); //! for testing

    data.forEach(element => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("bill-item");
        movieContainer.innerHTML = `
        <img src="${element.poster}" alt="${element.title}" loading="lazy" la width="200">
        <h3>${element.title}</h3>
        <p>${element.genre[0]}</p>
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