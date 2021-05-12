const Promise = require('bluebird');

const LiveMatchService = module.exports;

const TwitterAPIResource = require('../resources/TwitterAPIResource');

LiveMatchService.PublishNewEvents = (events, activeFixture) => Promise
  .map(events, ({ detail, time, player }) => TwitterAPIResource
    .postTweet(`Minuto ${time.elapsed} Nuevo Evento en ${activeFixture.venue.city}: ${detail} de ${player.name}`));
