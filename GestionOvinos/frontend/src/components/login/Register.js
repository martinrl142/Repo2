import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {

    state = {
        email : '',
        password : '',
        error: ''
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
        await axios
                .post('http://localhost:4000/api/auth/signin', {
                    email: this.state.email,
                    password: this.state.password,        
                })
                .then(response => {
                    window.location.href = response.data.redirect;
                    this.setState({
                        error: response.data.error
                    })
                });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Login</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
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
                            <h3>{this.state.error}</h3>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
