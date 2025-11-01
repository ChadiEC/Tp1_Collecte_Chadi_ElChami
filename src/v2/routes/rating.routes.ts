// src/v2/routes/rating.routes.ts
import { Router } from "express";
import { verifyJWT } from "../middlewares/verifierToken";
import {postRatingController,getFilmAvgController,getSeriesAvgController} from "../controllers/rating.controller";

const router = Router();

router.post("/ratings", verifyJWT, postRatingController);
router.get("/ratings/avg/films/:filmId", getFilmAvgController);
router.get("/ratings/avg/series/:seriesId", getSeriesAvgController);

export default router;
