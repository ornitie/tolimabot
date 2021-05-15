const FixturesController = module.exports;

const FixturesServices = require('../services/FixturesServices');

FixturesController.refreshFixtures = async (req, res) => {
  console.log('this is working');
  const fixture = await FixturesServices.SaveNextFixtures();
  console.log(`Next fixture: ${JSON.stringify(fixture)}`);

  return fixture ? res.json(fixture) : res.status(404).send('Next fixture could not be found');
};
