const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
let weekDay = date.getDay();
if (weekDay === 0) {
    weekDay += 1;
}

else if (weekDay >= 1) {
    weekDay += 1;
}

const day = date.getDate();
const calendarYear = document.querySelector(".calendar-header h2");

const headerButtons = document.querySelectorAll(".header-btn");
const sections = document.querySelectorAll(".section");

const display = document.querySelector(".chronometer-div p");

const days = document.querySelector(".days");

const tasksHeader = document.querySelector(".tasks-header p");

let id = 0;

const numberOfDaysInMonth = new Date(year, month +1 , 0).getDate();

for (let i = 1; i <= numberOfDaysInMonth + weekDay; i++) {
    const numberDay = document.createElement("span");
    
    let newDate = new Date(year, month, i);
    let monthName = newDate.toLocaleDateString('en-us', { month: 'long' });
    let weekName = newDate.toLocaleDateString('en-us', { weekday: 'long' });

    if (i === day) {
        tasksHeader.textContent = `${weekName}, ${i} ${monthName}`;
        calendarYear.textContent = `${monthName} ${year}`;
    };

    if (i <= weekDay) {
        numberDay.classList.add('spacing')
    };
    
    if (!numberDay.classList.contains('spacing')) {
        if (i === weekDay) {
            numberDay.textContent = i;
        }

        else {
            numberDay.textContent = i - weekDay;
        };
        
        numberDay.classList.add("days-boxes");
        numberDay.classList.add("text");
    };

    numberDay.addEventListener("click", () => {
        id = `${month +1}${i - weekDay}${year}`

        newDate = new Date(year, month, i - weekDay);

        loadActivity ()

        const allSpan = document.querySelectorAll(".days-boxes");

        allSpan.forEach(span => {span.classList.remove('selected')});
        numberDay.classList.add('selected');
        

        monthName = newDate.toLocaleDateString('en-us', { month: 'long' });
        weekName = newDate.toLocaleDateString('en-us', { weekday: 'long' });

        tasksHeader.textContent = `${weekName}, ${i - weekDay} ${monthName}`;
        calendarYear.textContent = `${monthName} ${year}`;


    });

    days.append(numberDay);
    
    if (i === day + weekDay) {
        numberDay.classList.add("selected");};
};

const dropdownButton = document.querySelector(".dropdown-btn");
const allDropdownButtons = document.querySelectorAll(".content button");

allDropdownButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        dropdownButton.textContent = btn.textContent;
    });
});

function saveActivity () {
    const activityNameInput = document.getElementById("activity-name-input")
    const hours = document.getElementById("hours-input");
    const minutes = document.getElementById("minutes-input")

    if (id === 0) {
        id = `${month +1}${day}${year}`
    };

    if (activityNameInput.value === "" || hours.value === "" && minutes.value === "") {
        return;
    };
    
    const activity = {
        "name": activityNameInput.value,
        "hours": hours.value,
        "minutes": minutes.value,
        "classification": dropdownButton.textContent,
        "id": id,
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
        if (id === 0) {
            id = `${month +1}${day}${year}`
        };

        const registredTasks = document.querySelector('.registred-tasks');

        registredTasks.innerHTML = '';
        
        const list = JSON.parse(localStorage.getItem('habit')) || [];

        list.find(object => {
            if (object.id === id) {
                
                let p = document.createElement('p');
                p.classList.add('text');
                p.textContent = object.name;
                registredTasks.append(p);

                p = document.createElement('p');

                p.classList.add('text');
                p.classList.add('object');
                
                if (object.hours !== "" && object.minutes !== "") {
                    p.textContent = `${object.hours}h  ${object.minutes}min`;
                    hours = hours + parseInt(object.hours);
                    minutes = minutes + parseInt(object.minutes);
                }

                else if (object.hours === "" && object.minutes === "") {
                    p.textContent = "";
                }

                else if (object.hours === "") {
                    p.textContent = `${object.minutes}min`;
                    minutes = minutes + parseInt(object.minutes);
                }

                else if (object.minutes === "") {
                    p.textContent = `${object.hours}h `;
                    hours = hours + parseInt(object.hours);
                };

                if (minutes >= 60) {
                    minutes = minutes - 60
                    hours++
                };

                registredTasks.append(p);
                };
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