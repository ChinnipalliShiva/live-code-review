import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Validation from "../utils/validations";

const validation = new Validation();
const prisma = new PrismaClient();

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { useremail, password } = req.body;
    if (
      !validation.isEmailExists(useremail) ||
      !validation.isPasswordExists(password)
    ) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (
      !validation.isValidEmail(useremail) ||
      !validation.isValidPassword(password)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid email or password format" });
    }
    const user = await prisma.users.findUnique({
      where: { email: useremail },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Optional: attach user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
