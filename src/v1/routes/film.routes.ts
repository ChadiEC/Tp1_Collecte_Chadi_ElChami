import { Router } from "express";
import { createFilm } from "../controllers/film.controller";
import { requireAdmin } from "../middlewares/auth.middleware";
import { validateMedia } from "../middlewares/validation.middleware";

const router = Router();

router.post("/films", requireAdmin, validateMedia, createFilm);

export default router;
