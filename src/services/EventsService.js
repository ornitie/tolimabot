const EventsService = module.exports;

const FixturesServices = require('./FixturesServices');
const TwitterAPIResource = require('../resources/TwitterAPIResource');
const FootballAPIResource = require('../resources/FootballAPIResource');
const EventsRepository = require('../repositories/mongo/EventsRepository');

EventsService.StartMatch = async (nextFixture) => {
  console.log('STARTING MATCH');
  await FixturesServices.SetActiveFixture(true);

  await TwitterAPIResource
    .postTweet(`El partido contra ${nextFixture.rival.name} en ${nextFixture.venue.city} ha comenzado`);
};

EventsService.GetMatchEvents = async (fixtureId, currentTime) => {
  console.log('GETTING MATCH EVENTS');
  const events = await FootballAPIResource.GetFixtureEvents(fixtureId);
  const intTime = parseInt(currentTime, 10);

  const mappedEvents = events
    .filter(({ time: { elapsed, extra } }) => (elapsed + (extra || 0)) >= intTime)
    .map((event) => ({ ...event, fixture: fixtureId }));

  if (mappedEvents.length > 0) {
    await EventsRepository.SaveEvents(mappedEvents);
  }

  return mappedEvents;
};
