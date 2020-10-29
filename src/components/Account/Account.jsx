import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {withStyles} from '@material-ui/core/styles';
import {ChainTypes} from 'peerplaysjs-lib';
import {NavigateActions, ModalActions} from '../../actions';
import {AppService} from '../../services';
import styles from './MUI.css';
import {GenUtil} from '../../utility';

const translate = GenUtil.translate;

class Account extends Component {
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

  revokePermission = async (app) => {
    await AppService.revokeAppPermission(app.id);
    this.props.navigateToDashboard();
  }

  render() {
    // const {classes} = this.props;
    return(<div className='dashboard'>
      <h2>Account Details</h2>
      <div>{`Username: ${this.props.username}`}</div>
      <div>{`Email ID: ${this.props.email}`}</div>
      <div>{`Peerplays ID: ${this.props.peerplaysAccountId}`}</div>
      <div>{`Peerplays Account Name: ${this.props.peerplaysAccountName}`}</div>
      <Container>
        <h2>Permitted Apps</h2>
        <Row className='d-none d-md-block'>
          <Col md={ 4 }><h4>App Name</h4></Col>
          <Col md={ 4 }><h4>Operations Permitted</h4></Col>
          <Col md={ 4 }><h4>Actions</h4></Col>
        </Row>
        {this.state.apps.map((row) => (
          <Row key={ row.id }>
            <Col xs={ 12 } sm={ 12 } md={ 4 }><span className='d-xs-block d-sm-block d-md-none'>App Name:</span><span>{row.appname}</span></Col>
            <Col xs={ 12 } sm={ 12 } md={ 4 }><span className='d-xs-block d-sm-block d-md-none'>Operations Permitted:</span><span>{row.operationNames}</span></Col>
            <Col xs={ 12 } sm={ 12 } md={ 4 }>
              <span onClick={ () => this.revokePermission(row) } className='header__link'>
                {translate('dashboard.tableLinks.revoke')}
              </span>
            </Col>
          </Row>
        ))}
        {/* <TableContainer component={ Paper }>
          <Table aria-label='permitted apps'>
            <TableHead>
              <TableRow classes={ {root: classes.header} }>
                <TableCell classes={ {root: classes.header} }>App Name</TableCell>
                <TableCell classes={ {root: classes.header} }>Operations Permitted</TableCell>
                <TableCell classes={ {root: classes.header} }>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.apps.map((row) => (
                <TableRow key={ row.id }>
                  <TableCell component='th' scope='row' classes={ {root: classes.row} }>
                    {row.appname}
                  </TableCell>
                  <TableCell classes={ {root: classes.row} }>{row.operationNames}</TableCell>
                  <TableCell classes={ {root: classes.row} }>
                    <span onClick={ () => this.revokePermission(row) } className='header__link'>
                      {translate('dashboard.tableLinks.revoke')}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Container>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn']),
  username: state.getIn(['profiles','currentAccount','username']),
  email: state.getIn(['profiles','currentAccount','email']),
  peerplaysAccountName: state.getIn(['profiles','currentAccount','peerplaysAccountName']),
  peerplaysAccountId: state.getIn(['profiles','currentAccount','peerplaysAccountId'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    navigateToSignIn: NavigateActions.navigateToSignIn,
    setModalData: ModalActions.setModalData,
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Account));