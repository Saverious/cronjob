# cronjob
A job scheduler to define times when a task or tasks should execute

# Installation
```text
   npm install cronjob
```

# Usage
```js
    /**
     * cron.addJob      - returns jobID as string
     * cron.addSchedule - returns scheduleID as string
    */
    import Cron from '../src/lib/cron.ts'; // or use: import Cron from 'cronjob'

    function add(a, b) {
        console.log(`a: ${a}\nb: ${b}`);
        console.log('sum: ', a + b);
    }

    function main () {
        const now = new Date();
        const time = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes() + 1
        };

        const cron = new Cron({executeMissedSchedules: false});
        const jobID = cron.addJob('add', () => add(3, 4));
        cron.addSchedule(jobID, time);
        cron.runScheduler();
    }

    main();
```

# Cron class
This library exposes a class - Cron - that is used to handle the scheduling.
Cron is declared with an optional argument - {executeMissedSchedules: boolean} - that defines how
skipped tasks are handled.

```js
const cron = new Cron({executeMissedSchedules: false});
```

In this case, skipped tasks are those whose time of schedule has passed without them being executed.

```text
Passing true: The skipped task will be executed
Passing false: The skipped task will be deleted
```

If no argument is defined, the 'executeMissedSchedules' flag defaults to false. The default operation
is deletion of the skipped task.

# Methods
## Cron.addJob(__jobName__: string, func: Function)
This method defines the name of the task you want to schedule and its corresponding function.
The name must be unique.
The function returns a job id that uniquely identifies the task.

```js
const jobID = cron.addJob('add', () => add(3, 4));
```

NOTE: Multiple jobs can be defined too. For instance:

```js
// ... define cron Class
const jobID1 = cron.addJob('job1', () => add(3, 4));
const jobID2 = cron.addJob('job2', () => multiply(3, 4));
const jobID3 = cron.addJob('job3', () => subtract(3, 4));
// ... continue
```

## Cron.addSchedule(jobID: string, time: Object)
This method defines the specific time you want the task to run. The task is identified by the job id
from Cron.addJob(). This job id is passed to Cron.addSchedule() as the first parameter.

```js
const scheduleID = cron.addSchedule(jobID, time);
```

The method returns a schedule id that uniquely identifies the schedule.

NOTE: Multiple schedules can be defined for a single job. For example:

```js
// ... define cron Class and schedules(time)
cron.addSchedule(job1, time1);
cron.addSchedule(job1, time2);
cron.addSchedule(job1, time3);
// ... continue
```

## cron.runScheduler()
This method starts the scheduler. It listens for each schedule and executes each task when its 
respective scheduled time id reached.

```js
cron.runScheduler();
```