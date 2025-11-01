import { Film } from "../models/film.model";

type FilmData = {
  titre: string;
  genre?: string[];
  note?: number;
  annee?: string | Date;
  duree: number;
  plateforme?: string;
  vu?: boolean;
};

export async function createFilm(data: FilmData) {
  return Film.create({
    titre: data.titre,
    genre: data.genre ?? [],
    note: data.note ?? 0,
    annee: data.annee ? new Date(data.annee) : undefined,
    duree: data.duree,
    plateforme: data.plateforme ?? "",
    vu: data.vu ?? false,
  });
}

export async function listFilms() {
return Film.find().sort({ id: 1 }).lean();
}

export async function listFilmsPaginated(query: {
  genre?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, query.page || 1);
  const limit = Math.min(100, query.limit || 10);
  const filter: any = {};

  if (query.genre) filter.genre = query.genre;

  const total = await Film.countDocuments(filter);
  const items = await Film.find(filter)
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

export async function getFilmById(id: number) {
  return Film.findOne({ id });
}

export async function updateFilm(id: number, patch: Partial<FilmData>) {
  const doc = await Film.findOneAndUpdate({ id }, patch, { new: true }).lean();
  return doc;
}

export async function deleteFilm(id: number) {
  const doc = await Film.findOneAndDelete({ id });
  return !!doc;
}
