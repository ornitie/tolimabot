const { existsSync } = require('fs');
const { resolve } = require('path');
const yaml = require('yamljs');

function load(key) {
  if (process.env[key.name] === undefined) process.env[key.name] = key.value;
};

const fileName = resolve(resolve(process.cwd()), `env.yml`);

if (!existsSync(fileName)) return;

const yamlFile = yaml.load(fileName);
console.log(yamlFile)
yamlFile.forEach(key => load(key));

console.log(process.env.APP_NAME)