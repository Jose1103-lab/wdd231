import { loadMovie, access, previewLoader, dateloader, ticketBooking, showSignModal, menuToggle } from "./dom-handler.mjs";
import { loging, signin } from "./data.mjs";

menuToggle();
loadMovie();
dateloader();
ticketBooking();
previewLoader();
showSignModal();
access();

// console.log(signin())
// console.log(loging())