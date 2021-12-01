import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        fechaEventoCelo: new Date(),
        fechaServicio: new Date(),
        padreSelected: '',
        machos: [],
        tipoServicio: '',
        tipoInseminacion: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://104.193.108.64:4000/api/ovinos');
        if (res.data.length > 0) {
            this.setState({
                machos: res.data.map(ovino => ovino.numCaravana),
                padreSelected: res.data[0].numCaravana
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://104.193.108.64:4000/api/servicios/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                fechaEventoCelo: new Date(res.data.fechaEventoCelo),
                fechaServicio: new Date(res.data.fechaServicio),
                padreSelected: res.data.padre,
                tipoServicio: res.data.tipoServicio,
                tipoInseminacion: res.data.tipoInseminacion,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedServicio = {
                fechaEventoCelo: this.state.fechaEventoCelo,
                fechaServicio: this.state.fechaServicio,
                padre: this.state.padreSelected,
                tipoServicio: this.state.tipoServicio,
                tipoInseminacion: this.state.tipoInseminacion
            };
            await axios.put('http://104.193.108.64:4000/api/servicios/' + this.state._id, updatedServicio);
        } else {
            const newServicio = {
                fechaEventoCelo: this.state.fechaEventoCelo,
                fechaServicio: this.state.fechaServicio,
                padre: this.state.padreSelected,
                tipoServicio: this.state.tipoServicio,
                tipoInseminacion: this.state.tipoInseminacion
            };
            axios.post('http://104.193.108.64:4000/api/servicios', newServicio);
        }
        window.location.href = '/ovinos';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fechaEventoCelo => {
        this.setState({ fechaEventoCelo });
    }

    onChangeDate = fechaServicio => {
        this.setState({ fechaServicio });
    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Servicio</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Tipo de servicio */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo de servicio"
                                onChange={this.onInputChange}
                                name="tipoServicio"
                                value={this.state.tipoServicio}
                                required />
                        </div>
                        {/* Tipo de inseminación */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo de inseminacion"
                                onChange={this.onInputChange}
                                name="tipoInseminacion"
                                value={this.state.tipoInseminacion}
                                required />
                        </div>
                        {/* Seleccionar Usuario */}
                        <div className="form-group">
                            <p>Carnero:</p>
                            <select
                                className="form-control"
                                value={this.state.padreSelected}
                                onChange={this.onInputChange}
                                name="padreSelected"
                                required>
                                {
                                    this.state.machos.map(ovino => (
                                        <option key={ovino} value={ovino}>
                                            {ovino}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Fecha de evento de celo */}
                        <p>Fecha de evento de celo:</p>
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.fechaEventoCelo} onChange={this.onChangeDate} />
                        </div>
                        {/* fecha de servicio */}
                        <p>Fecha de servicio:</p>
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.fechaServicio} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Guardar
                            <i className="material-icons">
                                assignment
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
