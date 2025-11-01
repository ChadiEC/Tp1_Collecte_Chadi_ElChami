import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export function verifyJWT(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!token) return res.status(401).json({ code: 401, message: "Missing token" });

  const secret = config.get<string>("security.jwt.secret");
  if (!secret) return res.status(500).json({ code: 500, message: "JWT secret not configured" });

  try {
    const payload = jwt.verify(token, secret) as { sub: string; role: "user" | "admin" };
    req.user = { sub: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ code: 401, message: "Invalid token" });
  }
}
