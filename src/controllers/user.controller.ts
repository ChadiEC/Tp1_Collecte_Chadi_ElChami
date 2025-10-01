import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { logger } from "../utils/logger";

export async function listUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userService.addUser(req.body);
    logger.info({ action: "CREATE_USER", id: user.id });
    res.status(201).json(user);
  } catch (err: any) {
    logger.error({ action: "ERROR_CREATE_USER", error: err.message });
    res.status(400).json({ error: err.message });
  }
}

export async function addFavorite(req: Request, res: Response) {
  try {
    const favorites = await userService.addFavorite(req.params.id, req.body.mediaId);
    res.json({ message: "Média ajouté aux favoris", favorites });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function removeFavorite(req: Request, res: Response) {
  try {
    const favorites = await userService.removeFavorite(req.params.id, req.params.mediaId);
    res.json({ message: "Média retiré des favoris", favorites });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}


export async function getUserMedias(req: Request, res: Response) {
  try {
    const medias = await userService.getUserMedias(req.params.id);
    res.json(medias);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
}



export async function deleteUser(req: Request, res: Response) {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ error: "User not found" });
  logger.info({ action: "DELETE_USER", id: req.params.id });
  res.json(deleted);
}
