import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class CreateOvEs extends Component {

    state = {
        userSelected: '',
        users: [],
        estableSelected: '',
        establecimientos: [],
        nombreEstable: '',
        nombreUser: '',
        editing: false,
        _idUser: '',
        _idEstable: ''
    }

    async componentDidMount() {
        const resUs = await axios.get('http://localhost:4000/api/users', theToken());
        
        if (resUs.data.length > 0) {
            this.setState({
                users: resUs.data.map(user => [user._id, user.nombre]),
                userSelected: resUs.data[0]._id
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
            console.log(this.state.userSelected);
            this.setState({
                nombreEstable: res.data.nombre,
                _idEstable: res.data._id,
                editing: true
            });
            console.log(this.state.userSelected);
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/ovinos/' + this.props.match.params.id, theToken());
            console.log(res.data)
            console.log(this.state.estableSelected);
            this.setState({
                nombreUser: res.data.nombre,
                _idUser: res.data._id,
                editing: true
            });
            console.log(this.state.estableSelected);
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.userSelected && this.state.userSelected) {
            console.log(this.state.userSelected);
            const addUserEstable = {
                ovinos: this.state.userSelected,
            };
            console.log(addUserEstable);
            await axios.put('http://localhost:4000/api/establecimientos/addUserEstable/' + this.state.estableSelected, addUserEstable, theToken());
            console.log(addUserEstable);
            //window.location.href = '/';
            console.log(this.state.estableSelected);
            const addEstableUser = {
                establecimientos: this.state.estableSelected,
            };
            console.log(addEstableUser);
            await axios.put('http://localhost:4000/api/ovinos/addEstableUser/' + this.state.userSelected, addEstableUser, theToken());
            console.log(addEstableUser);
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
                    <h4>Agregar Usuario a Establecimiento</h4>
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
                                Seleccionar Usuario:
                            </h4>
                            <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                name="userSelected"
                                required>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user[0]}>
                                            {user[1]}
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
