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
   * Retrieves information about user's permitted apps.
   *
   * @returns {Promise} A promise that resolves to an app object.
   */
  static getPermittedApps() {
    const query = `${apiRoot}api/v1/apps/permitted`;
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
   * Deletes an app.
   *
   * @param {string} token - token to delete app.
   * @returns {Promise} A promise that resolves to an app object.
   */
  static deleteApp(token) {
    const query = `${apiRoot}api/v1/app?token=${token}`;
    return new Promise(async(resolve, reject) => {
      try{
        const response = await ApiHandler.delete(query);

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
          'Content-Type': 'application/json'
        }
      };

      try {
        response = await ApiHandler.post(query, app, headers);
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
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAppService
   */
  static joinApp(appId, redirectUri) {
    let response;
    const query = `${apiRoot}api/v1/app/join`;

    const body = {
      client_id: appId,
      redirect_uri: redirectUri
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

  /**
   * Revoke permission for an app.
   *
   * @static
   * @param {number} appId - App ID of the app to unjoin.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAppService
   */
  static revokeAppPermission(appId) {
    let response;
    const query = `${apiRoot}api/v1/app/unjoin`;

    const body = {
      app_id: appId
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

  /**
   * Send delete app email.
   *
   * @static
   * @param {number} appId - App ID of the app to unjoin.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAppService
   */
   static sendDeleteAppEmail(appId) {
    let response;
    const url = `${apiRoot}api/v1/app/delete`;

    const body = {
      app_id: appId
    };

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.post(url, querystring.stringify(body), headers);
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

  static getPermittedApps() {
    return GenUtil.dummyDataWrapper(PrivateAppService.getPermittedApps());
  }

  static createApp(app) {
    return GenUtil.dummyDataWrapper(PrivateAppService.createApp(app));
  }

  static getApp(appId) {
    return GenUtil.dummyDataWrapper(PrivateAppService.getApp(appId));
  }

  static joinApp(appId, redirectUri) {
    return GenUtil.dummyDataWrapper(PrivateAppService.joinApp(appId, redirectUri));
  }

  static deleteApp(token) {
    return GenUtil.dummyDataWrapper(PrivateAppService.deleteApp(token));
  }

  static revokeAppPermission(appId) {
    return GenUtil.dummyDataWrapper(PrivateAppService.revokeAppPermission(appId));
  }

  static sendDeleteAppEmail(appId) {
    return GenUtil.dummyDataWrapper(PrivateAppService.sendDeleteAppEmail(appId));
  }
}

export default AppService;
