import { readDb, writeDb } from "../utils/db";
import { Saisons } from "../models/saison.model";

export async function addSeason(data: any) {
  
  const db = await readDb();
  const serie = db.medias.find((m: any) => m.id === data.serieId && m.statut !== undefined);
  if (!serie) throw new Error("Serie not found");

  //Si serie.saisons vaut est nulle elle est remplacée par un tableau vide
  serie.saisons = serie.saisons || [];
  const saison = new Saisons(Number(data.numero), []);
  serie.saisons.push(saison);

  await writeDb(db);
  return saison;
}
