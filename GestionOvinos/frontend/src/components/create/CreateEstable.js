import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class createEstable extends Component {
    state = {
        nombre: '',
        email: '',
        direccion: '',
        fechaInauguracion: new Date(),
        token: '',
        editing: false,
        _id: ''
    }
    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/establecimientos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                nombre: res.data.nombre,
                email: res.data.email,
                direccion: res.data.direccion,
                fechaInauguracion: new Date(res.data.fechaInauguracion),
                //ovinoSelected: res.data.ovinos,
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
                //ovinos: this.state.ovinoSelected,
                fechaInauguracion: this.state.fechaInauguracion
            };
            console.log("Actualizando: ", updatedEstable);
            //console.log(this.state.ovinoSelected);
            await axios.put('http://localhost:4000/api/establecimientos/' + this.state._id, updatedEstable, theToken());
        } else {
            const newEstable = {
                nombre: this.state.nombre,
                email: this.state.email,
                direccion: this.state.direccion,
                //ovinos: this.state.ovinoSelected,
                fechaInauguracion: this.state.fechaInauguracion,
                token: theToken()
            };
            console.log(theToken());
            console.log(newEstable);
            axios.post('http://localhost:4000/api/establecimientos', newEstable, theToken());
        }
        window.location.href = '/establecimientos';

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
                        <div className="form-group">
                            <p></p>
                            {/*<p>Ovinos</p>
                            <select
                                className="form-control"
                                value={this.state.ovinoSelected}
                                onChange={this.onInputChange}
                                name="ovinoSelected"
                                required>
                                {
                                    this.state.ovinos.map(ovino => (
                                        <option key={ovino} value={ovino}>
                                            {ovino[0]}
                                            {console.log(ovino)}
                                        </option>
                                    ))
                                }
                            </select>*/}
                        </div>
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
                        {/* Establecimiento Direcci??n */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Direcci??n"
                                onChange={this.onInputChange}
                                name="direccion"
                                value={this.state.direccion}
                            />
                        </div>
                        {/* Fecha de Inauguraci??n del establecimiento */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.fechaInauguracion} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Crear
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
