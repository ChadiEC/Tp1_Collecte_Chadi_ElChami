import { Request, Response } from "express";
import { createSaison, listSaisons, getSaisonById, updateSaison, deleteSaison } from "../services/saison.service";

export async function createSaisonController(req: Request, res: Response) {
  try {
    const seriesId = Number(req.params.seriesId);
    const { saisonNo } = req.body;
    if (!Number.isInteger(seriesId) || !Number.isInteger(saisonNo) || saisonNo < 1) {
      return res.status(400).json({ message: "Paramètres invalides" });
    }
    const saison = await createSaison(seriesId, saisonNo);
    res.status(201).json(saison);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function listSaisonsController(req: Request, res: Response) {
  const seriesId = req.params.seriesId ? Number(req.params.seriesId) : undefined;
  try {
    const saisons = await listSaisons(seriesId);
    res.json(saisons);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function getSaisonController(req: Request, res: Response) {
  const id = Number(req.params.saisonId ?? req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  const saison = await getSaisonById(id);
  if (!saison) return res.status(404).json({ message: "Saison introuvable" });
  res.json(saison);
}

export async function updateSaisonController(req: Request, res: Response) {
  const id = Number(req.params.saisonId ?? req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  try {
    const updated = await updateSaison(id, req.body);
    if (!updated) return res.status(404).json({ message: "Saison introuvable" });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function deleteSaisonController(req: Request, res: Response) {
  const id = Number(req.params.saisonId ?? req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  const ok = await deleteSaison(id);
  if (!ok) return res.status(404).json({ message: "Saison introuvable" });
  res.json({ ok: true });
}
