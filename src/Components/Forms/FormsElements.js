import React from 'react';
import {Row, Col, Card, Form, Button} from 'react-bootstrap';

import Aux from '../../hoc/_Aux';

class FormsElements extends React.Component {

  render() {

    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>Create App</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <h5>App Info</h5>
                  <hr />
                  <Row>
                    <Col md={ 6 }>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>App Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter app name' />
                      </Form.Group>

                      <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control type='text' placeholder='Organization Name' />
                      </Form.Group>
                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' rows='5' placeholder='Description' />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className='mt-5'>Address Info</h5>
                  <hr />
                  <Row>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text' placeholder='Enter Country' />
                      </Form.Group>

                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type='text' placeholder='Address Line 1' />
                      </Form.Group>
                    </Col>

                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type='text' placeholder='Address Line 2' />
                      </Form.Group>

                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' placeholder='Enter City' />
                      </Form.Group>
                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>State</Form.Label>
                        <Form.Control type='text' placeholder='Enter state' />
                      </Form.Group>

                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type='text' placeholder='Enter Postal/Zip code' />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className='mt-5'>Conctact Details</h5>
                  <hr />
                  <Row>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control type='text' placeholder='Enter contact person' />
                      </Form.Group>

                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='text' placeholder='Enter email' />
                      </Form.Group>
                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type='text' placeholder='Enter Phone' />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className='mt-5'>Others</h5>
                  <hr />
                  <Row>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Operations</Form.Label>
                        <Form.Control as='textarea' rows='3' placeholder='Operations' />
                      </Form.Group>
                    </Col>
                    <Col md={ 6 }>
                      <Form.Group controlId='exampleForm.ControlInput1'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' rows='3' placeholder='Description' />
                      </Form.Group>
                    </Col>

                  </Row>
                  <Col md={ 6 } xl={ 4 } >
                    <Button variant='primary'>
                                            Create App
                    </Button>
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default FormsElements;