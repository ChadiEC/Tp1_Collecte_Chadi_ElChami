import { Request, Response, NextFunction } from "express";

const regx = {
  titre: /^[\p{L}\p{N} ]+$/u,
  plateforme: /^[A-Za-z]+$/,
  duree: /^[1-9]\d*$/,
  statut: /^(en_attente|en_cours|terminee)$/,
};

export function validateMedia(req: Request, res: Response, next: NextFunction) {
  const b = req.body;
  if (!b?.titre || !regx.titre.test(b.titre)) 
    return res.status(400).json({ error: `Invalid 'titre': ${b.titre}` });
  if (!b?.plateforme || !regx.plateforme.test(b.plateforme)) 
    return res.status(400).json({ error: `Invalid 'plateforme': ${b.plateforme}` });

  if (b.type === "film") {
    const year = Number(b.annee);
    const now = new Date().getFullYear();
    if (!regx.duree.test(String(b.duree))) 
      return res.status(400).json({ error: "Invalid 'duree'." });
    if (!b.genre) 
      return res.status(400).json({ error: "Missing 'genre'." });
    if (!Number.isInteger(year) || year > now) 
      return res.status(400).json({ error: "Invalid 'annee'." });
  }

  if (b.type === "serie") {
    if(!b.statut){
      b.statut = "en_attente";
    }
    else if (!regx.statut.test(b.statut)) 
      return res.status(400).json({ error: "Invalid 'statut'." });
  }
  
  next();
}
