import axios from 'axios';
import querystring from 'query-string';
import {Config, GenUtil} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to apps.
 *
 * @class PrivateAppService
 */
class PrivateAppService {
  /**
   * Retrieves information about user's apps.
   *
   * @returns {Promise} A promise that resolves to an app object.
   */
  static getApps() {
    const query = `${apiRoot}api/v1/apps`;
    return new Promise(async(resolve, reject) => {
      try{
        const response = await ApiHandler.get(query);

        if (response.data.status !== 200) {
          return reject(response);
        }

        return resolve(response.data.result);
      }catch(err) {
        return reject(err.response);
      }
    });
  }

  /**
   * Retrieves information about the current app.
   *
   * @param {string} appId - Id of the app.
   * @returns {Promise} A promise that resolves to an app object.
   */
  static getApp(appId) {
    const query = `${apiRoot}api/v1/app?id=${appId}`;
    return new Promise(async(resolve, reject) => {
      try{
        const response = await ApiHandler.get(query);

        if (response.data.status !== 200) {
          return reject(response);
        }

        return resolve(response.data.result);
      }catch(err) {
        return reject(err.response);
      }
    });
  }

  /**
   * Creates a new app.
   *
   * @static
   * @param {object} app - App to create.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAppService
   */
  static createApp(app) {
    let response;
    const query = `${apiRoot}api/v1/app`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(app), headers);
        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }

  /**
   * Join an app.
   *
   * @static
   * @param {number} appId - App ID of the app to join.
   * @param {string} redirectUri - The Uri to redirect to after joining the app.
   * @param {object} accountAuth - Account auth transaction.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAppService
   */
  static joinApp(appId, redirectUri, accountAuth) {
    let response;
    const query = `${apiRoot}api/v1/app/join`;

    const body = {
      client_id: appId,
      redirect_uri: redirectUri,
      custom_account_auth_trx: accountAuth
    };

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.post(query, querystring.stringify(body), headers);
        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }
}

/**
 * Handles all server calls related to apps.
 *
 * @class AppService
 */
class AppService {
  /**
   * Retrieves information about user's apps.
   *
   * @returns {Promise} A promise that resolves to a app object wrapped by dummy data wrapper.
   */
  static getApps() {
    return GenUtil.dummyDataWrapper(PrivateAppService.getApps());
  }

  static createApp(app) {
    return GenUtil.dummyDataWrapper(PrivateAppService.createApp(app));
  }

  static getApp(appId) {
    return GenUtil.dummyDataWrapper(PrivateAppService.getApp(appId));
  }

  static joinApp(appId, redirectUri, accountAuth) {
    return GenUtil.dummyDataWrapper(PrivateAppService.joinApp(appId, redirectUri, accountAuth));
  }

}

export default AppService;
