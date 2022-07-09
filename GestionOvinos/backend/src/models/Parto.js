import { Schema, model } from "mongoose";

const patologiaSchema = new Schema(
    {   
        tipoParto: String,
        fechaParto: Date,
        creador:
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
        nacidos: [
            {
              type: Schema.Types.ObjectId,
              ref: "Ovino",
            },
        ],
        laMadre:
            {
              type: Schema.Types.ObjectId,
              ref: "Ovino",
            },
        elPadre:
            {
                type: Schema.Types.ObjectId,
                ref: "Ovino",
            },
    }, {
        timestamps: true
    });

export default model("Patologia", patologiaSchema);