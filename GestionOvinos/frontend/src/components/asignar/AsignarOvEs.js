import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token';

export default class AsignarOvEs extends Component {
    state = {
        ovino: '',
        ovinosData: [],
        ovinos: [],
        estableSelected: '',
        establecimientos: [],
        establecimiento: '',
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
                ovinosData: resOv.data,
                ovinos: resOv.data.map(ovino => [ovino._id, ovino.nombre]),
            })
        }        
        const resEs = await axios.get('http://localhost:4000/api/establecimientos', theToken());
        if (resEs.data.length > 0) {
            this.setState({
                establecimientos: resEs.data.map(establecimiento => [establecimiento._id, establecimiento.nombre]),
                estableSelected: resEs.data[0]._id
            })
        }
        /*
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/establecimientos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            console.log(this.state.ovino);
            this.setState({
                nombreEstable: res.data.nombre,
                email: res.data.email,
                direccion: res.data.direccion,
                fechaInauguracion: new Date(res.data.fechaInauguracion),
                _idEstable: res.data._id,
                editing: true
            });
            console.log(this.state.ovino);
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
        }*/
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.ovino);
        if (this.state.ovino && this.state.ovino) {
            console.log(this.state.ovino);
            /*const addOvinoEstable = {
                ovinos: this.state.ovino,
            };
            await axios.put('http://localhost:4000/api/establecimientos/addOvinoEstable/' + this.state.estableSelected, addOvinoEstable, theToken());
            window.location.href = '/';
            */
            const addEstableOvino = {
                establecimiento: this.state.estableSelected,
            };
            await axios.put('http://localhost:4000/api/ovinos/addEstableOvino/' + this.state.ovino, addEstableOvino, theToken());
            window.location.href = '/createOvEs';
        }
    }

    onInputChange = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 p-12">
                        <h1 className="textBlanco">Ingresar ovino en establecimiento</h1>
                    </div>
                    <div className="col-md-11 p-11">
                    </div> 
                    <div className="col-md-1 p-1">
                        <Link to="/createOvino" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                    </div> 
                    {
                        this.state.ovinosData.map(ovino => { 
                                console.log(ovino.establecimiento)
                                if(ovino.establecimiento === undefined){
                                    return <div className="col-md-3 p-2" key={ovino._id}>
                                        <div className="card">
                                            <div className="card-header d-flex justify-content-between">
                                                <h5>Nombre: {ovino.nombre}</h5>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    Establecimiento: {ovino.establecimiento}
                                                </p>
                                                <p>
                                                    Número de caravana: {ovino.numCaravana}
                                                </p>
                                                <p>
                                                    Color de caravana: {ovino.colorCaravana}
                                                </p>
                                                <p>
                                                    Tatuaje: {ovino.tatuaje}
                                                </p>
                                                <p>
                                                    sexo: {ovino.sexo}
                                                </p>
                                                <p>
                                                    raza: {ovino.raza}
                                                </p>
                                                <p>
                                                    Fecha de nacimiento: <Moment format="DD/MM/YYYY">{ovino.nacimiento}</Moment>
                                                </p>
                                                <p>
                                                    Apto para Reproducción: {ovino.aptoReprodruccion}
                                                </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <form onSubmit={this.onSubmit}>
                                                    {/* SELECT ESTABLE */}
                                                    <div className="form-group">
                                                        <p>
                                                            Seleccionar Establecimiento:
                                                        </p>
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
                                                    <button 
                                                        className="btn btn-primary"
                                                        onClick={() => this.setState({ ovino: ovino._id })}
                                                    >
                                                        Colocar
                                                        <i className="material-icons">
                                                            assignment
                                                        </i>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                            }
                        )
                    }                
                </div>
            </div>
        )
    }
}
