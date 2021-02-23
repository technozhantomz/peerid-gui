import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppActions, NavigateActions} from '../../../../../actions';
import {Dropdown} from 'react-bootstrap';
import Aux from '../../../../../hoc/_Aux';
import DEMO from '../../../../../store/constant';
import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';

class NavRight extends Component {
    state = {
      listOpen: false
    };

    render() {

      const {username, email, peerplaysAccountId, peerplaysAccountName } = this.props;

      return (
        <Aux>
          <ul className='navbar-nav ml-auto'>
            <li>
              <Dropdown className='drp-user'>
                <Dropdown.Toggle variant={ 'link' } id='dropdown-basic'>
                  <i className='icon feather icon-settings'/>
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight className='profile-notification'>
                  <div className='pro-head'>
                    <img src={ Avatar1 } className='img-radius' alt='User Profile'/>
                    <span>{username}</span> 
                    <a href={ DEMO.BLANK_LINK } className='dud-logout' title='Logout'>
                      <i className='feather icon-log-out'/>
                    </a>
                  </div>
                  <ul className='pro-body'>
                    <li><a href={ DEMO.BLANK_LINK } className='dropdown-item'><i className='feather icon-settings'/> Username : {username}</a></li>
                    <li><a href={ DEMO.BLANK_LINK } className='dropdown-item'><i className='feather icon-settings'/> Email ID : {email}</a></li>
                    <li><a href={ DEMO.BLANK_LINK } className='dropdown-item'><i className='feather icon-settings'/> Peerplays ID : {peerplaysAccountId}</a></li>
                    <li><a href={ DEMO.BLANK_LINK } className='dropdown-item'><i className='feather icon-settings'/> Peerplays Account Name : {peerplaysAccountName}</a></li>
                    {/* <li><a href={ DEMO.BLANK_LINK } className='dropdown-item'><i className='feather icon-user'/> AccountId</a></li> */}
                    {/* <li><a href={ DEMO.BLANK_LINK } className='dropdown-item'><i className='feather icon-mail'/> My Messages</a></li> */}
                    <li><p style={{cursor: "pointer"}} onClick={ this.props.logout } className='dropdown-item'><i className='feather icon-lock'/> Logout</p></li>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </Aux>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.getIn(['profiles', 'currentAccount', 'email']),
  username: state.getIn(['profiles', 'currentAccount', 'username']),
  peerplaysAccountName: state.getIn(['profiles','currentAccount','peerplaysAccountName']),
  peerplaysAccountId: state.getIn(['profiles','currentAccount','peerplaysAccountId'])
});

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
