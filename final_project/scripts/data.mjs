
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

function loging(pass, usr){
    const userULog = localStorage.getItem(usr);
    const userPLog = localStorage.getItem(pass);

    return userULog === usr && userPLog === pass;
}

function signing(pass, usr){
    const newUser = localStorage.setItem("usr", usr);
    const newPass = localStorage.setItem("usrp", pass);

    return newUser && newPass;
}


export { movieFectch, dateFetch, featureArray, billboardArray, signing, loging };