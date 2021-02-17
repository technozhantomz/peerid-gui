import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
// import DEMO from "../../../store/constant";

import { bindActionCreators } from 'redux';
import { AuthService } from '../../../services';
import { GenUtil } from '../../../utility';
import { NavigateActions } from '../../../actions';
import { connect } from 'react-redux';
import supportedEmailDomains from '../../../assets/locales/SupportedEmailDomains.txt';
import { EOL } from 'os';
import LoginFooter from '../../Login/LoginFooter';
import LoadBar from '../../Spinner/LoadBar'
import {AppActions} from '../../../actions';

const translate = GenUtil.translate;

class SignUp1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      resultText: '',
      errText: '',
      registerDisabled: true,
      isPasswordInputClicked: false,
      isConfirmPasswordConfirmed: false,
      isEmailInputClicked: false,
      resetToDefault: false,

      // Password Check
      passwordCheck: {
        passwordLengthChech: '',
        passwordDigitCheck: '',
        passwordMatch: '',
        passwordSpecialCharCheck: '',
        passwordSpaceCheck: '',
        passwordUnallowedCharCheck: '',
      },

      emailCheck: '',
      domainlCheck: '',
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

    // if (this.state.errors.email.success !== true || this.state.errors.password.success !== true || this.state.errors.confirmPassword.success !== true) {
    //   this.setState({
    //     errText: ''
    //   });
    //   return;
    // }

    const account = {
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.password
    };

    // this.setState({
    //   registerDisabled: true
    // });
    this.props.ShowLoader()

    AuthService.register(account)
      .then(() => {
        this.setState({
          errText: '',
          registerDisabled: false,
          resetToDefault: true,

          // Clear Form Data
          email: '',
          password: '',
          confirmPassword: '',
          isPasswordInputClicked: false,
          isConfirmPasswordConfirmed: false,
          isEmailInputClicked: false,
          resultText: translate('register.responses.confirmSent'),
        });
        this.props.HideLoader()
      })
      .catch((e) => {
        console.error(e);
        this.setState({
          errText: e,
          resultText: '',
          registerDisabled: false
        });
        this.props.HideLoader()
      });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    }, () => this.validate('email'));
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    }, () => this.validate('password'));
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    }, () => this.validate('confirmPassword'));
  }

  resetHandler = () => {
    this.setState({ resetToDefault: false });
  }

  emailDomain(email) {
    const regex = /\.([^.]+?)$/;
    const lineBreak = EOL;
    const acceptedDomains = supportedEmailDomains.split(lineBreak);
    const extractedDomain = regex.exec(email);
    return extractedDomain === null ? false : acceptedDomains.includes(extractedDomain[1].toUpperCase());
  }

  validate = (type) => {
    switch (type) {
      case 'email':
        const email = this.state.email;
        let regex = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
        const validEmailDomain = email.length > 0 ? this.emailDomain(email) : false;
        // Email Address check
        if (!regex.test(email)) {
          this.setState({
            emailCheck: '* Invalid email address',
            registerDisabled: true,

          })
        } else {
          this.setState({
            emailCheck: '',
          })
        }
        // Top level domain check
        if (!validEmailDomain) {
          this.setState({
            domainlCheck: '* Invalid top level domain name',
            registerDisabled: true,
          })
        } else {
          this.setState({
            domainlCheck: '',
          })
        }
        break;
      case 'password':
        const length = this.state.password.length;
        const digitRegex = /[0-9]/g;
        const specialCharRegex = /[().@$!%^*#]/g;
        const spaceRegex = /[ ]/g;
        const unallowedCharsRegex = /[&/:;<=>+?_{},'"|~`]/g;

        // Length check
        if (length >= 6 && length <= 60) {
          this.setState({
            passwordLengthChech: '',
          })
        }
        else {
          this.setState({
            passwordLengthChech: '* Password should be between 6 & 60 chars long',
            registerDisabled: true
          })
        }
        // Digit check
        if (digitRegex.test(this.state.password)) {
          this.setState({
            passwordDigitCheck: '',
          })
        }
        else {
          this.setState({
            passwordDigitCheck: '* Contains at least 1 number',
            registerDisabled: true
          })
        }
        // Special Char check
        if (specialCharRegex.test(this.state.password)) {
          this.setState({
            passwordSpecialCharCheck: '',
          })
        }
        else {
          this.setState({
            passwordSpecialCharCheck: '* Contains a special character from (.@!#$%^*#)',
            registerDisabled: true
          })
        }
        // Space check
        if (!(spaceRegex.test(this.state.password))) {
          this.setState({
            passwordSpaceCheck: '',
          })
        }
        else {
          this.setState({
            passwordSpaceCheck: '* No Spaces',
            registerDisabled: true
          })
        }
        // Unallowed Char check
        if (!(unallowedCharsRegex.test(this.state.password))) {
          this.setState({
            passwordUnallowedCharCheck: '',
          })
        }
        else {
          this.setState({
            passwordUnallowedCharCheck: '* No Unallowed special character',
            registerDisabled: true
          })
        }
        break;
      case 'confirmPassword':
        const Password = this.state.password;
        const confirmPassword = this.state.confirmPassword;

        if (Password !== confirmPassword) {
          this.setState({
            passwordMatch: '* Passwords must match',
            registerDisabled: true,

          })
        } else {
          this.setState({
            passwordMatch: '',
            registerDisabled: false,

          })
        }
        break;
      default:
    }
  };

  render() {

    return (
      <Aux>
        <Breadcrumb />
        <form onSubmit={this.handleSubmit}>
          <div className="auth-wrapper">
            <div className="auth-content">
              <div className="auth-bg">
                <span className="r" />
                <span className="r s" />
                <span className="r s" />
                <span className="r" />
              </div>
              <div className="card">
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Sign up</h3>
                  <div className="input-group mb-3">
                    <input className="form-control"
                      name='email'
                      type='email'
                      placeholder={translate('register.enterEmail')}
                      onChange={this.handleEmailChange}
                      required
                    />
                  </div>
                  <h6 style={{ color: "red" }} >{this.state.emailCheck}</h6>
                  <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.domainlCheck}</h6>

                  <div className="input-group mb-3">
                    <input className="form-control"
                      name='password'
                      type='password'
                      placeholder={translate('register.enterPassword')}
                      onChange={this.handlePasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <h6 style={{ color: "red" }} >{this.state.passwordLengthChech}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordDigitCheck}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordSpecialCharCheck}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordSpaceCheck}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordUnallowedCharCheck}</h6>
                  </div>
                  <div className="input-group mb-4">
                    <input className="form-control"
                      name='confirmPassword'
                      type='password'
                      placeholder={translate('register.confirmPassword')}
                      onChange={this.handleConfirmPasswordChange}
                      required
                    />
                  </div>
                  <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.passwordMatch}</h6>

                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      {/* <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/> */}
                      {/* <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label> */}
                    </div>
                  </div>
                  <LoadBar btnStatus={'Creating account...'} btnName={'Sign up'} disabled={ this.state.registerDisabled }/>
                  <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                  <h6 style={{ color: "green" }} className='register__apiTxt--success'>{this.state.resultText}</h6>
                  <div>
                    <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.errText}</h6>
                  </div>
                  <LoginFooter />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({ isLoggedIn: state.getIn(['account', 'isLoggedIn']) });

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigateToLogin: NavigateActions.navigateToSignIn,
    ShowLoader: AppActions.showLoader,
    HideLoader: AppActions.hideLoader
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp1);