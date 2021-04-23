const FootballAPIResource = module.exports;

const BaseResource = require('./BaseResource');
const {
  FOOTBALL_BASE_URL,
  LEAGUE_FLAG,
  LEAGUE_ID,
  TEAM_FLAG,
  SEASON_FLAG,
  STATUS_FLAG,
  TEAM_ID,
  RAPID_HOST_HEADER,
  RAPID_KEY_HEADER,
} = require('./Constants');

const NOT_STARTED = 'NS';
const FIXTURES = '/fixtures';
const ResourceName = 'FootballAPIResource';
const CURRENT_SEASON = '2021'; // TODO

FootballAPIResource.getNextFeatures = async () => {
  const { RAPID_HOST, RAPID_KEY } = process.env;

  const options = {
    caller: ResourceName,
    url: `${FOOTBALL_BASE_URL + FIXTURES}?${LEAGUE_FLAG + LEAGUE_ID}`
    + `&${SEASON_FLAG + CURRENT_SEASON}&${STATUS_FLAG + NOT_STARTED}&`
    + `${TEAM_FLAG + TEAM_ID}`,
    headers: {
      [RAPID_HOST_HEADER]: RAPID_HOST,
      [RAPID_KEY_HEADER]: RAPID_KEY,
    },
  };

  const { data: { response } } = await BaseResource.basicGet(options);

  return response;
};
