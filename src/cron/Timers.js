const moment = require('moment');
const { CronJob } = require('cron');
const CronLibrary = require('./CronLibrary');
const FixturesServices = require('../services/FixturesServices');
const EventsService = require('../services/EventsService');
const LiveMatchService = require('../services/LiveMatchService');

const minuteJob = new CronJob(CronLibrary.CRON_TIMERS.MINUTE_CRON, (async (onComplete) => {
  console.log(`now we at ${JSON.stringify(moment())}`);
  const nextFixture = await FixturesServices.GetNextFixture();
  const activeFixture = await FixturesServices.CheckIfFixtureIsActive();

  if (activeFixture) {
    await FixturesServices.IncreaseTimer();
    const currentFixture = await FixturesServices.GetNextFixture();
    const currentTime = await FixturesServices.GetCurrentTimer();
    const events = await EventsService.GetMatchEvents(currentFixture.fixture_id, currentTime);

    console.log(JSON.stringify(events));
    await LiveMatchService.PublishNewEvents(events, nextFixture);

    return onComplete();
  }

  if (nextFixture && moment(nextFixture.date) < moment()) {
    await EventsService.StartMatch(nextFixture);

    return onComplete();
  }

  return onComplete();
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
