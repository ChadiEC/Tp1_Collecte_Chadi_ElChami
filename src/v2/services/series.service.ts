import { Series } from "../models/series.model";

type SeriesData = {
  titre: string;
  genre?: string[];
  status: "En cours" | "Terminer";
};

export async function createSeries(data: SeriesData) {
  return Series.create({
    titre: data.titre,
    genre: data.genre ?? [],
    status: data.status,
  });
}

export async function listSeriesPaginated(query: {
  genre?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, query.page || 1);
  const limit = Math.min(100, query.limit || 10);
  const filter: any = {};

  if (query.genre) filter.genre = { $in: [query.genre] };
  if (query.status) filter.status = query.status;

  const total = await Series.countDocuments(filter);
  const items = await Series.find(filter)
    .sort({ id: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}
export async function getSeriesById(id: number) {
  return Series.findOne({ id });
}

export async function updateSeries(id: number, patch: Partial<SeriesData>) {
  const doc = await Series.findOneAndUpdate({ id }, patch, { new: true });
  return doc;
}

export async function deleteSeries(id: number) {
  const doc = await Series.findOneAndDelete({ id });
  return !!doc;
}
