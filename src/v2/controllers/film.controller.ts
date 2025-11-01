import { Request, Response } from "express";
import { createFilm,listFilmsPaginated, getFilmById, updateFilm, deleteFilm } from "../services/film.service";

export async function createFilmController(req: Request, res: Response) {
  try {
    const film = await createFilm(req.body);
    res.status(201).json(film);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}


export async function listFilmsController(req: Request, res: Response) {
  try {
    const { genre, page, limit } = req.query;
    const data = await listFilmsPaginated({
      genre: genre as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ message: "Erreur serveur", details: e.message });
  }
}

export async function getFilmController(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  const film = await getFilmById(id);
  if (!film) return res.status(404).json({ message: "Film introuvable" });
  res.json(film);
}

export async function updateFilmController(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  const updated = await updateFilm(id, req.body);
  if (!updated) return res.status(404).json({ message: "Film introuvable" });
  res.json(updated);
}

export async function deleteFilmController(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
  const ok = await deleteFilm(id);
  if (!ok) return res.status(404).json({ message: "Film introuvable" });
  res.json({ ok: true });
}
