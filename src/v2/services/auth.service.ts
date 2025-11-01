import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import { UserModel } from "../models/user.model";

const SALT_ROUNDS = 10;

export async function registerUser(data: {
  email: string;
  username: string;
  password: string;
  nom: string;
  role?: string;
}) {
  const { email, username, password, nom, role } = data;

  // Vérifie si déjà existant
  const exists = await UserModel.findOne({ email }).lean();
  if (exists) throw new Error("Email already used");

  // Hash mot de passe
  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  // Rôle admin seulement en dev et test
  let assignedRole = "user";

if ((process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") && role === "admin") {
  assignedRole = "admin";
}

  // Création
  const user = await UserModel.create({
    email,
    username,
    nom,
    password: hash,
    role: assignedRole,
  });

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

export async function loginUser(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const secret = config.get<string>("security.jwt.secret");
  if (!secret) throw new Error("JWT secret not configured");

  const expiresIn: SignOptions["expiresIn"] = (config.get<string>("security.jwt.expiresIn") || "1h") as SignOptions["expiresIn"];

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    secret,
    { expiresIn }
  );

  return { token };
}
