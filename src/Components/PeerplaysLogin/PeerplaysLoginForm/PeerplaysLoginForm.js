import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GenUtil } from '../../../utility';
import { AuthService } from '../../../services';

import { ModalActions, AccountActions, NavigateActions, AppActions } from '../../../actions';
import LoadBar from '../../Spinner/LoadBar'

const translate = GenUtil.translate;

class PeerplaysLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      openInfoBox: false,
      username: '',
      password: '',
      isPasswordClicked: false,
      isUsernameClicked: false,
      position: null,
      errors: {
        username: null,
        password: null
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.password.length < 12) {
      this.setState({ errors: { username: translate('peerplays.passwordLengthError') } });
      return;
    }

    this.setState({ loading: true });
    this.setState({ errors: { username: '' } });

    if (this.isDisabled()) {
      console.warn('Login failed');

      this.setState({
        loginDisabled: true
      });

      return;
    }

    const username = {
      login: this.state.username,
      password: this.state.password
    };
    this.props.ShowLoader();

    AuthService.peerplaysLogin(username).then((res) => {
      this.props.HideLoader();
      this.props.setAccount(res);
      this.props.setLoggedIn(true);
      this.props.toggleModal();
      this.handleRedirect(res);
    }).catch((err) => {
      this.props.HideLoader();
      this.setState({
        errors: {
          username: err
        }
      });
    });
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  //pass in redirect url, otherwise you are returned to dashboard
  handleRedirect = () => {
    this.props.navigateToDashboard();
  };

  isDisabled = () => {
    const { username, password } = this.state;
    return username.length < 1 || password < 1;
  };

  render() {
    return (
      <>
        <form className='peerplayslogin-form' onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input className="form-control"
              name='username'
              placeholder={translate('peerplays.enterUsername')}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="input-group mb-4">
            <input className="form-control"
              name='password'
              type='password'
              placeholder={translate('peerplays.enterPassword')}
              onChange={this.handlePasswordChange}
            />
          </div>
          <h6 style={{ color: "red" }} className='login-form__apiTxt--error'>{this.state.errors.username}</h6>
          <LoadBar btnStatus={'loading'} btnName={'Login'} disabled={this.isDisabled()} />
          <p className='peerplayslogin__textlink' style={{color:'blue'}}>
            {translate('peerplays.dontHaveAccount')}
            <span style={{textDecoration: 'underline', cursor: "pointer"}} className='peerplayslogin__textlink-register' onClick={() => this.props.goRegister()}>
              {translate('peerplays.register')}
            </span>
          </p>
        </form>
      </>
    );
  }
}

PeerplaysLoginForm.propTypes = {
  goRegister: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal,
    setAccount: AccountActions.setAccountAction,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    setLoggedIn: AccountActions.setIsLoggedInAction,
    ShowLoader: AppActions.showLoader,
    HideLoader: AppActions.hideLoader,

  },
  dispatch
);
export default connect(
  null,
  mapDispatchToProps
)(PeerplaysLoginForm);
