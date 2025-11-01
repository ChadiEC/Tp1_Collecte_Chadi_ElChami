import { Router } from "express";
import {createEpisodeController,listEpisodesController,getEpisodeController,updateEpisodeController,deleteEpisodeController} from "../controllers/episode.controller";
import { verifyJWT } from "../middlewares/verifierToken";

import { authorizeAdmin } from "../middlewares/authorizeAdmin";

const router = Router({mergeParams: true});


// CRUD d'épisodes sous une saison d'une série
router.post("/series/:seriesId/saisons/:saisonId/episodes", verifyJWT, authorizeAdmin, createEpisodeController);
router.get("/series/:seriesId/saisons/:saisonId/episodes", listEpisodesController);

router.get("/episodes/:id", getEpisodeController);
router.put("/episodes/:id", verifyJWT, authorizeAdmin, updateEpisodeController);
router.delete("/episodes/:id", verifyJWT, authorizeAdmin, deleteEpisodeController);

export default router;
