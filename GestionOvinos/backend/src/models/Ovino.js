import { Schema, model } from "mongoose";

const ovinoSchema = new Schema(
    {   
        nombre: String,
        numCaravana: String,
        colorCaravana: String,
        sexo: String,
        raza: String,
        cruzamiento: String,
        tatuaje: String,
        nacimiento: Date,
        aptoReproduccion: String,
        pesoAlNacer: String,
        pesoAlDestete: String,
        nacio: String,
        establecimiento:
            {
              type: Schema.Types.ObjectId,
              ref: "Establecimiento",
            },
        patologias: [
            {
              type: Schema.Types.ObjectId,
              ref: "Patologia",
            },
        ],
        elPadre:
            {
              type: Schema.Types.ObjectId,
              ref: "Ovino",
            },
        laMadre:
            {
              type: Schema.Types.ObjectId,
              ref: "Ovino",
            },
    }, {
        timestamps: true
    });

export default model("Ovino", ovinoSchema);