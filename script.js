const date = new Date();
const year = date.getFullYear();
const calenderYear = document.querySelector(".calender-header h2")
const month = date.getMonth();
const day = date.getDate();

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

function getName (number) {
    return monthNames[number];
}

calenderYear.textContent = `${getName(month)} ${year}`

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