import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";

export async function authMoiOuAdmin(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore
  const auth = req.user as { sub?: string; role?: string } | undefined;
  if (!auth) return res.status(401).json({ message: "Unauthorized" });
  if (auth.role === "admin") return next();

  const requestedId = Number(req.params.id);
  if (!Number.isInteger(requestedId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  const me = await UserModel.findOne({ _id: auth.sub }).select("id");
  if (!me) return res.status(401).json({ message: "Unknown user" });
  if (me.id !== requestedId) return res.status(403).json({ message: "Forbidden" });

  next();
}
