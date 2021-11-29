import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

//import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return ( 
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Equiipo</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/establecimientos">Establecimientos</Nav.Link>
                            <Nav.Link href="/ovinos">Ovinos</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>
            /*<nav className="navbar navbar-expand-lg navbar-dark bg-light p-3">
                <div className="container">
                    <Link className="logo" to="/">
                        Equiipo
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Inicio</Link>
                                <Link to="/establecimientos" className="nav-link">Establecimientos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */
        )
    }
}
