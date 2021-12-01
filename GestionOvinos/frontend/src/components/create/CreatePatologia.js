import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreatePatologia extends Component {

    state = {
        tipoPatologia: '',
        diagnostico: '',
        fecha: new Date(),
        ovinoSelected: '',
        ovinos: [
            //{ numCaravana: '4848445' },
            //{ numCaravana: '5566555' },
            //{ numCaravana: '7878899' },
            //{ numCaravana: '3654654' }
                 ],
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://104.193.108.64:4000/api/ovinos');
        if (res.data.length > 0) {
            this.setState({
                ovinos: res.data.map(ovino => ovino.numCaravana),
                ovinoSelected: res.data[0].numCaravana
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://104.193.108.64:4000/api/patologias/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                tipoPatologia: res.data.tipoPatologia,
                diagnostico: res.data.diagnostico,
                fecha: new Date(res.data.fecha),
                ovinoSelected: res.data.ovino,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedPatologia = {
                tipoPatologia: this.state.tipoPatologia,
                diagnostico: this.state.diagnostico,
                ovino: this.state.ovinoSelected,
                fecha: this.state.fecha
            };
            await axios.put('http://104.193.108.64:4000/api/patologias/' + this.state._id, updatedPatologia);
        } else {
            const newPatologia = {
                tipoPatologia: this.state.tipoPatologia,
                diagnostico: this.state.diagnostico,
                ovino: this.state.ovinoSelected,
                fecha: this.state.fecha
            };
            axios.post('http://104.193.108.64:4000/api/patologias', newPatologia);
        }
        window.location.href = '/patologias';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fecha => {
        this.setState({ fecha });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Registrar patología</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECCIONAR OVINO */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.ovinoSelected}
                                onChange={this.onInputChange}
                                name="ovinoSelected"
                                required>
                                {
                                    this.state.ovinos.map(ovino => (
                                        <option key={ovino} value={ovino}>
                                            {ovino}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Tipo de patología */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo de patología"
                                onChange={this.onInputChange}
                                name="tipoPatología"
                                value={this.state.tipoPatologia}
                                required />
                        </div>
                        {/* Diagnóstico de la patología */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Diagnóstico"
                                name="diagnostico"
                                onChange={this.onInputChange}
                                value={this.state.diagnostico}
                                required>
                            </textarea>
                        </div>
                        {/* Fecha de diagnóstico */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.fecha} onChange={this.onChangeDate} />
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
