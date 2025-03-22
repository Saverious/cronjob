import { describe, test, expect } from 'vitest';
import formatter from '../../src/utils/formatter.ts';


describe('*** time formatter ***', () => {
    test('should return YY:MM:DD:HT:MIN as string', () => {
        expect(formatter({
            year: 2025,
            month: 3,
            day: 4,
            hour: 5,
            minute: 35
        })).toBe('2025:3:4:5:35');
    });
});