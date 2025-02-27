import ActionTypes from '../actions/ActionTypes';
import {fromJS} from 'immutable';
import {StorageUtil, Config} from '../utility';

export const dummyState = fromJS({
  isLoggedIn: true,
  currentAccount: {
    'user': {
      'id': 10,
      'username': 'jotprabh',
      'email': 'pbsa_dev@gmail.com',
      'googleName': 'pbsa_dev',
      'facebook': 'pbsa_dev',
      'peerplaysAccountName': 'pbsa_dev'
    }
  },
  loginErrorText: ''
});

let initialState = Config.useDummy ? dummyState : fromJS({
  isLoggedIn: StorageUtil.get('se-user') ? true : false,
  currentAccount: fromJS(JSON.parse(StorageUtil.get('se-user'))),
  loginErrorText: '',
  loading: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ACCOUNT_LOGIN_SET_ERROR: {
      return state.merge({
        loginErrorText: action.payload.loginErrorText
      });
    }

    case ActionTypes.ACCOUNT_SET_IS_LOGGED_IN: {
      return state.merge({
        isLoggedIn: action.isLoggedIn
      });
    }

    case ActionTypes.ACCOUNT_SET_ACCOUNT: {
      return state.merge({
        currentAccount: action.payload.account,
        loginErrorText: ''
      });
    }

    case ActionTypes.ACCOUNT_SET_PASSWORD: {
      return state.merge({
        password: action.payload.password
      });
    }

    case ActionTypes.ACCOUNT_SET_STATISTICS: {
      return state.merge({
        statistics: action.statistics
      });
    }

    case ActionTypes.AUTH_RESET_AUTO_LOGIN_INFO: {
      return initialState;
    }

    case ActionTypes.ACCOUNT_LOGOUT: {
      return state.merge({
        isLoggedIn: action.payload.isLoggedIn,
        currentAccount: action.payload.account
      });
    }

    case ActionTypes.SHOW_LOADER: {
      return state.merge({
        loading:true
      });
    }

    case ActionTypes.HIDE_LOADER : {
      return state.merge({
        loading:false
      });
    }

    default:
      return state;
  }
};
