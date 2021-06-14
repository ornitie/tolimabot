const HealthController = module.exports;
const os = require('os');
const RedisClient = require('../repositories/redis/RedisClient');
const MongoClient = require('../repositories/mongo/MongoClient');

HealthController.BasicPing = async (req, res) => {
  const redisStatus = await RedisClient.BasicPing();
  const mongoStatus = await MongoClient.Execute((db) => db.stats());

  res.send({
    redis: redisStatus,
    mongo: mongoStatus || 'DOWN',
    cpu: os.cpus(),
    free_memory: os.freemem(),
  });
};
