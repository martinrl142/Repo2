import React, { Component } from 'react'
import axios from 'axios'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import LoginComponent from './LoginComponent'

export default class LoginButtonHome extends Component {

    render() {
        const popoverRegistrar = (
            <Popover id="popover-basic">
              <Alert variant="danger">
                <Alert.Heading>No Habilitado</Alert.Heading>
                <p>
                  Aún no se pueden crear usuarios.
                </p>
              </Alert>
            </Popover>
          );
          
          const RegistrarButton = () => (
            <OverlayTrigger trigger="click" rootClose="true" placement="bottom" overlay={popoverRegistrar}>
              { /*<Button variant="primary" size="lg">Registrar</Button> */ }
              <Alert variant="danger">
                <Alert.Heading>Aún no se pueden crear usuarios.</Alert.Heading>
                <h4></h4>
              </Alert>
            </OverlayTrigger>
          );
         const popoverEntrar = (
            <Popover id="popover-basic">
              <Popover.Header as="h3"></Popover.Header>
              <Popover.Body>
                <LoginComponent />
              </Popover.Body>
            </Popover>
          );
          
          const EntrarButton = () => (
            <OverlayTrigger trigger="click" rootClose="true" placement="bottom" overlay={popoverEntrar}>
              <Button variant="success" size="lg">Entrar</Button>
            </OverlayTrigger>
          );
        return (
          <div className="centrar">
            <div className="col-sm-12 col-md-3">
              <div className="card card-body">
                <Tab.Container id="left-tabs-example" defaultActiveKey="login">
                  <Row>
                    <Col sm={12} md={12}>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="login"><h7>Entrar</h7></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="signup"><h7>Registrarme</h7></Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <br/>
                      <Tab.Content>
                        <Tab.Pane eventKey="login">
                          <LoginComponent />
                        </Tab.Pane>
                        <Tab.Pane eventKey="signup">
                          <RegistrarButton />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </div>
            <br/>
            <br/>
            { /* */ }
            </div>)
    }
}