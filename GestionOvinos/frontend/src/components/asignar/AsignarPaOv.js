import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token';

export default class CreateOvEs extends Component {
    state = {
        patologia: '',
        // Cargo en la variable patologiasData los datos pelados de todos los ovinos
        patologiasData: [],
        // Cargo en en patologias el id y nombre de los ovinos
        patologias: [],
        // Al seleccionar un ovino en el formulario se carga esta variable
        ovinoSelected: '',
        // Lista de todos los ovinos
        ovinos: [],
        editing: false,
        _idPatologia: '',
        _idOvino: ''
    }

    async componentDidMount() {
        // Cargo los datos de todos los patologias en la constante resOv
        const resPa = await axios.get('http://localhost:4000/api/patologias', theToken());
        
        // Si hay patologia/s
        if (resPa.data.length > 0) {
            this.setState({
                // Cargo en la variable patologiasData los datos pelados de todos los ovinos
                patologiasData: resPa.data,
                // Cargo en patologias el id y nombre de las patologias
                patologias: resPa.data.map(patologia => [patologia._id, patologia.nomPatologia]),
            })
        }
        // Cargo los datos de todos los ovinos en resOv        
        const resOv = await axios.get('http://localhost:4000/api/ovinos', theToken());
        // Si hay ovinos
        if (resOv.data.length > 0) {
            this.setState({
                //Cargo en ovinos solo la id y nombre de todos los ovinos
                ovinos: resOv.data.map(ovino => [ovino._id, ovino.nombre]),
                //precargo ovinoSelect con el primer ovino (id del ovino)
                ovinoSelected: resOv.data[0]._id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.patologia);
        if (this.state.patologia && this.state.patologia) {
            console.log(this.state.patologia);
            const addPatologiaOvino = {
                patologias: this.state.patologia,
            };
            console.log('1', 'addPatologiaOvino', this.state.ovinoSelected);
            //await axios.put('http://localhost:4000/api/ovinos/addPatologiaOvino/' + this.state.ovinoSelected, addPatologiaOvino, theToken());
            console.log('2', 'addPatologiaOvino', addPatologiaOvino);
            //window.location.href = '/';
            console.log(this.state.ovinoSelected);
            const addOvinoPatologia = {
                ovinos: this.state.ovinoSelected,
            };
            console.log('3', 'addOvinoPatologia', this.state.patologia);
            await axios.put('http://localhost:4000/api/patologias/addOvinoPatologia/' + this.state.patologia, addOvinoPatologia, theToken());
            console.log('4', 'addOvinoPatologia', addOvinoPatologia);
            window.location.href = '/createPaOv';
        }
    }

    onInputChange = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 p-12">
                        <h1 className="textBlanco">Ingresar patologia en ovino</h1>
                    </div>
                    <div className="col-md-11 p-11">
                    </div> 
                    <div className="col-md-1 p-1">
                        <Link to="/createOvino" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                    </div> 
                    {
                        this.state.patologiasData.map(patologia => { 
                                if(patologia.ovinos.length === 0){
                                    return <div className="col-md-3 p-2" key={patologia._id}>
                                        <div className="card">
                                            <div className="card-header d-flex justify-content-between">
                                                <h5>Nombre: {patologia.nomPatologia}</h5>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    Tipo: {patologia.tipoPatologia}
                                                </p>
                                                <p>
                                                    Descripción: {patologia.descripDiagn}
                                                </p>
                                                <p>
                                                    Fecha de diagnóstico: <Moment format="DD/MM/YYYY">{patologia.fechaDiagn}</Moment>
                                                </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <form onSubmit={this.onSubmit}>
                                                    {/* SELECT OVINO */}
                                                    <div className="form-group">
                                                        <p>
                                                            Seleccionar Ovino:
                                                        </p>
                                                        <select
                                                            className="form-control"
                                                            value={this.state.ovinoSelected}
                                                            onChange={this.onInputChange}
                                                            name="ovinoSelected"
                                                            required>
                                                            {
                                                                this.state.ovinos.map(ovino => (
                                                                    <option key={ovino} value={ovino[0]}>
                                                                        {ovino[1]}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <button 
                                                        className="btn btn-primary"
                                                        onClick={() => this.setState({ patologia: patologia._id })}
                                                    >
                                                        Colocar
                                                        <i className="material-icons">
                                                            assignment
                                                        </i>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                            }
                        )
                    }                
                </div>
            </div>
        )
    }
}
