import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
// import DEMO from "../../../store/constant";

import { bindActionCreators } from 'redux';
import { AuthService, ProfileService } from '../../../services';
import { GenUtil, ValidationUtil } from '../../../utility';
import { NavigateActions, AccountActions, ModalActions } from '../../../actions';
import { connect } from 'react-redux';
import supportedEmailDomains from '../../../assets/locales/SupportedEmailDomains.txt';
import { EOL } from 'os';
import LoginFooter from '../../Login/LoginFooter';
import LoadBar from '../../Spinner/LoadBar'
import { AppActions } from '../../../actions';
import querystring from 'query-string';
import { ModalTypes } from '../../../constants';
import { toast } from 'react-toastify';

toast.configure()
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
      isPasswordInputClicked: false,
      isConfirmPasswordConfirmed: false,
      isEmailInputClicked: false,
      resetToDefault: false,
      token: '',
      passwordErr: '',
      display: '',
      resetResult: '',
      resetErr: '',
      hideFields: '',
      // Password Check
      passwordCheck: {
        passwordLengthChech: '',
        passwordDigitCheck: '',
        passwordMatch: '',
        passwordSpecialCharCheck: '',
        passwordSpaceCheck: '',
        passwordUnallowedCharCheck: '',
        passwordStringCharCheck: ''
      },

      emailCheck: '',
      errors: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  componentDidMount() {
    if (this.props.location.search) { // TODO: refactor use redux path
      const token = querystring.parse(this.props.location.search).token;

      this.setState({
        display: 'none'
      })

      if (token) {
        this.setState({
          token
        });
      }
    }
  }

  loginAndRedirect = () => {
    ProfileService.getProfile().then((profile) => {
      this.props.setAccount(profile);
      this.props.setLoggedIn(true);
      this.appSuccessAlert();
      setTimeout(() => {
      this.props.navigateToDashboard();
      }, 3000);

    }).catch((err) => {
      if (err.status === 401) {
        this.props.setModalType(ModalTypes.ERROR);
        this.props.setModalData({
          headerText: translate('errors.loggedOut')
        });
        this.props.toggleModal();
      }
    });
  }

  // Toast alert for reset password 
  appSuccessAlert() {
      toast.success('Password reset successfully!')
  }

  // Form validations
  validateForm = () => {
    if (this.props.location.search) {
      return this.validatePassword()
        && this.state.password === this.state.confirmPassword
    } else {
      return this.validatePassword()
        && this.state.email && ValidationUtil.seEmail(this.state.email).success
        && this.state.password === this.state.confirmPassword
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.location.search) {

      // if (!this.state.passwordErr.success) {
      //   return;
      // }
      this.props.ShowLoader()

      this.setState({
        resetErr: ''
      })

      AuthService.resetPassword(this.state.token, this.state.password)
        .then(() => {
          this.loginAndRedirect();
          this.props.HideLoader()

        })
        .catch((err) => {
          this.setState({
            resetErr: translate('forgotPassword.resetForm.expired'),
            hideFields: 'none'
          });
          this.props.HideLoader()
          console.error(err);
        });

    } else {

      if (this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
        this.setState({
          errText: translate('register.responses.errorMissing')
        });
        return;
      }

      const account = {
        email: this.state.email,
        password: this.state.password,
        repeatPassword: this.state.password
      };

      this.props.ShowLoader()

      AuthService.register(account)
        .then(() => {
          // Clear Form Data
          this.form.reset()

          this.setState({
            errText: '',
            resetToDefault: true,

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
          });
          this.props.HideLoader()
        });
    }
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

  emailDomain(email) {
    const regex = /\.([^.]+?)$/;
    const lineBreak = EOL;
    const acceptedDomains = supportedEmailDomains.split(lineBreak);
    const extractedDomain = regex.exec(email);
    return extractedDomain === null ? false : acceptedDomains.includes(extractedDomain[1].toUpperCase());
  }

  validatePassword = () => {
    const passLength = this.state.password.length;
    const digitRegex = /[0-9]/g;
    const specialCharRegex = /[().@$!%^*#]/g;
    const spaceRegex = /[ ]/g;
    const unallowedCharsRegex = /[&/:;<=>+?_{},'"|~`]/g;
    const stringRegex = /[a-zA-Z]/g;

    return passLength >= 6 && passLength <= 60
      && digitRegex.test(this.state.password)
      && specialCharRegex.test(this.state.password)
      && !(spaceRegex.test(this.state.password))
      && !(unallowedCharsRegex.test(this.state.password))
      && (stringRegex.test(this.state.password))
  }

  validate = (type) => {
    switch (type) {
      case 'email':
        const email = this.state.email;
        let regex = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
        const validEmailDomain = email.length > 0 ? this.emailDomain(email) : false;
        // Email Address check
        if (!regex.test(email) || !validEmailDomain) {
          this.setState({
            emailCheck: '* Invalid email address & domain name',
          })
        } else {
          this.setState({
            emailCheck: '',
          })
        }
        break;
      case 'password':
        const length = this.state.password.length;
        const digitRegex = /[0-9]/g;
        const specialCharRegex = /[().@$!%^*#]/g;
        const spaceRegex = /[ ]/g;
        const unallowedCharsRegex = /[&/:;<=>+?_{},'"|~`]/g;
        const stringRegex = /[a-zA-Z]/g;
        // Length check
        if (length >= 6 && length <= 60) {
          this.setState({
            passwordLengthChech: '',
          })
        }
        else {
          this.setState({
            passwordLengthChech: '* Password should be between 6 & 60 chars long',
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
          })
        }
        // Char check
        if ((stringRegex.test(this.state.password))) {
          this.setState({
            passwordStringCharCheck: '',
          })
        }
        else {
          this.setState({
            passwordStringCharCheck: '* Atleast one letter',
          })
        }
        // Password match check
        if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== '') {
          this.setState({
            passwordMatch: '* Passwords must match',
          })
        } else {
          this.setState({
            passwordMatch: '',
          })
        }
        break;
      case 'confirmPassword':
        const Password = this.state.password;
        const confirmPassword = this.state.confirmPassword;

        if (Password !== confirmPassword) {
          this.setState({
            passwordMatch: '* Passwords must match',
          })
        } else {
          this.setState({
            passwordMatch: '',
          })
        }
        break;
      default:
    }
  };

  render() {

    const linkStyle = {
      color: "blue",
      textDecoration: 'underline'
    }

    return (
      <Aux>
        <Breadcrumb />
        <form onSubmit={this.handleSubmit} ref={form => this.form = form}>
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
                  <h3 className="mb-4">{this.props.location.search ? 'Reset Password' : 'Sign Up'}</h3>
                  <div className="input-group mb-3">
                    <input className="form-control"
                      name='email'
                      type='email'
                      placeholder={translate('register.enterEmail')}
                      onChange={this.handleEmailChange}
                      style={{ display: this.state.display }}
                    />
                  </div>
                  <h6 style={{ color: "red" }} >{this.state.emailCheck}</h6>

                  <div className="input-group mb-3">
                    <input className="form-control"
                      name='password'
                      type='password'
                      placeholder={translate('register.enterPassword')}
                      onChange={this.handlePasswordChange}
                      required
                      style={{ display: this.state.hideFields }}
                    />
                  </div>
                  <div>
                    <h6 style={{ color: "red" }} >{this.state.passwordLengthChech}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordDigitCheck}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordSpecialCharCheck}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordSpaceCheck}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordUnallowedCharCheck}</h6>
                    <h6 style={{ color: "red" }} >{this.state.passwordStringCharCheck}</h6>
                  </div>
                  <div className="input-group mb-4">
                    <input className="form-control"
                      name='confirmPassword'
                      type='password'
                      placeholder={translate('register.confirmPassword')}
                      onChange={this.handleConfirmPasswordChange}
                      style={{ display: this.state.hideFields }}
                      required
                    />
                  </div>
                  <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.passwordMatch}</h6>

                  <LoadBar btnStatus={this.props.location.search ? 'Loading...' : 'Creating account...'} btnName={this.props.location.search ? 'Reset Password' : 'Sign Up'}
                    style={{ display: this.state.hideFields }}
                    disabled={!this.validateForm()} />
                    
                  <p className="mb-0 text-muted" style={{ display: this.state.display }}>Already have an account? <NavLink style={linkStyle} to="/auth/signin-1">Login</NavLink></p>
                  <h6 style={{ color: "green" }} className='register__apiTxt--success'>{this.state.resultText}</h6>
                  <div>
                    <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.errText}</h6>
                    <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.resetErr}</h6>
                  </div>
                  <div>
                    {!this.props.location.search ? <LoginFooter /> : ''}
                  </div>
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
    HideLoader: AppActions.hideLoader,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    setAccount: AccountActions.setAccountAction,
    setLoggedIn: AccountActions.setIsLoggedInAction,
    setModalData: ModalActions.setModalData,
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp1);