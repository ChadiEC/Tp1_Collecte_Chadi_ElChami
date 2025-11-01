import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { connectDB } from "./db";
import { Film } from "../models/film.model";
import { Series } from "../models/series.model";
import { UserModel } from "../models/user.model";

async function seedProd() {
  try {
    const mongoUri = config.get<string>("db.uri");
    await connectDB(mongoUri);
    console.log(`🚀 Connecté à ${mongoUri}`);

    // 🔁 Optionnel : reset les compteurs auto-incrémentés
    const Counter = mongoose.model("counter", new mongoose.Schema({}, { strict: false }), "counters");
    await Counter.deleteMany({});
    console.log("🔁 Compteurs mongoose-sequence réinitialisés");

    // --- ADMIN ---
    const adminEmail = "admin@example.com";
    const adminExists = await UserModel.findOne({ email: adminEmail });
    const hashed = await bcrypt.hash("Password123!", 10);
   
    if (!adminExists) {
      const hashed = await bcrypt.hash("Password123!", 10);
      await UserModel.create({
        email: adminEmail,
        username: "admin",
        nom: "Super Admin",
        password: hashed,
        role: "admin",
      });
      console.log(`👑 Admin créé: ${adminEmail} / Password123!`);
    } else {
      console.log("👑 Admin déjà existant, pas besoin de recréer.");
    }

    // --- Films ---
    await Film.deleteMany({});
    await Series.deleteMany({});

    console.log("🎬 Insertion des films et séries...");

await Film.create([
      {
        titre: "Inception",
        genre: ["Science Fiction", "Thriller"],
        duree: 148,
        vu: false
      },
      {
        titre: "Interstellar",
        genre: ["Science Fiction", "Drama"],
        duree: 169,
        vu:false
      },
      {
        titre: "The Dark Knight",
        genre: ["Action", "Crime", "Drama"],
        duree: 152,
        vu:false
      },
    ]);

        await Series.create([
      { titre: "Breaking Future", genre: ["Science Fiction"], "nbEpisodes": 10, status: "En cours" },
      { titre: "Love in Paris", genre: ["Romance"], "nbEpisodes": 12, status: "Terminer" },
      { titre: "The Hacker’s Code", genre: ["Techno Thriller"], "nbEpisodes": 24, status: "En cours" },
    ]);

    console.log("Données insérées avec succès !");
  } catch (err) {
    console.error("Erreur dans le seed:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedProd();





