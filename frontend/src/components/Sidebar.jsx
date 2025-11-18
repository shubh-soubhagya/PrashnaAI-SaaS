import { Link, useNavigate } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Sidebar() {
  const { token, logout } = useAuthStore();
  const { chats, fetchChats } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats(token);
  }, []);

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* New Chat Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="m-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left font-semibold"
      >
        + New Chat
      </button>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3">
        {chats.map((chat) => (
          <Link
            key={chat._id}
            to={`/chat/${chat._id}`}
            className="block p-3 mb-2 rounded-lg hover:bg-gray-700"
          >
            <div className="text-sm text-gray-300 truncate">
              {chat.websiteUrl}
            </div>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="m-3 p-3 bg-red-600 hover:bg-red-500 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
