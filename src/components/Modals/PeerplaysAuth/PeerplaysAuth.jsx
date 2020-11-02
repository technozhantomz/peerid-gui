import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, IconButton} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';
import CustomInput from '../../CustomInput';
import {AccountActions, ModalActions, NavigateActions} from '../../../actions';
import {GenUtil} from '../../../utility';
import {AuthService} from '../../../services';
import CloseIcon from '@material-ui/icons/Close';

const translate = GenUtil.translate;

class PeerplausAuth extends Component {
  constructor(props) {
    super(props);
    const {peerplaysUsername} = props;
    this.state = {
      password: '',
      error: '',
      loading: false,
      peerplaysUsername: peerplaysUsername
    };
  }

  handlePasswordChange = (value) => {
    this.setState({password: value});
  }

  handleUsernameChange = (value) => {
    this.setState({peerplaysUsername: value});
  }

  handleSave = () => {
    if(this.state.password.length < 12) {
      this.setState({error: translate('peerplays.passwordLengthError')});
      return;
    }

    this.setState({loading: true});
    const peerplaysAccount = {
      login: this.state.peerplaysUsername,
      password: this.state.password
    };

    AuthService.peerplaysLogin(peerplaysAccount).then((account) => {
      this.props.setAccount(account);
    }).catch((err) => {
      this.setState({loading: false});
      this.setState({error: err});
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <div className='peerplays-auth-wrapper'>
          <IconButton
            classes={ {root: classes.close} }
            aria-label='Close'
            onClick={ () => {
              this.props.toggleModal();
              this.props.navigateToDashboard();
            } }
          >
            <CloseIcon />
          </IconButton>
          <p className='peerplays-auth-header'>{translate('peerplays.authenticate')}</p>
          <div>
            <div className='peerplays-auth-form__username'>
              <span className='peerplays-auth-form__label'>{translate('peerplays.username')}</span>
              <CustomInput
                name='username'
                muiInputClass='inputRegister'
                hasActiveGlow={ true }
                handleChange={ this.handleUsernameChange }
                placeholder={ 'Username' }
                value={ this.state.peerplaysUsername }
              />
            </div>
            <div className='peerplays-auth-form__password'>
              <span className='peerplays-auth-form__label'>{translate('peerplays.password')}</span>
              <CustomInput
                name='password'
                type='password'
                muiInputClass='inputRegister'
                hasActiveGlow={ true }
                placeholder={ 'Password' }
                handleChange={ this.handlePasswordChange }
                value={ this.state.password }
              />
            </div>
          </div>
          <div className='peerplays-auth-form__err'>
            <span>{this.state.error}</span>
          </div>
          <Button disabled={ this.state.loading } classes={ {root: classes.button} } onClick={ this.handleSave }>
            Submit
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    peerplaysUsername: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountName']),
    account: state.getIn(['profiles', 'currentAccount'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setAccount: AccountActions.setAccountAction,
    navigateToDashboard: NavigateActions.navigateToDashboard
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PeerplausAuth));
