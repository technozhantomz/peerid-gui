import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppActions, NavigateActions} from '../../actions';
import LoginForm from './LoginForm';
import {RouteConstants} from '../../constants';

class Login extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.navigate(RouteConstants.DASHBOARD);
    }
  }

  render() {
    return (
      <>
        <div className='login-page'>
          <LoginForm handleLogin={ this.props.login } />
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
