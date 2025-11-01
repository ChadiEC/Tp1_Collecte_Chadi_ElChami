import { Schema, model, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRe = /^[a-zA-Z0-9._-]{3,30}$/;

const userSchema = new Schema({
  email:    { type: String, required: true, trim: true, lowercase: true, match: emailRe, unique: true, index: true },
  nom:      { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, match: usernameRe, unique: true, index: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "admin"], default: "user", index: true },

  favorites: [{
    kind: { type: String, enum: ["Film", "Series"], required: true },             
    targetId: { type: Number, required: true }
  }]
}, { timestamps: true });

// Auto-incrément (champ 'id' numérique)
try {
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  userSchema.plugin(AutoIncrement, { id:"user_seq",inc_field: "id" });
} catch (err) {
  console.warn("⚠️ AutoIncrement déjà appliqué sur user, ignoré");
}

export type UserDoc = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema);
