import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import http from "http";
import fs from "fs";
import config from "config";
import swaggerUi from "swagger-ui-express";
import swaggerV1 from "../docs/v1/swagger-v1.json";
import swaggerV2 from "../docs/v2/swagger-v2.json";
import { connectDB } from "./v2/data/db";
import userRoutes from "./v1/routes/user.routes";
import mediaRoutes from "./v1/routes/media.routes";
import filmRoutes from "./v1/routes/film.routes";
import seriesRoutes from "./v1/routes/series.routes";
import saisonRoutes from "./v1/routes/saison.routes";
import episodeRoutes from "./v1/routes/episode.routes";
import logRoutes from "./v1/routes/logs.routes";
import v2AuthRoutes from "./v2/routes/auth.routes";
import v2UserRoutes from "./v2/routes/user.routes";
import v2FilmRoutes from "./v2/routes/film.routes";
import v2SeriesRoutes from "./v2/routes/series.routes";
import v2SaisonRoutes from "./v2/routes/saison.routes";
import v2EpisodeRoutes from "./v2/routes/episode.routes";
import v2RatingRoutes from "./v2/routes/rating.routes";
import { notFoundHandler } from "./v1/middlewares/error.middleware";

const app = express();
app.use(express.json());
app.set("trust proxy",true);

app.use((req, res, next) => {
  if (req.path.startsWith("/docs")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  next();
});
// --- CORS ---
const corsOrigins = config.has("security.cors.origins")
  ? config.get<string[]>("security.cors.origins")
  : ["http://localhost:3000", "https://localhost:3443"];

app.use(cors({
  origin: (origin, cb) => {
    console.log("CORS origin reçu:", origin);

    // Autorise Postman, Swagger et tests sans Origin
    if (!origin) return cb(null, true);

    // En dev, tout est permis (localhost uniquement)
    if (process.env.NODE_ENV !== "production") {
      if (origin.startsWith("http://localhost") || origin.startsWith("https://localhost")) {
        return cb(null, true);
      }
    }

    // En prod, vérifie la liste blanche
    if (corsOrigins.includes(origin)) return cb(null, true);

    //  Sinon, refuse
    return cb(new Error("CORS not allowed for origin: " + origin), false);
  },
  credentials: true
}));

const basePath = config.has("app.basePath") ? config.get<string>("app.basePath") : "/api";
const mongoUri = config.get<string>("db.uri");
const serverConfig = config.get<any>("server");

// --- Redirection HTTP -> HTTPS (doit être avant la création du serveur) ---
if (serverConfig.https.redirectAllHttpToHttps) {
  app.use((req, res, next) => {
    if (req.protocol === "http") {
      console.log(`🔁 Redirection HTTP -> HTTPS : ${req.headers.host}${req.url}`);
      return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
  });
}

// --- Routes v1 ---
app.use("/api/v1", userRoutes);
app.use("/api/v1", mediaRoutes);
app.use("/api/v1", filmRoutes);
app.use("/api/v1", seriesRoutes);
app.use("/api/v1", saisonRoutes);
app.use("/api/v1", episodeRoutes);
app.use("/api/v1", logRoutes);

// --- Routes Swagger ---
app.use(
  "/docs/v1",
  swaggerUi.serveFiles(swaggerV1),
  swaggerUi.setup(swaggerV1, { customSiteTitle: "API v1 (deprecated)" })
);

if (process.env.NODE_ENV === "production") {
  console.log("⚙️ Ajustement Swagger pour la production...");

  const registerSchema = swaggerV2.components?.schemas?.RegisterRequest;
  const loginSchema = swaggerV2.components?.schemas?.LoginRequest;

  if (registerSchema && registerSchema.properties) {
    registerSchema.properties.email.example = "user@example.com";
    registerSchema.properties.username.example = "user1";
    registerSchema.properties.nom.example = "Jean Dupont";
    registerSchema.properties.password.example = "Password123!";
  }

  if (loginSchema && loginSchema.properties) {
    loginSchema.properties.email.example = "user@example.com";
    loginSchema.properties.password.example = "Password123!";
  }
}

app.use(
  "/docs/v2",
  swaggerUi.serveFiles(swaggerV2),
  swaggerUi.setup(swaggerV2, { customSiteTitle: "API v2 (Mongo + JWT)" })
);

// --- Routes v2 ---
app.use("/api/v2/auth", v2AuthRoutes);
app.use("/api/v2", v2FilmRoutes);
app.use("/api/v2", v2SeriesRoutes);
app.use("/api/v2", v2UserRoutes);
app.use("/api/v2", v2SaisonRoutes);
app.use("/api/v2", v2EpisodeRoutes);
app.use("/api/v2", v2RatingRoutes);

app.use(notFoundHandler);

// --- Connexion MongoDB + serveurs ---
connectDB(mongoUri)
  .then(() => {
    if (serverConfig.https.enabled) {
      const options = {
        key: fs.readFileSync("./certs/key.pem"),
        cert: fs.readFileSync("./certs/cert.pem"),
      };

      https.createServer(options, app).listen(serverConfig.https.port, () => {
        console.log(` HTTPS server running on port ${serverConfig.https.port}`);
      });
    }

    if (serverConfig.http.enabled) {
      const httpPort = serverConfig.http.port || 3000;
      http.createServer(app).listen(httpPort, () => {
        console.log(` HTTP server running on port ${httpPort}`);
      });
    }

    console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });

export default app;
