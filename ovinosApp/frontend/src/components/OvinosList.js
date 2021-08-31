import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { AiFillPlusCircle } from "react-icons/ai"

export default class OvinosList extends Component {

    state = {
        ovinos: []
    }

    async componentDidMount() {
        this.getOvinos();
    }

    getOvinos = async () => {
        const res = await axios.get('http://localhost:4000/api/ovinos')
        this.setState({
            ovinos: res.data
        });
    }

    deleteOvino = async (ovinoId) => {
        await axios.delete('http://localhost:4000/api/ovinos/' + ovinoId);
        this.getOvinos();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 p-12">
                    <h1>Ovinos</h1>
                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createOvino" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
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
                                        Nombre: {ovino.nombre}
                                    </p>
                                    <p>
                                        Número de caravana: {ovino.numCaravana}
                                    </p>
                                    <p>
                                        Color de caravana: {ovino.colorCaravana}
                                    </p>
                                    <p>
                                        Tatuaje: {ovino.tatuaje}
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
                                        Tatuaje: {ovino.aptoReprodruccion}
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
                                            <Dropdown.Item href="/createPatologia">Agregar Patología</Dropdown.Item>
                                            <Dropdown.Item href="/createServicio">Agregar Servicio</Dropdown.Item>
                                            <Dropdown.Item href={"/ovinos/" + ovino._id}>Sanidades</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Link to={"/editOvino/" + ovino._id} className="btn btn-primary">
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
