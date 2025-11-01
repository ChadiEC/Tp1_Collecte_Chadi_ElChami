import { Request, Response } from "express";
import {upsertMyRating,getFilmAverage,getSeriesEpisodesAverage,TargetKind} from "../services/rating.service";

export async function postRatingController(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.sub;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let { target, targetId, score, review } = req.body as {
      target: string; targetId: number | string; score: number | string; review?: string;
    };

    // normalise la casse pour coller à l’énoncé ("film" | "episode")
    target = String(target || "").toLowerCase();
    if (target !== "film" && target !== "episode") {
      return res.status(400).json({ message: 'target doit être "film" ou "episode"' });
    }

    const rating = await upsertMyRating(
      userId,
      target as TargetKind,
      Number(targetId),
      Number(score),
      review
    );

    res.status(201).json(rating);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function getFilmAvgController(req: Request, res: Response) {
  try {
    const filmId = Number(req.params.filmId); // route: /ratings/avg/film/:filmId
    if (!Number.isInteger(filmId)) return res.status(400).json({ message: "filmId invalide" });

    const data = await getFilmAverage(filmId);
    res.json(data); // { avg, count }
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export async function getSeriesAvgController(req: Request, res: Response) {
  try {
    const seriesId = Number(req.params.seriesId); // route: /ratings/avg/series/:seriesId
    if (!Number.isInteger(seriesId)) return res.status(400).json({ message: "seriesId invalide" });

    const data = await getSeriesEpisodesAverage(seriesId);
    res.json(data); // { avg, count }
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}
