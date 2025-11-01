import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export async function registerController(req: Request, res: Response) {
  try {
    const { email, username, password, nom, role } = req.body;

    if (!nom || typeof nom !== "string" || !nom.trim()) {
      return res.status(400).json({ message: "Le champ 'nom' est requis" });
    }

    const result = await registerUser({ email, username, password, nom, role });
    return res.status(201).json(result);
  } catch (err: any) {
    if (err.message.includes("Email already used")) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(400).json({ message: err.message });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    return res.json(result);
  } catch (err: any) {
    if (err.message === "Invalid credentials") {
      return res.status(401).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}
