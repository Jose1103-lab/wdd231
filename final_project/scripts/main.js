import { loadMovie, previewLoader, dateloader, ticketBooking, showModal, menuToggle } from "./dom-handler.mjs";
import { loging, signing } from "./data.mjs";

menuToggle();
loadMovie();
dateloader();
ticketBooking();
previewLoader();
showModal();
 
console.log(loging())
console.log(signing())