import { loadMovie, previewLoader, dateloader, ticketBooking, showModal } from "./dom-handler.mjs";
import { loging, signing } from "./data.mjs";

loadMovie();
dateloader();
ticketBooking();
previewLoader();
showModal();
 
console.log(loging())
console.log(signing())