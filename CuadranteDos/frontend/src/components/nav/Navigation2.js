import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import NavDropdown from 'react-bootstrap/NavDropdown'
import theToken from '../Token'
import axios from 'axios'


export default class Navigation2 extends Component {
    async componentDidMount() {
        const newApunte = {
            token: theToken()
        };

        await axios.post('http://localhost:4000/api/token', newApunte);
    }

    render() {
        return ( 
            /*<Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Equiipo</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/establecimientos">Establecimientos</Nav.Link>
                            <Nav.Link href="/ovinos">Ovinos</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>*/
            <Navbar bg="dark"  variant="dark" expand={false}>
                <Container fluid>
                <Navbar.Brand href="/">Uniequipo</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Opciones</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <NavDropdown href="/apuntes" title="Apuntes" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="/createApunte">Crear Apunte</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/apuntes">Mostrar Apuntes</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            {/* <NavDropdown title="Ovinos" id="offcanvasNavbarDropdown"> 
                                
                            </NavDropdown> */}
                        </Nav>
                        {/*<Form className="d-flex">
                            <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>*/}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
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
