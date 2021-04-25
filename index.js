const { existsSync } = require('fs');
const { resolve } = require('path');
const yaml = require('yamljs');
const express = require('express');
const BaseResource = require('./src/resources/TwitterAPIResource');
const Timers = require('./src/cron/Timers');
const MongoClient = require('./src/repositories/MongoClient');

const app = express();
const LOCAL = 'local';

function load(key) {
  if (process.env[key.name] === undefined) process.env[key.name] = key.value;
}

function loadFile() {
  let fileName = resolve(resolve(process.cwd()), 'env.yml');
  const localFileName = resolve(resolve(process.cwd()), 'local-env.yml');
  const { APP_ENV } = process.env;

  if (APP_ENV === LOCAL) {
    fileName = localFileName;
    console.log('Using local environment');
  }

  if (!existsSync(fileName)) return;

  const yamlFile = yaml.load(fileName);
  console.log(yamlFile);
  yamlFile.forEach((key) => load(key));
}

async function test() {
  const x = await BaseResource.postTweet('Testing some more');
  console.log(x);
}

loadFile();
Timers.start();
MongoClient.Execute(async (db) => {
  const collection = db.collection('tolimabot');
  const data = await collection.insertOne({ something: 'algo' });

  console.log('inserted data', data);
});

MongoClient.Execute(async (db) => {
  const collection = db.collection('tolimabot');
  const data = await collection.findOne();

  console.log('retrieved data', data);
});
// test();

app.listen(3000, () => {
  console.log('listening on 3000');
});
