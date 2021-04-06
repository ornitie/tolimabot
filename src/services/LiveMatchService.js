const Promise = require('bluebird');

const LiveMatchService = module.exports;

const TwitterAPIResource = require('../resources/TwitterAPIResource');

LiveMatchService.PublishNewEvents = (events) => Promise
  .map(events, ({ detail }) => TwitterAPIResource
    .postTweet(`New Event: ${detail}`));
