import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppActions, NavigateActions} from '../../actions';
import {GenUtil} from '../../utility';
import HeaderLogo from '../../assets/images/PeerID-logo.png';
import loginIcon from '../../assets/images/loginicon.png';
import loginIconActive from '../../assets/images/loginicon_active.png';
import menuIcon from '../../assets/images/menuicon.png';

const translate = GenUtil.translate;

class Header extends Component {
  render() {
    let logButton = (
      <span onClick={ () => this.props.navigateToSignIn() } className='header__link'>
        {translate('header.login')}
      </span>
    );

    let signUpButton = (
      <span onClick={ () => this.props.navigateToSignUp() } className='header__link'>
        {translate('header.signup')}
      </span>
    );

    if (this.props.isLoggedIn) {
      logButton = (
        <span onClick={ this.props.logout } className='header__link'>
          {translate('header.logout')}
        </span>
      );

      signUpButton = null;
    }

    return (
      <>
        <div className='header' onClick={ this.props.closeLeftRightMenu }>
          <div className='header--left'>
            <img className='header--left cursor--pointer' src={ menuIcon } onClick={ this.props.navigateToDash } alt='menuIcon' />
          </div>
          <div className='header--center'>
            <img className='header__image cursor--pointer' src={ HeaderLogo } onClick={ this.props.navigateToDash } alt='Header' />
          </div>
          <div className='header--right'>
            {signUpButton}
            {logButton}
            <img
              src={ loginIcon }
              alt='avatar'
              className={ this.props.isLoggedIn  ? 'header__logo' : 'header__logo--display-none' }
              onClick={ this.props.toggleMenu }
              onMouseOver={ (e) => e.currentTarget.src = loginIconActive }
              onMouseOut={ (e) => e.currentTarget.src =  loginIcon }
            />
          </div>
        </div>
        <div className='divider-radial' />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    logout: AppActions.logout,
    navigateToDash: NavigateActions.navigateToDashboard,
    navigateToSignIn: NavigateActions.navigateToSignIn,
    navigateToSignUp: NavigateActions.navigateToSignUp
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
