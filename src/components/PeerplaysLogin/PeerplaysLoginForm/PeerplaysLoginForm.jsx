import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FormControl, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';
import {GenUtil} from '../../../utility';
import {AuthService} from '../../../services';
import {ModalTypes} from '../../../constants';

import CustomInput from '../../CustomInput';
import InfoBox from '../InformationBox';
import {InvalidIcon} from '../../../assets/images';
import {ModalActions, AccountActions, NavigateActions} from '../../../actions';

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
      errors:{
        username: null,
        password: null
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.password.length < 12) {
      this.setState({errors: {username: translate('peerplays.passwordLengthError')}});
      return;
    }

    this.setState({loading: true});

    if(this.isDisabled()){
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

    AuthService.peerplaysLogin(username).then((res) => {
      this.props.setAccount(res);
      this.props.setLoggedIn(true);
      this.props.toggleModal();
      this.handleRedirect(res);
    }).catch((err) => {
      this.setState({
        errors: {
          username: err
        }
      });
    });
  };

  handleUsernameChange = (user) => {
    this.setState({
      username: user,
      isUsernameClicked: true
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password: password,
      isPasswordClicked: true
    });
  }

  //pass in redirect url, otherwise you are returned to dashboard
  handleRedirect = () => {
    this.props.navigateToDashboard();
  };

  // show information box for 3500ms
  handleOpenInfoBox = async (e) => {
    await this.setState({
      openInfoBox: true,
      position: e.target.getBoundingClientRect()
    });

    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      this.setState({
        openInfoBox: false
      });
    }, 15000);
  };

  isUsernameValid = () => {
    return !(this.state.isUsernameClicked && this.state.username.length < 1);
  };

  getUsernameErrors = () => {
    const errorBoxUsernameValidation = [
      {errorString: 'Should not be empty', success: !(this.state.isUsernameClicked && this.state.username.length < 1)}
    ];
    return  errorBoxUsernameValidation;
  };

  isPasswordValid = () => {
    return !(this.state.isPasswordClicked && this.state.password.length < 1);
  };

  getPasswordErrors = () => {
    const errorBoxPasswordValidation = [
      {errorString: 'Should not be empty', success: !(this.state.isPasswordClicked && this.state.password.length < 1)}
    ];
    return  errorBoxPasswordValidation;
  };

  redirectToSignup = () => {
    this.props.setModalType(ModalTypes.SIGN_UP);
  };

  handleInputClick = (e) => {
    if(e.target.name==='username'){
      this.setState({
        isUsernameClicked: true
      });
    } else {
      this.setState({
        isPasswordClicked: true
      });
    }
  };

  isDisabled = () => {
    const {username, password} = this.state;
    return username.length < 1 || password < 1;
  };

  render() {
    const {classes} = this.props;
    return (
      <>
        <form className='peerplayslogin-form' onSubmit={ this.handleSubmit }>
          <div className='peerplayslogin__flex'>
            <FormControl className='peerplayslogin-form__input' required>
              <CustomInput
                name='username'
                handleClick = { this.handleInputClick }
                hasActiveGlow={ true }
                placeholder={ translate('peerplays.enterUsername') }
                handleChange={ this.handleUsernameChange }
                iconRightActive={ InvalidIcon }
                isValid={ this.isUsernameValid }
                handleRightIconClick={ this.getUsernameErrors }
                singleLength = { true }
              />
            </FormControl>

            <div className='peerplayslogin-help' onClick={ (e) => this.handleOpenInfoBox(e) }>
              ?
            </div>
            {this.state.openInfoBox ? <InfoBox position={ this.state.position } redirectToSignup={ this.redirectToSignup }/> : null}
          </div>
          <FormControl className='peerplayslogin-form__input' required>
            <CustomInput
              name='password'
              type='password'
              hasActiveGlow={ true }
              handleClick = { this.handleInputClick }
              placeholder={ translate('peerplays.enterPassword') }
              handleChange={ this.handlePasswordChange }
              iconRightActive={ InvalidIcon }
              isValid={ this.isPasswordValid }
              handleRightIconClick={ this.getPasswordErrors }
              singleLength = { true }
            />
          </FormControl>
          <div className='peerplayslogin-error'>
            {this.state.errors.username}
          </div>
          <div className='peerplayslogin__btn-container'>
            <Button disabled={ this.isDisabled() }  type='submit' classes={ {root: classes.button} }>
              Login
            </Button>
          </div>
          <span className='peerplayslogin__textlink'>
            {translate('peerplays.dontHaveAccount')}
            <span className='peerplayslogin__textlink-register' onClick={ () => this.props.goRegister() }>
              {translate('peerplays.register')}
            </span>
          </span>
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
    setLoggedIn: AccountActions.setIsLoggedInAction
  },
  dispatch
);
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PeerplaysLoginForm));
