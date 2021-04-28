import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../actions';
import { AppService } from '../../services';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import { toast } from 'react-toastify';

toast.configure()

const AppsRow = ({ apps, edit, deleteApp }) => {

  let editButton = (
    <span onClick={() => edit(apps)} className='header__link'>
      Edit
    </span>
  );

  let deleteButton = (
    <span className='header__link' onClick={() => deleteApp(apps)}>
      Delete
    </span>
  );

  return (
    <React.Fragment>
      <span style={{ cursor: "pointer" }} className="label theme-bg2 text-white f-12">{editButton}</span>
      <span style={{ cursor: "pointer" }} className="label theme-bg text-white f-12">{deleteButton}</span>
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
      // this.props.history.push('/login');
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
    const { navigateToCreateApp } = this.props;

    const linkStyle = {
      cursor: "pointer"
    }

    return (
      <div>
        <Aux>
          <Row>
            <Col md={6} xl={4}>
              <Card>
                <Card.Body>
                  <div className="row d-flex align-items-center">
                    <div className="col-auto">
                      <i className="feather icon-zap f-30 text-c-green" />
                    </div>
                    <div className="col">
                      <span className="d-block text-uppercase">Registered Apps : {lengthOfApps}</span>
                      <span style={{ color: "red" }} className="d-block text-uppercase">{this.state.appGetErr}</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={4}>
              <Card>
                <Card.Body>
                  <div className="row d-flex align-items-center">
                    <div className="col-auto">
                      <i onClick={this.props.navigateAddApp} style={{ cursor: "pointer" }} className="feather icon-plus-square f-30 text-c-blue" />
                    </div>
                    <div className="col">
                      <span onClick={this.props.navigateAddApp} style={linkStyle} className="d-block text-uppercase">Add Apps</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className='Recent-Users'>
                <Card.Header>
                  <Card.Title as='h5'>Registered Apps</Card.Title>
                </Card.Header>
                {this.state.data.map((apps) => (
                  <Card.Body key={apps.id} className='border-bottom'>
                    <Row className="justify-content-center align-items-center">
                      <Col xs={2} md={1}>
                        <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                      </Col>
                      <Col xs={10} md={7}>
                        <dl className="dl-horizontal row">
                          <dt className="col-sm-3">App Name : </dt>
                          <dd className="col-sm-9">{apps.appname}</dd>

                          <dt className="col-sm-3">Client ID : </dt>
                          <dd className="col-sm-9">{apps.id}</dd>

                          <dt className="col-sm-3 text-truncate">Client Secret :</dt>
                          <dd className="col-sm-9">{apps.app_secret}</dd>

                          <dt className="col-sm-3">Created : </dt>
                          <dd className="col-sm-9">{apps.createdAt}</dd>
                        </dl>
                      </Col>
                      <Col md={4} xs={8} className="align-items-center">
                        <AppsRow key={apps.id} apps={apps} edit={navigateToCreateApp} deleteApp={this.deleteApp.bind(this)} />
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
  username: state.getIn(['profiles', 'currentAccount', 'username'])

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
)(Dashboard);
