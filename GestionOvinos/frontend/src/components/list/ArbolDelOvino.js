import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token';

export default class ArbolDelOvinoList extends Component {
    state = {
        nombre: '',
        email: '',
        direccion: '',
        fechaInauguracion: new Date(),
        editingEstable: false,
        _idEstable: '',

        ovinosList: [],
        nombreOvino: '',
        numCaravana: '',
        colorCaravana: '',
        sexo: '',
        raza: '',
        cruzamiento: '',
        tatuaje: '',
        nacimiento: new Date(),
        aptoReproduccion: '',
        pesoAlNacer: '',
        pesoAlDestete: '',
        nacio: '',
        editingOvino: false,
        _idOvino: ''
    }





    async componentDidMount() {
        this.getOvinosEstable();
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const resEs = await axios.get('http://localhost:4000/api/establecimientos/' + this.props.match.params.id, theToken());
            console.log(resEs.data)
            this.setState({
                nombreEstable: resEs.data.nombre,
                email: resEs.data.email,
                direccion: resEs.data.direccion,
                fechaInauguracion: new Date(resEs.data.fechaInauguracion),
                ovinos: resEs.data.ovinos,
                _idEstable: resEs.data._id,
                editingEstable: true
            });
        }
        
        
    }
    getOvinosEstable = async () => {
        const res = await axios.get('http://localhost:4000/api/ovinos/estable/'+ this.props.match.params.id, theToken())
        this.setState({
            ovinosList: res.data
        });
        console.log(res.data);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 p-12">
                    <h2 className="textBlanco">Ovinos en</h2>
                    <h1 className="textBlanco">Establecimiento { this.state.nombreEstable}</h1>

                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createOvino" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    
                    this.state.ovinosList.map(ovino => (
                        <div className="col-md-3 p-2" key={ovino._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Nombre: {ovino.nombre}</h5>
                                </div>
                                <div className="card-body">
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
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            Opciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={"/ovino/" + ovino._id}>Patologias</Dropdown.Item>
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
