/**
 * Form that handles account creation.
 */
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {AuthService} from '../../../services';
import {ValidationUtil, GenUtil} from '../../../utility';
import {InvalidIcon} from '../../../assets/images';
import CustomInput from '../../CustomInput';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

import styles from './MUI.css';

const translate = GenUtil.translate;

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      resultText: '',
      errText: '',
      registerDisabled: false,
      isPasswordInputClicked: false,
      isConfirmPasswordConfirmed: false,
      isEmailInputClicked: false,
      resetToDefault: false,
      errors: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
      this.setState({
        errText: translate('register.responses.errorMissing')
      });
      return;
    }

    if (this.state.errors.email.success !== true|| this.state.errors.password.success !== true || this.state.errors.confirmPassword.success !== true) {
      this.setState({
        errText: ''
      });
      return;
    }

    const account = {
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.password
    };

    this.setState({
      registerDisabled: true
    });

    AuthService.register(account)
      .then(() => {
        this.setState({
          errText: '',
          resultText: translate('register.responses.confirmSent'),
          registerDisabled: false,
          resetToDefault: true,

          // Clear Form Data
          email: '',
          password: '',
          confirmPassword: '',
          isPasswordInputClicked: false,
          isConfirmPasswordConfirmed: false,
          isEmailInputClicked: false
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({
          errText: e,
          resultText: '',
          registerDisabled: false
        });
      });
  };

  handleEmailChange = (email) => {
    this.setState({
      email: email,
      isEmailInputClicked: true,
      errors: {
        ...this.state.errors,
        email: ValidationUtil.seEmail(this.state.email)
      }
    }, () => this.validate('email'));
  }

  handlePasswordChange = (password) => {
    this.setState({
      password: password,
      isPasswordInputClicked: true
    }, () => this.validate('password'));
  }

  handleConfirmPasswordChange = (password) => {
    this.setState({
      confirmPassword: password,
      isConfirmPasswordConfirmed: true
    }, () => this.validate('confirmPassword'));
  }

  resetHandler = () => {
    this.setState({resetToDefault: false});
  }

  validate = (type) => {
    switch (type) {
      case 'email':
        this.setState({
          errors: {
            ...this.state.errors,
            email: ValidationUtil.seEmail(this.state.email)
          }
        });
        break;
      case 'password':
        this.setState({
          errors: {
            ...this.state.errors,
            password: ValidationUtil.sePassword(this.state.password),
            confirmPassword: ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword)
          }
        });
        break;
      case 'confirmPassword':
        this.setState({
          errors: {
            ...this.state.errors,
            confirmPassword: ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword)
          }
        });
        break;
      default:
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <>
        <form className='register-form' onSubmit={ this.handleSubmit }>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='email'
              type='email'
              muiInputClass='inputRegister'
              hasActiveGlow={ true }
              placeholder={ translate('register.enterEmail') }
              handleChange={ this.handleEmailChange }
              iconRightActive={ InvalidIcon }
              resetToDefault={ this.state.resetToDefault }
              resetHandler={ this.resetHandler }
              handleRightIconClick={ () => {
                return  ValidationUtil.seEmail(this.state.email).errors;
              } }
              isValid={ () => {
                if (this.state.isEmailInputClicked) {
                  return ValidationUtil.seEmail(this.state.email).success;
                } else {
                  return true;
                }
              }  }
            />
          </FormControl>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='password'
              type='password'
              muiInputClass='inputRegister'
              hasActiveGlow={ true }
              placeholder={ translate('register.enterPassword') }
              handleChange={ this.handlePasswordChange }
              iconRightActive={ InvalidIcon }
              resetToDefault={ this.state.resetToDefault }
              resetHandler={ this.resetHandler }
              handleRightIconClick={ () => {
                return  ValidationUtil.sePassword(this.state.password).errors;
              } }
              isValid={ () => {
                if (this.state.isPasswordInputClicked) {
                  return ValidationUtil.sePassword(this.state.password).success;
                } else {
                  return true;
                }
              }  }
            />
            <PasswordStrengthIndicator password = { this.state.password } error={ !ValidationUtil.sePassword(this.state.password).success }/>
          </FormControl>
          <FormControl className='register-input' margin='normal' required fullWidth>
            <CustomInput
              name='confirmPassword'
              type='password'
              muiInputClass='inputRegister'
              hasActiveGlow={ true }
              placeholder={ translate('register.confirmPassword') }
              handleChange={ this.handleConfirmPasswordChange }
              iconRightActive={ InvalidIcon }
              resetToDefault={ this.state.resetToDefault }
              resetHandler={ this.resetHandler }
              handleRightIconClick={ () => {
                return  ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword).errors;
              } }
              isValid={ () => {
                if (this.state.isConfirmPasswordConfirmed) {
                  return ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword).success;
                } else {
                  return true;
                }
              }  }
            />
          </FormControl>
          <span className='register__apiTxt--success'>{this.state.resultText}</span>
          <span className='register__apiTxt--error'>{this.state.errText}</span>
          <span className='register__requiredTxt'>All fields marked with an asterisk <span className='register__required-asterisk'>*</span> are required </span>
          <div className='register-links'>
            <span className='login-txt-link'>
              <span className='register__blue'>{translate('register.alreadyHaveAccount')}</span>
              <span className='register-form__gologin' onClick={ this.props.navigateToLogin }>
                {translate('register.login')}
              </span>
            </span>
            <span className='register__textlink'>
              <span onClick={ this.props.openRecoverModal } className='login__link'>
                {translate('login.forgotPass')}
              </span>
            </span>
          </div>
          <div className='register__btn-container'>
            <Button disabled={ this.state.registerDisabled } type='submit' classes={ {root: classes.button} } >
              Register
            </Button>
          </div>
        </form>
      </>
    );
  }
}

export default (withStyles(styles)(RegisterForm));
