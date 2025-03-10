import Cron from '../src/lib/cron.ts';

// task to run at a specific time
function job1 () {
    try {
        console.log('*** job1 has run ***\n')
    } catch (e) {
        throw new Error('job1()->  ', e)
    }
}

function job2 () {
    try {
        console.log('*** job2 has run ***\n')
    } catch (e) {
        throw new Error('job2()->  ', e)
    }
}

// main
function main () {
    try {
        const time1 = {
            year: 2025,
            month: 3,
            day: 9,
            hour: 21,
            minute: 43
        }

        const time2 = {
            year: 2025,
            month: 3,
            day: 9,
            hour: 21,
            minute: 39
        }

        const cron = new Cron()

        // job 1
        const job1ID = cron.addJob('job1', job1)
        cron.addSchedule(job1ID, time1)
        
        // job 2
        const job2ID = cron.addJob('job2', job2)
        cron.addSchedule(job2ID, time2)

        cron.runScheduler()
    } catch (e) {
        console.error('main()->  ', e)
    }
}

main()