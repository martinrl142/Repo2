import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        username : '',
        email : '',
        password : '',
        roles: ''
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get('http://104.193.108.64:4000/api/users');
        this.setState({
            users: res.data
        });
    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }
    onChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://104.193.108.64:4000/api/users', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        
        });
        this.setState({ 
            username: '', 
            email: '',
            password: ''
        });
        this.getUsers();
    }

    deleteUser = async (userId) => {
        const response = window.confirm('Seguro que quiere eliminar este usuario?');
        if (response) {
            await axios.delete('http://104.193.108.64:4000/api/users/' + userId);
            this.getUsers();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Ingresar un usuario</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    value={this.state.username}
                                    type="text"
                                    placeholder="Usuario"
                                    onChange={this.onChangeUsername}
                                />
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.onChangeEmail}
                                />
                                <input
                                    className="form-control"
                                    value={this.state.password}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.onChangePassword}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                    </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" key={user._id} onDoubleClick={() => this.deleteUser(user._id)}>
                                    {user.username}
                                    {user.email}
                                    {user.password}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
