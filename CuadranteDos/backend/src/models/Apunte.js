import { Schema, model } from "mongoose";

const apunteSchema = new Schema(
    {   
        titulo: String,
        descripcion: String,
        contenido: String,
        //user: { type: String },
        fechaCreacion: Date,
        autor:
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
    }, {
        timestamps: true,
        versionKey: false
    });

export default model("Apunte", apunteSchema);