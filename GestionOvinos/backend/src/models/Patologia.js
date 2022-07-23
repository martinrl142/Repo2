import { Schema, model } from "mongoose";

const patologiaSchema = new Schema(
    {   
        nomPatologia: String,
        fechaDiagn:  Date,
        tipoPatologia: String,
        descripDiagn: String,
        creador:
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
        ovino:
            {
              type: Schema.Types.ObjectId,
              ref: "Ovino",
            },
    }, {
        timestamps: true
    });

export default model("Patologia", patologiaSchema);