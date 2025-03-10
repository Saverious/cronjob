import Cron from '../src/lib/cron.ts';

function add(a, b) {
    console.log(`a: ${a}\nb: ${b}`)
    console.log('sum: ', a + b)
}

function main () {
    const now = new Date()
    const time = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes() + 1
    }

    const cron = new Cron()
    const jobID = cron.addJob('add', () => add(3, 4))
    cron.addSchedule(jobID, time)
    cron.runScheduler()
}

main()