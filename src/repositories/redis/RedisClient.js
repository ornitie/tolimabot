const Redis = require('ioredis');

const RedisClient = module.exports;

function connectClient() {
  const { REDIS_PORT, REDIS_HOST } = process.env;
  const config = {
    port: REDIS_PORT,
    host: REDIS_HOST,
    maxRetriesPerRequest: 3,
  };

  return new Redis(config);
}

RedisClient.GetKey = (key) => {
  const client = connectClient();

  return client.get(key);
};

RedisClient.SetKey = (key, value, timeout = 30) => {
  const client = connectClient();

  return client.set(key, value, 'EX', timeout);
};

RedisClient.BasicPing = async () => {
  try {
    const client = connectClient();

    return client.ping().then((pong) => (pong === 'PONG' ? 'OK' : 'PING WRONG RESPONSE')).catch(() => 'CLIENT DOWN');
  } catch (error) {
    return 'CLIENT DOWN';
  }
};
