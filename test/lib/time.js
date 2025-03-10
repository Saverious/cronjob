let now = new Date();
let date1 = new Date();
date1.setMinutes(date1.getMinutes() - 30);  // past date
let date2 = new Date();
date2.setMinutes(date2.getMinutes() + 30);  // future date

// dates
export const thisDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes()
};

export const pastTime1 = {
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    day: date1.getDate(),
    hour: date1.getHours(),
    minute: date1.getMinutes()
};

export const pastTime2 = {
    year: date1.getFullYear() - 1,
    month: date1.getMonth() + 1,
    day: date1.getDate(),
    hour: date1.getHours(),
    minute: date1.getMinutes()
};

export const futureTime = {
    year: date2.getFullYear(),
    month: date2.getMonth() + 1,
    day: date2.getDate(),
    hour: date2.getHours(),
    minute: date2.getMinutes()
};