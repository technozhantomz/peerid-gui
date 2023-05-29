import {version} from '../../package.json';

const isDev = process.env.NODE_ENV === 'development';
const {
  DEV_API_ROUTE,
  PRODUCTION_API_ROUTE,
  DEV_BASE_ROUTE,
  PRODUCTION_BASE_ROUTE,
  BLOCKCHAIN_USE_TESTNET,
  BLOCKCHAIN_ENDPOINTS
} = process.env;

/**
 * @namespace Config
 */
const Config = {
  /**
   * @type {boolean}
   * @memberof Config
   */
  isDev: isDev,
  /**
   * If set to true the app will use a set of dummy data. Use this when APIs are not working.
   *
   * @type {boolean}
   */
  useDummy: false,
  /**
   * The current version of the app pulled from package.json.
   *
   * @type {string}
   */
  version,
  /**
   * The root endpoint to hit for development.
   *
   * @type {string}
   * @memberof Config
   */
  devApiRoute: DEV_API_ROUTE,
  /**
   * The root endpoint to hit for production.
   *
   * @type {string}
   * @memberof Config
   */
  prodApiRoute: PRODUCTION_API_ROUTE,
  apiRoute: isDev ? DEV_API_ROUTE : PRODUCTION_API_ROUTE,
  /**
   * Toggles the requirement for authenticated routes needing a logged in user.
   *
   * @type {boolean}
   * @memberof Config
   */
  requireAuthentication: true,
  /**
   * List of platforms supported for OAuth.
   *
   * @type {string[]}
   * @memberof Config
   */
  supportedPlatforms: ['google', 'facebook', 'peerplays', 'discord'],
  /**
   * Specifies how many results are returned when calling get all users.
   *
   * @type {number}
   * @memberof Config
   */
  userSearchLimit: 1000,

  /**
   * Specifies whether testnet or mainnet endpoints are used for the Peerplays connection.
   */
  usePeerplaysTestnet: BLOCKCHAIN_USE_TESTNET === 'true',

  /**
   * Endpoints for elizabeth testnet. Used for Peerplays Global Login.
   *
   * @type {string[]}
   * @memberof Config
   */
  elizabethEndpoints: BLOCKCHAIN_ENDPOINTS.replace(' ', '').split(','),

  /**
   * Represents the base uri.
   *
   * @type {string}
   * @memberof Config
   */
  baseRoute: isDev ? DEV_BASE_ROUTE : PRODUCTION_BASE_ROUTE
};

export default Config;
