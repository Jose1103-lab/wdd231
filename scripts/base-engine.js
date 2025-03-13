// import datex from './data';
// datex();


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// date function------------------------------------------------
function dateSetter() {
    const modifier = document.querySelector('#lastMod');
    const lastM = document.lastModified;
    const year = new Date().getFullYear();
    const yearMod = document.querySelector('#year');

    modifier.textContent = lastM;
    yearMod.textContent = year;
    console.log(lastM, year); // tester
}
dateSetter();

// menu function------------------------------------------------
function menuToggler() {
    const menu = document.querySelector("#menu");
    menu.classList.toggle('show');
}

const firer = document.querySelector('.player');
firer.addEventListener("click", menuToggler);


// filter function------------------------------------------------
function classTagLoader(identifier) {
    const container = document.querySelector(".class-ct");
    let newArray;
    let counter = 0;
    let credits = 0;
    container.innerHTML = "";

    courses.forEach(item => {
        if (identifier === item.subject) {
            newArray = courses.filter(item => item.subject === identifier);
        } else if (identifier === undefined) {
            newArray = courses;
        }
    });
    newArray.reduce((art, item) => {
        counter++;
        credits += item.credits;
        const coursesMod = document.querySelector("#courses");
        const creditsMod = document.querySelector("#credits");
        coursesMod.textContent = counter;
        creditsMod.textContent = credits;

        const newElement = document.createElement("div");
        newElement.classList.add(`${item.subject.toLowerCase()}`);
        newElement.textContent = item.subject + item.number;

        if (item.completed === true) {
            newElement.classList.add("complete");
        } else {
            newElement.classList.add("missing");
        }

        container.appendChild(newElement);
    }, 0);
}

classTagLoader();

const filter = document.querySelector("#all").addEventListener("click", () => {
    classTagLoader();
});

const filter1 = document.querySelector("#cse").addEventListener("click", () => {
    classTagLoader("CSE");
});

const filter2 = document.querySelector("#wdd").addEventListener("click", () => {
    classTagLoader("WDD");
});



