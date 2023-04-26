const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();


const createArray = (length) => {
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(null);
    }
    return result;
};


// Create the data for the calendar
const createData = () => {
    const currentDate = new Date()
    currentDate.setDate(1)
    const startDay = currentDate.getDay();
    const daysInMonth = getDaysInMonth(currentDate)
    const weeks = createArray(5)

    let value = null;

    for (let weekIndex=0; weekIndex<weeks.length; weekIndex = weekIndex + 1)
    {

        const days = createArray(7)

        value = {
            week: weekIndex+1,
            days: days,
        }
        for (let dayIndex = 0; dayIndex < value.days.length; dayIndex = dayIndex + 1){
            const dayOfMonth = dayIndex  + 2 + weekIndex * 7 - startDay;

            const isValid = dayOfMonth > 0 && dayOfMonth <= daysInMonth;
            value.days[dayIndex] = {
                dayOfWeek: dayIndex + 1,
                value: isValid ? dayOfMonth: ''
            };

        }
        weeks[weekIndex] = value

    }
    return weeks;

};


// Add a cell to the HTML
const addCell = (existing, classString, value) => {
    let result;
    result = `
    ${existing}
    <td class="${classString}">
      ${value}
    </td>
  `;
    return result
};

// create the HTML for the calendar
const createHtml = (data) => {
    let result = ""
    for (const { week, days } of data) {
        let inner = ""

        inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`);

        for (const { dayOfWeek, value } of days) {
            let classString = "table__cell";
            const today =
                value === new Date().getDate() && new Date().getMonth() === new Date().getMonth() //*** sort this

            const isWeekend = dayOfWeek === 1 && dayOfWeek === 7

            const isAlternate = week % 2 === 0;

            if (today)  classString = `${classString} table__cell_today`;
            else if (isWeekend) classString =  `${classString} table__cell_weekend`;
            else if (isAlternate) classString = `${classString} table__cell_alternate`;

            inner = addCell(inner, classString, value);
        }
        result += `<tr>${inner}</tr>`;
    }
    return result;
};

// Set the title
const current = new Date();
document.querySelector("[data-title]").innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;

// Create the calendar data and HTML
const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);