import { Router } from "express";
import {createSeriesController,listSeriesController,getSeriesController,updateSeriesController,deleteSeriesController,} from "../controllers/series.controller";
import { verifyJWT } from "../middlewares/verifierToken";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";
const router = Router();

router.post("/series", verifyJWT, authorizeAdmin, createSeriesController);
router.put("/series/:id", verifyJWT, authorizeAdmin, updateSeriesController);
router.delete("/series/:id", verifyJWT, authorizeAdmin, deleteSeriesController);

router.get("/series", listSeriesController);
router.get("/series/:id", getSeriesController);
export default router;
