import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  websiteUrl: String,
  scrapedContent: String,   // <--- store here
  queryCount: { type: Number, default: 0 },
  messages: [
    {
      role: String,
      content: String
    }
  ]
});


export default mongoose.model("Chat", chatSchema);
