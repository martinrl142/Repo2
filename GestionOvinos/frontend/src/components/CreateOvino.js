import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from './Token';

export default class CreateOvino extends Component {
    state = {
        nombre: '',
        numCaravana: '',
        nacimiento: new Date(),
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
                nacimiento: new Date(res.data.nacimiento),
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
                nacimiento: this.state.nacimiento
            };
            await axios.put('http://localhost:4000/api/ovinos/' + this.state._id, updatedOvino, theToken());
        } else {
            const newOvino = {
                nombre: this.state.nombre,
                numCaravana: this.state.numCaravana,
                nacimiento: this.state.nacimiento
            };
            axios.post('http://localhost:4000/api/ovinos', newOvino, theToken());
        }
        //window.location.href = '/ovinos';

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
                                value={this.state.numCaravana}
                            required/>
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
