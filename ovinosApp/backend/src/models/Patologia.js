const { Schema, model } = require('mongoose');

const establecimientoSchema = new Schema(
    {   
        nombre: String,
        email: String,
        direccion: String,
        sociedad: String,
        user: { type: String },
        fechaInauguracion: Date
    }, {
        timestamps: true
    });

module.exports = model('Establecimiento', establecimientoSchema);