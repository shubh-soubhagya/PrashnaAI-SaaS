import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  websiteUrl: String,
  queryCount: { type: Number, default: 0 },
  messages: [
    {
      role: String,  // 'user' or 'assistant'
      content: String
    }
  ]
});

export default mongoose.model("Chat", chatSchema);
