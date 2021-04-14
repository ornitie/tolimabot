const axios = require('axios');

const BaseResource = module.exports;

BaseResource.basicGet = (options) => {
  const { url, caller, headers = {} } = options;
  console.log(`Requesting ${url} by ${caller}`);

  return axios.get(url, { headers });
};

BaseResource.basicPost = (options) => {
  const {
    url, caller, headers = {}, body = {},
  } = options;
  console.log(`Requesting ${url} by ${caller}`);

  return axios.post(url, body, { headers });
};
