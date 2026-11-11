const headerButtons = document.querySelectorAll(".header-btn");
const sections = document.querySelectorAll(".section");

function findVisibleSection() {
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

const date = new Date();

let year = date.getFullYear();
let month = date.getMonth();


const day = date.getDate();
const calendarYear = document.querySelector(".calendar-header h2");

const tasksHeader = document.querySelector(".tasks-header p");

let id = 0;

const days = document.querySelector(".days");

function renderCalendar() {
    let newDate = new Date(year, month, 1);

    year = newDate.getFullYear();
    month = newDate.getMonth();

    const firstDayofWeek = newDate.getDay();

    for (let i = 1; i <= firstDayofWeek; i++) {
        const blankSpace = document.createElement("span");
        blankSpace.classList.add('spacing')

        blankSpace.textContent = i;

        days.append(blankSpace);

    };

    const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

    for (let j = 1; j <= numberOfDaysInMonth; j++) {
        const dayElement = document.createElement("span");
        dayElement.classList.add('days-boxes');
        dayElement.classList.add('text');

        dayElement.textContent = j;

        days.append(dayElement);

        let dayToSelect;

        if (year === date.getFullYear() && month === date.getMonth()) {
            dayToSelect = day;
        }

        else {
            dayToSelect = 1;
        }

        let monthName = newDate.toLocaleDateString('en-us', { month: 'long' });
        let weekName = newDate.toLocaleDateString('en-us', { weekday: 'long' });

        if (dayElement.textContent === `${dayToSelect}`) {
            dayElement.classList.add('selected');
            id = `${month + 1}/${j}/${year}`

            tasksHeader.textContent = `${weekName}, ${j} ${monthName}`;
        };

        calendarYear.textContent = `${monthName} ${year}`;


        dayElement.addEventListener("click", () => {
            id = `${month + 1}/${j}/${year}`

            loadActivity()

            monthName = newDate.toLocaleDateString('en-us', { month: 'long' });
            weekName = newDate.toLocaleDateString('en-us', { weekday: 'long' });

            tasksHeader.textContent = `${weekName}, ${j} ${monthName}`;
            calendarYear.textContent = `${monthName} ${year}`;

            let selectedDay = document.querySelector('.selected');

            selectedDay.classList.remove('selected')

            dayElement.classList.add('selected');
        });
    };
};

switchbutton = document.querySelectorAll(".calendar-header-btn");

switchbutton.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0) {
            month--
        }

        else {
            month++
        };

        days.innerHTML = "";
        renderCalendar();
    });
});

const dropdownButton = document.querySelectorAll(".dropdown-btn");
const allDropdownButtons = document.querySelectorAll(".content button");

let dropdownBtnText;

dropdownButton.forEach((btn, index) => {
    dropdownBtnText = "Studying"
    btn.addEventListener('click', () => {
        if (index === 0 || index === 1) {
            allDropdownButtons.forEach(dropdownBtn => {
                dropdownBtn.addEventListener('click', () => {
                    btn.textContent = dropdownBtn.textContent;
                    dropdownBtn.textContent = dropdownBtnText;
                    dropdownBtnText = btn.textContent;
                });
            });
        };
    });
});

let activityNameInput = document.getElementById("activity-name-input");
let hoursInput = document.getElementById("hours-input");
let minutesInput = document.getElementById("minutes-input");
let hours = 0;
let minutes = 0;


function saveActivity() {
    if (activityNameInput.value === "") {
        return;
    };

    if (id === 0) {
        id = `${month + 1}/${day}/${year}`;
    };

    let hoursInputValue = null;
    let minutesInputValue = null;

    if (typeof hoursInput === "object" || typeof minutesInput === "object") {
        hoursInputValue = hoursInput.value;
        minutesInputValue = minutesInput.value;

        if (hoursInput.value === "" && minutesInput.value === "") {
            return;
        };
    }

    else if (typeof hoursInput === "string" || typeof minutes === "string") {
        hoursInputValue = hoursInput;
        minutesInputValue = minutesInput;
    };

    const activity = {
        "name": activityNameInput.value,
        "hours": hoursInputValue,
        "minutes": minutesInputValue,
        "classification": dropdownBtnText,
        "id": id,
    };

    const list = JSON.parse(localStorage.getItem('habit')) || [];

    list.push(activity);

    const jsonString = JSON.stringify(list);

    localStorage.setItem("habit", jsonString);

    hoursInput.value = "";
    minutesInput.value = "";

    activityNameInput.value = "";
    hoursInputValue = "";
    minutesInputValue = "";

    hours = 0;
    minutes = 0;

    loadActivity();
};

