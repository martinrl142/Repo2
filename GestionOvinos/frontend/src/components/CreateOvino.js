import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from './Token';

export default class CreateOvino extends Component {
    state = {
        nombre: '',
        numCaravana: '',
        colorCaravana: '',
        sexo: '',
        raza: '',
        pedigreeMO: '',
        nacimiento: new Date(),
        estableSelected: '',
        estables: [],
        madreSelected: '',
        ovinosH: [],
        padreSelected: '',
        ovinosM: [],
        editing: false,
        _id: ''
    }






    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/establecimientos', theToken());
        if (res.data.length > 0) {
            this.setState({
                estables: res.data.map(estable => [estable.nombre, estable._id]),
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/ovinos/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                nombre: res.data.nombre,
                numCaravana: res.data.numCaravana,
                colorCaravana: res.data.colorCaravana,
                sexo: res.data.sexo,
                raza: res.data.raza,
                pedigreeMO: res.data.pedigreeMO,
                madreSelected: res.data.nombreMadre,
                padreSelected: res.data.nombrePadre,
                nacimiento: new Date(res.data.nacimiento),
                estableSelected: res.data.nombreEstable,
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
                pedigreeMO: this.state.pedigreeMO,
                nombreMadre: this.state.madreSelected,
                nombrePadre: this.state.padreSelected,
                nombreEstable: this.state.estableSelected,
                nacimiento: this.state.nacimiento
            };
            await axios.put('http://localhost:4000/api/ovinos/' + this.state._id, updatedOvino);
        } else {
            const newOvino = {
                nombre: this.state.nombre,
                numCaravana: this.state.numCaravana,
                colorCaravana: this.state.colorCaravana,
                sexo: this.state.sexo,
                raza: this.state.raza,
                pedigreeMO: this.state.pedigreeMO,
                nombreMadre: this.state.madreSelected,
                nombrePadre: this.state.padreSelected,
                nombreEstable: this.state.estableSelected,
                nacimiento: this.state.nacimiento
            };
            axios.post('http://localhost:4000/api/ovinos', newOvino);
        }
        window.location.href = '/ovinos';

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
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.estableSelected}
                                onChange={this.onInputChange}
                                name="estableSelected"
                                >
                                {
                                    this.state.estables.map(estable => (
                                        <option key={estable[1]} value={estable[1]}>
                                            {estable[0]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Ovino nombre */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={this.onInputChange}
                                name="nombre"
                                value={this.state.nombre}
                                required />
                        </div>
                        {/* Ovino numCaravana */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número de caravana"
                                onChange={this.onInputChange}
                                name="numCaravana"
                                value={this.state._id}
                                required />
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
                                required/>
                        </div>
                        {/* Ovino sexo */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sexo"
                                onChange={this.onInputChange}
                                name="sexo"
                                value={this.state.sexo}
                                required/>
                        </div>
                        {/* Ovino raza */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Raza"
                                onChange={this.onInputChange}
                                name="raza"
                                value={this.state.raza}
                                required/>
                        </div>
                        {/* Ovino pedigreeMO */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pedigree o MO"
                                onChange={this.onInputChange}
                                name="pedigreeMO"
                                value={this.state.pedigreeMO}
                                required/>
                        </div>
                        {/* Ovino madre */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.madreSelected}
                                onChange={this.onInputChange}
                                name="madreSelected"
                                >
                                {
                                    this.state.ovinosH.map(ovino => (
                                        <option key={ovino} value={ovino}>
                                            {ovino}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Ovino padre */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.padreSelected}
                                onChange={this.onInputChange}
                                name="padreSelected"
                                >
                                {
                                    this.state.ovinosM.map(ovino => (
                                        <option key={ovino} value={ovino}>
                                            {ovino}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Ovino Nacimiento */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.nacimiento} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Guardar <i className="material-icons">
                                assignment
</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
