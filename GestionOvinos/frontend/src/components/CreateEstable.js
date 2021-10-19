import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class createEstable extends Component {

    state = {
        nombre: '',
        email: '',
        direccion: '',
        sociedad: '',
        fechaInauguracion: new Date(),
        //userSelected: '',
        //users: [],
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        /*const res = await axios.get('http://localhost:4000/api/users');
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.username),
                userSelected: res.data[0].username
            })
        }*/
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/establecimientos/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                nombre: res.data.nombre,
                email: res.data.email,
                direccion: res.data.direccion,
                sociedad: res.data.sociedad,
                fechaInauguracion: new Date(res.data.fechaInauguracion),
                //userSelected: res.data.user,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedEstable = {
                nombre: this.state.nombre,
                email: this.state.email,
                direccion: this.state.direccion,
                sociedad: this.state.sociedad,
                //user: this.state.userSelected,
                fechaInauguracion: this.state.fechaInauguracion
            };
            await axios.put('http://localhost:4000/api/establecimientos/' + this.state._id, updatedEstable);
        } else {
            const newEstable = {
                nombre: this.state.nombre,
                email: this.state.email,
                direccion: this.state.direccion,
                sociedad: this.state.sociedad,
                //user: this.state.userSelected,
                fechaInauguracion: this.state.fechaInauguracion
            };
            axios.post('http://localhost:4000/api/establecimientos', newEstable);
        }
        //window.location.href = '/';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fechaInauguracion => {
        this.setState({ fechaInauguracion });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Registrar establecimiento</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Seleccionar usuario */}
                        {/*<div className="form-group">
                            <p></p>
                            <p>Usuario propietario:</p>
                            <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                name="userSelected"
                                >
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>*/}
                        {/* Establecimiento Nombre */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre del establecimiento"
                                onChange={this.onInputChange}
                                name="nombre"
                                value={this.state.nombre}
                                required />
                        </div>
                        {/* Establecimiento Email */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                onChange={this.onInputChange}
                                name="email"
                                value={this.state.email}
                            />
                        </div>
                        {/* Establecimiento Dirección */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Dirección"
                                onChange={this.onInputChange}
                                name="direccion"
                                value={this.state.direccion}
                            />
                        </div>
                        {/* Establecimiento Sociedad */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sociedad"
                                onChange={this.onInputChange}
                                name="sociedad"
                                value={this.state.sociedad}
                            />
                        </div>
                        {/* Fecha de Inauguración del establecimiento */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.fechaInauguracion} onChange={this.onChangeDate} />
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
