import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token';

export default class OvinoPatologiasList extends Component {
    state = {
        nombreOvino: '',
        numCaravana: '',
        editingOvino: false,
        _idOvino: '',

        patologiasList: [],
        nomPatologia: '',
        fechaDiagn: new Date(),
        tipoPatologia: '',
        descripDiagn: '',
        editingPatologia: false,
        _idPatologia: ''
    }





    async componentDidMount() {
        this.getPatologiasOvino();
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const resOv = await axios.get('http://localhost:4000/api/ovinos/' + this.props.match.params.id, theToken());
            console.log(resOv.data)
            this.setState({
                nombreOvino: resOv.data.nombre,
                numCaravana: resOv.data.numCaravana,
                patologias: resOv.data.patologias,
                _idOvino: resOv.data._id,
                editingOvino: true,
            });
        }
        
        
    }
    getPatologiasOvino = async () => {
        const res = await axios.get('http://localhost:4000/api/patologias/ovino/'+ this.props.match.params.id, theToken())
        this.setState({
            patologiasList: res.data
        });
        console.log(res.data);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 p-12">
                    <h2 className="textBlanco">Patologias en</h2>
                    <h1 className="textBlanco">Ovino { this.state.nombreOvino}</h1>

                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createPatologia" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    
                    this.state.patologiasList.map(patologia => (
                        <div className="col-md-3 p-2" key={patologia._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Nombre: {patologia.nomPatologia}</h5>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Tipo: {patologia.tipoPatologia}
                                    </p>
                                    {/*
                                    <p>
                                        Fecha de nacimiento: <Moment format="DD/MM/YYYY">{ovino.nacimiento}</Moment>
                                    </p>
                                    */}
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    {/*<Dropdown>
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
                                */}
                                </div>
                            </div>
                        </div>
                    ))
                }                
            </div>
        )
    }
}
