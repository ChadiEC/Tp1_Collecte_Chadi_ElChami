import { Router } from "express";
import { addEpisode } from "../controllers/episode.controller";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/episodes", requireAdmin, addEpisode);


export default router;
