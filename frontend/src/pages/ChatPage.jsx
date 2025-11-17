import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import ChatBubble from "../components/ChatBubble";

export default function ChatPage() {
  const { chatId } = useParams();
  const { token } = useAuthStore();

  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    const res = await api.post(
      `/chats/${chatId}/message`,
      { message },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setChat(res.data);
    setMessage("");
  };

  useEffect(() => {
    const fetchChat = async () => {
      const res = await api.get(
        `/chats/${chatId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChat(res.data);
    };
    fetchChat();
  }, []);

  return (
    <div className="p-6 h-screen flex flex-col">
      <h1 className="text-xl font-semibold mb-4">{chat?.websiteUrl}</h1>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow">
        {chat?.messages?.map((m, idx) => (
          <ChatBubble key={idx} role={m.role} content={m.content} />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
