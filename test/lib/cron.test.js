import { describe, test, expect, jest } from '@jest/globals';
import { pastTime1, pastTime2, futureTime } from './time.js';
import { currDateTime } from '../../src/utils/time.ts';
import Cron from '../../src/lib/cron.ts';

// Mock getUUID()
jest.mock('../../src/utils/uuid.ts', () => ({
    __esModule: true,
    default: jest.fn(() => '12345')
}));

jest.useFakeTimers();

/**
 *  1. cron.addJob()
*/ 
describe('*** addJob ***', () => {
    let cron;
    let jobID;

    beforeEach (() => {
        cron = new Cron();
        jobID = cron.addJob('myJob1', jest.fn());
    });

    test('should add job successfully', () => {
        expect(() => cron.addJob('myJob2', jest.fn())).not.toThrow();
    });

    test('should save job metadata', () => {
        expect(() => cron.jobs.has('myJob1')).toBeTruthy();
        expect(cron.jobIDToName.has(jobID)).toBeTruthy();
    });

    test('should not allow integer as jobName', () => {
        expect(() => cron.addJob(4647, jest.fn())).toThrowError();
    });

    test('should not allow undefined jobName', () => {
        expect(() => cron.addJob(undefined, jest.fn())).toThrowError();
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
        expect(() => cron.addJob('myJob1', jest.fn())).toThrowError();
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
        jobID = cron.addJob('myjob1', jest.fn());
    });

    test('should run successfully', () => {
        expect(() => cron.addSchedule(jobID, futureTime)).not.toThrow();
    });

    test('year cannot be a past year', () => {
        expect(() => cron.addSchedule(jobID, pastTime2)).toThrow();
    });

    test('should save schedule metadata', () => {
        let schID = cron.addSchedule(jobID, futureTime);
        expect(cron.schedules.has(schID)).toBeTruthy();
        expect(cron.scheduleIDToJob.has(schID)).toBeTruthy();
    });

    test('should flag schedule as missed', () => {
        let schID = cron.addSchedule(jobID, pastTime1);
        expect(cron.missedSchedules.has(schID)).toBeTruthy();
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
        mockJob = jest.fn();
    });

    test('should execute a scheduled job at the correct time', () => {
        const time = currDateTime();
        const jobID = cron.addJob('testJob', mockJob);
        const schID = cron.addSchedule(jobID, time);

        // simulate that the execution time has arrived
        jest.spyOn(cron, 'shouldExecute').mockReturnValue(true);

        cron.runScheduler();

        // Fast forward time to trigger the interval
        jest.advanceTimersByTime(5000);

        expect(mockJob).toHaveBeenCalledTimes(1);
        expect(cron.scheduleIDToJob.has(schID)).toBeFalsy();
        expect(cron.schedules.has(schID)).toBeFalsy();
        expect(cron.scheduleIntervals.has(schID)).toBeFalsy();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.restoreAllMocks();
    });
});

/**
 *  8. cron.jobExists()
*/

/**
 *  9. cron.jobIDExists()
*/