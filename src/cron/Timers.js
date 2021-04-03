const moment = require('moment');
const { CronJob } = require('cron');

const job = new CronJob('*/4 * * * * *', ((onComplete) => {
  console.log(`now we at ${JSON.stringify(moment())}`);
  onComplete();
}), (() => {
  console.log('job ended');
}),
false,
'America/Bogota');

module.exports = { start: () => job.start() };
