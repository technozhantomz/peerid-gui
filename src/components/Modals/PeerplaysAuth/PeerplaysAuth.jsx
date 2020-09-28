import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, IconButton} from '@material-ui/core';
import {TransactionBuilder, Login} from 'peerplaysjs-lib';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';
import CustomInput from '../../CustomInput';
import {AccountActions, ModalActions, NavigateActions, PeerplaysActions} from '../../../actions';
import {GenUtil, Config} from '../../../utility';
import {RouteConstants} from '../../../constants';
import {AuthService, ProfileService, AppService} from '../../../services';
import CloseIcon from '@material-ui/icons/Close';
import {ModalTypes} from '../../../constants';

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
      this.props.setPeerplaysPassword(this.state.password);
      this.joinApp().catch((err) => {
        console.log(err);
        this.setState({loading: false});
        this.props.setModalData({headerText: translate('error'), subText: JSON.stringify(err.data.error), redirect: RouteConstants.DASHBOARD});
        this.props.setModalType(ModalTypes.ERROR);
      });
    }).catch((err) => {
      this.setState({loading: false});
      this.setState({error: err});
    });
  }

  joinApp = async () => {
    const tr = new TransactionBuilder();

    const keys = Login.generateKeys(this.state.peerplaysUsername, this.state.password,
      ['active'],
      Config.isDev ? 'TEST' : 'PPY');

    const customPermission = await ProfileService.getPermission();
    const {operations, appId, redirect_uri, state} = this.props.modalData;
    console.log(operations);

    for(let i = 0; i < operations.length; i++) {
      tr.add_type_operation('custom_account_authority_create', {
        fee: {
          amount: 0,
          asset_id: '1.3.0'
        },
        permission_id: customPermission.peerplays_permission_id,
        operation_type: operations[i],
        valid_from: Math.floor(Number(new Date())/1000),
        valid_to: Math.floor(Number(new Date())/1000) + 15000,
        owner_account: this.props.peerplaysAccountId
      });
    }

    await tr.set_required_fees();
    tr.add_signer(keys.privKeys.active, keys.pubKeys.active);
    await tr.serialize();
    await tr.finalize();
    await tr.sign();

    const accountAuth = JSON.stringify(tr.toObject());

    const code = await AppService.joinApp(appId, redirect_uri, accountAuth);
    console.log(code);
    let redirect = `${redirect_uri}?code=${code}`;

    if(state) {
      redirect = redirect + '&state=' + state;
    }

    window.open(redirect, '_self');
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <div className='peerplays-auth-wrapper'>
          <IconButton
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
                disabled={ this.props.modalData !== 'update' }
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
    peerplaysAccountId: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountId']),
    account: state.getIn(['profiles', 'currentAccount']),
    modalData: state.getIn(['modal', 'data'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData,
    setAccount: AccountActions.setAccountAction,
    setPeerplaysPassword: PeerplaysActions.setPeerplaysPassword,
    navigateToDashboard: NavigateActions.navigateToDashboard
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PeerplausAuth));
