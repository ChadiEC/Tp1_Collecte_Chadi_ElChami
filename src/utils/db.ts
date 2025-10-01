import { readFile, writeFile } from "fs/promises";
import path from "path";
const DB_PATH = path.resolve("src/data/db.json");

type DbShape = {
  medias: any[];
  users: { id: string;email: string;password:string; nom: string; role: "admin"|"user"; favorites: string[] }[];
};

export async function readDb(): Promise<DbShape> {
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}
export async function writeDb(db: DbShape): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}
