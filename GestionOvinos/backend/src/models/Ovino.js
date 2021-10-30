import { Schema, model } from "mongoose";

const ovinoSchema = new Schema(
    {   
        nombre: String,
        numCaravana: String,
        nacimiento: Date
    }, {
        timestamps: true
    });

export default model("Ovino", ovinoSchema);