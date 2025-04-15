import { movieFectch, dateFetch, featureArray, billboardArray } from "./data.mjs";

function menuToggle() {
    const menuBtn = document.querySelector("#tg-mn");
    const menu = document.querySelector(".menu-container");

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle("show");
        menuBtn.classList.toggle("show");
    })
}

function loadMovie() {
    movieFectch().then((data) => {
        // console.log(data); //! for testing

        const billboard = document.querySelector("#billboard-list");
        const premiere = document.querySelector("#billboard-list");
        const feature = document.querySelector("#featured-list");
        let counter = 0;

        data.forEach(element => {

            // movie generator for the home billboard section
            if (document.title === "Le Coin") {
                counter++;
                // this restarts the counter to 0 after 8 movies allowing me to use the same counter
                if (counter > 8) return;

                const movieContainer = document.createElement("div");
                movieContainer.classList.add("bill-item");
                movieContainer.setAttribute("id", element.id);
                movieContainer.innerHTML = `
                <a href="preview.html?id=${element.id}">
                <img src="${element.poster}" alt="${element.title}" loading="lazy" la width="200">
                <h3>${element.title}</h3>
                <p>${element.genre[0]}</p>
                </a>
                `
                billboard.appendChild(movieContainer);
            }

            // movie generator for the full billboard section
            if (document.title.includes("Billboard")) {
                billboardArray.push([element.id, element.title]);
                const movieContainer = document.createElement("div");
                movieContainer.classList.add("bill-item");
                movieContainer.setAttribute("id", element.id);
                movieContainer.innerHTML = `
                <a href="preview.html?id=${element.id}">
                <img src="${element.poster}" alt="${element.title}" loading="lazy" la width="200">
                <h3>${element.title}</h3>
                <p>${element.genre[0]}</p>
                </a>
                `
                billboard.appendChild(movieContainer);
            }

            // movie generator for the featured sections
            if ((document.title.includes("Billboard") || document.title.includes("Featured")) && element.rate >= 9) {
                featureArray.push([element.id, element.title]);
                const movieContainer = document.createElement("div");
                movieContainer.classList.add("bill-item");
                movieContainer.classList.add("i-featured");
                movieContainer.setAttribute("id", element.id);
                movieContainer.innerHTML = `
                <a href="preview.html?id=${element.id}">
                <img src="${element.poster}" alt="${element.title}" loading="lazy" la width="200">
                <h3>${element.title}</h3>
                <p>Rating: ${element.rate}</p>
                </a>
                `
                feature.appendChild(movieContainer);
            }
        });
    });
}

function dateloader() {
    if (!document.title.includes("Booking")) return;
    dateFetch().then((showData) => {
        // console.log(data); //! for testing
        const optionContainer = document.querySelector("#movie-bk-t");
        const optionDateContainer = document.querySelector("#movie-bk-s");
        showData.forEach(element => {
            const titleContainer = document.createElement("option");
            titleContainer.value = element.title;
            titleContainer.innerHTML = `
            ${element.title}
            `
            optionContainer.appendChild(titleContainer);
        });

        optionContainer.addEventListener("change", () => {
            const selectedMovie = optionContainer.value;
            const avaliableDates = showData.find(movie => movie.title === selectedMovie);
            optionDateContainer.innerHTML = `
            <option value="" disabled selected>--Select showtime--</option>
            <option value="${avaliableDates.showtimes[0]}">${avaliableDates.showtimes[0]}</option>
            <option value="${avaliableDates.showtimes[1]}">${avaliableDates.showtimes[1]}</option>
            <option value="${avaliableDates.showtimes[2]}">${avaliableDates.showtimes[2]}</option>
            <option value="${avaliableDates.showtimes[3]}">${avaliableDates.showtimes[3]}</option>
            `
        });
    });
}

function ticketMaker(dataF, dataL) {
    if (!document.title.includes("booked")) return;
    const uniqueCode = Math.floor(Math.random() * 1000000);
    let code = dataF[0] + dataL[1] + dataF[1] + dataL[0] + uniqueCode;
    code = code.replace(/\s/g, "");
    code = code.toLowerCase();
    return code;
}

function ticketBooking() {
    if (!document.title.includes("booked")) return;
    const ticketInfo = new URLSearchParams(window.location.search);
    const ticketRef = document.querySelector("#booking-ref");
    const ticketMovie = document.querySelector("#movie-name");
    const movieDate = document.querySelector("#movie-date");

    const uniqueCode = ticketMaker(ticketInfo.get("first"), ticketInfo.get("email"));
    ticketRef.textContent = `${uniqueCode}`;
    ticketMovie.textContent = `${ticketInfo.get("movie")}`;
    movieDate.textContent = `${ticketInfo.get("movie_time")}`;
}

function previewLoader() {
    if (!document.title.includes("Preview")) return;
    const movieId = new URLSearchParams(window.location.search).get("id");
    let url
    dateFetch().then((showData) => {
        const movieData = showData.find(movie => movie.id === movieId);
        url = movieData.trailer;
    }).then(() => {

        movieFectch().then((data) => {
            const movieData = data.find(movie => movie.id === movieId);
            const movieContainer = document.querySelector("#movie-info");
            movieContainer.innerHTML = `
                <img src="${movieData.poster}" alt="${movieData.title}" id="movie-poster" loading="lazy" width="250">
                <div class="movie-details">
                    <h3 id="movie-title">${movieData.title}</h3>
                    <p id="movie-rating">Rating: <span id="rating">${movieData.rate}</span></p>
                    <p id="movie-duration">Duration: <span id="duration">${movieData.duration} min</span></p>
                    <p id="movie-genre">Genre: <span id="genre">${movieData.genre[0]}</span></p>
                    <p id="movie-release-date">Release Date: <span id="release-date">${movieData.date}</span></p>
                    <p id="movie-director">Director: <span id="director">${movieData.director}</span></p>
                    <button class="hook-btn" onclick="window.location.href='booking.html'">Book Now</button>
                    
                    <div class="movie-trailer">
                    <h4>Trailer</h4>
                    <iframe width="437" height="246" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                `
        });
    })


}

function showSignModal() {
    const modalBtn = document.querySelector("#user-log")
    const modalcloser = document.querySelectorAll(".modal-close")
    const switcher = document.querySelector("#sign-up") // to move from login form to sign up one
    const switcher2 = document.querySelector("#sign-in") // to move from sign up form to sign in one
    const modal = document.querySelector("#login");
    const modal2 = document.querySelector("#signin");

    modalBtn.addEventListener('click', () => {
        modal.showModal();
    })
    
    switcher.addEventListener('click', () => {
        modal.close();
        modal2.showModal();
    })
    
    switcher2.addEventListener('click', () => {
        modal2.close();
        modal.showModal();
    })
    
    modalcloser.forEach(button => {
        button.addEventListener('click', () => {
            modal.close();
            modal2.close();
        })
    })
}

export { loadMovie, dateloader, ticketBooking, previewLoader, showSignModal, menuToggle };