import mongoose, { Schema, model, Types, InferSchemaType } from "mongoose";

const saisonSchema = new Schema({
  type: { type: String, enum: ["Saison"], default: "Saison", immutable: true },
  seriesId: { type: Types.ObjectId, ref: "Series", required: true, index: true },
  saisonNo: { type: Number, required: true, min: 1 },
}, { timestamps: true });

// Unicité: une série ne peut pas avoir deux fois le même saisonnNo
saisonSchema.index({ seriesId: 1, saisonNo: 1 }, { unique: true });

// Auto-incrément local à saison
try {
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  saisonSchema.plugin(AutoIncrement, { id: "saison_seq", inc_field: "id" });
} catch {
  /* ignore double apply in dev */
}

export type SaisonnDoc = InferSchemaType<typeof saisonSchema>;
export const Saison = model("saison", saisonSchema);
