import { readDb, writeDb } from "../utils/db";
import { Episode } from "../models/episode.model";

export async function addEpisode(data: any) {
  const db = await readDb();

    //ici on prend le dernier id de la table media pour faire +1 a la prochaine personne entrer sans le champ id dans la requete 
  const lastEpisode = db.medias[db.medias.length - 1];
  const id = lastEpisode ? (parseInt(lastEpisode.id ) + 1).toString() : "1";

  const serie = db.medias.find((m: any) => m.id === data.serieId && m.statut !== undefined);
  if (!serie) throw new Error("Serie not found");

  const saison = (serie.saisons || []).find((s: any) => s.numero === Number(data.saisonNumero));
  if (!saison) throw new Error("Saison not found");

  const episode = new Episode(
  //ici on prend l'id genere en haut comparer a data.id
  id, 
  data.titre,            
  Number(data.duree),     
  Number(data.numero), 
  false                 
);

  saison.episodes = saison.episodes || [];
  saison.episodes.push(episode);

  await writeDb(db);
  return episode;
}



export async function updateWatched(serieId: string, saisonNumero: string, episodeId: string, vu: boolean) {
  const db = await readDb();

  // Trouver la série
  const serie = db.medias.find(
    (m: any) => m.id === serieId && m.type === "serie"
  );
  if (!serie) return null;

  // Trouver la saison
  const saison = serie.saisons.find((s: any) => String(s.numero) === String(saisonNumero));
  if (!saison) return null;

  // Trouver l’épisode
  const episode = saison.episodes.find((e: any) => e.id === episodeId);
  if (!episode) return null;

  // Mettre à jour
  episode.vu = vu;
  await writeDb(db);

    return episode;
}
