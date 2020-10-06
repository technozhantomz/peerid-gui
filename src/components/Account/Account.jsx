import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {ChainTypes} from 'peerplaysjs-lib';
import {NavigateActions, ModalActions} from '../../actions';
import {AppService} from '../../services';
import {ModalTypes} from '../../constants';
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

  revokePermission(app) {
    this.props.setModalData({appId: app.id, auth_id: app.auth_id, intent: 'UNJOIN_APP'});
    this.props.setModalType(ModalTypes.PEERPLAYS_AUTH);
    this.props.toggleModal();
  }

  render() {
    const {classes} = this.props;
    return(<div className='dashboard'>
      <h2>Account Details</h2>
      <div>{`Username: ${this.props.username}`}</div>
      <div>{`Email ID: ${this.props.email}`}</div>
      <div>{`Peerplays ID: ${this.props.peerplaysAccountId}`}</div>
      <div>{`Peerplays Account Name: ${this.props.peerplaysAccountName}`}</div>
      <h2>Permitted Apps</h2>
      <TableContainer component={ Paper }>
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
      </TableContainer>
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