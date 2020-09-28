import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppActions, NavigateActions} from '../../actions';
import LoginForm from './LoginForm';

class Login extends Component {

  render() {
    return (
      <>
        <div className='login-page'>
          <LoginForm handleLogin={ this.props.login } next={ this.props.location.search }/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    login: AppActions.login,
    navigate: NavigateActions.navigate
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
