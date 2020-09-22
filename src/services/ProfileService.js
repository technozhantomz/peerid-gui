import axios from 'axios';
import {Config, StorageUtil, GenUtil} from '../utility';

const ApiHandler = axios.create({withCredentials: true});

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

/**
 * Handles all server calls related to profiles.
 *
 * @class PrivateProfileService
 */
class PrivateProfileService {
  /**
   * Retrieves information on the currently logged in user's SE profile, and stores it in LS if the promise resolves without issue.
   *
   * @returns {Promise} A promise that resolves to a user profile object.
   */
  static getProfile() {
    const query = `${apiRoot}api/v1/profile`;
    return new Promise(async(resolve, reject) => {
      try{
        const response = await ApiHandler.get(query);

        if (response.data.status !== 200) {
          return reject(response);
        }

        StorageUtil.set('se-user', JSON.stringify(response.data.result));
        return resolve(response.data.result);
      }catch(err) {
        return reject(err.response);
      }
    });
  }

  /**
   * Changes the user's email.
   *
   * @static
   * @param {string} token - Token generated from the backend api.
   * @returns {Promise} - A promise that indicates success or failure.
   * @memberof PrivateAuthService
   */
  static changeEmail(token) {
    let response;
    const query = `${apiRoot}api/v1/profile/change-email/${token}`;

    return new Promise(async(resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      try {
        response = await ApiHandler.get(query, headers);

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.toString());
      }
    });
  }
}

/**
 * Handles all server calls related to profiles.
 *
 * @class ProfileService
 */
class ProfileService {
  /**
   * Retrieves information on the currently logged in user's SE profile, and stores it in LS if the promise resolves without issue.
   *
   * @returns {Promise} A promise that resolves to a user profile object wrapped by dummy data wrapper.
   */
  static getProfile() {
    return GenUtil.dummyDataWrapper(PrivateProfileService.getProfile());
  }

  static changeEmail(token) {
    return GenUtil.dummyDataWrapper(PrivateProfileService.changeEmail(token));
  }

}

export default ProfileService;
