// import { useState } from "react";
// import api from "../api/axios";
// import { useAuthStore } from "../store/authStore";
// import { useNavigate } from "react-router-dom";
// import AppLayout from "../layouts/AppLayout";

// export default function DashboardPage() {
//   const [websiteUrl, setWebsiteUrl] = useState("");
//   const [loadingStep, setLoadingStep] = useState("");
//   const { token } = useAuthStore();
//   const navigate = useNavigate();

//   const createChat = async () => {
//     try {
//       setLoadingStep("Extracting content...");

//       const res = await api.post(
//         "/chats/create",
//         { websiteUrl },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setLoadingStep("Processing content...");

//       // Small delay for UI experience
//       setTimeout(() => {
//         setLoadingStep("");
//         navigate(`/chat/${res.data._id}`);
//       }, 300);

//     } catch (err) {
//       alert("Error creating chat (Maybe limit reached)");
//       setLoadingStep("");
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="p-8">
//         <h1 className="text-3xl font-semibold mb-6">New Chat</h1>

//         <div className="flex gap-3">
//           <input
//             className="w-96 p-3 border rounded"
//             placeholder="Enter website URL"
//             value={websiteUrl}
//             onChange={(e) => setWebsiteUrl(e.target.value)}
//           />
//           <button
//             onClick={createChat}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Create Chat
//           </button>
//         </div>

//         {/* Loading text */}
//         {loadingStep && (
//           <div className="mt-4 text-blue-600 font-semibold">
//             {loadingStep}
//           </div>
//         )}
//       </div>
//     </AppLayout>
//   );
// }


import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { Globe, Search, Sparkles, ArrowRight, Zap, Shield, Clock } from "lucide-react";

export default function DashboardPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loadingStep, setLoadingStep] = useState("");
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const createChat = async () => {
    if (!websiteUrl.trim()) return;

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
      alert("Error creating chat. Please check the URL and try again.");
      setLoadingStep("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createChat();
    }
  };

  return (
    <AppLayout>
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles size={24} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Start New Research
              </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Enter any website URL to extract and analyze content with AI-powered research assistance
            </p>
          </div>

          {/* Main Input Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl 
            border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-8 mb-8">
            
            {/* Input Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Globe size={20} className="text-gray-500" />
                </div>
                <input
                  className="w-full h-14 pl-12 pr-4 bg-gray-800/50 backdrop-blur-sm 
                    border border-white/10 rounded-xl text-gray-200 placeholder-gray-500
                    focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70
                    transition-all duration-300 text-lg font-medium"
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!!loadingStep}
                />
              </div>
              
              <button
                onClick={createChat}
                disabled={!websiteUrl.trim() || !!loadingStep}
                className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 
                  hover:from-blue-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700
                  text-white rounded-xl font-semibold transition-all duration-300
                  flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105
                  disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[140px] justify-center"
              >
                {loadingStep ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Analyze</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            {/* Loading Progress */}
            {loadingStep && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-400 font-medium">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  {loadingStep}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-800/50 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                      transition-all duration-1000 ${
                        loadingStep === "Extracting content..." ? "w-1/2" : "w-full"
                      }`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 
              hover:bg-gray-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Zap size={24} className="text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced AI processes and understands website content for intelligent research
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 
              hover:bg-gray-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                <Shield size={24} className="text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Secure Processing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your data is processed securely with enterprise-grade privacy protection
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 
              hover:bg-gray-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Clock size={24} className="text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get comprehensive analysis and insights in seconds, not hours
              </p>
            </div>
          </div>

          {/* Usage Tips */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              💡 Tip: Enter any valid website URL to start your research session
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -10px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 10px) rotate(-180deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(8px, -8px) rotate(90deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
      `}</style>
    </AppLayout>
  );
}