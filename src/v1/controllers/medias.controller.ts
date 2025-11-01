import { Request, Response } from "express";
import * as mediaService from "../services/media.service";

export async function listMedias(req: Request, res: Response) {
  const { type, genre, annee } = req.query;
  const filters = {
    type,
    genre,
    annee
  };

  const medias = await mediaService.getAllMedias(filters);
  res.json(medias);
}

export async function getMedia(req: Request, res: Response) {
  const media = await mediaService.getMediaById(req.params.id);
  if (!media) return res.status(404).json({ error: "Not found" });
  res.json(media);
}

export async function createMedia(req: Request, res: Response) {
  try {
    const media = await mediaService.addMedia(req.body);
    res.status(201).json(media);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateMedia(req: Request, res: Response) {
  try {
    const updated = await mediaService.updateMedia(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteMedia(req: Request, res: Response) {
  const deleted = await mediaService.deleteMedia(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json(deleted);
}
