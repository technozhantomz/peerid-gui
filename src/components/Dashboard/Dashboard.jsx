import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigateActions} from '../../actions';
import {GenUtil} from '../../utility';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {AppService} from '../../services';
import styles from './MUI.css';

const translate = GenUtil.translate;

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

const Row = ({row, classes, edit}) => {
  const [open, setOpen] = React.useState(false);
  const classRow = useRowStyles();

  let editButton = (
    <span onClick={ () => edit(row) } className='header__link'>
      {translate('dashboard.tableLinks.edit')}
    </span>
  );

  let deleteButton = (
    <span className='header__link'>
      {translate('dashboard.tableLinks.delete')}
    </span>
  );

  return (
    <React.Fragment>
      <TableRow classes={ {root: classRow.root} }>
        <TableCell >
          <IconButton aria-label='expand row' size='small' onClick={ () => setOpen(!open) }>
            {open ? <KeyboardArrowUpIcon classes={ {root: classes.svgIcon} }/> : <KeyboardArrowDownIcon classes={ {root: classes.svgIcon} }/>}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' classes={ {root: classes.row} }>
          {row.appname}
        </TableCell>
        <TableCell classes={ {root: classes.row} }>{row.createdAt}</TableCell>
        <TableCell align='center' classes={ {root: classes.row} }>
          {editButton}
          {deleteButton}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={ {paddingBottom: 0, paddingTop: 0} } colSpan={ 6 } >
          <Collapse in={ open } timeout='auto' unmountOnExit>
            <div className='dashboard__creds-container'>
              <Typography variant='h5' gutterBottom component='div'>
                Client Credentials
              </Typography>
              <div className='dashboard__table-row'>
                Your client credentials are:
              </div>
              <div className='dashboard__table-row'>
                {`Client ID: ${row.id}`}
              </div>
              <div className='dashboard__table-row'>
                {`Client Secret: ${row.app_secret}`}
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

class Dashboard extends Component {
  state={
    data: []
  };

  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.navigateToSignIn();
    } else {
      AppService.getApps().then((res) => {
        this.setState({
          data: res
        });
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  render() {
    const {classes, navigateToCreateApp} = this.props;
    return (
      <div className='dashboard'>
        <div className='dashboard__header-txt'>
          Registered Apps
          <IconButton aria-label='expand row' size='medium' onClick={ () => navigateToCreateApp() }>
            <AddBoxIcon classes={ {root: classes.addIcon} } />
          </IconButton>
        </div>
        <TableContainer component={ Paper }>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow classes={ {root: classes.header} }>
                <TableCell />
                <TableCell classes={ {root: classes.header} }>App Name</TableCell>
                <TableCell classes={ {root: classes.header} }>Created</TableCell>
                <TableCell classes={ {root: classes.header} }>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row) => (
                <Row key={ row.id } row={ row } classes={ classes } edit={ navigateToCreateApp }/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])
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
)(withStyles(styles)(Dashboard));
