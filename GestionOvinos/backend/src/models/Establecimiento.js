import { Schema, model } from "mongoose";

const establecimientoSchema = new Schema(
    {   
        nombre: String,
        email: String,
        direccion: String,
        sociedad: String,
        //user: { type: String },
        fechaInauguracion: Date,
        idPropietario: String,
        ovinos: [
            {
              type: Schema.Types.ObjectId,
              ref: "Ovino",
            },
        ],
    }, {
        timestamps: true,
        versionKey: false
    });

export default model("Establecimiento", establecimientoSchema);