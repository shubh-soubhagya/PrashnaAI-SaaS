import { create } from "zustand";
import api from "../api/axios";

export const useChatStore = create((set) => ({
  chats: [],
  fetchChats: async (token) => {
    try {
      const res = await api.get("/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ chats: res.data });
    } catch (err) {
      console.log("Chat loading error:", err);
    }
  }
}));
