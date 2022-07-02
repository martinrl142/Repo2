import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class CreateTratamiento extends Component {
    state = {
        tipoTratamientoSelected: 'Preventivo',
        tiposTratamientos: ['Preventivo', 'Paliativo', 'Curativo'],
        tipoTratamiento: '',
        descrTratamiento: '',
        fechaTratamiento: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/tratamientos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                tipoTratamientoSelected: res.data.tipoTratamiento,
                tipoTratamiento: res.data.tipoTratamiento,
                descripTratamiento: res.data.descripTratamiento,
                fechaTratamiento: new Date(res.data.fechaTratamiento),
                _id: res.data._id,
                editing: true
            });
            console.log(res.data)
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedTratamiento = {
                tipoTratamiento: this.state.tipoTratamientoSelected,
                descripTratamiento: this.state.descrTratamiento,
                fechaTratamiento: this.state.fechaTratamiento
            };
            await axios.put('http://localhost:4000/api/tratamientos/' + this.state._id, updatedTratamiento, theToken());
        } else {
            const newTratamiento = {
                tipoTratamiento: this.state.tipoTratamientoSelected,
                descripTratamiento: this.state.descripTratamiento,
                fechaTratamiento: this.state.fechaTratamiento
            };
            axios.post('http://localhost:4000/api/tratamientos', newTratamiento, theToken());
        }
        window.location.href = '/createTratamiento';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fechaTratamiento => {
        this.setState({ fechaTratamiento });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Agregar tratamiento</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT TIPO DE TRATAMIENTO */}
                        <div className="form-group">
                            <p>
                                Seleccionar tipo de tratamiento:
                            </p>
                            <select
                                className="form-control"
                                value={this.state.tipoTratamientoSelected}
                                onChange={this.onInputChange}
                                name="tipoTratamientoSelected"
                                required>
                                {
                                    this.state.tipoTratamiento.map(tratamiento => (
                                        <option key={tratamiento} value={tratamiento}>
                                            {tratamiento}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Descripción de tratamiento */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción del tratamiento"
                                onChange={this.onInputChange}
                                name="descripTratamiento"
                                value={this.state.descripTratamiento}
                            />
                        </div>
                        {/* Fecha del tratamiento */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.fechaTratamiento} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Agregar <i className="material-icons">
                                assignment
                                </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
