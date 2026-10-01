const date = new Date();
let year = date.getFullYear();
const month = date.getMonth();
const dayOfMonth = date.getDate();
const calendarYear = document.querySelector(".calendar-header h2");

const headerButtons = document.querySelectorAll(".header-btn");
const sections = document.querySelectorAll(".section");

const display = document.querySelector(".chronometer-div p");
let monthName = date.toLocaleDateString('en-us', { month: 'long' });
let weekName = date.toLocaleDateString('en-us', { weekday: 'long' });

calendarYear.textContent = `${monthName} ${year}`;

const days = document.querySelector(".days");
const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
const tasksHeader = document.querySelector(".tasks-header p");

for (let i = 1; i <= numberOfDaysInMonth; i++) {
    const numberDay = document.createElement("span");
    let newDate = new Date(year, month, i);
    let dayOfWeek = newDate.getDay();

    if (i === 1) {
        numberDay.classList.add('spacing')
    };
    
    if (!numberDay.classList.contains('spacing')) {
        numberDay.textContent = i;
        numberDay.classList.add("days-boxes");
        numberDay.classList.add("text");
    };
    

    numberDay.addEventListener("click", () => {

        const allSpan = document.querySelectorAll(".days-boxes");
        allSpan.forEach(span => {span.classList.remove('selected')});
        numberDay.classList.add('selected');
        monthName = newDate.toLocaleDateString('en-us', { month: 'long' });
        weekName = newDate.toLocaleDateString('en-us', { weekday: 'long' });
        tasksHeader.textContent = `${weekName}, ${i} ${monthName}`;
        calendarYear.textContent = `${monthName} ${year}`;
    });
    days.append(numberDay);
    if (i === dayOfMonth) {
        numberDay.classList.add("selected");
    };
};

tasksHeader.textContent = `${weekName}, ${dayOfMonth} ${monthName}`;

const dropdownButton = document.querySelector(".dropdown-btn");
const allDropdownButtons = document.querySelectorAll(".content button");

allDropdownButtons.forEach((btn) => {
    btn.addEventListener('click', event => {
        dropdownButton.textContent = btn.textContent;
    });
});

function saveActivity () {
    const activityNameInput = document.getElementById("activity-name-input")
    const hours = document.getElementById("hours-input");
    const minutes = document.getElementById("minutes-input")

    const activity = {
        "name": activityNameInput.value,
        "hours": hours.value,
        "minutes": minutes.value,
        "classification": dropdownButton.textContent
    };

    const jsonString = JSON.stringify(activity);

    localStorage.setItem("habit", jsonString)
    
    activityNameInput.value = "";
    hours.value = "";
    minutes.value = "";

    loadActivity();
};

function loadActivity () {
    const registredTasks = document.querySelector('.registred-tasks');

    list = JSON.parse(localStorage.getItem('habit')) || [];

    let p = document.createElement('p');
    p.classList.add('text');
    p.textContent = list.classification;
    registredTasks.append(p);


    p = document.createElement('p');

    p.classList.add('text');
    p.textContent = `${list.name} ${list.hours}h  ${list.minutes}min`;
    registredTasks.append(p);

};

function findVisibleSection () {
    return [...sections].find(section => !section.classList.contains('hide'));
}

function switchSection () {
    headerButtons.forEach((btn, btnIndex) => {
        btn.addEventListener('click', event => {
            if (sections[btnIndex].classList.contains('hide')) {;
                findVisibleSection().classList.add('hide');
                sections[btnIndex].classList.remove('hide');
            };
        });
    });
};

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start () {
    if(!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    };
};
//finish clear logic
function clear () {
    console.log("a")
}

function update () {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

const addTaskOverlay = document.querySelector(".add-task-overlay");
function showAddTaks () {
    if (addTaskOverlay.classList.contains('hide')) {
        addTaskOverlay.classList.remove('hide');
    }
    else {
        addTaskOverlay.classList.add('hide');
    };
};

loadActivity();