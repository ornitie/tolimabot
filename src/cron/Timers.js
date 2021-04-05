const moment = require('moment');
const { CronJob } = require('cron');
const CronLibrary = require('./CronLibrary');

const minuteJob = new CronJob(CronLibrary.CRON_TIMERS.MINUTE_CRON, ((onComplete) => {
  console.log(`now we at ${JSON.stringify(moment())}`);
  onComplete();
}), (() => {
  console.log('job ended');
}),
false,
CronLibrary.LOCAL_TIMEZONE);

const weeklyJob = new CronJob(CronLibrary.CRON_TIMERS.WEEKLY_CRON, ((onComplete) => {
  console.log(`now we at ${JSON.stringify(moment())}`);
  onComplete();
}), (() => {
  console.log('job ended');
}),
false,
CronLibrary.LOCAL_TIMEZONE);

const Jobs = [
  minuteJob,
  weeklyJob,
];

const JobsStarter = () => {
  Jobs.map((job) => job.start());
};

module.exports = { start: JobsStarter };
