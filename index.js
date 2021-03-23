const { existsSync } = require('fs');
const { resolve } = require('path');
const yaml = require('yamljs');
const express = require('express');
const BaseResource = require('./resources/TwitterAPIResource');

const app = express();

function load(key) {
  if (process.env[key.name] === undefined) process.env[key.name] = key.value;
}

function loadFile() {
  const fileName = resolve(resolve(process.cwd()), 'env.yml');

  if (!existsSync(fileName)) return;

  const yamlFile = yaml.load(fileName);
  console.log(yamlFile);
  yamlFile.forEach((key) => load(key));
}

async function test() {
  const x = await BaseResource.postTweet('Testing');
  console.log(x);
}

loadFile();

test();

app.listen(3000, () => {
  console.log('listening on 3000');
});
