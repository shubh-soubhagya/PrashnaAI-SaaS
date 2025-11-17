import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";


console.log("Auth routes loaded:", authRoutes);

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

connectDB();

export default app;
