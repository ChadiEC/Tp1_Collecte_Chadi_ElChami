import { Router } from "express";
import {createSaisonController,listSaisonsController,getSaisonController,updateSaisonController,deleteSaisonController} from "../controllers/saison.controller";
import { verifyJWT } from "../middlewares/verifierToken";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";

const router = Router();

// CRUD sous une série
router.post("/series/:seriesId/saisons", verifyJWT, authorizeAdmin, createSaisonController);
router.get("/series/:seriesId/saisons", listSaisonsController);

// Accès direct par id de saison si tu veux
router.get("/saisons/:id", getSaisonController);
router.put("/saisons/:id", verifyJWT, authorizeAdmin, updateSaisonController);
router.delete("/saisons/:id", verifyJWT, authorizeAdmin, deleteSaisonController);

export default router;
