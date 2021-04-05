const EventsService = module.exports;

const FixturesServices = require('./FixturesServices');
const TwitterAPIResource = require('../resources/TwitterAPIResource');

EventsService.StartMatch = async (nextFixture) => {
  console.log('STARTING MATCH');
  await FixturesServices.SetActiveFixture(true);

  await TwitterAPIResource
    .postTweet(`El partido contra ${nextFixture.rival.name} en ${nextFixture.venue.city} ha comenzado`);
};
