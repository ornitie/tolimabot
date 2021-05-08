const EventsRepository = module.exports;
const { COLLECTIONS: { EVENTS } } = require('./CollectionsLibrary');
const MongoClient = require('./MongoClient');

EventsRepository.SaveEvents = (events) => MongoClient.Execute((db) => {
  const collection = db.collection(EVENTS);

  return collection.insertMany(events);
});

EventsRepository.GetEvents = async (fixtureId) => {
  MongoClient.Execute((db) => db.collection(EVENTS)).findMany({
    fixture: fixtureId,
  });
};

EventsRepository.GetLastEvent = async (fixtureId) => {
  MongoClient.Execute((db) => db.collection(EVENTS)).findOne({
    fixture: fixtureId,
  });
};
