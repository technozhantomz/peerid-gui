import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

function Footer(props) {
    return (
        <Aux>
            <Row>
                <Col>
                    <Card.Body>
                        <div className="footer">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-auto text-center " >
                                        <div >
                                            <h6 className="text-muted mx-auto m-0">Peerplays Global</h6>
                                            <h6 className="text-muted mx-auto m-0">12 Mount Havelock</h6>
                                            <h6 className="text-muted mx-auto m-0">Douglas, Isle of Man  IM1 2QG</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Aux>
    )
}

export default Footer;