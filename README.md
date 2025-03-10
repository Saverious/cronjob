# cronjob
A scheduler with database support to define the time(s) that a task(s) should run

# Installation
```bash
   npm install cronjob
```

# Usage
## Local storage
```javascript
    /**
     * cron.addJob      - returns jobID as string
     * cron.addSchedule - returns scheduleID as string
    */
    import Cron from '../src/lib/cron.ts'; // import Cron from 'cronjob'

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
```