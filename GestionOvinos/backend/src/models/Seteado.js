import { Schema, model } from "mongoose";

const seteadoSchema = new Schema(
    {   
        coloresCaravana: [],
        sexos: [],
        razas: [],
        cruzamientos: [],
        aptoReproduccion: [],
        nacio: [],
    }, {
        timestamps: true
    });

export default model("Seteado", seteadoSchema);