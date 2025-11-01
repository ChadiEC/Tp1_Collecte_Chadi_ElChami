import { Router } from "express";
import { verifyJWT } from "../../v2/middlewares/verifierToken"; 
import { authMoiOuAdmin } from "../middlewares/authMoiOuAdmin";
import {getUserController,getFavoritesController,addFavoriteController,removeFavoriteController,getMeController,updateMeController} from "../../v2/controllers/user.controller";

const router = Router();

router.get("/users/me", verifyJWT, getMeController);
router.patch("/users/me", verifyJWT, updateMeController);
router.get("/users/:id",getUserController )
router.get("/users/:id/favorites", verifyJWT,getFavoritesController);
router.post("/users/:id/favorites", verifyJWT, addFavoriteController);
router.delete("/users/:id/favorites/:kind/:targetId", verifyJWT, removeFavoriteController);

export default router;
