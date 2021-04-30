import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppActions, NavigateActions } from '../../../../../actions';
import Aux from '../../../../../hoc/_Aux';

class NavRight extends Component {
  state = {
  };

  render() {

    return (
      <Aux>
        <ul className='navbar-nav ml-auto'>
          <li>
            <i style={{ cursor: "pointer" }} onClick={this.props.logout} className="feather icon-log-out" />
          </li>
        </ul>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    logout: AppActions.logout,
    navigateToSignIn: NavigateActions.navigateToSignIn,
    navigateToSignUp: NavigateActions.navigateToSignUp
  },
  dispatch
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavRight);
