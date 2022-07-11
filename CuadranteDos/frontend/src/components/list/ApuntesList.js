import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import { AiFillPlusCircle } from "react-icons/ai";
import axios from 'axios';
import theToken from '../Token';

export default function ApuntesList () {
    
    const [apuntes, setsApuntes] = useState([]);
   
    useEffect(() => {
        const getApuntes = async () => {    
        const res = await axios.get('http://localhost:4000/api/apuntes', theToken());
        setsApuntes(res.data);
        }
        getApuntes();
    },[]);

    console.log(apuntes);
    return (
        <> 
            <div className="row">
                <div className="col-md-12 p-9">
                    <h1 className="textBlanco">Apuntes</h1>
                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createApunte" className="nav-link"><h1 to="/createApunte"><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    apuntes.map(apunte => (
                            <div className="col-md-3 p-2" key={apunte._id}>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <h5>Título: {apunte.titulo}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            Descripción: {apunte.descripcion}
                                        </p>
                                        <p>
                                            Contenido: {apunte.contenido}
                                        </p>                                        
                                        <p>
                                            Fecha de creación: <Moment format="DD/MM/YYYY">{apunte.fechaCreacion}</Moment>
                                        </p>
                                        <p>
                                            Ingresado a Equiipo: {format(apunte.createdAt)}
                                        </p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <Link to={"/editApunte/" + apunte._id} className="btn btn-primary">
                                            <i className="material-icons">
                                                border_color</i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                    ))
                }               
            </div>
        </>
    );
}
