import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token';

export default class AsignarMadreOvino extends Component {
    state = {
        ovino: '',
        // Cargo en la variable patologiasData los datos pelados de todos los ovinos
        ovinosData: [],
        // Cargo en patologias el id y nombre de los ovinos
        ovinos: [],
        // Al seleccionar un ovino en el formulario se carga esta variable
        madreSelected: '',
        // Lista de todos los ovinos
        laMadre: [],
        editing: false,
        _idOvino: '',
        _idMadre: ''
    }

    async componentDidMount() {
        // Cargo los datos de todos los patologias en la constante resOv
        const resOv = await axios.get('http://localhost:4000/api/ovinos', theToken());
        
        // Si hay patologia/s
        if (resOv.data.length > 0) {
            this.setState({
                // Cargo en la variable patologiasData los datos pelados de todos los ovinos
                ovinosData: resOv.data,
                // Cargo en patologias el id y nombre de las patologias
                ovinos: resOv.data.map(ovino => [ovino._id, ovino.nombre]),
            })
        }
        // Cargo los datos de todos los ovinos en resOv        
        const resMa = await axios.get('http://localhost:4000/api/ovinos/hembras/madres', theToken());
            // Si hay ovinos
        if (resMa.data.length > 0) {
            this.setState({
                //Cargo en ovinos solo la id y nombre de todos los ovinos
                laMadre: resMa.data.map(madre => [madre._id, madre.nombre, madre.numCaravana]),
                //precargo ovinoSelect con el primer ovino (id del ovino)
                madreSelected: resMa.data[0]._id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.ovino);
        if (this.state.ovino && this.state.ovino) {
            console.log(this.state.ovino);
            /*const addOvinoPadre = {
                ovinos: this.state.ovino,
            };
            await axios.put('http://localhost:4000/api/ovinos/addOvinoPadre/' + this.state.padreSelected, addOvinoPadre, theToken());
            window.location.href = '/';*/
            const addMadreOvino = {
                //Lista de mayores en controllers
                laMadre: this.state.madreSelected,
            };
            await axios.put('http://localhost:4000/api/ovinos/addMadreOvino/' + this.state.ovino, addMadreOvino, theToken());
            window.location.href = '/asignarMadreOvino';
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
                        <h1 className="textBlanco">Asociar Madre a un Ovino</h1>
                    </div>
                    <div className="col-md-11 p-11">
                    </div> 
                    <div className="col-md-1 p-1">
                        <Link to="/createOvino" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                    </div> 
                    {
                        this.state.ovinosData.map(ovino => { 
                                if(ovino.laMadre.length === 0){
                                    return <div className="col-md-3 p-2" key={ovino._id}>
                                        <div className="card">
                                            <div className="card-header d-flex justify-content-between">
                                                <h5>Nombre: {ovino.nombre}</h5>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    Número de caravana: {ovino.numCaravana}
                                                </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <form onSubmit={this.onSubmit}>
                                                    {/* SELECT MADRE */}
                                                    <div className="form-group">
                                                        <p>
                                                            Seleccionar Madre:
                                                        </p>
                                                        <select
                                                            className="form-control"
                                                            value={this.state.madreSelected}
                                                            onChange={this.onInputChange}
                                                            name="madreSelected"
                                                            required>
                                                            {
                                                                this.state.laMadre.map(madre => (
                                                                    <option key={madre} value={madre[0]}>
                                                                        {madre[1] + ' - ' + madre[2]}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <button 
                                                        className="btn btn-primary"
                                                        onClick={() => this.setState({ ovino: ovino._id })}
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
