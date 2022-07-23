import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Moment from 'react-moment'
import { AiFillPlusCircle } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import theToken from '../Token';

export default function EstablesList () {
    
    const [estable, setsEstable] = useState([]);
    const [ovinosList, setsOvinosList] = useState([]);
    const estableId = useParams().id;

    useEffect(() => {
        const getEstable = async () => {
            if (estableId) {
                console.log(estableId)
                const resEs = await axios.get('http://localhost:4000/api/establecimientos/' + estableId, theToken());
                setsEstable(resEs.data);
            }
        }
        const getOvinosEstable = async () => {
            if (estableId) {
                console.log("hola");
                const resOv = await axios.get('http://localhost:4000/api/ovinos/estable/'+ estableId, theToken())
                console.log(resOv.data);
                setsOvinosList(resOv.data);
            }
        }
        getOvinosEstable();
        getEstable();
    },[]);

    console.log(estable);
    console.log(ovinosList);
    return (
        <> 
        <div className="row">
                <div className="col-md-12 p-12">
                    <h2 className="textBlanco">Ovinos en</h2>
                    <h1 className="textBlanco">Establecimiento { estable.nombre }</h1>

                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createOvino" className="nav-link"><h1><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    
                    ovinosList.map(ovino => (
                        <div className="col-md-3 p-2" key={ovino._id}>
                            <div className="card">
                                <div className="card-body">
                                    <p>
                                        Nombre: {ovino.nombre}
                                    </p>
                                    <p>
                                        Número de caravana: {ovino.numCaravana}
                                    </p>
                                    <p>
                                        Color de caravana: {ovino.colorCaravana}
                                    </p>
                                    <p>
                                        Tatuaje: {ovino.tatuaje}
                                    </p>
                                    <p>
                                        sexo: {ovino.sexo}
                                    </p>
                                    <p>
                                        raza: {ovino.raza}
                                    </p>
                                    <p>
                                        Fecha de nacimiento: <Moment format="DD/MM/YYYY">{ovino.nacimiento}</Moment>
                                    </p>
                                    <p>
                                        Tatuaje: {ovino.aptoReprodruccion}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            Opciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={"/ovino/patologias/" + ovino._id}>Patologias</Dropdown.Item>
                                            <Dropdown.Item href={"/createPatologia/" + ovino._id}>Agregar Patología</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Link to={"/editOvino/" + ovino._id} className="btn btn-primary">
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
