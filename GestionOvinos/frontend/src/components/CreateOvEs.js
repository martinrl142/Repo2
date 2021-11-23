import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from './Token';

export default class CreateOvEs extends Component {

    state = {
        ovinoSelected: '',
        ovinos: [],
        estableSelected: '',
        establecimientos: [],
        nombreEstable: '',
        nombreOvino: '',
        email: '',
        direccion: '',
        sociedad: '',
        fechaInauguracion: new Date(),
        editing: false,
        _idOvino: '',
        _idEstable: ''
    }

    async componentDidMount() {
        const resOv = await axios.get('http://localhost:4000/api/ovinos', theToken());
        
        if (resOv.data.length > 0) {
            this.setState({
                ovinos: resOv.data.map(ovino => [ovino._id, ovino.nombre]),
                ovinoSelected: resOv.data[0]._id
            })
        }        
        const resEs = await axios.get('http://localhost:4000/api/establecimientos', theToken());
        if (resEs.data.length > 0) {
            this.setState({
                establecimientos: resEs.data.map(establecimiento => [establecimiento._id, establecimiento.nombre]),
                estableSelected: resEs.data[0]._id
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/establecimientos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            console.log(this.state.ovinoSelected);
            this.setState({
                nombreEstable: res.data.nombre,
                email: res.data.email,
                direccion: res.data.direccion,
                sociedad: res.data.sociedad,
                fechaInauguracion: new Date(res.data.fechaInauguracion),
                _idEstable: res.data._id,
                editing: true
            });
            console.log(this.state.ovinoSelected);
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/ovinos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            console.log(this.state.estableSelected);
            this.setState({
                nombreOvino: res.data.nombre,
                _idOvino: res.data._id,
                editing: true
            });
            console.log(this.state.estableSelected);
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.ovinoSelected && this.state.ovinoSelected) {
            console.log(this.state.ovinoSelected);
            const addOvinoEstable = {
                ovinos: this.state.ovinoSelected,
            };
            console.log(addOvinoEstable);
            await axios.put('http://localhost:4000/api/establecimientos/addOvinoEstable/' + this.state.estableSelected, addOvinoEstable, theToken());
            console.log(addOvinoEstable);
            //window.location.href = '/';
            console.log(this.state.estableSelected);
            const addEstableOvino = {
                establecimientos: this.state.estableSelected,
            };
            console.log(addEstableOvino);
            await axios.put('http://localhost:4000/api/ovinos/addEstableOvino/' + this.state.ovinoSelected, addEstableOvino, theToken());
            console.log(addEstableOvino);
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
                        {/* SELECT ESTABLE */}
                        <br/>
                        <br/>
                        <div className="form-group">
                            <br/>
                            <h4>
                                Seleccionar Establecimiento:
                            </h4>
                            <select
                                className="form-control"
                                value={this.state.estableSelected}
                                onChange={this.onInputChange}
                                name="estableSelected"
                                required>
                                {
                                    this.state.establecimientos.map(estable => (
                                        <option key={estable} value={estable[0]}>
                                            {estable[1]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* SELECT OVINO */}
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
