import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {

    state = {
        email : '',
        password : '',
        token: '',
        message: ''
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
                    password: this.state.password        
                })
                .then(response => {
                    this.setState({
                        token: response.data.token, 
                    })
                    window.location.href = response.data.redirect
                }).catch((err) => {
                    this.setState({
                        token: err.response.data.token,
                        message: err.response.data.message   
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
                            <h3>{this.state.token}</h3>
                            <h3>{this.state.message}</h3>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}