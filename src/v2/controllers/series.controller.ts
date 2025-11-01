import { Request, Response } from "express";
import {
  createSeries,
  listSeriesPaginated,
  getSeriesById,
  updateSeries,
  deleteSeries,
} from "../services/series.service";

export async function createSeriesController(req: Request, res: Response) {
  try {
    const serie = await createSeries(req.body);
    res.status(201).json(serie);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function listSeriesController(req: Request, res: Response) {
  try {
    const { genre, status, page, limit } = req.query;
    const data = await listSeriesPaginated({
      genre: genre as string,
      status: status as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });
    res.json(data);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}
export async function getSeriesController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const serie = await getSeriesById(id);
  if (!serie) return res.status(404).json({ message: "Série introuvable" });
  res.json(serie);
}

export async function updateSeriesController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = await updateSeries(id, req.body);
  if (!updated) return res.status(404).json({ message: "Série introuvable" });
  res.json(updated);
}

export async function deleteSeriesController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await deleteSeries(id);
  if (!deleted) return res.status(404).json({ message: "Série introuvable" });
  res.json({ ok: true });
}
