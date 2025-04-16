
let featureArray = [];
let billboardArray = [];

async function movieFectch() {
    try {
        const movieData = await fetch("https://rest-api-deply.onrender.com/movies");
        const data = await movieData.json();
        return data;
    } catch (error) {
        console.warn("The movie information was not gotten");
    }
}

async function dateFetch() {
    const showtimeData = await fetch(`data/showtime.json`);
    const showData = await showtimeData.json();
    return showData;
}

function loging(){
    const confirmation = document.querySelector("#usr-status")
    const logInfo = new URLSearchParams(window.location.search);
    const usr = logInfo.get("user");
    const pass = logInfo.get("key").toString();

    const userULog = localStorage.getItem("usr");
        console.log(userULog)
        const userPLog = localStorage.getItem("usrp");
        console.log(pass)
        console.log(userPLog)
    
    if(usr !== userULog || userULog === null){
        alert("Usermane not found! ")
    }else if(pass !== userPLog){
        alert("Incorrect password! ")
        // console.log('fine')
    }else{
        alert(`Welcome back ${userULog}`)
        confirmation.textContent = `${usr.toUpperCase()}`
    }

    console.log(userULog)
    return userULog === usr && userPLog === pass;
}

function signin(){
    const newUserInfo = new URLSearchParams(window.location.search);
    const userName = newUserInfo.get("user")
    console.log(userName);
    const passwords = [newUserInfo.get("key"), newUserInfo.get("key_confirmation")] 

    if(passwords[0] !== passwords[1]){
        alert("Password did not match")
    }else{
        localStorage.setItem("usr", userName);
        localStorage.setItem("usrp", passwords[0]);
    }
    
    return console.log('new user added');

}

export { movieFectch, dateFetch, featureArray, billboardArray, signin, loging };