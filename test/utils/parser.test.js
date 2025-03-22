import { describe, test, expect } from 'vitest';
import { parseJobName, parseJob } from '../../src/utils/parser.ts';


describe('*** parse job name ***', () => {
    test('should throw error for non-string inputs', () => {
        expect(() => parseJobName(123)).toThrowError();
        expect(() => parseJobName({name: 'jobname'})).toThrowError();
        expect(() => parseJobName(true)).toThrowError();
        expect(() => parseJobName(null)).toThrowError();
        expect(() => parseJobName(undefined)).toThrowError();
        expect(() => parseJobName(()=>console.log('jobname'))).toThrowError();
    });

    test('should throw error for invalid strings', () => {
        expect(() => parseJobName('job name')).toThrowError();
        expect(() => parseJobName('job-name')).toThrowError();
        expect(() => parseJobName('job@name')).toThrowError();
    });

    test('should return valid job names in lowercase', () => {
        expect(parseJobName('job123')).toBe('job123');
        expect(parseJobName(' jobtrim ')).toBe('jobtrim');
        expect(parseJobName('myjob')).toBe('myjob');
        expect(parseJobName('MYJOB')).toBe('myjob');
        expect(parseJobName('9876')).toBe('9876');
    });
});


describe('*** parse job ***', () => {
    test('job must be a function', () => {
        expect(() => parseJob(()=>console.log('this is a function'))).not.toThrow();
        expect(() => parseJob(function job() {})).not.toThrow();
        expect(() => parseJob(async () => {})).not.toThrow();
    });

    test('throw for non-function arguments', () => {
        expect(() => parseJob(123)).toThrow();
        expect(() => parseJob('string')).toThrow();
        expect(() => parseJob(null)).toThrow();
        expect(() => parseJob(undefined)).toThrow();
        expect(() => parseJob(true)).toThrow();
    });
});