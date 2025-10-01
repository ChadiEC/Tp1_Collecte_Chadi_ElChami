import { Request, Response, NextFunction } from "express";
import { readDb } from "../utils/db";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const userId = req.header("userID");
  if (!userId) return res.status(401).json({ error: "Missing userID" });
  const db = await readDb();
  const u = db.users.find(u => u.id === userId);
  if (!u) return res.status(401).json({ error: "Unknown user" });
  if (u.role !== "admin") return res.status(403).json({ error: "Admin required" });
  next();
}
