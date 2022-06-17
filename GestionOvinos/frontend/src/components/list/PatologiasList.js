import React, { Component } from 'react'
import axios from 'axios'
//import { format } from 'timeago.js'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
//import Dropdown from 'react-bootstrap/Dropdown'
import { AiFillPlusCircle } from "react-icons/ai"
import theToken from '../Token'

export default class PatologiasList extends Component {

    state = {
        patologias: []
    }

    async componentDidMount() {
        this.getPatologias();
    }

    getPatologias = async () => {
        const res = await axios.get('http://localhost:4000/api/patologias', theToken())
        this.setState({
            patologias: res.data
        });
    }

    deletePatologia = async (patologiaId) => {
        await axios.delete('http://localhost:4000/api/patologias/' + patologiaId, theToken());
        this.getOvinos();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 p-12">
                    <h1 className="textBlanco">Patologias</h1>
                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createPatologia" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    this.state.patologias.map(patologia => (
                        <div className="col-md-3 p-2" key={patologia._id}>
                            <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                    <h5>Nombre: {patologia.nomPatologia}</h5>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Ovino: {patologia.ovinoId}
                                    </p>
                                    <p>
                                        Tipo: {patologia.tipoPatologia}
                                    </p>
                                    <p>
                                        Descripción: {patologia.descripDiagn}
                                    </p>
                                    <p>
                                        Fecha de diagnóstico: <Moment format="DD/MM/YYYY">{patologia.fechaDiagn}</Moment>
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    
                                </div>
                            </div>
                        </div>
                    ))
                }                
            </div>
        )
    }
}