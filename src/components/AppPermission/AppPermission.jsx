import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import querystring from 'query-string';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ModalActions, NavigateActions} from '../../actions';
import peerplaysImg2X from '../../assets/images/menuicon.png';
import {AppService} from '../../services';
import {ChainTypes} from 'peerplaysjs-lib';
import {ModalTypes, RouteConstants} from '../../constants';
import {GenUtil} from '../../utility';
import styles from './MUI.css';
import psl from 'psl';

const translate = GenUtil.translate;

class AppPermission extends Component {
  state = {
    appId:'',
    appName: '',
    description: '',
    organizationName: '',
    country: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    email: '',
    domains: '',
    operations: [],
    operationNums: [],
    state: '',
    redirect_uri: ''
  };

  componentDidMount() {
    if(!this.props.location.search) {
      this.props.navigateToDashboard();
    } else {
      const qs = querystring.parse(this.props.location.search);

      if(!qs) {
        this.props.navigateToDashboard();
        return;
      }

      if(!this.props.isLoggedIn) {
        this.props.navigateToSignIn(`${RouteConstants.PERMISSIONS}${this.props.location.search}`);
      } else {
        const appId = qs.client_id;
        AppService.getApp(appId).then((res) => {

          if(!qs.redirect_uri) {
            this.props.setModalType(ModalTypes.ERROR);
            this.props.setModalData({headerText: translate('error'), subText: 'Please provide a redirect uri', redirect: RouteConstants.DASHBOARD});
            this.props.toggleModal();
            return;
          } else {
            let url;

            try {
              url = new URL(qs.redirect_uri);
            } catch(err) {
              this.props.setModalType(ModalTypes.ERROR);
              this.props.setModalData({headerText: translate('error'), subText: 'Redirect URI is invalid', redirect: RouteConstants.DASHBOARD});
              this.props.toggleModal();
              return;
            }

            let domain = psl.parse(url.hostname).domain;

            if(!res.domains.includes(domain)) {
              console.log('not a match: ' + domain + ' in ' + res.domains);
              this.props.setModalType(ModalTypes.ERROR);
              this.props.setModalData({headerText: translate('error'), subText: 'Redirect URI is invalid', redirect: RouteConstants.DASHBOARD});
              this.props.toggleModal();
              return;
            }
          }

          let redirectUri = qs.redirect_uri;

          if(redirectUri.includes('#')) {
            redirectUri = redirectUri.substr(0,redirectUri.lastIndexOf('#'));
          }

          let state;

          if(qs.state) {
            state = qs.state;

            if(state.includes('#')) {
              state = state.substr(0, state.lastIndexOf('#'));
            }
          }

          const Ops = res.operations.map((opId) => Object.keys(ChainTypes.operations)[opId]);
          this.setState({
            appId,
            appName: res.appname,
            description: res.description,
            organizationName: res.organization_name,
            country: res.country,
            addressLine1: res.address_line1,
            addressLine2: res.address_line2,
            city: res.city,
            province: res.province,
            postalCode: res.postal_code,
            email: res.email,
            domains: res.domains,
            operations: Ops,
            operationNums: res.operations,
            redirect_uri: redirectUri,
            state
          });
        });
      }
    }
  }

  handleSave = async (e) => {
    e.preventDefault();

    this.props.setModalData({operations: this.state.operationNums, appId: this.state.appId, redirect_uri: this.state.redirect_uri, state: this.state.state});
    this.props.setModalType(ModalTypes.PEERPLAYS_AUTH);
    this.props.toggleModal();
  }

  render() {
    const {username, classes} = this.props;
    return (
      <div className='app-permission'>
        <div className='app-permission__container'>
          <img
            src={ peerplaysImg2X }
            alt='Peerplays Global'
            className='app-permission__logo'
            onMouseOver={ (e) => (e.currentTarget.src = peerplaysImg2X) }
            onMouseOut={ (e) => (e.currentTarget.src = peerplaysImg2X) }
          />
          <div className='app-permission__logged'>
            <span>Logged in as </span>
            <span className='app-permission__bold-text'>{username}</span>
          </div>
          <div>
            { `${this.state.appName} requests permission to execute the following transactions on your behalf on the Peerplays Blockchain:` }
            { this.state.operations && this.state.operations.map((op, index) => <div key={ index }>{`${index + 1}. ${op}`}</div>) }
          </div>
          <div>
            <Button type='submit' classes={ {root: classes.button} } onClick={ this.handleSave }>Allow</Button>
            <Button classes={ {root: classes.buttoncancel} } onClick={ () => this.props.navigateToDashboard() }>Cancel</Button>
          </div>
        </div>
        <div className='app-permission__container'>
          <div>
            <div>{`${this.state.appName} is a product of:`}</div>
            <div>{this.state.organizationName}</div>
            <div>{this.state.addressLine1}</div>
            {this.state.addressLine2 && <div>{this.state.addressLine2}</div>}
            <div>
              <span>{`${this.state.city}, ${this.state.province}`}</span>
              {this.state.postalCode && <span>{this.state.postalCode}</span>}
            </div>
            <div>{this.state.country}</div>
            <div>{this.state.email}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.getIn(['profiles', 'currentAccount', 'username']),
  peerplaysAccountID: state.getIn(['profiles', 'currentAccount', 'peerplays_account_id']),
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn']),
  peerplaysPassword: state.getIn(['peerplays','password']),
  peerplaysUsername: state.getIn(['peerplays','username'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigateToSignIn: NavigateActions.navigateToSignIn,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppPermission));