import React from 'react';
import {connect} from 'react-redux';

import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import {bindActionCreators} from 'redux';
import {NavigateActions} from '../../actions';
import {GenUtil} from '../../utility';
import {AppService} from '../../services';
import {
    Collapse,
    IconButton,
    // Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Paper
  } from '@material-ui/core';
import {withStyles, makeStyles} from '@material-ui/core/styles';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

const translate = GenUtil.translate;

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset'
      }
    }
  });

const RowW = ({row, classes, edit, deleteApp}) => {
    const [open, setOpen] = React.useState(false);
    const classRow = useRowStyles();
  
    let editButton = (
      <span onClick={ () => edit(row) } className='header__link'>
        {translate('dashboard.tableLinks.edit')}
      </span>
    );
  
    let deleteButton = (
      <span className='header__link' onClick={ () => deleteApp(row) }>
        {translate('dashboard.tableLinks.delete')}
      </span>
    );
return (
    <React.Fragment>
          <TableRow>
        <TableCell style={ {paddingBottom: 0, paddingTop: 0} } colSpan={ 6 } >
          <Collapse in={ open } timeout='auto' unmountOnExit>
            <div className='dashboard__creds-container'>
              <Typography variant='h5' gutterBottom component='div'>
                Client Credentials
              </Typography>
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

class Dashboard extends React.Component {
    state={
        data: []
      };
    
      componentDidMount() {
        if(!this.props.isLoggedIn) {
        //   this.props.navigateToSignIn();
        this.props.history.push('/auth/signin-1');
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

        return (
            <Aux>
                <Row>
                    {/* <Col md={6} xl={4}>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-zap f-30 text-c-green" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">235</h3>
                                        <h3 className="f-w-300">{this.state.data.map((row) => (
                                            <p key={ row.id }>{row.appname}</p>
                                        ))}</h3>
                                        <span className="d-block text-uppercase">total Registered Apps</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> */}

                    <Col md={6} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Registered Apps</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            <th>App Name</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                        {/* <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr> */}
                                        {/* <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Mathilde Andersen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15" />11 MAY 10:35</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Karla Sorensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Ida Jorgensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />19 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Albert Andersen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />21 July 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Aux>
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
