import type { Time } from '../types/types.ts';
import formattedTime from './formatter.ts';
import { monthDays, monthNames, thisYear } from './time.ts';

export function parseYear (year: number) {
    if(typeof year !== 'number')
        throw new Error('Invalid input. Year must be a number');
    if(year < thisYear())
        throw new Error('Invalid input. Year cannot be a past year');

    let last = new Date().getFullYear() + 5;
    if(year > last){
        throw new Error(`Invalid year. Year should not exceed ${last}`);
    }
}

export function parseMonth (monthID: number) {
    if(typeof monthID !== 'number')
        throw new Error('Invalid input. Month must be a number');
    if(monthID < 1)
        throw new Error('Invalid input. Month cannot be a value less than 1');
    if(monthID > 12)
        throw new Error('Invalid input. Month cannot be a value greater than 12');
}

export function parseDay (monthID: number, day: number) {
    if(typeof day !== 'number')
        throw new Error('Invalid input. Day must be a number');
    if(typeof monthID !== 'number')
        throw new Error('Invalid input. Month must be a number');
    if(day < 1)
        throw new Error('Invalid input. Day must be greater than 0');
    if(day > 31)
        throw new Error('Invalid input. Day cannot be more than 31');

    const totalDays = monthDays.get(monthID);
    const monthName = monthNames.get(monthID);

    if(totalDays === undefined)
        throw new Error('Invalid input. The number of days for the month is undefined');
    if(day > totalDays)
        throw new Error(`Invalid input. Day cannot be ${day}. ${monthName} has ${totalDays} days.`);
}

export function parseHour (hour: number) {
    if(typeof hour !== 'number')
        throw new Error('Invalid input. Hour must be a number');
    if(hour < 0 || hour > 23)
        throw new Error('Invalid input. Hour must be a value from 0 to 23');
}

export function parseMinute (min: number) {
    if(typeof min !== 'number')
        throw new Error('Invalid input. Minute must be a number');
    if(min < 0 || min > 59)
        throw new Error('Invalid input. Minute must be a value from 0 to 59');
}


// sanitize user input
export function parseTime (time: Time) {
    parseYear(time.year);
    parseMonth(time.month);
    parseDay(time.month, time.day);
    parseHour(time.hour);
    parseMinute(time.minute)

    return formattedTime(time);
}

// sanitize job name
export function parseJobName (name: string) {
    if(typeof name !== 'string')
        throw new Error('job-name must be a string value, eg \'myjob\' or \'myjob123\'');

    name = name.toLowerCase().trim();
    const isValid = /^[a-z0-9]+$/.test(name);

    if(!isValid)
        throw new Error('Invalid job name. Only alphanumeric strings are allowed');

    return name;
}

// sanitize job
export function parseJob (func: Function) {
    if(typeof func !== 'function')
        throw new Error('job must be a function');
}