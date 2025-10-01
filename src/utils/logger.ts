import winston from "winston";
import fs from "fs";
import path, { format } from "path";


// S'assurer que le dossier logs existe
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.json()
  ),
   transports: [
    // Affiche les information dans la console
    //et aussi dans un fichier 
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, "actions.log"),
      level: "info"
      }),
    new winston.transports.File({
      filename: path.join(logDir, "errors.log"),
      level: "error"
    })
  ],
  
});

export function getLastAction(): string | null {
  if (actions.length === 0) return null;
  return actions[actions.length - 1];
}

//save les action 
const actions: string[] = [];
export function logAction(message: string) {
  logger.info(message);
  actions.push(`${new Date().toISOString()} - ${message}`);
}

//save les erreur
const errors: string[] = [];
export function logError(message: string) {
  logger.error(message);
  errors.push(`${new Date().toISOString()} - ${message}`);
}

export function getAllActions(): string[] {
  return actions;
}

export function getAllErrors(): string[] {
  return errors;
}