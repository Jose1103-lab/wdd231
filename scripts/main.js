import classTagLoader from "./base-engine.js";

classTagLoader();
const filter = document.querySelector("#all").addEventListener("click", () => { classTagLoader(); });
const filter1 = document.querySelector("#cse").addEventListener("click", () => { classTagLoader("CSE"); });
const filter2 = document.querySelector("#wdd").addEventListener("click", () => { classTagLoader("WDD"); });


//testing fetch api and asinc/await functions
async function fetchData() {
    const response = await fetch("data/datex.json");
    const data = await response.json();

    // console.log(data.family[0].name);
    setTimeout(() => {
        for (let i = 0; i < data.family.length; i++) {
            console.log(`NAME: ${data.family[i].name}\nAGE: ${data.family[i].age} \n`);
        }
    }, 5000);
}

fetchData();

fetch("data/datex.json")
    .then(response => response.json())
    .then(data => {
        console.log(`${data.family[0].name}, ${data.family[1].name}, ${data.family[2].name}, ${data.family[3].name}, ${data.family[4].name}`)
            ;
    });

// const info = fetch("data/datex.json")
// console.log(info);
