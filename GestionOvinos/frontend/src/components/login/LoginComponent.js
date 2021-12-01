import React, { Component } from 'react'
import axios from 'axios'

export default class LoginComponent extends Component {

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
                .post('http://104.193.108.64:4000/api/auth/signin', {
                    email: this.state.email,
                    password: this.state.password        
                })
                .then(response => {
                    this.setState({
                        token: response.data.token, 
                    });
                    window.localStorage.setItem(
                        'loggedAppUser', JSON.stringify(this.state.token)
                    );
                    window.location.href = response.data.redirect;
                }).catch((err) => {
                    this.setState({
                        token: err.response.data.token,
                        message: err.response.data.message   
                    })
                });
    }

    render() {
        return (
            <div className="row centrar">
               <div className="col-md-12">
                  <div className="card card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <h6 className="textGris">Correo</h6>
                            <input
                                className="form-control"
                                value={this.state.email}
                                type="email"
                                placeholder="Correo"
                                onChange={this.onChangeEmail}
                            />
                            <br/>
                            <h6 className="textGris">Contraseña</h6>
                            <input
                                className="form-control"
                                value={this.state.password}
                                type="password"
                                placeholder="Contraseña"
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-verde">
                            Ingresar
                        </button>
                        <h3>{this.state.message}</h3>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}