import User from "../models/User.js";
import Chat from "../models/Chat.js";
import axios from "axios";
import { checkDailyLimits, checkChatQueryLimits } from "../utils/verifyLimits.js";

/* -----------------------------------------------------------
   CREATE CHAT  → Scrape website ONCE and store scrapedContent
----------------------------------------------------------- */
export const createChat = async (req, res) => {
  const { websiteUrl } = req.body;
  const user = await User.findById(req.user.id);

  if (!checkDailyLimits(user))
    return res.status(403).json({ message: "Daily URL limit reached" });

  try {
    // CALL FASTAPI SCRAPE ENDPOINT
    const scrapeRes = await axios.post(
      `${process.env.AI_SERVICE_URL}/scrape`,
      { websiteUrl }
    );

    const { content, title } = scrapeRes.data;

    if (!content || content.trim() === "" || content.includes("No readable content")) {
      return res.status(400).json({ message: "Unable to read website content. Please try a different URL." });
    }

    const chat = await Chat.create({
      userId: user._id,
      websiteUrl,
      title: title || websiteUrl,
      scrapedContent: content
    });

    user.dailyURLCount++;
    await user.save();

    res.json(chat);

  } catch (err) {
    console.log("SCRAPE ERROR:", err.response?.data || err.message);
    return res.status(500).json({ message: "Scraping failed" });
  }
};

/* -----------------------------------------------------------
   SEND MESSAGE → Uses stored scrapedContent → Never scrapes again
----------------------------------------------------------- */
export const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;

  console.log("\n===== SEND MESSAGE START =====");

  const user = await User.findById(req.user.id);
  const chat = await Chat.findById(chatId);

  if (!chat) {
    console.log("❌ Chat not found");
    return res.status(404).json({ message: "Chat not found" });
  }

  console.log("Chat found:", chatId);
  console.log("Message:", message);

  if (!chat.scrapedContent || chat.scrapedContent.trim() === "") {
    console.log("❌ scrapedContent is EMPTY!");
    return res.status(500).json({ message: "Scraped content missing" });
  }

  console.log("scrapedContent length:", chat.scrapedContent.length);

  try {
    console.log("🔥 Sending request to FastAPI...");

    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/ask`,
      {
        websiteContent: chat.scrapedContent,
        message
      }
    );

    console.log("✅ FastAPI Response:", response.data);

    if (!response.data.answer) {
      console.log("❌ FastAPI answer missing:", response.data);
      return res.status(500).json({ message: "AI returned invalid response" });
    }

    chat.messages.push({ role: "user", content: message });
    chat.messages.push({ role: "assistant", content: response.data.answer });

    chat.queryCount++;
    await chat.save();

    console.log("===== SEND MESSAGE END SUCCESS =====\n");
    res.json(chat);

  } catch (err) {
    console.log("❌ AI SERVICE ERROR:");
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("Message:", err.message);
    console.log("===== SEND MESSAGE END WITH ERROR =====\n");

    return res.status(500).json({ message: "AI service crashed" });
  }
};


/* -----------------------------------------------------------
   GET ONE CHAT
----------------------------------------------------------- */
export const getChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* -----------------------------------------------------------
   GET ALL CHATS (history)
----------------------------------------------------------- */
export const getAllChats = async (req, res) => {
  const chats = await Chat.find({ userId: req.user.id }).select("websiteUrl title createdAt");
  res.json(chats);
};
