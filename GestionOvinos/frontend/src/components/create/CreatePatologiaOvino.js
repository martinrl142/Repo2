import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class CreateOvino extends Component {
    state = {
        nomPatologia: '',
        fechaDiagn: new Date(),
        tipoPatologia: '',
        descripDiagn: '',
        token: '',
        editing: false,
        _id: '',
        ovino: '',
    }

    async componentDidMount() {
        const ovinoId = this.props.match.params.id;
        if (ovinoId) {
            this.setState({
                ovino: ovinoId
            })
        }
        if (ovinoId) {
            console.log(ovinoId)
            const res = await axios.get('http://localhost:4000/api/patologias/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                nomPatologia: res.data.nomPatologia,
                fechaDiagn: new Date(res.data.fechaDiagn),
                tipoPatologia: res.data.tipoPatologia,
                descripDiagn: res.data.descripDiagn,
                ovino: res.data.ovino,
                _id: res.data._id,
                editing: true
            });
            console.log(res.data)
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedPatologia = {
                nomPatologia: this.state.nomPatologia,
                fechaDiagn: this.state.fechaDiagn,
                tipoPatologia: this.state.tipoPatologia,
                descripDiagn: this.state.descripDiagn,
                ovino: this.state.ovino,
            };
            await axios.put('http://localhost:4000/api/patologias/' + this.state._id, updatedPatologia, theToken());
        } else {
            const newPatologia = {
                nomPatologia: this.state.nomPatologia,
                fechaDiagn: this.state.fechaDiagn,
                tipoPatologia: this.state.tipoPatologia,
                descripDiagn: this.state.descripDiagn,
                ovino: this.state.ovino,
                token: theToken()
            };
            console.log(newPatologia);
            axios.post('http://localhost:4000/api/patologias', newPatologia, theToken());
        }
        //window.location.href = '/createPatologia';

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
                    <h4>Registrar Patolog??a en Ovino "{this.state.ovino}"</h4>
                    <br></br>
                    <form onSubmit={this.onSubmit}>
                        {/* Nombre patolog??a*/}
                        <div className="form-group">
                            <h6>Nombre de patolog??a</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de patolog??a"
                                onChange={this.onInputChange}
                                name="nomPatologia"
                                value={this.state.nomPatologia}
                            />
                        </div>
                        <br></br>
                        {/* Tipo de patolog??a */}
                        <div className="form-group">
                            <h6>Tipo</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo de patolog??a"
                                onChange={this.onInputChange}
                                name="tipoPatologia"
                                value={this.state.tipoPatologia}
                            required/>
                        </div>
                        <br></br>
                        {/* Descripci??n del diagn??stico */}
                        <div className="form-group">
                            <h6>Descripci??n de diagn??stico</h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripci??n del diagn??stico"
                                onChange={this.onInputChange}
                                name="descripDiagn"
                                value={this.state.descripDiagn}
                            />
                        </div>
                        <br></br>
                        <h6>Fecha de diagn??stico</h6>
                        {/* Fecha de diagn??stico */}
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
