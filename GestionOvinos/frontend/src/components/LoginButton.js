import React, { Component } from 'react'
import axios from 'axios'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import LoginComponent from './LoginComponent'

export default class LoginButton extends Component {

    render() {
        const popoverRegistrar = (
            <Popover id="popover-basic">
              <Popover.Header as="h3">No Habilitado</Popover.Header>
              <Popover.Body>
                Aún no se puede registrar usuarios.
              </Popover.Body>
            </Popover>
          );
          
          const RegistrarButton = () => (
            <OverlayTrigger trigger="click" rootClose="true" placement="left" overlay={popoverRegistrar}>
              <Button variant="primary">Registrar</Button>
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
            <OverlayTrigger trigger="click" rootClose="true" placement="left" overlay={popoverEntrar}>
              <Button variant="success">Entrar</Button>
            </OverlayTrigger>
          );
        return (<div>
            <EntrarButton />
            { /* <RegistrarButton /> */ }
            </div>)
    }
}