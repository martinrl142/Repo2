import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class CreateOvino extends Component {
    state = {
        nombre: '',
        numCaravana: '',
        colorCaravana: '',
        sexoSelected: 'Hembra',
        sexo: ['Hembra', 'Macho'],
        raza: '',
        cruzamientoSelected: 'PI',
        cruzamiento: ['PI', 'MO', 'CM'],
        tatuaje: '',
        nacimiento: new Date(),
        aptoReproduccionSelected: 'Si',
        aptoReproduccion: ['Si', 'No'],
        pesoAlNacer: '',
        pesoAlDestete: '',
        nacioSelected: 'Vivo',
        nacio: ['Vivo', 'Muerto'],
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/ovinos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                nombre: res.data.nombre,
                numCaravana: res.data.numCaravana,
                colorCaravana: res.data.colorCaravana,
                sexoSelected: res.data.sexo,
                raza: res.data.raza,
                cruzamientoSelected: res.data.cruzamiento,
                tatuaje: res.data.tatuaje,
                nacimiento: new Date(res.data.nacimiento),
                aptoReproduccionSelected: res.data.aptoReproduccion,
                pesoAlNacer: res.data.pesoAlNacer,
                pesoAlDestete: res.data.pesoAlDestete,
                nacioSelected: res.data.nacio,
                _id: res.data._id,
                editing: true
            });
        }
    }



    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedOvino = {
                nombre: this.state.nombre,
                numCaravana: this.state.numCaravana,
                colorCaravana: this.state.colorCaravana,
                sexo: this.state.sexo,
                raza: this.state.raza,
                cruzamiento: this.state.cruzamientoSelected,
                tatuaje: this.state.tatuaje,
                nacimiento: this.state.nacimiento,
                aptoReproduccion: this.state.aptoReproduccionSelected,
                pesoAlNacer: this.state.pesoAlNacer,
                pesoAlDestete: this.state.pesoAlDestete,
                nacio: this.state.nacioSelected
            };
            await axios.put('http://localhost:4000/api/ovinos/' + this.state._id, updatedOvino, theToken());
        } else {
            const newOvino = {
                nombre: this.state.nombre,
                numCaravana: this.state.numCaravana,
                colorCaravana: this.state.colorCaravana,
                sexo: this.state.sexoSelected,
                raza: this.state.raza,
                cruzamiento: this.state.cruzamientoSelected,
                tatuaje: this.state.tatuaje,
                nacimiento: this.state.nacimiento,
                aptoReproduccion: this.state.aptoReproduccionSelected,
                pesoAlNacer: this.state.pesoAlNacer,
                pesoAlDestete: this.state.pesoAlDestete,
                nacio: this.state.nacioSelected
            };
            axios.post('http://localhost:4000/api/ovinos', newOvino, theToken());
        }
        window.location.href = '/createOvEs';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = nacimiento => {
        this.setState({ nacimiento });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Registrar Ovino</h4>
                    <br></br>
                    <form onSubmit={this.onSubmit}>
                        {/* Seleccionar establecimiento */}
                        {/*<div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.estableSelected}
                                onChange={this.onInputChange}
                                name=   "estableSelected"
                                >
                                {
                                    this.state.estables.map(estable => (
                                        <option key={estable[1]} value={estable[1]}>
                                            {estable[0]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>*/}
                        {/* Ovino nombre */}
                        <div className="form-group">
                            <h6>Nombre</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={this.onInputChange}
                                name="nombre"
                                value={this.state.nombre}
                            />
                        </div>
                        <br></br>
                        {/* Ovino numCaravana */}
                        <div className="form-group">
                            <h6>Número de caravana</h6>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Número de caravana"
                                onChange={this.onInputChange}
                                name="numCaravana"
                                value={this.state.numCaravana}
                            required/>
                        </div>
                        <br></br>
                        {/* Ovino colorCaravana */}
                        <div className="form-group">
                            <h6>Color de caravana</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Color de caravana"
                                onChange={this.onInputChange}
                                name="colorCaravana"
                                value={this.state.colorCaravana}
                            />
                        </div>
                        {/* 
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sexo"
                                onChange={this.onInputChange}
                                name="sexo"
                                value={this.state.sexo}
                            />
                        </div>
                        */}
                        {/*Seleccionar sexo*/}
                        <br></br>
                        <div className="form-group">
                            <h6>Sexo</h6>    
                            <select
                                className="form-control"
                                value={this.state.sexoSelected}
                                onChange={this.onInputChange}
                                name="sexoSelected"
                                >
                                {   
                                    this.state.sexo.map(sexo => (
                                        <option key={sexo} value={sexo}>
                                            {sexo}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <br></br>
                        {/* Ovino raza */}
                        <div className="form-group">
                            <h6>Raza</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Raza"
                                onChange={this.onInputChange}
                                name="raza"
                                value={this.state.raza}
                            />
                        </div>
                            {/* 
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cruzamiento (PI, MO, CM)"
                                onChange={this.onInputChange}
                                name="cruzamiento"
                                value={this.state.cruzamiento}
                            />
                        </div>
                            */}
                        {/*Seleccionar cruzamiento*/}
                        <br></br>
                        <div className="form-group">
                            <h6>Cruzamiento</h6>
                            <select
                                className="form-control"
                                value={this.state.cruzamientoSelected}
                                onChange={this.onInputChange}
                                name="cruzamientoSelected"
                                >
                                {
                                    this.state.cruzamiento.map(cruzamiento => (
                                        <option key={cruzamiento} value={cruzamiento}>
                                            {cruzamiento}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <br></br>
                        {/* Ovino tatuaje */}
                        <div className="form-group">
                            <h6>Tatuaje</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tatuaje"
                                onChange={this.onInputChange}
                                name="tatuaje"
                                value={this.state.tatuaje}
                            />
                        </div>
                        <br></br>
                        {/* Ovino pesoAlNacer */}
                        <div className="form-group">
                            <h6>Peso al nacer</h6>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Peso al Nacer"
                                onChange={this.onInputChange}
                                name="pesoAlNacer"
                                value={this.state.pesoAlNacer}
                            />
                        </div>
                        <br></br>
                        {/* Ovino pesoAlDestete */}
                        <div className="form-group">
                            <h6>Peso al destete</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Peso al destete"
                                onChange={this.onInputChange}
                                name="pesoAlDestete"
                                value={this.state.pesoAlDestete}
                            />
                        </div>
                            {/*
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Apto para la Reproducción"
                                onChange={this.onInputChange}
                                name="aptoReproduccion"
                                value={this.state.aptoReproduccion}
                            />
                        </div>
                        */}
                        <br></br>
                        {/* Seleccionar aptoReproduccion */} 
                        <div className="form-group">
                            <h6>Apto para reproducción</h6>
                            <select
                                className="form-control"
                                value={this.state.aptoReproduccionSelected}
                                onChange={this.onInputChange}
                                name="aptoReproduccionSelected"
                                >
                                {
                                    this.state.aptoReproduccion.map(aptoReproduccion => (
                                        <option key={aptoReproduccion} value={aptoReproduccion}>
                                            {aptoReproduccion}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/*
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nacio (Vivo, Muerto)"
                                onChange={this.onInputChange}
                                name="nacio"
                                value={this.state.nacio}
                            />
                        </div>
                            */}
                        {/* Seleccionar nacio */} 
                        <br></br>
                        <div className="form-group">
                            <h6>Nacio</h6>
                            <select
                                className="form-control"
                                value={this.state.nacioSelected}
                                onChange={this.onInputChange}
                                name="nacioSelected"
                                >
                                {
                                    this.state.nacio.map(nacio => (
                                        <option key={nacio} value={nacio}>
                                            {nacio}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Ovino Nacimiento */}
                        <br></br>
                        <div className="form-group">
                            <h6>Fecha de nacimiento</h6>
                            <DatePicker className="form-control" selected={this.state.nacimiento} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Registrar <i className="material-icons">
                                assignment
                                </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
