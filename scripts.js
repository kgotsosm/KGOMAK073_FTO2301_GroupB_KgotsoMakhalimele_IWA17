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

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

const createArray = (length) => {
    const result = []

    for (let i = 0; i < length; i++) {
        result.push(i)
    }

    return result
}

const createData = (current) => {
    const startDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(5);
    const days = createArray(7);
    const data = [];

    for (const weekIndex of weeks) {
        const week = {
            week: weekIndex + 1,
            days: []
        };

        for (const dayIndex of days) {
            const day = dayIndex + 1 - startDay;
            const isValid = day > 0 && day <= daysInMonth;

            week.days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : null
            });
        }

        data.push(week);
    }

    return data;
}

const addCell = (existing, classString, value) => {
    return /* html */ `
        <td ${classString}>
            ${value || ''}
        </td>
        ${existing}
    `
}

const createHtml = (data) => {
    let result = '';

    for (const week of data) {
        let inner = "";
        addCell(inner, 'table__cell table__cell_sidebar', `Week ${week.week}`);

        for (const day of week.days) {
            let classString = 'table__cell';
            const isToday = day.value === new Date().getDate();
            const isWeekend = day.dayOfWeek === 1 || day.dayOfWeek === 7;
            const isAlternate = week.week % 2 === 0;

            if (isToday) classString += ' table__cell_today';
            if (isWeekend) classString += ' table__cell_weekend';
            if (isAlternate) classString += ' table__cell_alternate';

            addCell(inner, classString, day.value);
        }

        result += `<tr>${inner}</tr>`;
    }

    return result;
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)