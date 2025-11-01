import { Types } from "mongoose";
import { Rating } from "../models/rating.model";
import { Film } from "../models/film.model";
import { Episode } from "../models/episode.model";
import { Series } from "../models/series.model";

export type TargetKind = "film" | "episode";

function assertScore(score: unknown) {
  if (typeof score !== "number" || Number.isNaN(score) || score < 0 || score > 10) {
    throw new Error("Score invalide (0–10)");
  }
}

async function resolveTargetMongoId(target: TargetKind, numericId: number) {
  if (!Number.isInteger(numericId)) throw new Error("targetId invalide");
  if (target === "film") {
    const film = await Film.findOne({ id: numericId }).select("_id");
    if (!film) throw new Error("Film introuvable");
    return film._id as Types.ObjectId;
  } else {
    const ep = await Episode.findOne({ id: numericId }).select("_id");
    if (!ep) throw new Error("Épisode introuvable");
    return ep._id as Types.ObjectId;
  }
}

/** POST idempotent: un user a UNE note par cible (crée ou remplace) */
export async function upsertMyRating(
  userId: string,
  target: TargetKind,
  targetIdNumeric: number,
  score: number,
  review?: string
) {
  if (!Types.ObjectId.isValid(userId)) throw new Error("Utilisateur invalide");
  assertScore(score);

  const targetMongoId = await resolveTargetMongoId(target, targetIdNumeric);

  const rating = await Rating.findOneAndUpdate(
    { userId: new Types.ObjectId(userId), target, targetId: targetMongoId },
    { $set: { score, review } },
    { new: true, upsert: true }
  );

  return rating;
}

/** Moyenne d’un film (par id auto-inc) — sans pipeline */
export async function getFilmAverage(filmNumericId: number) {
  const film = await Film.findOne({ id: filmNumericId }).select("_id");
  if (!film) throw new Error("Film introuvable");

  const ratings = await Rating.find({ target: "film", targetId: film._id })
    .select("score")
    .lean();

  const count = ratings.length;
  const avg = count ? ratings.reduce((s, r) => s + (r.score ?? 0), 0) / count : 0;

  return { avg, count };
}

/** Moyenne d’une série = moyenne des notes de TOUS ses épisodes — sans pipeline */
export async function getSeriesEpisodesAverage(seriesNumericId: number) {
  const series = await Series.findOne({ id: seriesNumericId }).select("_id");
  if (!series) throw new Error("Série introuvable");

  // 1) récupérer les _id des épisodes de la série
  const episodes = await Episode.find({ seriesId: series._id }).select("_id").lean();
  if (!episodes.length) return { avg: 0, count: 0 };

  const epIds = episodes.map(e => e._id as Types.ObjectId);

  // 2) récupérer toutes les notes de ces épisodes
  const ratings = await Rating.find({
    target: "episode",
    targetId: { $in: epIds }
  })
    .select("score")
    .lean();

  const count = ratings.length;
  const avg = count ? ratings.reduce((s, r) => s + (r.score ?? 0), 0) / count : 0;

  return { avg, count };
}
