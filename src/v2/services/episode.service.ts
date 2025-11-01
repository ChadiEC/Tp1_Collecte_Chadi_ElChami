import { Saisons } from "../../v1/models/saison.model";
import { Episode } from "../models/episode.model";
import { Saison } from "../models/saison.model";
import { Series } from "../models/series.model";

type EpisodeData = {
  epNo: number;
  title: string;
  durationMin: number;
  vu?: boolean;
};

/** crée un épisode sous (seriesId, saisonId) numéraux */
export async function createEpisode(seriesNumericId: number, saisonNumericId: number, data: EpisodeData) {
  const series = await Series.findOne({ id: seriesNumericId }).select("_id");
  if (!series) throw new Error("Série introuvable");

  const saison = await Saison.findOne({ id: saisonNumericId }).select("_id seriesId");
  if (!saison) throw new Error("Saison introuvable");
  if (String(saison.seriesId) !== String(series._id)) {
    throw new Error("La saison ne correspond pas à la série");
  }

  return Episode.create({
    seriesId: series._id,
    saisonId: saison._id,
    epNo: data.epNo,
    title: data.title,
    durationMin: data.durationMin,
    vu: data.vu ?? false,
  });
}

export async function listEpisodes(seriesNumericId: number, saisonNumericId: number) {
  const series = await Series.findOne({ id: seriesNumericId }).select("_id");
  if (!series) throw new Error("Série introuvable");

  const saison = await Saison.findOne({ id: saisonNumericId }).select("_id seriesId");
  if (!saison) throw new Error("Saison introuvable");
  if (String(saison.seriesId) !== String(series._id)) {
    throw new Error("La saison ne correspond pas à la série");
  }

  return Episode.find({ seriesId: series._id,saisonId: saison._id })
    .sort({ epNo: 1 })
    .lean();
}

export async function getEpisodeById(episodeNumericId: number) {
  return Episode.findOne({ id: episodeNumericId }).lean();
}

export async function updateEpisode(episodeNumericId: number, patch: Partial<EpisodeData>) {
  return Episode.findOneAndUpdate({ id: episodeNumericId }, patch, { new: true }).lean();
}

export async function deleteEpisode(episodeNumericId: number) {
  const doc = await Episode.findOneAndDelete({ id: episodeNumericId });
  return !!doc;
}
