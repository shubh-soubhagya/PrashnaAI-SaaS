import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

export default function DashboardPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loadingStep, setLoadingStep] = useState("");
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const createChat = async () => {
    try {
      setLoadingStep("Extracting content...");

      const res = await api.post(
        "/chats/create",
        { websiteUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLoadingStep("Processing content...");

      // Small delay for UI experience
      setTimeout(() => {
        setLoadingStep("");
        navigate(`/chat/${res.data._id}`);
      }, 300);

    } catch (err) {
      alert("Error creating chat (Maybe limit reached)");
      setLoadingStep("");
    }
  };

  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-semibold mb-6">New Chat</h1>

        <div className="flex gap-3">
          <input
            className="w-96 p-3 border rounded"
            placeholder="Enter website URL"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
          <button
            onClick={createChat}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Chat
          </button>
        </div>

        {/* Loading text */}
        {loadingStep && (
          <div className="mt-4 text-blue-600 font-semibold">
            {loadingStep}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
