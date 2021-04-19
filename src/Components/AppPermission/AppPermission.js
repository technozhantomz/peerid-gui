import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import querystring from 'query-string';
import { ModalActions, NavigateActions, AppActions } from '../../actions';
import peerplaysImg2X from '../../assets/images/menuicon.png';
import { AppService } from '../../services';
import { ChainTypes } from 'peerplaysjs-lib';
import { ModalTypes, RouteConstants } from '../../constants';
import { GenUtil } from '../../utility';
import psl from 'psl';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

const translate = GenUtil.translate;

class AppPermission extends Component {
  state = {
    appId: '',
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
    redirect_uri: '',
    err: ''
  };

  componentDidMount() {
    this.props.HideLoader();

    if (!this.props.location.search) {
      this.props.navigateToDashboard();
    } else {
      const qs = querystring.parse(this.props.location.search);

      if (!qs) {
        this.props.navigateToDashboard();
        return;
      }

      if (!this.props.isLoggedIn) {
        this.props.navigateToSignIn(`${RouteConstants.PERMISSIONS}${this.props.location.search}`);
      } else {
        const appId = qs.client_id;
        AppService.getApp(appId).then((res) => {
          if (!qs.redirect_uri) {
            this.props.setModalType(ModalTypes.ERROR);
            this.props.setModalData({ headerText: translate('error'), subText: 'Please provide a redirect uri', redirect: RouteConstants.DASHBOARD });
            this.props.toggleModal();
            return;
          } else {
            let url;

            try {
              url = new URL(qs.redirect_uri);
            } catch (err) {
              this.props.setModalType(ModalTypes.ERROR);
              this.props.setModalData({ headerText: translate('error'), subText: 'Redirect URI is invalid', redirect: RouteConstants.DASHBOARD });
              this.props.toggleModal();
              return;
            }

            let domain = psl.parse(url.hostname).domain;

            if (!res.domains.map((a) => a.toLowerCase()).includes(domain.toLowerCase())) {
              console.log('not a match: ' + domain + ' in ' + res.domains);
              this.props.setModalType(ModalTypes.ERROR);
              this.props.setModalData({ headerText: translate('error'), subText: 'Redirect URI is invalid', redirect: RouteConstants.DASHBOARD });
              this.props.toggleModal();
              return;
            }
          }

          let redirectUri = qs.redirect_uri;

          if (redirectUri.includes('#')) {
            redirectUri = redirectUri.substr(0, redirectUri.lastIndexOf('#'));
          }

          let state;

          if (qs.state) {
            state = qs.state;

            if (state.includes('#')) {
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

    this.setState({
      err: '',
    });

    this.props.ShowLoader();

    const code = await AppService.joinApp(this.state.appId, this.state.redirect_uri)
      .then(() => {
        let redirect = `${this.state.redirect_uri}?code=${code}`;
        if (this.state.state) {
          redirect = redirect + '&state=' + this.state.state;
        }

        window.open(redirect, '_self');
      })
      .catch((err) => {
        this.props.HideLoader();

        console.error(err);
        this.setState({
          err: e.statusText,
        });
      })
  }

  render() {
    const { loading } = this.props;

    return (
      <Aux>
        <Row>
          <Col md={12}>
            <Card className='card'>
              <Card.Body>
                <div className="row align-items-center justify-content-center">
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <img src={peerplaysImg2X} alt={'peerplaysIcon'}
                        style={{ height: 80 }}
                      />
                      <hr />
                      <h5>Logged in as : <span >{this.props.username}</span></h5>
                    </div>
                  </div>
                </div>
                <div className="float-left">
                  <h4 className="text-muted">{`${this.state.appName} is a product of :`}</h4>
                  <h6 className="text-muted">{this.state.organizationName}</h6>
                  <h6 className="text-muted">{this.state.addressLine1}</h6>
                  <h6 className="text-muted">{this.state.addressLine2}</h6>
                  <h6 className="text-muted">{`${this.state.city}, ${this.state.province}`}</h6>
                  <h6 className="text-muted">{this.state.postalCode}</h6>
                  <h6 className="text-muted">{this.state.country}</h6>
                  <h6 className="text-muted">{this.state.email}</h6>
                </div>
              </Card.Body>
              <Card.Body>
                <div >
                  <h6 className="text-muted">{`${this.state.appName} requests permission to execute the following transactions on your behalf on the Peerplays Blockchain:`}
                    {this.state.operations && this.state.operations.map((op, index) => <div key={index}>{`${index + 1}. ${op}`}</div>)}</h6>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row align-items-center justify-content-center card-active">
                  <div>
                    <Button onClick={this.handleSave} variant="primary" >
                      {loading && <i className="fa fa-refresh fa-spin"></i>}
                      {loading && <span>Joining app...</span>}
                      {!loading && <span>ALLOW</span>}
                    </Button>{' '}
                    <Button variant="dark" onClick={() => this.props.navigateToDashboard()}>CANCEL</Button>{' '}
                    <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.err}</h6>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.getIn(['profiles', 'currentAccount', 'username']),
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn']),
  loading: state.getIn(['profiles', 'loading'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigateToSignIn: NavigateActions.navigateToSignIn,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData,
    toggleModal: ModalActions.toggleModal,
    ShowLoader: AppActions.showLoader,
    HideLoader: AppActions.hideLoader,

  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPermission);