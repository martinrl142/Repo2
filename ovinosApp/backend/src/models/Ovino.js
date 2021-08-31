const { Schema, model } = require('mongoose');

const ovinoSchema = new Schema(
    {   
        nombre: String,
        numCaravana: String,
        colorCaravana: String,
        sexo: String,
        raza: String,
        pedigreeMO: String,
        madre: String,
        padre: String,
        estable: { type: String },
        nacimiento: Date
    }, {
        timestamps: true
    });

module.exports = model('Ovino', ovinoSchema);