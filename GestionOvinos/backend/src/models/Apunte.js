import { Schema, model } from "mongoose";

const apunteSchema = new Schema(
    {   
        titulo: String,
        descripcion: String,
        contenido: String,
        //user: { type: String },
        fechaCreacion: Date,
        users: [
            {
              type: Schema.Types.ObjectId,
              ref: "Users",
            },
        ],
    }, {
        timestamps: true,
        versionKey: false
    });

export default model("Apunte", apunteSchema);