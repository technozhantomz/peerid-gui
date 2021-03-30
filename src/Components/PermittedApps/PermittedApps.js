import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../actions';
import { AppService } from '../../services';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import { toast } from 'react-toastify';
import {ChainTypes} from 'peerplaysjs-lib';

toast.configure()

const AppsRow = ({ apps, edit, revokePermission }) => {


  let revokePermissionButton = (
    <span className='header__link' onClick={() => revokePermission(apps)}>
      Revoke Permission
    </span>
  );

  return (
    <React.Fragment>
      <span style={{ cursor: "pointer" }} className="label theme-bg text-white f-12">{revokePermissionButton}</span>
    </React.Fragment>
  );
};

class PermittedApps extends React.Component {
  state={
    apps: []
  };


  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.navigateToSignIn();
    } else {
      AppService.getPermittedApps().then((res) => {
        for(let i = 0; i < res.length; i++) {
          res[i].operationNames = res[i].operations.map((op) => Object.keys(ChainTypes.operations)[op]);
        }

        this.setState({
          apps: res
        });
      }).catch((err) => {
        console.error(err);
      });
    }
  }


  deleteAppSuccessAlert() {
    toast.success('App Deleted Successfully!')
  }

  deleteAppErrorAlert() {
    toast.error('App not deleted!')
  }

  revokePermission = async (app) => {
    await AppService.revokeAppPermission(app.id);
    this.props.navigateToDashboard();
  }

  render() {

    return (
      <div>
        <Aux>
          <Row>
            <Col>
              <Card className='Recent-Users'>
                <Card.Header>
                  <Card.Title as='h5'>Permitted Apps</Card.Title>
                </Card.Header>
                <Card.Body className='px-0 py-2'>
                  <Table responsive hover >
                    <tbody>
                      <tr>
                        <th></th>
                        <th>App Name</th>
                        <th>Operations Permitted</th>
                        <th>Actions</th>
                      </tr>
                      {this.state.apps.map((row) => (
                        <tr key={row.id} className="unread">
                          <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                          <td>
                            <h5 className="mb-1">{row.appname} </h5>
                          </td>
                          <td>
                            {row.operationNames}
                          </td>
                          <td>
                            <AppsRow key={row.id} apps={row} revokePermissionApp={this.revokePermission.bind(this)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
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
    navigateAddApp: NavigateActions.navigateAddApp
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermittedApps);
