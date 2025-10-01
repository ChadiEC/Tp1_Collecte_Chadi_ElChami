import { readDb, writeDb } from "../utils/db";
import { Serie } from "../models/serie.model";

export async function addSerie(data: any) {
  const db = await readDb();

  const lastMedia = db.medias[db.medias.length - 1];
  const id = lastMedia ? (parseInt(lastMedia.id) + 1).toString() : "1";

  const serie = new Serie(
    id,
    data.titre,        
    data.genre,
    Number(data.annee), 
    Number(data.note),
    data.plateforme,
    data.statut ?? "En cours",
    []
  );

  db.medias.push(serie);
  await writeDb(db);
  return serie;
}

export async function getEpisodesBySerie(serieId: string) {
  const db = await readDb();
  const serie = db.medias.find((m: any) => m.id === serieId && m.saison !== undefined);
  if (!serie) return null;

  return (serie.saison ?? []).flatMap((s: any) => s.episodes ?? []);
}
