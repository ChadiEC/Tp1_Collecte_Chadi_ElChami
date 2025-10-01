import { Request, Response } from "express";
import * as episodeService from "../services/episode.service";
import { logger } from "../utils/logger";

export async function addEpisode(req: Request, res: Response) {
  try {
    const episode = await episodeService.addEpisode(req.body);
    logger.info({ action: "ADD_EPISODE", serieId: req.body.serieId });
    res.status(201).json(episode);
  } catch (err: any) {
    logger.error({ action: "ERROR_ADD_EPISODE", error: err.message });
    res.status(400).json({ error: err.message });
  }
}

export async function patchEpisodeWatched(req: Request, res: Response) {
  try {
    const { serieId, saisonNumero, episodeId } = req.params;
    const { vu } = req.body;

    const episode = await episodeService.updateWatched(serieId, saisonNumero, episodeId, vu);

    if (!episode) return res.status(404).json({ error: "Épisode non trouvé" });

    logger.info({ action: "PATCH_EPISODE", serieId, saisonNumero, episodeId, vu });
    res.json({ message: "Épisode mis à jour", episode });
  } catch (err: any) {
    logger.error({ action: "ERROR_PATCH_EPISODE", error: err.message });
    res.status(400).json({ error: err.message });
  }
}
