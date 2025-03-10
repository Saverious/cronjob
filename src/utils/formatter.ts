import type { Time } from '../types/types.ts';

// format time as string
export default function formattedTime (time: Time): string {
    const YY = time.year.toString();
    const MM = time.month.toString();
    const DD = time.day.toString();
    const HH = time.hour.toString();
    const MIN = time.minute.toString();

    return `${YY}:${MM}:${DD}:${HH}:${MIN}`;
}