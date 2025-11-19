import User from "../models/User.js";
import Chat from "../models/Chat.js";
import axios from "axios";
import { checkDailyLimits, checkChatQueryLimits } from "../utils/verifyLimits.js";

export const createChat = async (req, res) => {
  const { websiteUrl } = req.body;
  const user = await User.findById(req.user.id);

  if (!checkDailyLimits(user))
    return res.status(403).json({ message: "Daily URL limit reached" });

  const chat = await Chat.create({ userId: user._id, websiteUrl });

  user.dailyURLCount++;
  await user.save();

  res.json(chat);
};

export const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;

  const user = await User.findById(req.user.id);
  const chat = await Chat.findById(chatId);

  if (!checkChatQueryLimits(user, chat))
    return res.status(403).json({ message: "Chat query limit reached" });

  const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/ask`, {
    websiteUrl: chat.websiteUrl,
    message
  });

  chat.messages.push({ role: "user", content: message });
  chat.messages.push({ role: "assistant", content: aiResponse.data.answer });

  chat.queryCount++;
  await chat.save();

  res.json(chat);
};

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

export const getAllChats = async (req, res) => {
  const chats = await Chat.find({ userId: req.user.id }).select("websiteUrl");
  res.json(chats);
};

