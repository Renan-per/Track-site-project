const date = new Date();
const year = date.getFullYear();
const calendarYear = document.querySelector(".calendar-header h2")
const month = date.getMonth();
const day = date.getDate();
const dayOfWeek = date.getDay();

const headerBtn = document.querySelectorAll(".header-btn")
const sections = document.querySelectorAll(".section")

const calendarSection = document.querySelector(".calendar-section")
const chartSection = document.querySelector(".chart-section")
const chronometerSection = document.querySelector(".chronometer-section")


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
    sections.forEach((section, index) => {
        if (!section.classList.contains("hide")) {
        }
    })

}

//finish switchSection logic
function switchSection () {
    headerBtn.forEach((btn, index) => {
        btn.addEventListener('click', event => {
            if (index === 0 && calendarSection.classList.contains('hide') ) {
                calendarSection.classList.add('hide')
            }
            if (index === 1 && chartSection.classList.contains('hide')) {
                chartSection.classList.remove('hide')
            }

            else if (index === 2 && chronometerSection.classList.contains('hide')) {
                chronometerSection.classList.remove('hide')
            }
        })
    })
}