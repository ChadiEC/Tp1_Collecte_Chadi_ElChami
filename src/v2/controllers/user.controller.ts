import { Request, Response } from "express";
import { getUsersById,addFavorite, removeFavorite, getUserFavorites,getUserByObjectId, updateUserProfile  } from "../../v2/services/user.service";

// Helpers de validation simples
function bad(res: Response, msg: string, code = 400) {
  return res.status(code).json({ message: msg });
}

export async function getUserController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await getUsersById(id);
  if (!user) return res.status(404).json({ message: "user introuvable" });
  res.json(user);
}

export async function getMeController(req: Request & { user?: any }, res: Response) {
  try {
    const userId = req.user?.sub;
    if (!userId) return res.status(401).json({ message: "Non authentifié" });

    const user = await getUserByObjectId(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    // on masque le mot de passe pour éviter toute fuite
    const { password, ...safeUser } = user.toObject();
    return res.json(safeUser);
  } catch (err: any) {
    return res.status(500).json({ message: "Erreur serveur", details: err.message });
  }
}

export async function updateMeController(req: Request & { user?: any }, res: Response) {
  try {
    const userId = req.user?.sub;
    if (!userId) return res.status(401).json({ message: "Non authentifié" });

    const { username } = req.body;
    if (!username || typeof username !== "string" || username.length < 3) {
      return res.status(400).json({ message: "Nom d'utilisateur invalide" });
    }

    const updated = await updateUserProfile(userId, { username });
    if (!updated) return res.status(404).json({ message: "Utilisateur introuvable" });

    const { password, ...safeUser } = updated.toObject();
    return res.json({ message: "Profil mis à jour", user: safeUser });
  } catch (err: any) {
    return res.status(500).json({ message: "Erreur serveur", details: err.message });
  }
}



export async function getFavoritesController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await getUserFavorites(id);
    return res.json(data);
  } catch (err: any) {
    return bad(res, err.message);
  }
}

export async function addFavoriteController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    const { kind, targetId } = req.body as { kind?: "Film" | "Series"; targetId?: number };

    if (!kind || !targetId) return bad(res, "Champs manquants : kind et targetId");

    //@ts-ignore
    const connectedId = req.user?.sub; 
    //@ts-ignore
    const userRole = req.user?.role;

    if (userRole !== "admin" && connectedId !== userId) {
      return bad(res, "Forbidden: accès non autorisé à cet utilisateur", 403);
    }

    //@ts-ignore
    const favorites = await addFavorite(userId, kind, targetId);
    return res.status(201).json(favorites);
  } catch (err: any) {
    return bad(res, err.message);
  }
}

export async function removeFavoriteController(req: Request, res: Response) {
  try {
    const { id, kind, targetId } = req.params;
    const favorites = await removeFavorite(id, kind as "Film" | "Series", Number(targetId));
    return res.json(favorites);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}
