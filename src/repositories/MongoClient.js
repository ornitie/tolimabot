const { MongoClient } = require('mongodb');

const assert = require('assert');

const Execute = (callback) => {
  const {
    MONGO_HOST, MONGO_PORT, MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD,
  } = process.env;

  const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

  const dbName = MONGO_DB_NAME;
  const client = new MongoClient(url);

  client.connect((err) => {
    assert.ifError(err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    const response = callback(db);

    client.close();

    return response;
  });
};

module.exports = { Execute };
