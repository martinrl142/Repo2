import { Schema, model } from "mongoose";

const patologiaSchema = new Schema(
    {   
        tipoParto: String,
        fechaParto: Date,
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