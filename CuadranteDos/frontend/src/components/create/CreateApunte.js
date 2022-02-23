import React, { useState, useEffect } from 'react'
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import getApuntes from '../../helpers/GetApuntes';
import theToken from '../Token';
import { useParams } from 'react-router';

registerLocale('es', es)




export default function CreateApunte () {
    
    let authorId = useParams().id;
    
    const [apuntes, setsApuntes] = useState({});
    const [editing, setsEditing] = useState(false);
        
    useEffect(() => {
        const updateApuntes = async () => {
            await getApuntes(authorId)
                                .then((newApuntes) => {
                                        setsApuntes(newApuntes);
                                        setsEditing(true);
                                    })
        }

        updateApuntes()
    }, [authorId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            setsApuntes({
                ...apuntes,
                titulo: apuntes.titulo,
                descripcion: apuntes.descripcion,
                contenido: apuntes.contenido,
                fechaCreacion: apuntes.fechaCreacion
            }); 
            console.log("Actualizando: ", apuntes, apuntes._id);
            await axios.put('http://localhost:4000/api/apuntes/' + apuntes._id, apuntes, theToken());
        } else {
            setsApuntes({
                titulo: apuntes.titulo,
                descripcion: apuntes.descripcion,
                contenido: apuntes.contenido,
                fechaCreacion: apuntes.fechaCreacion,
                token: theToken()
            });
            console.log(theToken());
            console.log(apuntes);
            axios.post('http://localhost:4000/api/apuntes', apuntes, theToken());
        }
        alert("El formulario se ha enviado");
        // window.location.href = '/apuntes';
        
    }
    
    const onInputChange = (e) => {
        setsApuntes({
          ...apuntes,
          [e.target.name]: e.target.value,
        });
      };


   /*  onChangeDate = nacimiento => {
        this.setState({ nacimiento });
    } */
        
    console.log(apuntes._id)

    return (
        <>
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Escribir apunte</h4>
                    <form onSubmit={onSubmit}>
                        {/* Seleccionar usuario */}
                        <div className="form-group">
                            <p></p>
                        </div>
                        {/* Título */}
                        <div className="form-group">
                            <h5>Título</h5>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Título'
                                value = {apuntes.titulo || ''}
                                onChange={onInputChange}
                                name='titulo'
                                required />
                        </div>
                        {/* Descripción */}
                        <div className="form-group">
                            <h5>Descripción</h5>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción"
                                value = {apuntes.descripcion || ''}
                                onChange={onInputChange}
                                name="descripcion"
                                />
                        </div>
                        {/* Contenido */}
                        <div className="form-group">
                            <h5>Contenido</h5>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Contenido"
                                value = {apuntes.contenido || ''}
                                onChange={onInputChange}
                                name="contenido"
                                />
                        </div>

                        {/* Fecha de Creación  */}
                        <h5>Fecha de creación</h5>{/* 
                        <div className="form-group">
                            <DatePicker locale="es" dateFormat="dd/MM/yyyy" className="form-control" selected={apuntes.fechaCreacion} onChange={this.onChangeDate} />
                        </div> */}
                        <button className="btn btn-primary">
                            Guardar
                            <i className="material-icons">
                                assignment
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}