import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token';

export default class AsignarMayorMenor extends Component {
    state = {
        ovino: '',
        // Cargo en la variable patologiasData los datos pelados de todos los ovinos
        ovinosData: [],
        // Cargo en patologias el id y nombre de los ovinos
        ovinos: [],
        // Al seleccionar un ovino en el formulario se carga esta variable
        padreSelected: '',
        // Lista de todos los ovinos
        elPadre: [],
        editing: false,
        _idOvino: '',
        _idPadre: ''
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
        const resPa = await axios.get('http://localhost:4000/api/ovinos', theToken());
        // Si hay ovinos
        if (resPa.data.length > 0) {
            this.setState({
                //Cargo en ovinos solo la id y nombre de todos los ovinos
                elPadre: resPa.data.map(padre => [padre._id, padre.nombre, padre.numCaravana]),
                //precargo ovinoSelect con el primer ovino (id del ovino)
                padreSelected: resPa.data[0]._id
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
            const addPadreOvino = {
                //Lista de mayores en controllers
                elPadre: this.state.padreSelected,
            };
            await axios.put('http://localhost:4000/api/ovinos/addPadreOvino/' + this.state.ovino, addPadreOvino, theToken());
            window.location.href = '/asignarPadreOvino';
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
                        <h1 className="textBlanco">Asociar Padre a un Ovino</h1>
                    </div>
                    <div className="col-md-11 p-11">
                    </div> 
                    <div className="col-md-1 p-1">
                        <Link to="/createOvino" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                    </div> 
                    {
                        this.state.ovinosData.map(ovino => { 
                                if(ovino.elPadre.length === 0){
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
                                                    {/* SELECT PADRE */}
                                                    <div className="form-group">
                                                        <p>
                                                            Seleccionar Padre:
                                                        </p>
                                                        <select
                                                            className="form-control"
                                                            value={this.state.padreSelected}
                                                            onChange={this.onInputChange}
                                                            name="padreSelected"
                                                            required>
                                                            {
                                                                this.state.elPadre.map(padre => (
                                                                    <option key={padre} value={padre[0]}>
                                                                        {padre[1] + ' - ' + padre[2]}
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
