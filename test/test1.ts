import Cron from '../src/lib/cron.ts'

function job1 (): void {
    for(let i = 0; i < 5; i++){
        console.log('log ', i)
    }
}

function main () {
    try {
        const time = {
            year: 2025,
            month: 3,
            day: 9,
            hour: 21,
            minute: 20
        }

        // now: 202,536,650,000
        // set: 202,512,202,023
    
        const cron = new Cron()
        const jobID = cron.addJob('job1', job1)
        console.log('\n\njobID: ', jobID)
        const scheduleID = cron.addSchedule(jobID, time)
        console.log('scheduleID: ', scheduleID)
        cron.runScheduler()
    } catch (e) {
        console.log('main()-> ', e)
    }
}

main()