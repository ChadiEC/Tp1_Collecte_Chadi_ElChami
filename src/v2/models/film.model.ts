import mongoose from "mongoose";
import { Schema, model, InferSchemaType } from "mongoose";

const filmSchema = new Schema({
  type: { type: String, enum: ["Film"], default: "Film", immutable: true }, // garde-fou
  titre: { type: String, required: true, minlength: 1, maxlength: 200, trim: true, index: true },
  genre: {
    type: [String],
    default: [],
    validate: {
      validator: (arr: string[]) => arr.every((g) => g.length >= 1 && g.length <= 30),
      message: "Genre 1–30 caractères",
    },
    index: true,
  },
  annee: { type: Date },
  duree: { type: Number, required: true, min: 1, max: 600 },
  plateforme: { type: String, default: "" },
  vu: { type: Boolean, default: false },
}, { timestamps: true });

try {
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  filmSchema.plugin(AutoIncrement, { id: "film_seq",inc_field: "id" });
} catch (err) {
  console.warn("AutoIncrement déjà appliqué sur Film, ignoré");
}

export type FilmDoc = InferSchemaType<typeof filmSchema>;
export const Film = model("Film", filmSchema);
