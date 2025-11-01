import { Request, Response, NextFunction } from "express";

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
   //@ts-ignore
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ code: 403, message: "Forbidden: admin only" });
}
