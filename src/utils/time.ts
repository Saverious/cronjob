import type { Time } from '../types/types.ts';
import formattedTime from './formatter.ts';

// month and names
export const monthNames = new Map<number, string>([
    [1, 'January'],
    [2, 'February'],
    [3, 'March'],
    [4, 'April'],
    [5, 'May'],
    [6, 'June'],
    [7, 'July'],
    [8, 'August'],
    [9, 'September'],
    [10, 'October'],
    [11, 'November'],
    [12, 'December']
]);

// month and no. of days
export const monthDays = new Map<number, number>([
    [1, 31],
    [2, febDays()],
    [3, 31],
    [4, 30],
    [5, 31],
    [6, 30],
    [7, 31],
    [8, 31],
    [9, 30],
    [10, 31],
    [11, 30],
    [12, 31]
]);


// get no. of days for Feb
function febDays (): number {
    const year = new Date().getFullYear();
    const days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
    return days;
}

// get current year
export function thisYear (): number {
    return new Date().getFullYear();
}

// current date and time: Object
export function currDateTime (): Time {
    const now = new Date();
        
    const time: Time = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes()
    };

    return time;
}

// current date and time: string
export function strDateTime (): string {
    const time = currDateTime();
    const timeFmt = formattedTime(time);
    return timeFmt
}