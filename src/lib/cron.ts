import type { Time } from '../types/types.ts';
import getUUID from '../utils/uuid.ts';
import { strDateTime } from '../utils/time.ts';
import { parseJobName, parseJob, parseTime } from '../utils/parser.ts';

class Cron {
    private jobs: Map<string, Function>
    private jobIDToName: Map<string, string>
    private schedules: Map<string, string>
    private scheduleIDToJob: Map<string, string>
    private scheduleIntervals: Map<string, any>
    private executeMissedSchedules: boolean

    constructor ({executeMissedSchedules = false} = {}) {
        this.jobs = new Map();              // jobName: job()
        this.jobIDToName = new Map()        // jobID: jobName
        this.schedules = new Map();         // scheduleId: time
        this.scheduleIDToJob = new Map()    // scheduleID: jobID
        this.scheduleIntervals = new Map(); // scheduleID: interval
        this.executeMissedSchedules = executeMissedSchedules;
    }


    // initialize job
    public addJob (__jobName__: string, func: Function): string {
        const jobName = parseJobName(__jobName__);

        if(jobName === undefined)
            throw new Error('jobName is undefined');

        parseJob(func);

        if(this.jobExists(jobName))
            throw new Error(`job with name ${jobName} already exists`);

        const jobID = getUUID();
        this.jobs.set(jobName, func);
        this.jobIDToName.set(jobID, jobName);

        return jobID;
    }


    // schedule the initialized job
    public addSchedule (jobID: string, time: Time): string {
        if(!this.jobIDExists(jobID))
            throw new Error(`Job with id ${jobID} does not exist`);

        const scheduledTime = parseTime(time);
        const scheduleID = getUUID();

        if(scheduledTime === undefined)
            throw new Error('scheduledTime is undefined');

        this.schedules.set(scheduleID, scheduledTime);
        this.scheduleIDToJob.set(scheduleID, jobID);
        return scheduleID;
    }

    // run scheduled job
    private runJob (scheduleID: string): void {
        const jobID = this.scheduleIDToJob.get(scheduleID);
        if(jobID === undefined)
            throw new Error(`jobID does not exist for scheduleID ${scheduleID}`);

        const jobName = this.jobIDToName.get(jobID);
        if(jobName === undefined)
            throw new Error(`jobName does not exist for scheduleID ${scheduleID}`);

        const job = this.jobs.get(jobName);
        if(job === undefined)
            throw new Error(`job does not exist for scheduleID ${scheduleID}`);

        job();
        this.deleteSchedule(scheduleID);
    }
    

    // wait for scheduled time to reach then execute scheduled job
    public runScheduler (): void {
        if(!this.schedulesExist()){
            return;
        }

        for(let [scheduleID, scheduledTime] of this.schedules){
            const interval = setInterval(() => {
                if(this.isMissedSchedule(scheduledTime)){
                    this.handleMissedSchedule(scheduleID);
                }else{
                    if(this.shouldExecute(scheduledTime)){
                        // run job
                        this.runJob(scheduleID);
                    }
                }
            }, 5000);

            this.scheduleIntervals.set(scheduleID, interval);
        }

    }


    // stop a single shedule
    public stopSchedule (scheduleID: string): void {
        const interval = this.scheduleIntervals.get(scheduleID);
        if(interval === undefined){
            console.warn(`cannot clear interval for schedule ${scheduleID}. Missing interval ID`);
        }else{
            clearInterval(interval);
            this.scheduleIntervals.delete(scheduleID);
        }
    }


    // check for skipped schedules
    private isMissedSchedule (scheduledTime: string): boolean {
        let [curYY, curMM, curDD, curHR, curMIN] = strDateTime().split(':').map(Number);
        let [setYY, setMM, setDD, setHT, setMIN] = scheduledTime.split(':').map(Number);

        const now = new Date(curYY, curMM - 1, curDD, curHR, curMIN).getTime();
        const set = new Date(setYY, setMM - 1, setDD, setHT, setMIN).getTime();

        return now > set;
    }


    // handle missed schedule
    private handleMissedSchedule (scheduleID: string): void {
        if(!this.executeMissedSchedules){
            this.deleteSchedule(scheduleID);
            return;
        }

        this.runJob(scheduleID);
    }


    // check if scheduled time has reached (thus job should execute)
    private shouldExecute (scheduledTime: string): boolean {
        const [curYY, curMM, curDD, curHR, curMIN] = strDateTime().split(':').map(Number);
        const [setYY, setMM, setDD, setHR, setMIN] = scheduledTime.split(':').map(Number);

        return (
            curYY === setYY && 
            curMM === setMM &&
            curDD === setDD &&
            curHR === setHR &&
            curMIN === setMIN
        );
    }


    // check if a single job exists
    private jobExists (jobName: string): boolean {
        return !!this.jobs.get(jobName);
    }


    // check if jobID exists
    private jobIDExists (jobID: string): boolean {
        return !!this.jobIDToName.get(jobID);
    }


    // remove a job
    public deleteJob (jobId: string): void {
        // delete all schedules for this job
        for(let [scheduleID, job_id] of this.scheduleIDToJob){
            if(jobId === job_id)
                this.deleteSchedule(scheduleID);
        }

        const jobName = this.jobIDToName.get(jobId);
        if (jobName){
            this.jobIDToName.delete(jobId);
        }

        this.jobs.delete(jobId);
    }


    // check if there is any schedule present in map
    public schedulesExist (): boolean {
        return this.schedules.size > 0;
    }


    // remove a single schedule for a job (not the job)
    public deleteSchedule (scheduleID: string): void {
        this.scheduleIDToJob.delete(scheduleID); // unlink scheduleID from job
        this.stopSchedule(scheduleID);
        this.schedules.delete(scheduleID); // delete scheduleID
    }
}

// export for esm
export { Cron };

// export for cjs
export default Cron;