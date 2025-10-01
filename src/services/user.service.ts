import { readDb, writeDb } from "../utils/db";

export async function getAllUsers() {
  const db = await readDb();
  return db.users;
}

export async function getUserById(id: string) {
  const db = await readDb();
  return db.users.find((u: any) => u.id === id);
}

export async function addUser(data: any) {
  const db = await readDb();
 
  if (!data.email || !data.role || !data.nom) throw new Error("Missing 'email', 'name' or 'role'");
  if (!["admin", "user"].includes(data.role)) throw new Error("Invalid role");

  const lastUser = db.users[db.users.length - 1];
  const id = lastUser ? (parseInt(lastUser.id ) + 1).toString() : "1";
  
  const user = { 
     id,
     nom: data.nom,
     email: data.email,
     password: data.password,
     role: data.role,
     favorites: [] 
    };
  db.users.push(user);

  await writeDb(db);
  return user;
}

//ici je stock les id de media dans ma liste de favorie que mon user va ajouter avec l'endpoint dédier
export async function addFavorite(userId: string, mediaId: string) {
  const db = await readDb();
  const user = db.users.find((u: any) => u.id === userId) as any;
  if (!user) throw new Error("Utilisateur introuvable");

  if (!db.medias.find((m: any) => m.id === mediaId)) {
    throw new Error("Média introuvable");
  }

  if (!user.favorites) user.favorites = [];

  //evite les doublons
  if (!user.favorites.includes(mediaId)) {
    user.favorites.push(mediaId);
  }

  await writeDb(db);
  return user.favorites;
}

//ici je l'enelevb
export async function removeFavorite(userId: string, mediaId: string) {
  const db = await readDb();
  const user = db.users.find((u: any) => u.id === userId) as any;
  if (!user) throw new Error("Utilisateur introuvable");

  if (!user.favorites) user.favorites = [];
  user.favorites = user.favorites.filter((id: string) => id !== mediaId);

  await writeDb(db);
  return user.favorites;
}

//ici je recupere les media favorie en donnant l'id de mon user en requette et sa va voir dans sa liste de favorites
export async function getUserMedias(userId: string) {
  const db = await readDb();
  const user = db.users.find((u: any) => u.id === userId) as any;
  if (!user) throw new Error("Utilisateur introuvable");

  if (!user.favorites || user.favorites.length === 0) return [];

  //ici on compare l'id en string dans la liste de favorie a ceux dans media, et les media dont l'id se retrouve dans la
  //liste favorite de mon user et sa l'affiche 
  return db.medias.filter((m: any) =>
    user.favorites.includes(String(m.id)) 
  );
}


export async function deleteUser(id: string) {
  const db = await readDb();
  const index = db.users.findIndex((u: any) => u.id === id);
  if (index === -1) return null;

  const [removed] = db.users.splice(index, 1);
  await writeDb(db);
  return removed;
}
