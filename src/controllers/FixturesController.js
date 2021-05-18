const FixturesController = module.exports;

const FixturesServices = require('../services/FixturesServices');

FixturesController.refreshFixtures = (req, res) => {
  console.log('this is working');
  const fixture = FixturesServices.SaveNextFixtures();
  console.log(`Next fixture: ${JSON.stringify(fixture)}`);

  return res.json(fixture);
};
