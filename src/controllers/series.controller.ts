import { Request, Response } from "express";
import * as seriesService from "../services/series.service";
import { logger } from "../utils/logger";

export async function createSerie(req: Request, res: Response) {
  try {
    const serie = await seriesService.addSerie(req.body);
    logger.info({ action: "CREATE_SERIE", id: serie.id });
    res.status(201).json(serie);
  } catch (err: any) {
    logger.error({ action: "ERROR_CREATE_SERIE", error: err.message });
    res.status(400).json({ error: err.message });
  }
}

export async function listSerieEpisodes(req: Request, res: Response) {
  const episodes = await seriesService.getEpisodesBySerie(req.params.id);
  if (!episodes) return res.status(404).json({ error: "Serie not found" });
  res.json(episodes);
}
