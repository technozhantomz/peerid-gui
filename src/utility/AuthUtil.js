import Config from './Config';
import StorageUtil from './StorageUtil';

const apiRoot = Config.isDev ? Config.devApiRoute : Config.prodApiRoute;

/**
 * Auth Util functions.
 *
 * @namespace AuthUtil
 */
const AuthUtil = {
  /**
   * A wrapper for the 3rd party authentication service.
   * Handles fetching of redirect URL, all redirect activities, and storing of session.
   *
   * @param {string} platform - The platform to authenticate onauthentication is happening on - this is a workaround to only having one callback URL.
   * @param {string} page - The name of the page in which the page is redirected FROM.
   * @param {string} query - Redirect uri, client id and state.
   * NOTE: The redirect URL after success/failed auth is set on the BACKEND, it cannot be controlled from the client.
   * @memberof AuthUtil
   */
  authVia(platform, page, query) {
    const supportedPlatforms = Config.supportedPlatforms;
    StorageUtil.set('se-platform', platform);
    StorageUtil.set('se-page', page);

    if (supportedPlatforms.includes(platform.toLowerCase())) {
      let authUrl;

      switch (platform) {
        case 'google':
          authUrl = `${apiRoot}api/v1/auth/google${query}`;
          window.location.assign(authUrl);
          break;
        case 'facebook':
          authUrl = `${apiRoot}api/v1/auth/facebook${query}`;
          window.location.assign(authUrl);
          break;
        case 'discord':
          authUrl = `${apiRoot}api/v1/auth/discord${query}`;
          window.location.assign(authUrl);
          break;
        default:
          console.warn('Error');
          break;
      }
    }
  }
};

export default AuthUtil;
