/**
 * Password Recovery component.
 */

import React, { Component } from 'react';
import { AuthService } from '../../services';
import { GenUtil, ValidationUtil } from '../../utility';
import PropTypes from 'prop-types';
import '../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import LoadBar from '../Spinner/LoadBar'

const translate = GenUtil.translate;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      resultText: '',
      btnDisable: true,
      emailErr: '',
      successText: '',
      display: ''
    };
  }

  handleUsernameChange = (e) => {
    this.setState({
      email: e.target.value,
    }, () => this.validEmail(this.state.email));
  };

  validEmail = (username) => {
    if (ValidationUtil.seEmail(username).success) {
      this.setState({
        emailErr: '',
        btnDisable: false
      })
    } else {
      this.setState({
        emailErr: '* Invalid email address',
        btnDisable: true
      })
    }
  };


  back = () => {
    this.props.toggleModal();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.showLoader()

    this.setState({
      btnDisable: true,
      resultText: '',
      successText: ''
    });

    AuthService.forgotPassword(this.state.email)
      .then(() => {
        this.setState({
          successText: 'Your password reset email has been sent.',
          display: 'none'
        });
        this.props.hideLoader()
      })
      .catch((err) => {
        console.log(err);
        this.props.hideLoader()
        this.setState({
          btnDisable: false,
        });
        if (err.includes(429)) {
          this.setState({
            resultText: 'You have attempted to reset your password too many times, please wait before trying again.'
          });
        } else if (err.includes(404)) {
          this.setState({
            resultText: 'User Not Found'
          });
        } else if (err.includes(500)) {
          this.setState({
            resultText: 'Server Side Error'
          });
        } else {
          this.setState({
            resultText: 'Unable to proceed'
          });
        }
      });
  };

  render() {

    return (
      <Aux>
        <Breadcrumb />
        <form onSubmit={this.handleSubmit}>
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
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4" style={{ display: this.state.display }}>Forgot Your Password?</h3>
                <h6 className="mb-4" style={{ display: this.state.display }}>Enter your email to reset your PeerID password.</h6>

                <div className="input-group mb-3">
                  <input className="form-control"
                    name='email'
                    placeholder={translate('login.enterUsername')}
                    onChange={this.handleUsernameChange}
                    value={this.state.email}
                    style={{ textAlign: "center", display: this.state.display }}
                  />
                </div>
                <LoadBar style={{ display: this.state.display }} btnStatus={'Loading...'} btnName={'Reset Password'} disabled={this.state.btnDisable} />
                <h6 style={{ color: "red" }} className='login-form__apiTxt--error'>{this.state.emailErr}</h6>
                <h6 style={{ color: "red" }} className='login-form__apiTxt--error'>{this.state.resultText}</h6>
                <h4 style={{ color: "green" }} className='login-form__apiTxt--error'>{this.state.successText}</h4>
              </div>
            </div>
          </div>
        </form>
      </Aux>
    );
  }
}


ForgotPassword.propTypes = {
  goRegister: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ForgotPassword;
