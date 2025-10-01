import { readDb, writeDb } from "../utils/db";
import { Film } from "../models/film.model";

export async function addFilm(data: any) {
  const db = await readDb();
  
  const lastMedia = db.medias[db.medias.length - 1];
  const id = lastMedia ? (parseInt(lastMedia.id) + 1).toString() : "1";

  const film = new Film(
    id,
    data.titre,
    data.genre,
    Number(data.annee),
    Number(data.note),
    data.duree,
    data.plateforme,
    data.vu ?? false
  );

  db.medias.push(film);
  await writeDb(db);
  return film;
}

