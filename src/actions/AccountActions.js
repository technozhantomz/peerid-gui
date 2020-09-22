import ActionTypes from './ActionTypes';
import {Action} from 'redux';
import {fromJS} from 'immutable';

/**
 * Public actions related to Account actions.
 *
 * @class AccountActions
 */
class AccountActions {
  /**
   * Public Redux action creator.
   * Call to update redux with a boolean to define the user as logged in or not.
   *
   * @static
   * @param {boolean} isLoggedIn - True/false.
   * @memberof AccountActions
   * @returns {Action}
   */
  static setIsLoggedInAction(isLoggedIn) {
    return {type: ActionTypes.ACCOUNT_SET_IS_LOGGED_IN, isLoggedIn};
  }

  /**
   * Public Redux action creator.
   * Call to update redux with the passed in user login & password.
   *
   * @static
   * @param {object} account - User object:
   * {
      "id": 7,
      "username": "test",
      "email": "test@email.com",
      "googleName": "",
      "youtube": "",
      "facebook": "",
      "peerplaysAccountName": "",
      "bitcoinAddress": "",
      "userType": "viewer",
      "avatar": ""
   * }.
   * @memberof AccountActions
   * @returns {Action}
   */
  static setAccountAction(account) {
    // Ensure the account data is immutable map type.
    if (typeof account === 'object') {
      account = fromJS(account);
    }

    return {
      type: ActionTypes.ACCOUNT_SET_ACCOUNT,
      payload: {
        account: account
      }
    };
  }
}

export default AccountActions;
