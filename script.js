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

    if (activityNameInput.value === "" || hours.value === "", minutes.value === "") {
        return;
    }

    const activity = {
        "name": activityNameInput.value,
        "hours": hours.value,
        "minutes": minutes.value,
        "classification": dropdownButton.textContent
    };

    const list = JSON.parse(localStorage.getItem('habit')) || [];

    list.push(activity);

    const jsonString = JSON.stringify(list);

    localStorage.setItem("habit", jsonString)
    
    activityNameInput.value = "";
    hours.value = "";
    minutes.value = "";

    loadActivity();
};

let hours = 0;
let minutes = 0;

function loadActivity () {
    if (localStorage.getItem('habit') !== null) {
        const registredTasks = document.querySelector('.registred-tasks');

        registredTasks.innerHTML = '';
        
        let list = JSON.parse(localStorage.getItem('habit')) || [];
        list.forEach(activity => {
            let p = document.createElement('p');
            p.classList.add('text');
            p.textContent = activity.name;
            registredTasks.append(p);

            p = document.createElement('p');

            p.classList.add('text');
            p.classList.add('activity');
            
            if (activity.hours === "") {
                p.textContent = `${activity.minutes}min`;
                minutes = minutes + parseInt(activity.minutes);
            }

            else if (activity.minutes === "") {
                p.textContent = `${activity.hours}h `;
                hours = hours + parseInt(activity.hours);
            }

            if (activity.hours !== "" && activity.minutes !== "") {
                p.textContent = `${activity.hours}h  ${activity.minutes}min`;
                hours = hours + parseInt(activity.hours);
                minutes = minutes + parseInt(activity.minutes);
            }

            if (minutes >= 60) {
                minutes = minutes - 60
                hours++
            }

            registredTasks.append(p);

    });

    const registredTime = document.querySelector(".registred-time");
    registredTime.textContent = `${hours}h ${minutes}min registred`;

    hours = 0;
    minutes = 0;
};
};

function findVisibleSection () {
    return [...sections].find(section => !section.classList.contains('hide'));
}

headerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (sections[index].classList.contains('hide')) {
            findVisibleSection().classList.add('hide');
            sections[index].classList.remove('hide');
        };
    });
});

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

//finish the logic of when the user type nothing in either hours or minutes it counts as well

const inputHours = document.getElementById("hours-input")

inputHours.addEventListener('input', () => {
    if (inputHours.value <= 0) {
        inputHours.value = "";
    }

    else if (inputHours.value >= 24) {
        inputHours.value = 24;
    };
});

const inputMinutes = document.getElementById("minutes-input")

inputMinutes.addEventListener('input', () => {
    if (inputMinutes.value <= 0) {
        inputMinutes.value = "";
    }
    
    else if (inputMinutes.value >= 60) {
        inputMinutes.value = 60;
    };
});

loadActivity();