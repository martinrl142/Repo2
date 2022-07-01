import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token';

export default class AsignarMayorMenor extends Component {
    state = {
        menor: '',
        // Cargo en la variable patologiasData los datos pelados de todos los ovinos
        menoresData: [],
        // Cargo en patologias el id y nombre de los ovinos
        menores: [],
        // Al seleccionar un ovino en el formulario se carga esta variable
        mayorSelected: '',
        // Lista de todos los ovinos
        mayores: [],
        editing: false,
        _idMenor: '',
        _idMayor: ''
    }

    async componentDidMount() {
        // Cargo los datos de todos los patologias en la constante resOv
        const resMe = await axios.get('http://localhost:4000/api/menores', theToken());
        
        // Si hay patologia/s
        if (resMe.data.length > 0) {
            this.setState({
                // Cargo en la variable patologiasData los datos pelados de todos los ovinos
                menoresData: resMe.data,
                // Cargo en patologias el id y nombre de las patologias
                menores: resMe.data.map(menor => [menor._id, menor.nomMenor]),
            })
        }
        // Cargo los datos de todos los ovinos en resOv        
        const resMa = await axios.get('http://localhost:4000/api/mayores', theToken());
        // Si hay ovinos
        if (resMa.data.length > 0) {
            this.setState({
                //Cargo en ovinos solo la id y nombre de todos los ovinos
                mayores: resMa.data.map(mayor => [mayor._id, mayor.nombre]),
                //precargo ovinoSelect con el primer ovino (id del ovino)
                mayorSelected: resMa.data[0]._id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.menor);
        if (this.state.menor && this.state.menor) {
            console.log(this.state.menor);
            const addMenorMayor = {
                menores: this.state.menor,
            };
            //await axios.put('http://localhost:4000/api/mayores/addMenorMayor/' + this.state.mayorSelected, addMenorMayor, theToken());
            //window.location.href = '/';
            const addMayorMenor = {
                //Lista de mayores en controllers
                mayores: this.state.mayorSelected,
            };
            await axios.put('http://localhost:4000/api/menores/addMayorMenor/' + this.state.ovino, addPadreOvino, theToken());
            window.location.href = '/createMeMa';
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
                        <h1 className="textBlanco">Asociar al mayor un menor</h1>
                    </div>
                    <div className="col-md-11 p-11">
                    </div> 
                    <div className="col-md-1 p-1">
                        <Link to="/createMenor" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                    </div> 
                    {
                        this.state.menoresData.map(menor => { 
                                if(menor.mayor.length === 0){
                                    return <div className="col-md-3 p-2" key={menor._id}>
                                        <div className="card">
                                            <div className="card-header d-flex justify-content-between">
                                                <h5>Nombre: {menor.nomMenor}</h5>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    Tipo: {menor.tipoMenor}
                                                </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <form onSubmit={this.onSubmit}>
                                                    {/* SELECT MAYOR */}
                                                    <div className="form-group">
                                                        <p>
                                                            Seleccionar Mayor:
                                                        </p>
                                                        <select
                                                            className="form-control"
                                                            value={this.state.mayorSelected}
                                                            onChange={this.onInputChange}
                                                            name="mayorSelected"
                                                            required>
                                                            {
                                                                this.state.mayores.map(mayor => (
                                                                    <option key={mayor} value={mayor[0]}>
                                                                        {mayor[1]}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <button 
                                                        className="btn btn-primary"
                                                        onClick={() => this.setState({ menor: menor._id })}
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
