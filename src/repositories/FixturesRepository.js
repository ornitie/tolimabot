const FixturesRepository = module.exports;
const { FIXTURES_COLLECTION } = require('./Constants');
const MongoClient = require('./MongoClient');

FixturesRepository.SaveFixtures = async (fixtures) => MongoClient.Execute((db) => {
  const collection = db.collection(FIXTURES_COLLECTION);

  return collection.insertMany(fixtures);
});
