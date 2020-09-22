import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ProfileService} from '../../services';
import {AccountActions} from '../../actions';

class Home extends Component {
  // Redirect to dashboard, if the user is not logged in then they will go to the login page instead.
  componentDidMount() {
    ProfileService.getProfile().then((profile) => {
      this.props.setAccount(profile);
      this.props.setLoggedIn(true);
    });
  }

  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setLoggedIn: AccountActions.setIsLoggedInAction,
    setAccount: AccountActions.setAccountAction
  },
  dispatch
);

export default connect(
  null,
  mapDispatchToProps
)(Home);
