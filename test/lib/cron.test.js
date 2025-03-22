import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    pastYear, pastMonth, pastDay,
    pastHour, pastMinute, futureTime
} from './time.js';
import { currDateTime } from '../../src/utils/time.ts';
import Cron from '../../src/lib/cron.ts';

// Mock getUUID()
vi.mock('../../src/utils/uuid.ts', () => ({
    __esModule: true,
    default: vi.fn(() => '12345')
}));

vi.useFakeTimers();

/**
 *  1. cron.addJob()
*/ 
describe('*** addJob ***', () => {
    let cron;
    let jobID;

    beforeEach (() => {
        cron = new Cron();
        jobID = cron.addJob('myJob1', vi.fn());
    });

    test('should add job successfully', () => {
        expect(() => cron.addJob('myJob2', vi.fn())).not.toThrow();
    });

    test('should save job metadata', () => {
        expect(() => cron.jobs.has('myJob1')).toBeTruthy();
        expect(cron.jobIDToName.has(jobID)).toBeTruthy();
    });

    test('should not allow integer as jobName', () => {
        expect(() => cron.addJob(4647, vi.fn())).toThrowError();
    });

    test('should not allow undefined jobName', () => {
        expect(() => cron.addJob(undefined, vi.fn())).toThrowError();
    });

    test('should not allow invalid job', () => {
        expect(() => cron.addJob('myjob1', 12345)).toThrowError();
    });

    test('should not allow invalid job', () => {
        expect(() => cron.addJob(myjob1, 'job-as-string')).toThrowError();
    });

    test('should throw error if one argument is missing', () => {
        expect(() => cron.addJob(myJob1)).toThrowError();
    });

    test('should throw error if both arguments are missing', () => {
        expect(() => cron.addJob()).toThrowError();
    });

    test('should not allow duplicate job name', () => {
        expect(() => cron.addJob('myJob1', vi.fn())).toThrowError();
    });
});

/**
 *  2. cron.addSchedule()
*/
describe('*** addSchedule ***', () => {
    let cron;
    let jobID;

    beforeEach (() => {
        cron = new Cron();
        jobID = cron.addJob('myjob1', vi.fn());
    });

    test('should run successfully', () => {
        expect(() => cron.addSchedule(jobID, futureTime)).not.toThrow();
    });

    test('year cannot be a past year', () => {
        expect(() => cron.addSchedule(jobID, pastYear)).toThrow();
    });
    
    test('month cannot be a past month', () => {
        expect(() => cron.addSchedule(jobID, pastMonth)).toThrow();
    });

    test('day cannot be a past day', () => {
        expect(() => cron.addSchedule(jobID, pastDay)).toThrow();
    });

    test('hour cannot be a past hour', () => {
        expect(() => cron.addSchedule(jobID, pastHour)).toThrow();
    });

    test('minute cannot be a past minute', () => {
        expect(() => cron.addSchedule(jobID, pastMinute)).toThrow();
    });

    test('should save schedule metadata', () => {
        let schID = cron.addSchedule(jobID, futureTime);
        expect(cron.schedules.has(schID)).toBeTruthy();
        expect(cron.scheduleIDToJob.has(schID)).toBeTruthy();
    });

    test('should handle schedule interval correctly', () => {
        let schID = cron.addSchedule(jobID, futureTime);
        cron.runScheduler();
        expect(cron.scheduleIntervals.has(schID)).toBeTruthy();
        cron.stopSchedule(schID);
    });
});

/**
 *  3. cron.runJob()
*/
describe('*** runJob ***', () => {
    let cron;
    let mockJob;

    beforeEach(() => {
        cron = new Cron();
        mockJob = vi.fn();
    });

    test('should execute a scheduled job at the correct time', () => {
        const time = currDateTime();
        const jobID = cron.addJob('testJob', mockJob);
        const schID = cron.addSchedule(jobID, time);

        // simulate that the execution time has arrived
        vi.spyOn(cron, 'shouldExecute').mockReturnValue(true);

        cron.runScheduler();

        // Fast forward time to trigger the interval
        vi.advanceTimersByTime(5000);

        expect(mockJob).toHaveBeenCalledTimes(1);
        expect(cron.scheduleIDToJob.has(schID)).toBeFalsy();
        expect(cron.schedules.has(schID)).toBeFalsy();
        expect(cron.scheduleIntervals.has(schID)).toBeFalsy();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.restoreAllMocks();
    });
});