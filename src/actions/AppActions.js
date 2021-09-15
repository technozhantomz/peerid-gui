import ActionTypes from './ActionTypes';
import {NavigateActions, AccountActions, ModalActions} from '../actions';
import {AuthService} from '../services';
import {StorageUtil, GenUtil} from '../utility';
import ModalTypes from '../constants/ModalTypes';

const translate = GenUtil.translate;

class AppPrivateActions {
  /**
   * Private Redux action creator.
   * Call to update redux and local storage with logged out user once logged out.
   *
   * @memberof AppPrivateActions
   * @returns {Action}
   */
  static logoutAction() {
    StorageUtil.remove('se-user');
    AuthService.logout();

    return {
      type: ActionTypes.ACCOUNT_LOGOUT,
      payload: {
        isLoggedin: false,
        account: null
      }
    };
  }

  /**
   * Log the user in given account name and password.
   * Updates local storage.
   * This is internal action that is used for the exposed login and signup function.
   *
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
   * @memberof AppPrivateActions
   * @returns {Dispatch}
   */
  static processLogin(account) {
    return (dispatch) => AuthService.login(account).then((fullAccount) => {
      // Save account information
      dispatch(AccountActions.setAccountAction(fullAccount));
      // Set is logged in
      dispatch(AccountActions.setIsLoggedInAction(true));
      // Persistence
      StorageUtil.set('se-user', JSON.stringify(fullAccount));
      return fullAccount;
    }).catch((e) => {
      throw e;
    });
  }

  static addAppLoadingStatus(status) {
    return {
      type: ActionTypes.APP_ADD_LOADING_STATUS,
      payload: {
        status: status
      }
    };
  }

  static resetAppLoadingStatus() {
    return {
      type: ActionTypes.APP_RESET_LOADING_STATUS,
      payload: {
        loading: ''
      }
    };
  }

  static removeLoadingStatus(status) {
    return {
      type: ActionTypes.APP_REMOVE_LOADING_STATUS,
      payload: {
        status
      }
    };
  }
}


/**
 * Public actions related to Application wide actions.
 *
 * @class AppActions
 */
class AppActions {
  /**
   * Public Redux Action Creator.
   *
   * @param {object} account - {name: String, id: String}.
   * @param {string} next - Redirect url.
   * @memberof AppActions
   * @returns {Dispatch}
   */
  static login(account, next) {
    return (dispatch) => {
      dispatch(AppPrivateActions.processLogin(account)).then(() => {
        dispatch(AppActions.setLoginError({login:''}));
        if(!next) {
          dispatch(NavigateActions.navigateToDashboard());
        } else {
          dispatch(NavigateActions.navigate(next));
        }
      }).catch((err) => {
        console.log('error in login: ' + err);

        if (err.status === 403){
          const errorTxt = err.data.error;

          if (errorTxt.includes('verify your email')) {
            dispatch(ModalActions.setModalData({
              headerText: translate('login.error'),
              subText: translate('login.verify'),
              type: 'error'
            }));
            dispatch(ModalActions.setModalType(ModalTypes.ERROR));
            dispatch(ModalActions.toggleModal());
          }
        } else {
          dispatch(AppActions.hideLoader());
          dispatch(AppActions.setLoginError(err.data.error));
        }
      });
    };
  }

  /**
   * Public Redux Action Creator.
   *
   * @static
   * @memberof AppActions
   * @returns {Dispatch}
   */
  static logout() {
    return (dispatch) => {
      dispatch(AppPrivateActions.logoutAction());
      dispatch(NavigateActions.navigateToSignIn());
    };
  }

  /**
   * Public Redux Action Creator.
   * Set error text in Login modal.
   *
   * @static
   * @param {string} text - The error string.
   * @memberof AppActions
   * @returns {Action}
   */
  static setLoginError(text) {
    return {
      type: ActionTypes.ACCOUNT_LOGIN_SET_ERROR,
      payload: {
        loginErrorText: text
      }
    };
  }

  static addAppLoadingStatus(status) {
    return (dispatch) => {
      dispatch(AppPrivateActions.addAppLoadingStatus(status));
    };
  }

  static removeLoadingStatus(status) {
    return (dispatch) => {
      dispatch(AppPrivateActions.removeLoadingStatus(status));
    };
  }

  static resetLoadingStatus() {
    return (dispatch) => {
      dispatch(AppPrivateActions.resetAppLoadingStatus());
    };
  }

  static showLoader() {
   return (dispatch) => {
     dispatch({
       type: ActionTypes.SHOW_LOADER
     })
   } 
  }

  static hideLoader() {
    return (dispatch) => {
      dispatch({
        type: ActionTypes.HIDE_LOADER
      })
    } 
   }
}

export default AppActions;
