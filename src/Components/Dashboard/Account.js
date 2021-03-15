import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

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
            <Col md={6} xl={12}>
              <Card className='Recent-Users'>
                <Card.Header>
                  <Card.Title as='h5'>Account Details </Card.Title>
                </Card.Header>
                <Card.Body className='px-0 py-2'>
                  <Table>
                    <tbody>
                      <tr className="unread">
                        <td>
                          <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Username : </h6>
                        </td>
                        <td>
                          <p className="m-0">{username}</p>
                        </td>
                      </tr>
                      <tr className="unread">
                        <td>
                          <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Email ID : </h6>
                        </td>
                        <td>
                          <p className="m-0">{email}</p>
                        </td>
                      </tr><tr className="unread">
                        <td>
                          <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Peerplays ID : </h6>
                        </td>
                        <td>
                          <p className="m-0">{peerplaysAccountId}</p>
                        </td>
                      </tr><tr className="unread">
                        <td>
                          <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />Peerplays Account Name : </h6>
                        </td>
                        <td>
                          <p className="m-0">{peerplaysAccountName}</p>
                        </td>
                      </tr>
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
  email: state.getIn(['profiles', 'currentAccount', 'email']),
  username: state.getIn(['profiles', 'currentAccount', 'username']),
  peerplaysAccountName: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountName']),
  peerplaysAccountId: state.getIn(['profiles', 'currentAccount', 'peerplaysAccountId'])
});


export default connect(
  mapStateToProps
)(Account);
