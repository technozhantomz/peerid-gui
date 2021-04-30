import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../actions';
import { AppService } from '../../services';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import { ChainTypes } from 'peerplaysjs-lib';
import { toast } from 'react-toastify';

toast.configure()

const AppsRow = ({ apps, loading, revokePermission, disabled }) => {
  let revokePermissionButton = (
    <span className='header__link' onClick={() => revokePermission(apps)}>
      {loading === apps.id && <i className="fa fa-refresh fa-spin"></i>}{' '}
      {loading === apps.id && <span>loading...</span>}
      {loading !== apps.id && <span>Revoke Permission</span>}
    </span>
  );

  return (
    <React.Fragment>
      <span style={{ cursor: "pointer", pointerEvents: disabled }} className="label theme-bg text-white f-12">{revokePermissionButton}</span>
    </React.Fragment>
  );
};

class PermittedApps extends React.Component {
  state = {
    apps: [],
    loading: null,
    disabled: null
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.navigateToSignIn();
    } else {
      AppService.getPermittedApps().then((res) => {
        for (let i = 0; i < res.length; i++) {
          res[i].operationNames = res[i].operations.map((op) => Object.keys(ChainTypes.operations)[op]);
        }

        let sortingResponse = res.filter((app, ind) => ind === res.findIndex(sortedApps => sortedApps.id === app.id));

        this.setState({
          apps: sortingResponse
        });
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  revokePermission = async (app) => {
    this.setState({
      loading: app.id,
      disabled: "none"
    });

    await AppService.revokeAppPermission(app.id).then(() => {
      AppService.getPermittedApps().then((res) => {
        for (let i = 0; i < res.length; i++) {
          res[i].operationNames = res[i].operations.map((op) => Object.keys(ChainTypes.operations)[op]);
        }

        let sortingResponse = res.filter((apps, ind) => ind === res.findIndex(sortedApps => sortedApps.id === apps.id));

        this.setState({
          apps: sortingResponse,
          loading: null,
          disabled: null
        });
      });
      this.permissionRevokeSuccess();
    }).catch(() => {
      this.setState({
        loading: null,
        disabled: null
      });
      this.permissionRevokeFail();
    });
  }

  permissionRevokeSuccess() {
    toast.success('Permission successfully revoked!')
  }

  permissionRevokeFail() {
    toast.error('Failed to revoke permission.!')
  }

  render() {

    return (
      <div>
        <Aux>
          <Row>
            <Col>
              <Card className='Registered-Apps'>
                <Card.Header>
                  <Card.Title as='h5'>Registered Apps</Card.Title>
                </Card.Header>
                {this.state.apps.map((row) => (
                  <Card.Body key={row.id} className='border-bottom'>
                    <Row className="justify-content-center align-items-center">
                      <Col xs={2} md={1} className='Registered-Apps'>
                        <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="Registered-Apps" />
                      </Col>
                      <Col xs={10} md={7}>
                        <dl className="dl-horizontal row">
                          <dt className="col-sm-7">App Name : </dt>
                          <dd className="col-sm-7">{row.appname}</dd>

                          <dt className="col-sm-6">Operations Permitted : </dt>
                          <dd className="col-sm-12">{row.operationNames + ' , '} </dd>
                        </dl>
                      </Col>
                      <Col md={4} xs={10} className="align-items-center">
                        <AppsRow key={row.id} apps={row} revokePermission={this.revokePermission.bind(this)} loading={this.state.loading} disabled={this.state.disabled}/>
                      </Col>
                    </Row>
                  </Card.Body>
                ))}
              </Card>
            </Col>
          </Row>
        </Aux>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn']),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    navigateToCreateApp: NavigateActions.navigateToCreateApp,
    navigateToSignIn: NavigateActions.navigateToSignIn,
    navigateAddApp: NavigateActions.navigateAddApp,
    navigateToDashboard: NavigateActions.navigateToDashboard
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermittedApps);
