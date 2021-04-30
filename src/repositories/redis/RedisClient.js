const redis = require('redis');
const { promisify } = require('util');

const RedisClient = module.exports;

function connectClient() {
  const { REDIS_PORT, REDIS_HOST } = process.env;

  return redis.createClient(REDIS_PORT, REDIS_HOST);
}

RedisClient.GetKey = (key) => {
  const client = connectClient();
  const getAsync = promisify(client.get).bind(client);

  return getAsync(key);
};

RedisClient.SetKey = async (key, value, timeout = 30) => {
  const client = connectClient();
  console.log(key, value);

  return client.set(key, value, 'EX', timeout);
};
