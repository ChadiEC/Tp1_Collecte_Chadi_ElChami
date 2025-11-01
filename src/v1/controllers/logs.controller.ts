import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export async function getLastLog(req: Request, res: Response) {
  const logFile = path.join("logs", "actions.log");
  if (!fs.existsSync(logFile)) {
    return res.status(404).json({ message: "Aucun log trouvé" });
  }

  const logs = fs.readFileSync(logFile, "utf-8").trim().split("\n");
  const last = logs[logs.length - 1];
  res.json({ lastAction: JSON.parse(last) });
}