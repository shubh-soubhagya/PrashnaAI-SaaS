import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  websiteUrl: String,
  title: String,
  scrapedContent: String,   // <--- store here
  queryCount: { type: Number, default: 0 },
  messages: [
    {
      role: String,
      content: String
    }
  ]
}, { timestamps: true });


export default mongoose.model("Chat", chatSchema);
