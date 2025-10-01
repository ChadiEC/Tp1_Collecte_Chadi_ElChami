import { readDb, writeDb } from "../utils/db";
import { Film } from "../models/film.model";
import { Serie } from "../models/serie.model";

//ici on donne un filtre en paramètre.
export async function getAllMedias(filters?: any) {
  const db = await readDb();
  let medias = db.medias;

  if (filters) {
    if (filters.type) {
      medias = medias.filter((m: any) => m.type === filters.type);
    }
    if (filters.genre) {
      medias = medias.filter((m: any) => m.genre.toLowerCase() === filters.genre.toLowerCase());
    }
    if (filters.annee) {
      medias = medias.filter((m: any) => String(m.annee) === String(filters.annee));
    }
  }

  return medias;
}

export async function getMediaById(id: string) {
  const db = await readDb();
  return db.medias.find((m: any) => m.id === id);
}


export async function addMedia(data: any) {
  const db = await readDb();

  //ici on prend le dernier id de la table media pour faire +1 a la prochaine personne entrer sans le champ id dans la requete 
  const lastMedia = db.medias[db.medias.length - 1];
  const id = lastMedia ? (parseInt(lastMedia.id ) + 1).toString() : "1";

  //ici on check si le role est film ou serie, et tout dépendament du role donner dans la requette, on cree un noveau sois serie soit film
  let media: any;
  if (data.type === "film") {
    media = new Film(id, 
      data.titre, 
      data.plateforme, 
      data.userId, 
      data.duree, 
      data.genre, 
      data.annee);
  } 
  else if (data.type === "serie") {
    media = new Serie(
      id,
      data.title,         
      data.genre,         
      Number(data.year),  
      Number(data.rating),
      data.plateforme,
      data.status ?? "En cours", 
      []);
  } 
  else {
    throw new Error("Invalid type");
  }
  //on push simplment dans la bd grace au methode utilitaire dans ./utils/db.ts
  db.medias.push(media);
  await writeDb(db);
  return media;
}

export async function updateMedia(id: string, updates: any) {
  const db = await readDb();
  const index = db.medias.findIndex((m: any) => m.id === id);
  if (index === -1) 
    return null;

  //Le "...updates" permet d’écraser que les champs qu'on met dans la requete sans toucher aux autres.
  db.medias[index] = { ...db.medias[index], ...updates };
  await writeDb(db);
  return db.medias[index];
}

export async function deleteMedia(id: string) {
  const db = await readDb();
  const index = db.medias.findIndex((m: any) => m.id === id);
  if (index === -1) 
    return null;

  const [removed] = db.medias.splice(index, 1);
  await writeDb(db);
  return removed;
}
