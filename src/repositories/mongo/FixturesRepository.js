const FixturesRepository = module.exports;
const { COLLECTIONS: FIXTURES } = require('./CollectionsLibrary');
const MongoClient = require('./MongoClient');

FixturesRepository.SaveFixtures = async (fixtures) => MongoClient.Execute((db) => {
  const collection = db.collection(FIXTURES);

  return collection.insertMany(fixtures);
});
