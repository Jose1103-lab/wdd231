// import { jsPDF } from './lib/jspdf.es.js'; // Adjust filename if needed (e.g., jspdf.umd.min.js)

class TempleAppointment {
    // Clasifiers that goes at the beginning of the variable-
    // when they are used they should be the variables must-
    // be the declared at the top of the class instead of using ('this').
    // ('#') stands for private.
    // ('_') stands for protected; however, the usage varies from its use in C#.
    #first;
    #last;
    #phone;
    #email;
    #ordinance;
    #date;
    #location;

    constructor(first, last, phone, email, ordinance, date, location) {
        this.#first = first;
        this.#last = last;
        this.#phone = phone;
        this.#email = email;
        this.#ordinance = ordinance;
        this.#date = date;
        this.#location = location;
    }

    displayAppointmentInfo(container) {
        let newDiv = document.createElement("div");
        
        newDiv.innerHTML = `
            <p>Name: ${this.#last}, ${this.#first}</p>
            <p>Phone: ${this.#phone}</p>
            <p>Email: ${this.#email}</p>
            <p>Address: ${this.#location}</p>
            <p>Appointment date: ${this.#date}</p>`
        
        container.appendChild(newDiv);
    }
    
    // exportToPdf() {
    //     // Check if jsPDF is available
    //     if (typeof jsPDF !== 'undefined') {
    //         const doc = new jsPDF();
            
    //         doc.text(`Name: ${this.#last}, ${this.#first}`, 10, 10);
    //         doc.text(`Phone: ${this.#phone}`, 10, 20);
    //         doc.text(`Email: ${this.#email}`, 10, 30);
    //         doc.text(`Address: ${this.#location}`, 10, 40);
    //         doc.text(`Appointment date: ${this.#date}`, 10, 50);
            
    //         doc.save('appointment.pdf');
    //     } else {
    //         console.error('jsPDF library is not loaded.');
    //         alert("jsPDF library not loaded. Unable to export the PDF.")
    //     }
    // }
}
const dataw = new URLSearchParams(window.location.search); 

const newAppointment = new TempleAppointment(dataw.get("first"), dataw.get("last"), dataw.get("phone"), dataw.get("email"),
    dataw.get("ordinance"), dataw.get("date"), dataw.get("location"));

newAppointment.displayAppointmentInfo(document.querySelector("#results"));

const exportButton = document.querySelector("#export");
exportButton.addEventListener("click", () => newAppointment.exportToPdf());


// const exportButton = document.querySelector("#export");
// exportButton.addEventListener("click", function() {
//     newAppointment.exportToPdf();
// });

// Attach the exportToPdf function to the newAppointment object
// this is an old method, it sucks
// newAppointment.exportToPdf = TempleAppointment.prototype.exportToPdf.bind(newAppointment);


// These are tester outputs-----------------------------------------------------------------
// console.log(newAppointment.first); //test for a private variable
// console.log(dataw.get("first"));
// for (const [key, value] of dataw.entries()) {
//     console.log(`${key}: ${value}`);
// }