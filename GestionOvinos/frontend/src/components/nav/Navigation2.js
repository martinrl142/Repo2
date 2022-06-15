import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import NavDropdown from 'react-bootstrap/NavDropdown'
import axios from 'axios'
import theToken from '../Token'
//import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'
//import Button from 'react-bootstrap/Button'

//import { Link } from 'react-router-dom'

export default class Navigation2 extends Component {
    state = {
        estables: []
    }

    async componentDidMount() {
        this.getEstables();
    }

    getEstables = async () => {
        const res = await axios.get('http://localhost:4000/api/establecimientos', theToken())
        this.setState({
            estables: res.data
        });
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
                <Navbar.Brand href="/establecimientos">Uniequipo</Navbar.Brand>
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
                            <NavDropdown href="/establecimientos" title="Establecimientos" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="/createEstable">Crear establecimiento</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/establecimientos">Mostrar todos</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {
                                    this.state.estables.map(estable => (
                                        <NavDropdown.Item href={"/establecimiento/" + estable._id}>
                                            { estable.nombre }
                                        </NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                            <NavDropdown title="Ovinos" id="offcanvasNavbarDropdown"> 
                                <NavDropdown.Item href="/createOvino">Registrar ovino</NavDropdown.Item>
                                <NavDropdown.Item href="/createOvEs">Ingresar ovinos a establecimientos</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/ovinos">Mostrar todos</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {
                                    this.state.estables.map(estable => (
                                        <NavDropdown.Item href={"/establecimiento/" + estable._id}>
                                            Ovinos en Establecimiento { estable.nombre }
                                        </NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
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
