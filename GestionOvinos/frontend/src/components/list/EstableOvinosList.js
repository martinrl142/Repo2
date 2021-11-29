import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import theToken from '../Token';

export default class createEstable extends Component {
    state = {
        nombreEstable: '',
        email: '',
        direccion: '',
        fechaInauguracion: new Date(),
        editing: false,
        _idEstable: '',


        nombreOvino: '',
        numCaravana: '',
        colorCaravana: '',
        sexo: '',
        raza: '',
        cruzamiento: '',
        tatuaje: '',
        nacimiento: new Date(),
        aptoReproduccion: '',
        pesoAlNacer: '',
        pesoAlDestete: '',
        nacio: '',
        editing: false,
        _idOvino: ''
    }
    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const resEs = await axios.get('http://localhost:4000/api/establecimientos/' + this.props.match.params.id, theToken());
            console.log(resEs.data)
            this.setState({
                nombreEstable: resEs.data.nombre,
                email: resEs.data.email,
                direccion: resEs.data.direccion,
                fechaInauguracion: new Date(resEs.data.fechaInauguracion),
                ovinos: res.data.ovinos,
                _idEstable: res.data._id,
                editing: true
            });
        }
        
    }
    

    
    ovinosDeAUno = (ovino) => {
        if (ovino) {
            const res = await axios.get('http://localhost:4000/api/ovinos/' + ovino, theToken());
            console.log(res.data)
            this.setState({
                nombreOvino: res.data.nombre,
                numCaravana: res.data.numCaravana,
                colorCaravana: res.data.colorCaravana,
                sexo: res.data.sexo,
                raza: res.data.raza,
                cruzamiento: res.data.cruzamiento,
                tatuaje: res.data.tatuaje,
                nacimiento: new Date(res.data.nacimiento),
                aptoReproduccion: res.data.aptoReproduccion,
                pesoAlNacer: res.data.pesoAlNacer,
                pesoAlDestete: res.data.pesoAlDestete,
                nacio: res.data.nacimiento,
                _idOvino: res.data._id,
                editing: true
            });
            //return card de ovino
        }
    }

    render() {
        return (

        )
    }
}
