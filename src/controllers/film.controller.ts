import { Request, Response } from "express";
import * as filmService from "../services/film.service";
import { logger } from "../utils/logger";

export async function createFilm(req: Request, res: Response) {
  try {
    const film = await filmService.addFilm(req.body);
    logger.info({ action: "CREATE_FILM", id: film.id });
    res.status(201).json(film);
  } catch (err: any) {
    logger.error({ action: "ERROR_CREATE_FILM", error: err.message });
    res.status(400).json({ error: err.message });
  }
}
