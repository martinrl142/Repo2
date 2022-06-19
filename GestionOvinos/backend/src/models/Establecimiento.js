import { Schema, model } from "mongoose";

const establecimientoSchema = new Schema(
    {   
        nombre: String,
        email: String,
        direccion: String,
        //user: { type: String },
        fechaInauguracion: Date,
    }, {
        timestamps: true,
        versionKey: false
    });

export default model("Establecimiento", establecimientoSchema);