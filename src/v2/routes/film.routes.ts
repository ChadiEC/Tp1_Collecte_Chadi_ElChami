import { Router } from "express";
import {createFilmController,listFilmsController,getFilmController,updateFilmController, deleteFilmController,} from "../controllers/film.controller";
import { verifyJWT } from "../middlewares/verifierToken";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";

const router = Router();

// admin-only pour créer / modifier / supprimer
router.post("/films", verifyJWT, authorizeAdmin, createFilmController);
router.put("/films/:id", verifyJWT, authorizeAdmin, updateFilmController);
router.delete("/films/:id", verifyJWT, authorizeAdmin, deleteFilmController);

// lecture publique
router.get("/films", listFilmsController);
router.get("/films/:id", getFilmController);

export default router;
