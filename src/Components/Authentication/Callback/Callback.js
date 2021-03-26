/**
 * Callback Handler on the front end for redirects initiated from the backend.
 */

import React, {Component} from 'react';
import {NavigateActions, AccountActions, ModalActions} from '../../../actions';
import {ProfileService, AuthService} from '../../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StorageUtil, GenUtil} from '../../../utility';
import {ModalTypes} from '../../../constants';

const translate = GenUtil.translate;

class Callback extends Component {
  componentDidMount() {
    this.handleCallback();
    console.log(this.props.location)
  }

  state = {
    error: ''
  };

  // Handle callback based on type passed
  handleCallback = async () => {
    const path = this.props.location;
    const query = window.location.href.substr(window.location.href.lastIndexOf('?'));
    const pathAry = path.split('/');
    let lastAccessedPage = StorageUtil.get('se-page');
    let cb = pathAry[2] ? pathAry[2] : lastAccessedPage.split('/')[1];

    try {
      switch (cb) {
        case 'confirm-email': {
          const account = await AuthService.confirmEmail(pathAry[3]);
          this.props.setAccount(account);
          this.props.setLoggedIn(true);
          StorageUtil.set('se-user', JSON.stringify(account));
          this.props.navigateToDashboard();
          break;
        }

        case 'change-email': {
          const account = await ProfileService.changeEmail(pathAry[3]);
          this.props.setAccount(account);
          this.props.setLoggedIn(true);
          this.props.navigateToDashboard();
          break;
        }

        case 'reset-password':
          this.props.navigateToPasswordReset(pathAry[3]);
          break;

        case 'permissions': {
          const response = await ProfileService.getProfile();
          this.props.setAccount(response);
          this.props.setLoggedIn(true);
          this.props.navigateToPermissions(query);
          break;
        }

        case 'login':
          break;

        default:
          const response = await ProfileService.getProfile();
          this.props.setAccount(response);
          this.props.setLoggedIn(true);
          this.props.navigateToDashboard();
          break;
      }
    }catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <div className='callback-page'>
          <div className='callback-page__content'>{this.state.error}</div>
        </div>
      </>
    );
  }

  handleError(err) {
    const errString = err.error ? err.error : err.message ? err.message : err;

    this.props.setModalData({headerText: translate('error'), subText: errString});
    this.props.setModalType(ModalTypes.ERROR);
    this.props.toggleModal();
  }
}

const mapStateToProps = (state) => ({
  location: state.getIn(['router', 'location', 'pathname']),
  query: state.getIn(['router', 'location', 'search'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setLoggedIn: AccountActions.setIsLoggedInAction,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    navigateToPasswordReset: NavigateActions.navigateToPasswordReset,
    navigateToPermissions: NavigateActions.navigateToPermissions,
    navigate: NavigateActions.navigate,
    setAccount: AccountActions.setAccountAction,
    setModalData: ModalActions.setModalData,
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Callback);

