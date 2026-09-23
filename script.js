const date = new Date();
const year = date.getFullYear();
const calendarYear = document.querySelector(".calendar-header h2")
const month = date.getMonth();
const day = date.getDate();
const dayOfWeek = date.getDay();

const headerBtn = document.querySelectorAll(".header-btn")
const sections = document.querySelectorAll(".section")

const insertP = document.querySelector(".chronometer-div p")

const monthNames = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
}

const weekNames = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

function getMonthName (number) {
    return monthNames[number];
}

calendarYear.textContent = `${getMonthName(month)} ${year}`

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

function getWeekName (number) {
    return weekNames[number];
}

const qNomeDar = document.querySelector(".tasks-header p")

qNomeDar.textContent = `${getWeekName(dayOfWeek)}, ${day} ${getMonthName(month)}`

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

let screen = insertP.textContent
let sec = 0
let min = 0
let hour = 0

//finish chronometer logic
function chronometer () {
    setInterval(() => {
        
        if (sec <= 9) {
            sec++
            insertP = "00:00:0" + sec
        }

        if (sec >= 10) {
            sec++
            insertP = "00:00:" + sec
        }

        if (sec >= 60) {
            sec = 0
            min++
            insertP = "00:" + min + ":00"
        }

        
    }, 1000 )
}