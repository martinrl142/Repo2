import { Schema, model } from "mongoose";

const ovinoSchema = new Schema(
    {   
        nombre: String,
        numCaravana: String,
        nacimiento: Date,
        establecimientos: [
            {
              type: Schema.Types.ObjectId,
              ref: "Establecimiento",
            },
        ],
    }, {
        timestamps: true
    });

export default model("Ovino", ovinoSchema);