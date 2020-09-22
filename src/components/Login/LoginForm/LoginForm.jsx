/**
 * Form that handles account creation.
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {AuthService, ProfileService} from '../../../services/';
import {GenUtil, ValidationUtil} from '../../../utility';
import CustomInput from '../../CustomInput';
import {InvalidIcon} from '../../../assets/images';
import LoginFooter from '../LoginFooter';

const translate = GenUtil.translate;

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isPasswordClicked: false,
    isUsernameClicked: false,
    errors:{
      username: null,
      password: null
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.errors.username !== null || this.state.errors.password !== null) {
      this.setState({
        loginDisabled: true
      });

      return;
    }

    const account = {
      login: this.state.username,
      password: this.state.password
    };

    this.props.handleLogin(account);
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

  logout = () => {
    AuthService.logout();
  };

  getProfile = () => {
    ProfileService.getProfile();
  };

  allowLogin = () => {
    return (this.state.errors.username === null && this.state.errors.password === null) && (this.state.username.length && this.state.password.length);
  };

  render() {
    const isDisabled = () => {
      const {username, password, errors} = this.state;
      return username.length < 1 || password < 1 || !!errors.username || !!errors.password;
    };

    const isValidUserName = () => {
      if (this.state.isUsernameClicked) {
        return ValidationUtil.emptyString(this.state.username).success;
      } else {
        return true;
      }
    };

    const rightIconClickHandler = () => {
      return  ValidationUtil.emptyString(this.state.username).errors;
    };

    return (
      <>
        <form className='login-form' onSubmit={ this.handleSubmit }>
          <span className='login-form__title'>
            {translate('login.header')}
          </span>
          <span className='login-form__subHeader'>
            {translate('login.welcome')}
          </span>
          <FormControl className='login-form__input' margin='none' required>
            <CustomInput
              name='username'
              hasActiveGlow={ true }
              placeholder={ translate('login.enterUsername') }
              handleChange={ this.handleUsernameChange }
              iconRightActive={ InvalidIcon }
              isValid={ isValidUserName }
              handleRightIconClick={ rightIconClickHandler }
            />
          </FormControl>
          <InputLabel className='login-error' shrink error={ true }>
            {this.state.errors.username}
          </InputLabel>
          <FormControl className='login-form__input' margin='none' required>
            <CustomInput
              name='password'
              type='password'
              hasActiveGlow={ true }
              placeholder={ translate('login.enterPassword') }
              handleChange={ this.handlePasswordChange }
            />
          </FormControl>
          <span className='login-form__apiTxt--error'>{this.props.errorText}</span>
          <span className='login__textlink'>
            {translate('login.dontHaveAccount')}
            <span onClick={ this.props.goRegister } className='login__textlink-register'>
              {translate('login.register')}
            </span>
          </span>
          <span className='login-forgot'>
            <span onClick={ this.props.recoverPassword } className='login-forgot__text'>
              {translate('login.forgotPass')}
            </span>
          </span>
          <div className='login__btn-container'>
            <Button disabled={ isDisabled() } className='login__btn' type='submit' style={ {color: 'white'} }>
              Login
            </Button>
          </div>
          <LoginFooter/>
        </form>
      </>
    );
  }
}

export default LoginForm;
