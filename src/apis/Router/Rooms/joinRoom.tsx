// src/apis/Router/Rooms/joinRoom.ts

import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { useremail, roomName, roomPassword } = req.body;

  try {
    // Find user
    const user = await prisma.users.findUnique({
      where: { email: useremail },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find room
    const room = await prisma.rooms.findFirst({
      where: { name: roomName },
      include: { participants: true },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    // Validate password
    const passwordMatch = room.password === roomPassword;
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect room password." });
    }

    // Check if user already in room
    const alreadyInRoom = await prisma.roomParticipant.findFirst({
      where: { userId: user.id, roomId: room.id },
    });

    if (alreadyInRoom) {
      return res
        .status(400)
        .json({ message: "User already joined this room." });
    }

    // Check max participants
    if (room.participants.length >= room.maxParticipants) {
      return res
        .status(403)
        .json({ message: "Room is full. Max users reached." });
    }

    // Add user to RoomParticipant
    await prisma.roomParticipant.create({
      data: {
        userId: user.id,
        roomId: room.id,
      },
    });

    return res.status(200).json({ message: "Joined room successfully!" });
  } catch (error) {
    console.error("Join room error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
