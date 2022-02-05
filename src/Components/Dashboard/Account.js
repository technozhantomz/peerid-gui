import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import PermittedApps from '../PermittedApps/PermittedApps';

class Account extends React.Component {
  state = {
    data: [],
    appGetErr: ''
  };

  render() {
    const { username, email, peerplaysAccountId, peerplaysAccountName } = this.props;

    return (
      <div>
        <Aux>
          <Row>
            <Col>
              <Card className='Recent-Users'>
                <Card.Header>
                  <Card.Title as='h5'>Account Details </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6} >
                      <h6><i className="fa fa-circle text-c-green f-10 m-r-15" />Username : </h6>
                    </Col>
                    <Col md={6}  >
                      <h6 className="text-muted mx-auto m-0">{username}</h6>
                    </Col>
                    <hr />
                    <Col md={6}>
                      <h6><i className="fa fa-circle text-c-green f-10 m-r-15" />Email ID : </h6>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-muted mx-auto m-0">{email}</h6>
                    </Col>
                    <hr />
                    <Col md={6}>
                      <h6><i className="fa fa-circle text-c-green f-10 m-r-15" />commodityIDENTITY: </h6>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-muted mx-auto m-0">{peerplaysAccountId}</h6>
                    </Col>
                    <hr />
                    <Col md={6}>
                      <h6><i className="fa fa-circle text-c-green f-10 m-r-15" />commodityLLC Account Name : </h6>
                    </Col>
                    <Col md={6}  >
                      <p className="mx-auto m-0">{peerplaysAccountName}</p>
                    </Col>
                  </Row>
                  <hr />
                </Card.Body>
              </Card>
              <PermittedApps />
            </Col>
          </Row>
        </Aux>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.getIn(['profiles', 'currentAccount', 'email']),
  username: state.getIn(['profiles', 'currentAccount', 'username']),
  peerplaysAccountName: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountName']),
  peerplaysAccountId: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountId'])
});


export default connect(
  mapStateToProps
)(Account);
