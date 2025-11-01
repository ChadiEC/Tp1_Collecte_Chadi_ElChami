import mongoose, { Schema, model, Types, InferSchemaType } from "mongoose";

const episodeSchema = new Schema({
  type: { type: String, enum: ["Episode"], default: "Episode", immutable: true },
  seriesId: { type: Types.ObjectId, ref: "Series", required: true, index: true },
  saisonId: { type: Types.ObjectId, ref: "Saison", required: true, index: true },
  epNo:     { type: Number, required: true, min: 1 },
  title:    { type: String, required: true, minlength: 1, maxlength: 200, trim: true, index: true },
  durationMin: { type: Number, required: true, min: 1, max: 300 },
  vu: { type: Boolean, default: false },
}, { timestamps: true });

// Unicité: numéro d'épisode unique dans une saison donnée (et la série, par sécurité)
episodeSchema.index({ seriesId: 1, saisonId: 1, epNo: 1 }, { unique: true });

// Auto-incrément local à Episode
try {
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  episodeSchema.plugin(AutoIncrement, { id: "episode_seq", inc_field: "id" });
} catch {
  /* ignore double apply in dev */
}

export type EpisodeDoc = InferSchemaType<typeof episodeSchema>;
export const Episode = model("Episode", episodeSchema);
