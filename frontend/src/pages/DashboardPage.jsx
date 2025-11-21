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
import { Globe, Search, Sparkles, ArrowRight, Zap, Shield, Clock, ExternalLink } from "lucide-react";

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
      {/* Enhanced Background with Blue Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        {/* Primary Blue Blobs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-sky-500/15 to-blue-500/15 rounded-full blur-3xl animate-float-fast"></div>
        
        {/* Secondary Accent Blobs */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-slow opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-medium opacity-60"></div>
        
        {/* Grid Overlay for Professional Look */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                {/* <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                  <Sparkles size={28} className="text-white" />
                </div> */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-sm opacity-30 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                  Start New Research
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
              </div>
            </div>
            <p className="text-gray-300 text-xl max-w-5xl mx-auto leading-relaxed font-light">
              Transform any website into an interactive research session with our advanced AI analysis platform
            </p>
          </div>

          {/* Enhanced Main Input Card */}
          <div className="bg-gray-900/40 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl shadow-black/50 p-8 mb-6 relative overflow-hidden">
            {/* Card Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-14">
              {/* Input Section */}
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-8">
                <div className="flex-1 relative">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                    <Globe size={22} className="text-gray-400" />
                  </div>
                  <input
                    className="w-full h-16 pl-14 pr-6 bg-gray-800/70 backdrop-blur-sm 
                      border border-gray-600/50 rounded-2xl text-white placeholder-gray-400
                      focus:outline-none focus:border-blue-500/70 focus:bg-gray-800/90
                      transition-all duration-300 text-lg font-normal
                      focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg"
                    placeholder="Enter website URL (e.g., https://example.com)"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={!!loadingStep}
                  />
                </div>
                
                <button
                  onClick={createChat}
                  disabled={!websiteUrl.trim() || !!loadingStep}
                  className="h-16 px-10 bg-gradient-to-r from-blue-600 to-cyan-600 
                    hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-800
                    text-white rounded-2xl font-semibold transition-all duration-300
                    flex items-center gap-3 shadow-2xl hover:shadow-blue-500/25 hover:scale-105
                    disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[180px] justify-center
                    border border-blue-500/30 hover:border-blue-400/50 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  {loadingStep ? (
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span className="text-white font-medium">Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Search size={22} className="relative z-10" />
                      <span className="relative z-10">Analyze Website</span>
                      <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Enhanced Loading Progress */}
              {loadingStep && (
                <div className="space-y-5 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center gap-4 text-blue-400 font-medium text-lg">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                    <span>{loadingStep}</span>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 
                        transition-all duration-1000 ease-out shadow-lg shadow-blue-500/50 ${
                          loadingStep === "Extracting content..." ? "w-2/3" : "w-full"
                        }`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 
              hover:bg-gray-800/60 hover:border-gray-600/70 transition-all duration-500 group hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-colors shadow-lg">
                <Zap size={28} className="text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4 group-hover:text-blue-100 transition-colors">
                Intelligent Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed font-light">
                Advanced AI algorithms extract and comprehend website content, providing deep insights and contextual understanding for your research.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 
              hover:bg-gray-800/60 hover:border-gray-600/70 transition-all duration-500 group hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-green-500/30 group-hover:to-emerald-600/30 transition-colors shadow-lg">
                <Shield size={28} className="text-green-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4 group-hover:text-green-100 transition-colors">
                Enterprise Security
              </h3>
              <p className="text-gray-300 leading-relaxed font-light">
                Military-grade encryption and secure processing ensure your research data remains confidential and protected at all times.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 
              hover:bg-gray-800/60 hover:border-gray-600/70 transition-all duration-500 group hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-indigo-600/30 transition-colors shadow-lg">
                <Clock size={28} className="text-purple-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4 group-hover:text-purple-100 transition-colors">
                Real-time Processing
              </h3>
              <p className="text-gray-300 leading-relaxed font-light">
                Lightning-fast content extraction and analysis delivers comprehensive results in seconds, accelerating your research workflow.
              </p>
            </div>
          </div>

          {/* Enhanced Usage Tips */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-4">
              <ExternalLink size={20} className="text-blue-400" />
              <p className="text-gray-300 font-medium">
                Pro Tip: Enter any valid website URL to instantly create an interactive research session
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(-15px, -15px) rotate(120deg) scale(1.05); }
          66% { transform: translate(10px, 10px) rotate(240deg) scale(0.95); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(20px, 10px) rotate(-120deg) scale(1.03); }
          66% { transform: translate(-10px, 15px) rotate(-240deg) scale(0.97); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(12px, -8px) rotate(180deg) scale(1.02); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
      `}</style>
    </AppLayout>
  );
}