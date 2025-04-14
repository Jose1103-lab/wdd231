import { loadMovie, previewLoader, dateloader, ticketBooking } from "./dom-handler.mjs";
import { loging, signing } from "./data.mjs";

loadMovie();
dateloader();
ticketBooking();
previewLoader();

console.log(loging())
console.log(signing())