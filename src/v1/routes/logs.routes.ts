import { Router } from "express";
import { getLastLog } from "../controllers/logs.controller";

const router = Router();

router.get("/logs", getLastLog);

export default router;
