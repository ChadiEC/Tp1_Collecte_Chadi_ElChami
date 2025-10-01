import { Request, Response } from "express";
import * as saisonService from "../services/saison.service";
import { logger } from "../utils/logger";

export async function addSeason(req: Request, res: Response) {
  try {
    const saison = await saisonService.addSeason(req.body);
    logger.info({ action: "ADD_SAISON", serieId: req.body.serieId });
    res.status(201).json(saison);
  } catch (err: any) {
    logger.error({ action: "ERROR_ADD_SAISON", error: err.message });
    res.status(400).json({ error: err.message });
  }
}
