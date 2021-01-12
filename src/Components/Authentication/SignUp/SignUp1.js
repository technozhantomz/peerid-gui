import React from 'react';
import {NavLink} from 'react-router-dom';

// import '../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
// import DEMO from "../../../store/constant";

import {bindActionCreators} from 'redux';
import {AuthService} from '../../../services';
import {ValidationUtil, GenUtil} from '../../../utility';
import {NavigateActions} from '../../../actions';
import {connect} from 'react-redux';

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
    
        const account = {
          email: this.state.email,
          password: this.state.password,
          repeatPassword: this.state.password
        };
      
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
              isEmailInputClicked: false,
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
    
      handleEmailChange = (e) => {
        this.setState({
          email: e.target.value,
          isEmailInputClicked: true,
          errors: {
            ...this.state.errors,
            email: ValidationUtil.seEmail(this.state.email)
          }
        }, () => this.validate('email'));
      }
    
      handlePasswordChange = (e) => {
        this.setState({
          password: e.target.value,
          isPasswordInputClicked: true
        }, () => this.validate('password'));
      }
    
      handleConfirmPasswordChange = (e) => {
        this.setState({
          confirmPassword: e.target.value,
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
    
    render () {

        return(
            <Aux>
                <Breadcrumb/>
              <form onSubmit={ this.handleSubmit }>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input className="form-control" 
                                    name='email'
                                    type='email'
                                    placeholder={ translate('register.enterEmail') }
                                    onChange={ this.handleEmailChange }
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <input className="form-control" 
                                     name='password'
                                     type='password'
                                     placeholder={ translate('register.enterPassword') }
                                     onChange={ this.handlePasswordChange }
                                   />
                                </div>
                                <div className="input-group mb-4">
                                    <input className="form-control"
                                    name='confirmPassword'
                                    type='password'
                                    placeholder={ translate('register.confirmPassword') }
                                    onChange={ this.handleConfirmPasswordChange }
                                    />
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        {/* <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/> */}
                                            {/* <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label> */}
                                    </div>
                                </div>
                                <button type='submit' className="btn btn-primary shadow-2 mb-4">Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
              </form>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigateToLogin: NavigateActions.navigateToSignIn
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp1);