import express, { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';
const app = express();
const port = 3000;


export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const msg = `404 - Not Found - ${req.method} ${req.originalUrl}`;
  logError(msg);
  res.status(404).json({ error: "Not Found" });
}


