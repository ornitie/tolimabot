const Promise = require('bluebird');

const LiveMatchService = module.exports;

const TwitterAPIResource = require('../resources/TwitterAPIResource');

const buildMessage = ({
  detail, time, player, team, assist,
}, activeFixture) => (
  `Minuto ${time.elapsed} en ${activeFixture.venue.city}: ${detail} de ${player.name} del equipo ${team}.${
    assist.name ? ` Asistencia de ${assist.name}` : ''}`
);

LiveMatchService.PublishNewEvents = (events, activeFixture) => Promise
  .map(events, (event) => TwitterAPIResource
    .postTweet(buildMessage(event, activeFixture)));
