import type { Time } from '../types/types.ts';
import formattedTime from './formatter.ts';
import { monthDays, monthNames, thisYear, currDateTime } from './time.ts';

export function parseYear (year: number) {
    if(typeof year !== 'number')
        throw new Error('Invalid input. Year must be a number');

    if(year < thisYear())
        throw new Error('Invalid input. Year cannot be a past year');

    let finalYear = new Date().getFullYear() + 5;
    if(year > finalYear){
        throw new Error(`Invalid year. Year should not exceed ${finalYear}`);
    }
}

export function parseMonth (year: number, monthID: number) {
    if(typeof monthID !== 'number')
        throw new Error('Invalid input. Month must be a number');

    if(monthID < 1)
        throw new Error('Invalid input. Month cannot be a value less than 1');

    if(monthID > 12)
        throw new Error('Invalid input. Month cannot be a value greater than 12');

    let time = currDateTime();
    if(year === time.year) {
        if(monthID < time.month){
            throw new Error('Invalid input. Month cannot be a past month');
        }
    }

}

export function parseDay (year: number, monthID: number, day: number) {
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

    let time = currDateTime();
    if(year === time.year && monthID === time.month) {
        if(day < time.day){
            throw new Error('Invalid input. Day cannot be a past day');
        }
    }
}

export function parseHour (year: number, monthID: number, day: number, hour: number) {
    if(typeof hour !== 'number')
        throw new Error('Invalid input. Hour must be a number');

    if(hour < 0 || hour > 23)
        throw new Error('Invalid input. Hour must be a value from 0 to 23');

    let time = currDateTime();
    if(year === time.year && monthID === time.month && day === time.day) {
        if(hour < time.hour){
            throw new Error('Invalid input. Hour cannot be a past Hour');
        }
    }
}

export function parseMinute (year: number, monthID: number, day: number, hour: number, min: number) {
    if(typeof min !== 'number')
        throw new Error('Invalid input. Minute must be a number');

    if(min < 0 || min > 59)
        throw new Error('Invalid input. Minute must be a value from 0 to 59');

    let time = currDateTime();
    if(year === time.year && monthID === time.month && day === time.day && hour === time.hour) {
        if(min < time.minute){
            throw new Error('Invalid input. Minute cannot be a past Minute');
        }
    }
}


// sanitize user input
export function parseTime (time: Time) {
    parseYear(time.year);
    parseMonth(time.year, time.month);
    parseDay(time.year, time.month, time.day);
    parseHour(time.year, time.month, time.day, time.hour);
    parseMinute(time.year, time.month, time.day, time.hour, time.minute)

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