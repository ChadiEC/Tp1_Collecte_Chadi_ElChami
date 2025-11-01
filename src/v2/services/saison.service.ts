import { Saison } from "../models/saison.model";
import { Series } from "../models/series.model";

/** crée une saison sous une série (id auto-inc de la série) */
export async function createSaison(seriesNumericId: number, saisonNo: number) {
  const series = await Series.findOne({ id: seriesNumericId }).select("_id");
  if (!series) throw new Error("Série introuvable");

  return Saison.create({
    seriesId: series._id,
    saisonNo,
  });
}

export async function listSaisons(seriesNumericId?: number) {
  if (Number.isInteger(seriesNumericId)) {
    const s = await Series.findOne({ id: seriesNumericId }).select("_id");
    if (!s) throw new Error("Série introuvable");
    return Saison.find({ seriesId: s._id }).sort({ saisonNo: 1 }).lean();
  }
  return Saison.find().sort({ id: 1 }).lean();
}

export async function getSaisonById(saisonNumericId: number) {
  return Saison.findOne({ id: saisonNumericId }).lean();
}

export async function updateSaison(saisonNumericId: number, patch: { saisonNo?: number }) {
  return Saison.findOneAndUpdate({ id: saisonNumericId }, patch, { new: true }).lean();
}

export async function deleteSaison(saisonNumericId: number) {
  const doc = await Saison.findOneAndDelete({ id: saisonNumericId });
  return !!doc;
}
