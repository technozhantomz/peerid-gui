import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { AuthService } from '../../../services/';
import { GenUtil } from '../../../utility';

import { bindActionCreators } from 'redux';
import { AppActions, ModalActions } from '../../../actions';
import { ModalTypes } from '../../../constants';

import LoginFooter from '../../Login/LoginFooter/LoginFooter';
import LoadBar from '../../Spinner/LoadBar'
const translate = GenUtil.translate;

class SignUp1 extends React.Component {

  state = {
    username: '',
    password: '',
    isPasswordClicked: false,
    isUsernameClicked: false,
    errors: {
      username: null,
      password: null
    }
  };

  componentDidMount() {
    this.props.HideLoader()
    if (this.props.location.search) {
      this.setState({
        next: this.props.location.search.substr(6)
      });
    }
  }

  openRecoverModal = () => {
    this.props.setModalType(ModalTypes.FORGOT);
    this.props.toggleModal();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // if (this.state.errors.username !== null || this.state.errors.password !== null) {
    //   this.setState({
    //     loginDisabled: true
    //   });

    //   return;
    // }

    const account = {
      login: this.state.username,
      password: this.state.password
    };

    this.props.ShowLoader()
    this.props.login(account, this.state.next);
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
      isUsernameClicked: true
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
      isPasswordClicked: true
    });
  }

  logout = () => {
    AuthService.logout();
  };

  allowLogin = () => {
    return (this.state.errors.username === null && this.state.errors.password === null) && (this.state.username.length && this.state.password.length);
  };

  render() {

    const isDisabled = () => {
      const { username, password, errors } = this.state;
      return username.length < 1 || password < 1 || !!errors.username || !!errors.password;
    };

    const linkStyle = {
      color: "blue",
      textDecoration: 'underline',
      cursor: "pointer"
    }
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
                    <i className="feather icon-unlock auth-icon" />
                  </div>
                  <h3 className="mb-4">Login</h3>

                  <div className="input-group mb-3">
                    <input className="form-control"
                      name='username'
                      placeholder={translate('login.enterUsername')}
                      onChange={this.handleUsernameChange}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <input className="form-control"
                      name='password'
                      type='password'
                      placeholder={translate('login.enterPassword')}
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                  <LoadBar btnStatus={'loading'} btnName={'Login'} disabled={isDisabled()} />
                  <p onClick={this.openRecoverModal} style={linkStyle} >Forgot password?</p>
                  <p className="mb-0 text-muted">Don’t have an account? <NavLink style={linkStyle} to="/signup">Signup</NavLink></p>
                  <h6 style={{ color: "red" }} className='login-form__apiTxt--error'>{this.props.errorText.login}</h6>
                  <h6 style={{ color: "red" }} className='login-form__apiTxt--error'>{this.props.errorText.email}</h6>
                  {/* <LoginFooter></LoginFooter> */}
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn']),
  errorText: state.getIn(['profiles', 'loginErrorText'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    login: AppActions.login,
    ShowLoader: AppActions.showLoader,
    HideLoader: AppActions.hideLoader,
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp1);