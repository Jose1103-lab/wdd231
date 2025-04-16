import { loadMovie, access, previewLoader, dateloader, ticketBooking, showSignModal, menuToggle } from "./dom-handler.mjs";

menuToggle();
loadMovie();
dateloader();
ticketBooking();
previewLoader();
showSignModal();
access();

// console.log(signin())
// console.log(loging())