import express from "express";
import { Login, SignIn } from "./Router/Auth/index";
import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const app: express.Express = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
// Enable CORS for all origins or specify allowed origins
// app.use(cors({ origin: 'http://localhost:6000', credentials: true }));
app.use("/login", Login);
app.use("/sign-up", SignIn);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
