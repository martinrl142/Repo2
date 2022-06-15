import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class CreateOvino extends Component {
    state = {
        // ovinoId: '',
        // ovinosData: [],
        // ovinos: [],
        nomPatologia: '',
        fechaDiagn: '',
        tipoPatologia: '',
        descripDiagn: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
    {/*
        const resOv = await axios.get('http://localhost:4000/api/ovinos', theToken());
        
        if (resOv.data.length > 0) {
            this.setState({
                ovinosData: resOv.data,
                ovinos: resOv.data.map(ovino => [ovino._id, ovino.nombre, ovino.numCaravana]),
            })
        }
    */}
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/patologias/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                // ovinoId: res.data.ovinoId,
                nomPatologia: res.data.nomPatologia,
                fechaDiagn: res.data.fechaDiagn,
                tipoPatologia: res.data.tipoPatologia,
                descripDiagn: res.data.descripDiagn,
                _id: res.data._id,
                editing: true
            });
        }
    }



    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedPatologia = {
                // ovinoId: this.state.ovinoId,
                nomPatologia: this.state.nomPatologia,
                fechaDiagn: this.state.fechaDiagn,
                tipoPatologia: this.state.tipoPatologia,
                descripDiagn: this.state.descripDiagn
            };
            await axios.put('http://localhost:4000/api/patologias/' + this.state._id, updatedPatologia, theToken());
        } else {
            const newPatologia = {
                // ovinoId: this.state.ovinoId,
                nomPatologia: this.state.nomPatologia,
                fechaDiagn: this.state.fechaDiagn,
                tipoPatologia: this.state.tipoPatologia,
                descripDiagn: this.state.descripDiagn
            };
            axios.post('http://localhost:4000/api/patologias', newPatologia, theToken());
        }
        window.location.href = '/patologias';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fechaDiagn => {
        this.setState({ fechaDiagn });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Registrar Ovino</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Seleccionar ovino */}
                        {/*
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.ovinoSelected}
                                onChange={this.onInputChange}
                                name="ovinoSelected"
                                >
                                {
                                    this.state.ovinosData.map(ovino => (
                                        <option key={ovino._id} value={ovino.id}>
                                            N° de Caravana: {ovino.numCaravana} - Nombre: {ovino.nombre}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        */}
                        {/* Nombre patología*/}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de patología"
                                onChange={this.onInputChange}
                                name="nomPatologia"
                                value={this.state.nomPatologia}
                            />
                        </div>
                        {/* Tipo de patología */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo de patología"
                                onChange={this.onInputChange}
                                name="tipoPatologia"
                                value={this.state.tipoPatologia}
                            required/>
                        </div>
                        {/* Descripción del diagnóstico */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción del diagnóstico"
                                onChange={this.onInputChange}
                                name="descripDiagn"
                                value={this.state.descripDiagn}
                            />
                        </div>
                        {/* Fecha de diagnóstico */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.fechaDiagn} onChange={this.onChangeDate} />
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
