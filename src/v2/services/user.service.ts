import { UserModel } from "../models/user.model";
import { Film } from "../models/film.model";
import { Series } from "../models/series.model";

type Kind = "Film" | "Series";

export async function getUsersById(id: number) {
  return UserModel.findOne({ id });
}

export async function getUserByObjectId(id: number) {
  return UserModel.findOne({id});
}

export async function updateUserProfile(id: number, patch: { username?: string }) {
  return UserModel.findOneAndUpdate({id}, patch, { new: true });
}


// ✅ On stocke maintenant le champ "id" (numérique) du film/série dans favorites
export async function addFavorite(userIdParam: string, kind: Kind, targetIdParam: number | string) {
  const userId = Number(userIdParam);
  const targetId = Number(targetIdParam);
  if (!Number.isInteger(userId) || !Number.isInteger(targetId)) throw new Error("ID invalide");

  const me = await UserModel.findOne({ id: userId }).select("_id favorites");
  if (!me) throw new Error("Utilisateur introuvable");

  const Model = kind === "Film" ? Film : Series;
  //@ts-ignore
  const target = await Model.findOne({ id: targetId }); // ✅ on ne sélectionne plus _id
  if (!target) throw new Error(`${kind} introuvable`);

  // ✅ on vérifie en fonction du targetId numérique
  const exists = me.favorites.some(f => f.kind === kind && f.targetId === target.id);
  if (exists) throw new Error("Déjà en favoris");

  // ✅ push du favori avec targetId numérique
  me.favorites.push({ kind, targetId: target.id });
  await me.save();

  return me.favorites;
}

// ✅ même logique ici
export async function removeFavorite(userIdParam: string, kind: Kind, targetIdParam: number | string) {
  const userId = Number(userIdParam);
  const targetId = Number(targetIdParam);
  if (!Number.isInteger(userId) || !Number.isInteger(targetId)) throw new Error("ID invalide");

  const me = await UserModel.findOne({ id: userId }).select("_id favorites");
  if (!me) throw new Error("Utilisateur introuvable");

  // ✅ supprime selon targetId numérique
  //@ts-ignore
  me.favorites = me.favorites.filter(f => !(f.kind === kind && f.targetId === targetId));
  await me.save();

  return me.favorites;
}

// ✅ plus besoin de populate ici, on ne stocke pas d’ObjectId
export async function getUserFavorites(userIdParam: string) {
  const userId = Number(userIdParam);
  if (!Number.isInteger(userId)) throw new Error("ID invalide");

  const user = await UserModel.findOne({ id: userId }).lean();
  if (!user) throw new Error("Utilisateur introuvable");

  const favs = user.favorites ?? [];
  return {
    films: favs.filter(f => f.kind === "Film"),
    series: favs.filter(f => f.kind === "Series")
  };
}
