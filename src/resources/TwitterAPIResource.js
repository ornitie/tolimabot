const TwitterAPIResource = module.exports;

const crypto = require('crypto');
const oauth1a = require('oauth-1.0a');

const BaseResource = require('./BaseResource');

const STATUS_UPDATE = '/statuses/update.json?status=';
const TWITTER_BASE_URL = 'https://api.twitter.com/1.1';

function getHeader(request) {
  const {
    CONSUMER_KEY,
    CONSUMER_SECRET,
    TOKEN_KEY,
    TOKEN_SECRET,
  } = process.env;

  const oauth = oauth1a({
    consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
    signature_method: 'HMAC-SHA1',
    hash_function(base, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base)
        .digest('base64');
    },
  });

  const authorization = oauth.authorize(request, {
    key: TOKEN_KEY,
    secret: TOKEN_SECRET,
  });

  return oauth.toHeader(authorization);
}

TwitterAPIResource.postTweet = async (message) => {
  const url = `${TWITTER_BASE_URL}${STATUS_UPDATE}${message}`;

  const request = {
    url,
    method: 'POST',
  };

  const headers = getHeader(request);
  const body = {};
  const caller = 'TwitterAPIResource.postTweet';

  const response = await BaseResource.basicPost({
    url, body, headers, caller,
  }).catch((error) => {
    console.error(`Error posting tweet ${error}`);

    return {};
  });

  return response;
};
