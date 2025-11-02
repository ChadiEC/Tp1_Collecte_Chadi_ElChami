import { Router } from "express";
import { loginLimiter } from "../middlewares/rateLimit";
import { registerController, loginController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginLimiter,loginController);

export default router;
