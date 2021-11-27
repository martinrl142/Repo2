import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import Dropdown from 'react-bootstrap/Dropdown'
import { AiFillPlusCircle } from "react-icons/ai";
import theToken from './Token'



export default class EstablesList extends Component {

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

    deleteEstable = async (estableId) => {
        await axios.delete('http://localhost:4000/api/establecimientos/' + estableId, theToken());
        this.getEstables();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 p-12">
                    <h1>Establecimientos</h1>
                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createEstable" className="nav-link"><h1 to="/createEstable"><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    this.state.estables.map(estable => (
                        <div className="col-md-4 p-2" key={estable._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Nombre: {estable.nombre}</h5>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Dueño: {estable.user}
                                    </p>
                                    <p>
                                        Email: {estable.email}
                                    </p>
                                    <p>
                                        Dirección: {estable.direccion}
                                    </p>
                                    <p>
                                        Sociedad: {estable.sociedad}
                                    </p>
                                    {/*
                                    <p>
                                        Ovinos: {estable.ovinos}
                                    </p>
                                    */}
                                    <p>
                                        Fecha de inauguración: <Moment format="DD/MM/YYYY">{estable.fechaInauguacion}</Moment>
                                    </p>
                                    <p>
                                        Ingresado a OvinosApp: {format(estable.createdAt)}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            Opciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/ovinos">Ovinos</Dropdown.Item>
                                            <Dropdown.Item href="/createOvEs">Agregar ovino</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Link to={"/editEstable/" + estable._id} className="btn btn-primary">
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
