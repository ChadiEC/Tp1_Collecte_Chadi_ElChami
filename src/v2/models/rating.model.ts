import { Schema, model, Types } from "mongoose";

const ratingSchema = new Schema({
  userId:   { type: Types.ObjectId, ref: "User", required: true, index: true },
  target:   { type: String, enum: ["Film", "Episode"], required: true, index: true },
  targetId: { type: Types.ObjectId, required: true, index: true }, // ObjectId d'un Film OU d'un Episode
  score:    { type: Number, required: true, min: 0, max: 10 },
  review:   { type: String, maxlength: 2000, trim: true },
}, { timestamps: true });

// 1 note par user pour une cible donnée
ratingSchema.index({ userId: 1, target: 1, targetId: 1 }, { unique: true });

export const Rating = model("Rating", ratingSchema);
