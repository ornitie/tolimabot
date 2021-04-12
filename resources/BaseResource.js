const axios = require('axios');

const BaseResource = module.exports;

BaseResource.basicGet = (options) => {
  const { url, caller, headers } = options;
  console.log(`Requesting ${url} by ${caller}`);

  return axios.get(url, { headers });
};
