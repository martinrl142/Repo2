import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import theToken from '../Token';

export default function EstablesList () {
    
    const [estables, setsEstables] = useState([]);
   
    useEffect(() => {
        const getEstables = async () => {    
            const res = await axios.get('http://localhost:4000/api/establecimientos', theToken())
            setsEstables(res.data);
        }
        getEstables();
    },[]);

    console.log(estables);
    return (
        <> 
            <div className="row">
                <div className="col-md-12 p-9">
                    <h1 className="textBlanco">Estables</h1>
                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createEstable" className="nav-link"><h1 to="/createEstable"><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    estables.map(estable => (
                        <div className="col-md-3 p-2" key={estable._id}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5>Nombre: {estable.nombre}</h5>
                            </div>
                            <div className="card-body">
                                <p>
                                    Email: {estable.email}
                                </p>
                                <p>
                                    Dirección: {estable.direccion}
                                </p>
                                {/*
                                <p>
                                Ovinos: {estable.ovinos}
                                </p>
                                <p>
                                    Total ovinos: <Badge bg="success" pill>
                                                    estable.ovinos.length
                                                </Badge>
                                </p>
                                */}
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Opciones
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={"/establecimiento/" + estable._id}>Ovinos</Dropdown.Item>
                                        <Dropdown.Item href="/createOvEs">Agregar ovino</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Link to={"/editEstable/" + estable._id} className="btn btn-primary">
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
