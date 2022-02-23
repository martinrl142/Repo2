import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import Markdown from "react-textarea-markdown";

registerLocale('es', es)

export default class createApunte extends Component {
    state = {
        titulo: '',
        descripcion: '',
        contenido: '',
        fechaCreacion: new Date(),
        editing: false,
        _id: ''
    }
    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/apuntes/' + this.props.match.params.id, theToken());
            console.log(res.data)
            this.setState({
                titulo: res.data.titulo,
                descripcion: res.data.descripcion,
                contenido: res.data.contenido,
                fechaCreacion: new Date(res.data.fechaCreacion),
                //ovinoSelected: res.data.ovinos,
                _id: res.data._id,
                editing: true
            });
        }
    }
    

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedApunte = {
                titulo: this.state.titulo,
                descripcion: this.state.descripcion,
                contenido: this.state.contenido,
                //ovinos: this.state.ovinoSelected,
                fechaCreacion: this.state.fechaCreacion
            };
            console.log("Actualizando: ", updatedApunte);
            //console.log(this.state.ovinoSelected);
            await axios.put('http://localhost:4000/api/apuntes/' + this.state._id, updatedApunte, theToken());
        } else {
            const newApunte = {
                titulo: this.state.titulo,
                descripcion: this.state.descripcion,
                contenido: this.state.contenido,
                //ovinos: this.state.ovinoSelected,
                fechaCreacion: this.state.fechaCreacion
            };
            console.log(theToken());
            console.log(newApunte);
            axios.post('http://localhost:4000/api/apuntes', newApunte, theToken());
        }
        // window.location.href = '/apuntes';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fechaCreacion => {
        this.setState({ fechaCreacion });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Escribir apunte</h4>
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
                        {/* Título */}
                        <div className="form-group">
                            <h5>Título</h5>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Titulo"
                                onChange={this.onInputChange}
                                name="titulo"
                                value={this.state.titulo}
                                required />
                        </div>
                        {/* Descripción */}
                        <div className="form-group">
                            <h5>Descripción</h5>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción"
                                onChange={this.onInputChange}
                                name="descripcion"
                                value={this.state.descripcion}
                            />
                        </div>
                        {/* Contenido */}
                        <div className="form-group">
                            <h5>Contenido</h5>
                            {/* <Markdown
                                className="form-control"
                                textarea={true}
                                customWidth={[50,50]}
                                id="contenido"
                                name="contenido"
                                onChange={this.onInputChange}
                                value={this.state.contenido}
                                
                                // callback={func}
                                // source={value}
                            /> */}
                            <textarea
                                className="form-control"
                                id="contenido"
                                name="contenido"
                                rows="5" cols="33"
                                onChange={this.onInputChange}
                                value={this.state.contenido}
                                >
                                    Contenido
                            </textarea>                            
                            {/* <input
                                type="textarea"
                                className="form-control"
                                placeholder="Contenido"
                                onChange={this.onInputChange}
                                name="contenido"
                                value={this.state.contenido}
                            /> */}
                        </div>
                        {/* Fecha de Creación  */}
                        <h5>Fecha de creación</h5>
                        <div className="form-group">
                            <DatePicker locale="es" dateFormat="dd/MM/yyyy" className="form-control" selected={this.state.fechaCreacion} onChange={this.onChangeDate} />
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
