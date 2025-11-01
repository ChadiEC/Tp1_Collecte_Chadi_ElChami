import { Request, Response } from "express";
import { createEpisode, listEpisodes, getEpisodeById, updateEpisode, deleteEpisode } from "../services/episode.service";

export async function createEpisodeController(req: Request, res: Response) {
  try {
    const seriesId = Number(req.params.seriesId);
    const saisonId = Number(req.params.saisonId);
    const { epNo, title, durationMin, vu } = req.body;
    if (!Number.isInteger(seriesId) || !Number.isInteger(saisonId) || !Number.isInteger(epNo) || epNo < 1) {
      return res.status(400).json({ message: "Paramètres invalides" });
    }
    const ep = await createEpisode(seriesId, saisonId, { epNo, title, durationMin, vu });
    res.status(201).json(ep);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function listEpisodesController(req: Request, res: Response) {
  try {
    const seriesId = Number(req.params.seriesId);
    const saisonId = Number(req.params.saisonId);
    const eps = await listEpisodes(seriesId, saisonId);
    res.json(eps);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function getEpisodeController(req: Request, res: Response) {
  const id = Number(req.params.episodeId ?? req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  const ep = await getEpisodeById(id);
  if (!ep) return res.status(404).json({ message: "Épisode introuvable" });
  res.json(ep);
}

export async function updateEpisodeController(req: Request, res: Response) {
  const id = Number(req.params.episodeId ?? req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  try {
    const updated = await updateEpisode(id, req.body);
    if (!updated) return res.status(404).json({ message: "Épisode introuvable" });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function deleteEpisodeController(req: Request, res: Response) {
  const id = Number(req.params.episodeId ?? req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  const ok = await deleteEpisode(id);
  if (!ok) return res.status(404).json({ message: "Épisode introuvable" });
  res.json({ ok: true });
}
