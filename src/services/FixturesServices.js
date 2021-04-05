const FixturesServices = module.exports;

const moment = require('moment');
const FootballAPIResource = require('../resources/FootballAPIResource');
const FixturesRepository = require('../repositories/mongo/FixturesRepository');
const RedisClient = require('../repositories/redis/RedisClient');
const ServicesLibrary = require('./ServicesLibrary');
const { TEAM_ID, DAYS, HOURS } = require('../Settings');

const FIXTURE_TIMEOUT = DAYS * 7;
const FIXTURE_DURATION = 2 * HOURS;

FixturesServices.SaveNextFixtures = async () => {
  const rawFixtures = await FootballAPIResource.GetNextFixtures();

  const mappedFixtures = rawFixtures.map(({ fixture, teams: { home, away } }) => ({
    date: fixture.date,
    venue: fixture.venue,
    fixture_id: fixture.id,
    rival: home.id !== TEAM_ID ? home : away,
  }));

  const nextFixture = mappedFixtures
    .reduce((min, fixture) => (moment(fixture.date) < moment(min.date) ? fixture : min));

  await FixturesServices.SetNextFixture(nextFixture);

  return FixturesRepository.SaveFixtures(mappedFixtures);
};

FixturesServices.GetNextFixture = async () => {
  const fixture = await RedisClient.GetKey(ServicesLibrary.REDIS_KEYS.NEXT_FIXTURE);

  return JSON.parse(fixture);
};

FixturesServices.SetNextFixture = (nextFixture) => RedisClient
  .SetKey(ServicesLibrary.REDIS_KEYS.NEXT_FIXTURE, JSON.stringify(nextFixture), FIXTURE_TIMEOUT);

FixturesServices.CheckIfFixtureIsActive = () => RedisClient.GetKey(ServicesLibrary.REDIS_KEYS.ACTIVE_FIXTURE);

FixturesServices.SetActiveFixture = (isActive) => RedisClient
  .SetKey(ServicesLibrary.REDIS_KEYS.ACTIVE_FIXTURE, isActive, FIXTURE_DURATION);
