import { Router } from "express";
import {
  listMedias, getMedia, createMedia, updateMedia, deleteMedia
} from "../controllers/medias.controller";
import { requireAdmin } from "../middlewares/auth.middleware";
import { validateMedia } from "../middlewares/validation.middleware";

const router = Router();

router.get("/medias", listMedias);
router.get("/medias/:id", getMedia);
router.post("/medias", requireAdmin, validateMedia, createMedia);
router.put("/medias/:id", requireAdmin, validateMedia, updateMedia);
router.delete("/medias/:id", requireAdmin, deleteMedia);

export default router;
