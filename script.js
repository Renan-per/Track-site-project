const date = new Date();
const year = date.getFullYear();
const calendarYear = document.querySelector(".calendar-header h2")
const month = date.getMonth();
const day = date.getDate();

const headerBtn = document.querySelectorAll(".header-btn")
const sections = document.querySelectorAll(".section")

const display = document.querySelector(".chronometer-div p")
const monthName = date.toLocaleDateString('en-us', { month: 'long' });
const weekName = date.toLocaleDateString('en-us', { weekday: 'long' });

calendarYear.textContent = `${monthName} ${year}`

const days = document.querySelector(".days");
const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

for (let i = 1; i <= numberOfDaysInMonth; i++) {
    const numberDay = document.createElement("span")
    numberDay.textContent = i
    numberDay.classList.add("days-boxes")
    numberDay.classList.add("text")
    days.append(numberDay)
    if (i === day) {
        numberDay.classList.add("selected")
    }
}


const qNomeDar = document.querySelector(".tasks-header p")

qNomeDar.textContent = `${weekName}, ${day} ${monthName}`

function findVisibleSection () {
    return Array.from(sections).find(section => !section.classList.contains('hide'))
}

//finish switchSection logic
function switchSection () {
    headerBtn.forEach((btn, btnIndex) => {
        btn.addEventListener('click', event => {
            if (sections[btnIndex].classList.contains('hide')) {
                findVisibleSection().classList.add('hide')
                sections[btnIndex].classList.remove('hide')
            }
           
        })
    })
}

let timer = null
let startTime = 0
let elapsedTime = 0
let isRunning = false

function start () {

    if(!isRunning) {
        startTime = Date.now() - elapsedTime
        timer = setInterval(update, 10)
        isRunning = true
    }
}

function clear () {
    timer = null
}

function update () {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
    let seconds = Math.floor(elapsedTime / 1000 % 60)
    let milliseconds = Math.floor(elapsedTime % 1000 / 10)

    hours = String(hours).padStart(2, "0")
    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")
    milliseconds = String(milliseconds).padStart(2, "0")

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`
}

const addTaskOverlay = document.querySelector(".add-task-overlay")
function showAddTaks () {
    if (addTaskOverlay.classList.contains('hide')) {
        addTaskOverlay.classList.remove('hide')
    }
    else {
        addTaskOverlay.classList.add('hide')
    }
}