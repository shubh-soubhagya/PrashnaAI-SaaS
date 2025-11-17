import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const createChat = async () => {
    try {
      const res = await api.post(
        "/chats/create",
        { websiteUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      alert("Limit reached or invalid URL");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Prashna AI Dashboard</h1>

      <div className="flex gap-2">
        <input
          className="w-96 p-2 border rounded"
          placeholder="Enter website URL"
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <button
          onClick={createChat}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Create Chat
        </button>
      </div>
    </div>
  );
}
