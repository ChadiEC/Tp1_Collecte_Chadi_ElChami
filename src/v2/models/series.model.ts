import { Schema, model, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const seriesSchema = new Schema({
  type: { type: String, enum: ["Series"], default: "Series", immutable: true }, 
  titre: { type: String, required: true, minlength: 1, maxlength: 200, trim: true, index: true },
  genre: {
    type: [String],
    default: [],
    validate: { validator: (arr: string[]) => arr.every(g => g.length >= 1 && g.length <= 30), message: "Genre 1–30 caractères" }
  },
  note: { type: String, default: "" },
  annee: { type: Date },
  palteforme: String,
  status: { type: String, enum: ["En cours", "Terminer"], required: true, index: true }
}, { timestamps: true });

// Auto-incrément (champ 'id' numérique)
try {
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  seriesSchema.plugin(AutoIncrement, { id:"series_seq",inc_field: "id" });
} catch (err) {
  console.warn("⚠️ AutoIncrement déjà appliqué sur series, ignoré");
}

export type SeriesDoc = InferSchemaType<typeof seriesSchema>;
export const Series = model("Series", seriesSchema);

