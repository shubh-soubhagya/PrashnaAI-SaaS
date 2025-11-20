import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ChatBubble from "../components/ChatBubble";
import { useAuthStore } from "../store/authStore";
import AppLayout from "../layouts/AppLayout";

export default function ChatPage() {
  const { chatId } = useParams();
  const { token } = useAuthStore();

  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingStep, setLoadingStep] = useState("");

  const fetchChat = async () => {
    try {
      const res = await api.get(`/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChat(res.data);
    } catch (err) {
      console.log("Load chat error:", err);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await api.post(
        `/chats/${chatId}/message`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChat(res.data);
      setMessage("");
    } catch (err) {
      console.log("Message error:", err);
    }
  };

  useEffect(() => {
    setLoadingStep("Loading chat...");
    fetchChat().then(() => {
      setLoadingStep("");
    });
  }, [chatId]);

  return (
    <AppLayout>
      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="p-4 bg-white shadow flex items-center justify-between">
          <h1 className="text-xl font-semibold">{chat?.websiteUrl}</h1>
        </div>

        {/* Loading State */}
        {loadingStep && (
          <div className="p-4 text-gray-600">
            {loadingStep}
          </div>
        )}

        {/* Messages */}
        {!loadingStep && (
          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-100">
            {chat?.messages?.map((m, index) => (
              <ChatBubble key={index} role={m.role} content={m.content} />
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white flex gap-3 shadow">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
            placeholder="Ask something..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
