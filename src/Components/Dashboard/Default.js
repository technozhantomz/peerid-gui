import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../actions';
import { AppService } from '../../services';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import { toast } from 'react-toastify';

toast.configure()

const AppsRow = ({apps, edit, deleteApp}) => {

  let editButton = (
    <span onClick={ () => edit(apps) } className='header__link'>
      Edit
    </span>
  );

  let deleteButton = (
    <span className='header__link' onClick={ () => deleteApp(apps) }>
      Delete
    </span>
  );

  return (
    <React.Fragment>
      <span style={{cursor: "pointer"}} className="label theme-bg2 text-white f-12">{editButton}</span>
      <span style={{cursor: "pointer"}} className="label theme-bg text-white f-12">{deleteButton}</span>
    </React.Fragment>
  );
};

class Dashboard extends React.Component {
  state = {
    data: [],
    appGetErr: ''
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) {
        this.props.navigateToSignIn();
      // this.props.history.push('/auth/signin-1');
    } else {
      AppService.getApps().then((res) => {
        this.setState({
          data: res
        });
      }).catch((err) => {
        console.error(err);
        this.setState({
          appGetErr: "Error while fetching the apps..."
        })
      });
    }
  }

  deleteAppSuccessAlert() {
    toast.success('App Deleted Successfully!')
  }

  deleteAppErrorAlert() {
    toast.error('App not deleted!')
  }

  deleteApp(app) {
    AppService.deleteApp(app.id).then(() => {
      AppService.getApps().then((res) => {
        this.setState({
          data: res
        });
        this.deleteAppSuccessAlert();
      });
    }).catch((err) => {
      console.error(err);
        this.deleteAppErrorAlert();
    });
  }

  render() {

    const lengthOfApps = this.state.data.length;
    const {navigateToCreateApp} = this.props;

    return (
      <div>
        <Aux>
          <Row>
            <Col md={6} xl={4}>
              <Card>
                <Card.Body className='border-bottom'>
                  <div className="row d-flex align-items-center">
                    <div className="col-auto">
                      <i className="feather icon-zap f-30 text-c-green" />
                    </div>
                    <div className="col">
                      <h3 className="f-w-300">{lengthOfApps}</h3>
                      <span className="d-block text-uppercase">total Registered Apps</span>
                      <span style={{ color: "red" }} className="d-block text-uppercase">{this.state.appGetErr}</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={12}>
              <Card className='Recent-Users'>
                <Card.Header>
                  <Card.Title as='h5'>Registered Apps</Card.Title>
                </Card.Header>
                <Card.Body className='px-0 py-2'>
                  <Table responsive hover >
                    <tbody>
                      <tr>
                        <th></th>
                        <th>App Name</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                      {this.state.data.map((apps) => (
                        <tr key={apps.id} className="unread">
                          <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                          <td>
                            <h5 className="mb-1">{apps.appname} </h5>
                            <p className="m-0">Client ID : {apps.id}</p>
                            <p className="m-0">Client Secret : {apps.app_secret}</p>
                          </td>
                          <td>
                            {apps.createdAt}
                          </td>
                          <td>
                            <AppsRow key={ apps.id } apps={ apps } edit={ navigateToCreateApp } deleteApp={ this.deleteApp.bind(this) }/>
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
  username: state.getIn(['profiles', 'currentAccount', 'username'])

});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    navigateToCreateApp: NavigateActions.navigateToCreateApp,
    navigateToSignIn: NavigateActions.navigateToSignIn
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
// export default Dashboard;
