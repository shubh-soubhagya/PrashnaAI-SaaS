import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./models/User.js";
import Chat from "./models/Chat.js";

async function resetDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing Users...");
    await User.deleteMany({});

    console.log("Clearing Chats...");
    await Chat.deleteMany({});

    console.log("Database reset complete! ✔");
    process.exit(0);

  } catch (err) {
    console.error("Reset error:", err);
    process.exit(1);
  }
}

resetDatabase();



// node src/reset.js
