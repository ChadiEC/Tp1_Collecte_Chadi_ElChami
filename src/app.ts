import express from "express";
import userRoutes from "./routes/user.routes";
import mediaRoutes from "./routes/media.routes";
import filmRoutes from "./routes/film.routes";
import seriesRoutes from "./routes/series.routes";
import saisonRoutes from "./routes/saison.routes";
import episodeRoutes from "./routes/episode.routes";
import logRoutes from "./routes/logs.routes"
import {notFoundHandler } from "./middlewares/error.middleware";


const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", mediaRoutes);
app.use("/api", filmRoutes);
app.use("/api", seriesRoutes);
app.use("/api", saisonRoutes);
app.use("/api", episodeRoutes);
app.use("/api",logRoutes);

app.use(notFoundHandler);

const PORT = process.env.PORT || 9594;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
