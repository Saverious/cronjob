let date1 = new Date();
date1.setMinutes(date1.getMinutes() - 30);  // past date
let date2 = new Date();
date2.setMinutes(date2.getMinutes() + 30);  // future date


export const pastYear = {
    year: date1.getFullYear() - 1,
    month: date1.getMonth() + 1,
    day: date1.getDate(),
    hour: date1.getHours(),
    minute: date1.getMinutes()
};

export const pastMonth = {
    year: date1.getFullYear(),
    month: (date1.getMonth() + 1) - 1,
    day: date1.getDate(),
    hour: date1.getHours(),
    minute: date1.getMinutes()
};

export const pastDay = {
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    day: date1.getDate() - 1,
    hour: date1.getHours(),
    minute: date1.getMinutes()
};

export const pastHour = {
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    day: date1.getDate(),
    hour: date1.getHours() - 1,
    minute: date1.getMinutes()
};

export const pastMinute = {
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    day: date1.getDate(),
    hour: date1.getHours(),
    minute: date1.getMinutes() - 1
};

export const futureTime = {
    year: date2.getFullYear(),
    month: date2.getMonth() + 1,
    day: date2.getDate(),
    hour: date2.getHours(),
    minute: date2.getMinutes()
};