// src/apis/Routes/roomRoutes.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, password, maxParticipants, createdByEmail } = req.body;

  // Validate inputs
  if (!name || !password || !maxParticipants || !createdByEmail) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof maxParticipants !== "number" || maxParticipants < 1) {
    return res
      .status(400)
      .json({ message: "maxParticipants must be a positive number" });
  }

  try {
    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { email: createdByEmail },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with given email" });
    }

    // Create room
    const room = await prisma.rooms.create({
      data: {
        name,
        password,
        maxParticipants,
        createdByEmail,
      },
    });

    return res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
