import { Schema, model } from "mongoose";

const apunteSchema = new Schema(
    {   
        titulo: String,
        descripcion: String,
        contenido: String,
        //user: { type: String },
        fechaCreacion: Date,
    }, {
        timestamps: true,
        versionKey: false
    });

export default model("Apunte", apunteSchema);