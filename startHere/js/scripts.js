class TempleAppointment {
    constructor(first, last, phone, email, ordinance, date, location) {
        this.first = first;
        this.last = last;
        this.phone = phone;
        this.email = email;
        this.ordinance = ordinance;
        this.date = date;
        this.location = location;
    }

    displayAppointmentInfo(container) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <p>Name: ${this.last}, ${this.first}</p>
        <p>Phone: ${this.phone}</p>
        <p>Email: ${this.email}</p>
        <p>Address: ${this.location}</p>
        <p>Appointment date: ${this.date}</p>`

        container.appendChild(newDiv);
    }
}

const dataw = new URLSearchParams(window.location.search);
const newAppointment = new TempleAppointment(
    dataw.get("first"),
    dataw.get("last"),
    dataw.get("phone"),
    dataw.get("email"),
    dataw.get("ordinance"),
    dataw.get("date"),
    dataw.get("location")
);

newAppointment.displayAppointmentInfo(document.querySelector("#results"));


// These are tester outputs-----------------------------------------------------------------
// console.log(newAppointment);
// console.log(dataw.get("first"));
// for (const [key, value] of dataw.entries()) {
//     console.log(`${key}: ${value}`);
// }