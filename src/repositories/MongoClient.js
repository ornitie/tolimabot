const { MongoClient } = require('mongodb');

const Execute = (callback) => {
  const {
    MONGO_HOST, MONGO_PORT, MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD,
  } = process.env;

  const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

  const dbName = MONGO_DB_NAME;
  const client = new MongoClient(url, { useUnifiedTopology: true });
  client.connect();
  const db = client.db(dbName);

  return callback(db).then((response) => {
    client.close();

    return response;
  }).catch((error) => {
    console.error(`Error calling callback function ${error}`);
    client.close();
  });
};

module.exports = { Execute };
