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
        establecimientos: [
            {
              type: Schema.Types.ObjectId,
              ref: "Establecimiento",
            },
        ],
        patologias: [
            {
              type: Schema.Types.ObjectId,
              ref: "Patologia",
            },
        ],
    }, {
        timestamps: true
    });

export default model("Ovino", ovinoSchema);