function loadActivity() {
    if (localStorage.getItem('habit') !== null) {
        if (id === 0) {
            id = `${month + 1}/${day}/${year}`;
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
                    hours += parseInt(object.hours);
                    minutes += parseInt(object.minutes);
                }

                else if (object.hours === "" && object.minutes === "") {
                    p.textContent = "";
                }

                else if (object.hours === "") {
                    p.textContent = `${object.minutes}min`;
                    minutes += parseInt(object.minutes);
                }

                else if (object.minutes === "") {
                    p.textContent = `${object.hours}h `;
                    hours -= parseInt(object.hours);
                };

                if (minutes >= 60) {
                    minutes -= 60;
                    hours++;
                };

                registredTasks.append(p);
            };
        });
        hours = 0;
        minutes = 0;
    };

    renderChart()
};

const addTaskOverlay = document.querySelector(".add-task-overlay");

function showAddTaks() {
    addTaskOverlay.classList.toggle('hide');
};

const inputHours = document.getElementById("hours-input");

inputHours.addEventListener('input', () => {
    if (inputHours.value <= 0) {
        inputHours.value = "";
    }

    else if (inputHours.value >= 24) {
        inputHours.value = 24;
    };
});

const inputMinutes = document.getElementById("minutes-input");

inputMinutes.addEventListener('input', () => {
    if (inputMinutes.value <= 0) {
        inputMinutes.value = "";
    }

    else if (inputMinutes.value >= 60) {
        inputMinutes.value = 60;
    };
});

//chart

function renderChart() {
    const classificationAndTimeList = JSON.parse(localStorage.getItem('habit')) || [];

    const timeOfActivity = [];

    classificationAndTimeList.forEach(object => {
        const time = Number(object.hours) * 60 + Number(object.minutes);

        const existingClassification = timeOfActivity.find(
            value => value.classification === object.classification
        );

        if (existingClassification) {
            existingClassification.minutes += time;
        } else {
            timeOfActivity.push({
                classification: object.classification,
                minutes: time
            });
        }
    });

    let totalMinutes = 0;

    classificationAndTimeList.forEach(object => {
        totalMinutes += Number(object.hours) * 60 + Number(object.minutes);
    });

    const totalTimeOfHours = Math.floor(totalMinutes / 60);
    const totalTimeOfMinutes = totalMinutes % 60;

    const registredTime = document.querySelector(".total-time");

    registredTime.textContent = `${totalTimeOfHours}h ${totalTimeOfMinutes}min`;

    const total = timeOfActivity.reduce((sum, value) => {
        return sum + value.minutes;
    }, 0);

    const percentageList = timeOfActivity.map(value => {
        return (value.minutes / total) * 100;
    });

    const chart = document.getElementById("pie");

    const obj = {
        "Studying": "#A6B4C9",
        "Working": "#DF60FA",
        "Leisure": "#2ECC71",
        "Workout": "#32B5F7"
    }

    function color(classification) {
        return obj[classification];
    };

    let gradient = [];
    let initialPercentage = 0;

    timeOfActivity.forEach((value, index) => {
        const percentage = percentageList[index];

        gradient.push(
            `${color(value.classification)} ${initialPercentage}% ${initialPercentage + percentage}%`
        );

        initialPercentage += percentage;
    });

    chart.style.background = `
    radial-gradient(#200033 40%, transparent 0 70%, #200033 0),
    conic-gradient(${gradient.join(", ")})
`;
};

//chronometer
const display = document.querySelector(".chronometer-div p");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const startButton = document.querySelector('.bi-play-fill');
const activityDropdown = document.querySelector('.buttons-container details summary');
const saveTask = document.querySelector('.buttons-container button');

function start() {
    activityNameInput = document.getElementById('chronometer-input');

    if (activityNameInput.value === "") {
        alert("You need to type the activity before starting the timer");
    }

    else {
        if (!isRunning) {
            startButton.removeEventListener('click', stop);

            startTime = Date.now() - elapsedTime;
            timer = setInterval(update, 10);
            isRunning = true;

            activityDropdown.classList.add('hide');

            saveTask.classList.remove('hide');

            startButton.classList.add('bi-pause-fill');
            startButton.classList.remove('bi-play-fill');
            startButton.addEventListener('click', stop);
        };
    };
};

startButton.addEventListener('click', start);


function stop() {
    const semnome = document.querySelector('.bi-pause-fill');
    semnome.classList.add('bi-play-fill');
    semnome.classList.remove('bi-pause-fill');

    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    const semnome = document.querySelector('.bi-pause-fill');

    if (semnome !== null) {
        semnome.classList.add('bi-play-fill');
        semnome.classList.remove('bi-pause-fill');
    };

    activityDropdown.classList.remove('hide');
    saveTask.classList.add('hide');

    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    display.textContent = "00:00:00:00";
};

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

const saveButton = document.querySelector('.buttons-container button')

saveButton.addEventListener('click', () => {
    hoursInput = parseInt(hours).toString();
    minutesInput = parseInt(minutes).toString();

    if (minutesInput !== '0') {
        reset();
        saveActivity();
    }

    else {
        alert("minimum for saving is 1 minute")
    };
});

renderCalendar();
loadActivity();