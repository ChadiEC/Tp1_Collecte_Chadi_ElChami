import { Router } from "express";
import { addSeason } from "../controllers/saison.controller";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/saisons", requireAdmin, addSeason);

export default router;
