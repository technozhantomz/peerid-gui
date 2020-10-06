import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppActions, NavigateActions, ModalActions} from '../../actions';
import {ModalTypes} from '../../constants';
import LoginForm from './LoginForm';

class Login extends Component {
  openRecoverModal = () => {
    this.props.setModalType(ModalTypes.FORGOT);
    this.props.toggleModal();
  };

  render() {
    return (
      <>
        <div className='login-page'>
          <LoginForm handleLogin={ this.props.login } next={ this.props.location.search } navigateToSignUp={ this.props.navigateToSignUp } recoverModal={ this.openRecoverModal }/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    login: AppActions.login,
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal,
    navigate: NavigateActions.navigate,
    navigateToSignUp: NavigateActions.navigateToSignUp
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
