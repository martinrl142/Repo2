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
        sexo: '',
        raza: '',
        cruzamiento: '',
        tatuaje: '',
        nacimiento: new Date(),
        aptoReproduccion: '',
        pesoAlNacer: '',
        pesoAlDestete: '',
        nacio: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://104.193.108.64:4000/api/ovinos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                nombre: res.data.nombre,
                numCaravana: res.data.numCaravana,
                colorCaravana: res.data.colorCaravana,
                sexo: res.data.sexo,
                raza: res.data.raza,
                cruzamiento: res.data.cruzamiento,
                tatuaje: res.data.tatuaje,
                nacimiento: new Date(res.data.nacimiento),
                aptoReproduccion: res.data.aptoReproduccion,
                pesoAlNacer: res.data.pesoAlNacer,
                pesoAlDestete: res.data.pesoAlDestete,
                nacio: res.data.nacimiento,
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
                cruzamiento: this.state.cruzamiento,
                tatuaje: this.state.tatuaje,
                nacimiento: this.state.nacimiento,
                aptoReproduccion: this.state.aptoReproduccion,
                pesoAlNacer: this.state.pesoAlNacer,
                pesoAlDestete: this.state.pesoAlDestete,
                nacio: this.state.nacio
            };
            await axios.put('http://104.193.108.64:4000/api/ovinos/' + this.state._id, updatedOvino, theToken());
        } else {
            const newOvino = {
                nombre: this.state.nombre,
                numCaravana: this.state.numCaravana,
                colorCaravana: this.state.colorCaravana,
                sexo: this.state.sexo,
                raza: this.state.raza,
                cruzamiento: this.state.cruzamiento,
                tatuaje: this.state.tatuaje,
                nacimiento: this.state.nacimiento,
                aptoReproduccion: this.state.aptoReproduccion,
                pesoAlNacer: this.state.pesoAlNacer,
                pesoAlDestete: this.state.pesoAlDestete,
                nacio: this.state.nacio
            };
            axios.post('http://104.193.108.64:4000/api/ovinos', newOvino, theToken());
        }
        window.location.href = '/createOvino';

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
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={this.onInputChange}
                                name="nombre"
                                value={this.state.nombre}
                            />
                        </div>
                        {/* Ovino numCaravana */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número de caravana"
                                onChange={this.onInputChange}
                                name="numCaravana"
                                value={this.state.numCaravana}
                            required/>
                        </div>
                        {/* Ovino colorCaravana */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Color de caravana"
                                onChange={this.onInputChange}
                                name="colorCaravana"
                                value={this.state.colorCaravana}
                            />
                        </div>
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
                        {/* Seleccionar sexo 
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.sexoSelected}
                                onChange={this.onInputChange}
                                name="sexoSelected"
                                >
                                {   
                                    this.state.sexo.map(sexo => (
                                        <option key={sexo[1]} value={sexo[1]}>
                                            {sexo[0]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>*/}
                        {/* Ovino raza */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Raza"
                                onChange={this.onInputChange}
                                name="raza"
                                value={this.state.raza}
                            />
                        </div>
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
                        {/* Seleccionar cruzamiento 
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.cruzamientoSelected}
                                onChange={this.onInputChange}
                                name="cruzamientoSelected"
                                >
                                {
                                    this.state.cruzamiento.map(cruzamiento => (
                                        <option key={cruzamiento[1]} value={cruzamiento[1]}>
                                            {cruzamiento[0]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>*/}
                        {/* Ovino tatuaje */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tatuaje"
                                onChange={this.onInputChange}
                                name="tatuaje"
                                value={this.state.tatuaje}
                            />
                        </div>
                        {/* Ovino pesoAlNacer */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Peso al Nacer"
                                onChange={this.onInputChange}
                                name="pesoAlNacer"
                                value={this.state.pesoAlNacer}
                            />
                        </div>
                        {/* Ovino pesoAlDestete */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Peso al destete"
                                onChange={this.onInputChange}
                                name="pesoAlDestete"
                                value={this.state.pesoAlDestete}
                            />
                        </div>
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
                        {/* Seleccionar aptoReproduccion 
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.aptoReproduccionSelected}
                                onChange={this.onInputChange}
                                name="aptoReproduccionSelected"
                                >
                                {
                                    this.state.aptoReproduccion.map(aptoReproduccion => (
                                        <option key={aptoReproduccion[1]} value={aptoReproduccion[1]}>
                                            {aptoReproduccion[0]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>*/}
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
                        {/* Seleccionar nacio 
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.nacioSelected}
                                onChange={this.onInputChange}
                                name="nacioSelected"
                                >
                                {
                                    this.state.nacio.map(nacio => (
                                        <option key={nacio[1]} value={nacio[1]}>
                                            {nacio[0]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>*/}
                        {/* Ovino Nacimiento */}
                        <div className="form-group">
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
