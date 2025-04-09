import { formData, weatherBuilder, modalHandler, viewChanger, menuToggler, yearLoader, memberInformation, schemaColorChanger, loadDiscover } from "./dom-handler.mjs";
import { newsGetter, factGetter, saveLastSeen } from "./data.mjs";
const getTitle = document.title; // this is experimental (ft-1001)

yearLoader();

if (getTitle.includes("Home")) {
    weatherBuilder();
    memberInformation();
}

if (getTitle.includes("Directory")) {
    memberInformation();
    
    try {
        const gridView = document.querySelector("#grid").addEventListener("click", () => { viewChanger("g") });
        const listView = document.querySelector("#list").addEventListener("click", () => { viewChanger('l') });
    }
    catch (error) {
        console.log('List or Grid buttons were not loaded')
    }
}

if (getTitle.includes("Discover")) {
    loadDiscover();
    newsGetter();
    factGetter();
}

if (getTitle.includes("Join")) {
    formData();
    
    try {
        modalHandler("#gd-modal", 0);
        modalHandler("#sl-modal", 1);
        modalHandler("#bz-modal", 2);
        modalHandler("#np-modal", 3);
    } catch (error) {
        console.log('Some modals were not loaded')
    }
}

const schema = document.querySelector("#menu-toggler").addEventListener("click", menuToggler);
const schemaColor = document.querySelector("#bg-toggler").addEventListener("click", schemaColorChanger);

// this module will be migrated to the dom-handler.mjs, such file will be handling the dom manipulation for all pages 
const schemaChecker = localStorage.getItem("schema"); // with the feature i will look for the preferred schema color saved in the local storage 
if (schemaChecker === "dark") { schemaColorChanger(); }



