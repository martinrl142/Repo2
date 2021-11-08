import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from './Token';

export default class CreateOvEs extends Component {

    state = {
        ovinoSelected: '',
        ovinos: [],
        nombre: '',
        email: '',
        direccion: '',
        sociedad: '',
        fechaInauguracion: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/ovinos', theToken());
        if (res.data.length > 0) {
            this.setState({
                ovinos: res.data.map(ovino => [ovino._id, ovino.nombre]),
                ovinoSelected: res.data[0]._id
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/establecimientos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            console.log(this.state.ovinoSelected);
            this.setState({
                nombre: res.data.nombre,
                email: res.data.email,
                direccion: res.data.direccion,
                sociedad: res.data.sociedad,
                fechaInauguracion: new Date(res.data.fechaInauguracion),
                _id: res.data._id,
                editing: true
            });
            console.log(this.state.ovinoSelected);
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        
        if (this.state.editing) {
            console.log(this.state.ovinoSelected);
            const addOvinoEstable = {
                ovinos: this.state.ovinoSelected,
            };
            await axios.put('http://localhost:4000/api/establecimientos/addOvino/' + this.state._id, addOvinoEstable, theToken());
            console.log(addOvinoEstable);
            //window.location.href = '/';
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Agregar Ovino a Establecimiento</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Establecimiento Nombre */}
                        <br/>
                        <br/>
                        <h4>
                            Establecimiento:
                        </h4>
                        <h1>{this.state.nombre}</h1>
                        {/* SELECT THE USER */}
                        <div className="form-group">
                            <br/>
                            <h4>
                                Seleccionar Ovino:
                            </h4>
                            <select
                                className="form-control"
                                value={this.state.ovinoSelected}
                                onChange={this.onInputChange}
                                name="ovinoSelected"
                                required>
                                {
                                    this.state.ovinos.map(ovino => (
                                        <option key={ovino} value={ovino[0]}>
                                            {ovino[1]}
                                        </option>
                                    ))
                                }
                            </select>
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
