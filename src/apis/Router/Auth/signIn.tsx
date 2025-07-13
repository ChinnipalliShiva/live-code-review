import express from "express";
import { PrismaClient } from "@prisma/client";
import Validation from "../../utils/validations";

const router = express.Router();
const prisma = new PrismaClient();
const validation = new Validation();

export default router.post("/", async (req, res) => {
  try {
    const { username, useremail, password } = req.body;

    // Check for required fields
    if (
      !username ||
      !validation.isEmailExists(useremail) ||
      !validation.isPasswordExists(password)
    ) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    // Validate email and password format
    if (
      !validation.isValidEmail(useremail) ||
      !validation.isValidPassword(password)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid email or password format" });
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: useremail },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Create the user
    const newUser = await prisma.users.create({
      data: {
        name: username,
        email: useremail,
        password: password,
      },
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
