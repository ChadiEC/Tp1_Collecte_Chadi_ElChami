import { Router } from "express";
import { listUsers, getUser, createUser, deleteUser,addFavorite,removeFavorite,getUserMedias  } from "../controllers/user.controller";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = Router();


router.get("/users", listUsers);
router.get("/users/:id", getUser);
router.post("/users", requireAdmin, createUser);
router.delete("/users/:id", requireAdmin, deleteUser);
router.get("/users/:id/medias", getUserMedias);

router.post("/users/:id/favorites", addFavorite);
router.delete("/users/:id/favorites/:mediaId", removeFavorite);

export default router;
