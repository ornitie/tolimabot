const FixturesServices = module.exports;
const FootballAPIResource = require('../resources/FootballAPIResource');
const FixturesRepository = require('../repositories/mongo/FixturesRepository');

FixturesServices.SaveNextFixtures = async () => {
  const rawFixtures = await FootballAPIResource.GetNextFeatures();

  const mappedFixtures = rawFixtures.map(({ fixture }) => ({
    date: fixture.date,
  }));

  return FixturesRepository.SaveFixtures(mappedFixtures);
};
