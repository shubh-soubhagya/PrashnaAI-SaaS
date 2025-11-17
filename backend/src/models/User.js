import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  plan: { type: String, default: "free" },
  dailyURLCount: { type: Number, default: 0 },
  creditsUsedToday: { type: Number, default: 0 },
  lastResetDate: { type: Date, default: new Date() }
});

export default mongoose.model("User", userSchema);
