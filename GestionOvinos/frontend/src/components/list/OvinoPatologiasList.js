import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Moment from 'react-moment'
import { AiFillPlusCircle } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import theToken from '../Token';

export default function PatologiasList () {
    
    const [ovino, setsOvino] = useState([]);
    const [patologiasList, setsPatologiasList] = useState([]);
    const ovinoId = useParams().id;

    useEffect(() => {
        const getOvino = async () => {
            if (ovinoId) {
                console.log(ovinoId)
                const resOv = await axios.get('http://localhost:4000/api/ovinos/' + ovinoId, theToken());
                setsOvino(resOv.data);
            }
        }
        const getPatologiasOvino = async () => {
            if (ovinoId) {
                console.log("hola");
                const resPa = await axios.get('http://localhost:4000/api/patologias/ovino/'+ ovinoId, theToken())
                console.log(resPa.data);
                setsPatologiasList(resPa.data);
            }
        }
        getPatologiasOvino();
        getOvino();
    },[]);

    console.log(ovino);
    console.log(patologiasList);
    return (
        <> 
        <div className="row">
                <div className="col-md-12 p-12">
                    <h2 className="textBlanco">Patologias en</h2>
                    <h1 className="textBlanco">Ovino { ovino.nombre }</h1>

                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createPatologia" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    
                    patologiasList.map(patologia => (
                        <div className="col-md-3 p-2" key={patologia._id}>
                            <div className="card">
                                <div className="card-body">
                                    <p>
                                        Nombre de patologia: {patologia.nomPatologia}
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
                                    <Link to={"/editPaOv/" + patologia._id} className="btn btn-primary">
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
