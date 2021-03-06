import React, { useState, useEffect } from 'react'
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import getApunte from '../../helpers/GetApunte';
import theToken from '../Token';
import { useParams } from 'react-router';

registerLocale('es', es)

const initialApunte = {
    titulo: "",
    descripcion: "",
    contenido: ""
}


export default function CreateApunte () {
    let authorId = useParams().id;
    
    const [apuntes, setsApuntes] = useState(initialApunte);
    const [editing, setsEditing] = useState(false);
    console.log(1, apuntes);    
    
    useEffect(() => {
        console.log(2, apuntes);
        const updateApuntes = async () => {
            console.log(3, apuntes);
            
            if(authorId){
                console.log(4, apuntes);

                await getApunte(authorId)
                                    .then((newApuntes) => {
                                            setsApuntes(newApuntes);
                                            setsEditing(true);
                                            console.log(5, apuntes);
                                        })
            }
        }
        console.log(6, apuntes);
        
        updateApuntes()
    }, [editing]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            console.log(7, apuntes);

            console.log("Actualizando: ", apuntes, apuntes._id);
            await axios.put('http://localhost:4000/api/apuntes/' + apuntes._id, apuntes, theToken());
        } else {
            
            console.log(8, apuntes);
            setsApuntes({
                ...apuntes,
            });
            console.log(theToken());
            console.log(9, apuntes);
            axios.post('http://localhost:4000/api/apuntes', apuntes, theToken());
        }
        // window.location.href = '/apuntes';
        
    }
    
    const onInputChange = (e) => {
        if(apuntes){
            setsApuntes({
                ...apuntes,
                [e.target.name]: e.target.value,
            });
        }else{
            setsApuntes({
                [e.target.name]: e.target.value,
            });
        }
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
                        {/* T??tulo */}
                        <div className="form-group">
                            <h5>T??tulo</h5>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='T??tulo'
                                value = {apuntes.titulo || ''}
                                onChange={onInputChange}
                                name='titulo'
                                required />
                        </div>
                        {/* Descripci??n */}
                        <div className="form-group">
                            <h5>Descripci??n</h5>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripci??n"
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

                        {/* Fecha de Creaci??n  */}
                        <h5>Fecha de creaci??n</h5>{/* 
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