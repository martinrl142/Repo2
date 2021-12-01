import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { AiFillPlusCircle } from "react-icons/ai"

export default class ServiciosList extends Component {

    state = {
        servicios: []
    }

    async componentDidMount() {
        this.getServicios();
    }

    getServicios = async () => {
        const res = await axios.get('http://104.193.108.64:4000/api/servicios')
        this.setState({
            servicios: res.data
        });
    }

    deleteServicios = async (ovinoId) => {
        await axios.delete('http://104.193.108.64:4000/api/servicios/' + servicioId);
        this.getServicios();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createServicio" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    this.state.ovinos.map(ovino => (
                        <div className="col-md-4 p-2" key={ovino._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Nombre: {ovino.nombre}</h5>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Establecimiento: {ovino.estable}
                                    </p>
                                    <p>
                                        Número de caravana: {ovino.numCaravana}
                                    </p>
                                    <p>
                                        Color de caravana: {ovino.colorCaravana}
                                    </p>
                                    <p>
                                        sexo: {ovino.sexo}
                                    </p>
                                    <p>
                                        raza: {ovino.raza}
                                    </p>
                                    <p>
                                        Fecha de nacimiento: <Moment format="DD/MM/YYYY">{ovino.nacimiento}</Moment>
                                    </p>
                                    <p>
                                        Ingresado a OvinosApp: {format(ovino.createdAt)}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            Opciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/patologias">Patologías</Dropdown.Item>
                                            <Dropdown.Item href="/servicios">Servicios</Dropdown.Item>
                                            <Dropdown.Item href={"/ovinos/" + ovino._id}>Sanidades</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Link to={"/editServicio/" + ovino._id} className="btn btn-primary">
                                        <i className="material-icons">
                                            border_color</i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }                
            </div>
        )
    }
}
