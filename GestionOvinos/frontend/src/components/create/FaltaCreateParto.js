import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class CreateParto extends Component {
    state = {
        tiposPartos: ['Normal', 'Asistido', 'Cesárea'],
        tipoPartoSelected: 'Normal',
        tipoParto: '',
        fechaParto: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/partos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                tipoParto: res.data.tipoParto,
                fechaParto: new Date(res.data.fechaParto),
                _id: res.data._id,
                editing: true
            });
        }
    }



    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedParto = {
                tipoParto: this.state.tipoPartoSelected,
                fechaParto: new Date(this.state.fechaParto)
            };
            await axios.put('http://localhost:4000/api/partos/' + this.state._id, updatedParto, theToken());
        } else {
            const newParto = {
                tipoParto: this.state.tipoPartoSelected,
                fechaParto: new Date(this.state.fechaParto)
            };
            axios.post('http://localhost:4000/api/partos', newParto, theToken());
        }
        window.location.href = '/asignarPartoOvinos';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fechaNacidos => {
        this.setState({ fechaNacidos });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Registrar parto</h4>
                    <br></br>
                    <form onSubmit={this.onSubmit}>
                        {/* Seleccionar tipo de Parto */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.tipoPartoSelected}
                                onChange={this.onInputChange}
                                name=   "tipoPartoSelected"
                                >
                                {
                                    this.state.tiposPartos.map(tipoParto => (
                                        <option key={tipoParto} value={tipoParto}>
                                            {tipoParto}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <br></br>
                        {/* Fecha de nacidos */}
                        <br></br>
                        <div className="form-group">
                            <h6>Fecha de nacidos</h6>
                            <DatePicker className="form-control" selected={this.state.fechaNacidos} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Registrar <i className="material-icons">
                                assignment
                                </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
