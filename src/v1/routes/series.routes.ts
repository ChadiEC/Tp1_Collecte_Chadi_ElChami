import { Router } from "express";
import { createSerie, listSerieEpisodes } from "../controllers/series.controller";
import {patchEpisodeWatched} from "../controllers/episode.controller"
import { requireAdmin } from "../middlewares/auth.middleware";
import { validateMedia } from "../middlewares/validation.middleware";

const router = Router();

router.post("/series", requireAdmin, validateMedia, createSerie);
router.get("/series/:id/episodes", listSerieEpisodes);
router.patch("/series/:serieId/saisons/:saisonNumero/episodes/:episodeId", patchEpisodeWatched);


export default router;
