const EventsRepository = module.exports;
const { COLLECTIONS: { EVENTS } } = require('./CollectionsLibrary');
const MongoClient = require('./MongoClient');

EventsRepository.SaveEvents = async (events) => MongoClient.Execute((db) => {
  const collection = db.collection(EVENTS);

  return collection.insertMany(events);
});
