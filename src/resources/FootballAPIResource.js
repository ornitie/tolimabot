const FootballAPIResource = module.exports;

const BaseResource = require('./BaseResource');
const {
  FOOTBALL_BASE_URL,
  RAPID_HOST_HEADER,
  RAPID_KEY_HEADER,
} = require('./Constants');

const { LEAGUE_ID, TEAM_ID } = require('../Settings');

const NOT_STARTED = 'NS';
const LEAGUE_FLAG = 'league=';
const TEAM_FLAG = 'team=';
const SEASON_FLAG = 'season=';
const STATUS_FLAG = 'status=';
const FIXTURE_FLAG = 'fixture=';
const FIXTURES = '/fixtures';
const EVENTS = '/events';
const ResourceName = 'FootballAPIResource';
const CURRENT_SEASON = '2021'; // TODO

async function executeCall(url) {
  const { RAPID_HOST, RAPID_KEY } = process.env;

  const options = {
    caller: ResourceName,
    url,
    headers: {
      [RAPID_HOST_HEADER]: RAPID_HOST,
      [RAPID_KEY_HEADER]: RAPID_KEY,
    },
  };
  try {
    const { data: { response } } = await BaseResource.basicGet(options);

    return response;
  } catch (exception) {
    console.error(`Error calling ${url} with error: ${exception}`);

    return {};
  }
}

FootballAPIResource.GetNextFixtures = async () => {
  const url = `${FOOTBALL_BASE_URL + FIXTURES}?${LEAGUE_FLAG + LEAGUE_ID}`
    + `&${SEASON_FLAG + CURRENT_SEASON}&${STATUS_FLAG + NOT_STARTED}&`
    + `${TEAM_FLAG + TEAM_ID}`;

  return executeCall(url);
};

FootballAPIResource.GetFixtureEvents = async (fixtureId) => {
  const url = `${FOOTBALL_BASE_URL + FIXTURES + EVENTS}?${FIXTURE_FLAG + fixtureId}`;

  return executeCall(url);
};
