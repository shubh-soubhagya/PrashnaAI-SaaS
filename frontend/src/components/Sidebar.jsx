// import { Link, useNavigate } from "react-router-dom";
// import { useChatStore } from "../store/chatStore";
// import { useAuthStore } from "../store/authStore";
// import { useEffect } from "react";

// export default function Sidebar() {
//   const { token, logout } = useAuthStore();
//   const { chats, fetchChats } = useChatStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchChats(token);
//   }, []);

//   return (
//     <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
//       {/* New Chat Button */}
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="m-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left font-semibold"
//       >
//         + New Chat
//       </button>

//       {/* Chat History */}
//       <div className="flex-1 overflow-y-auto px-3">
//         {chats.map((chat) => (
//           <Link
//             key={chat._id}
//             to={`/chat/${chat._id}`}
//             className="block p-3 mb-2 rounded-lg hover:bg-gray-700"
//           >
//             <div className="text-sm text-gray-300 truncate">
//               {chat.websiteUrl}
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Logout */}
//       <button
//         onClick={logout}
//         className="m-3 p-3 bg-red-600 hover:bg-red-500 rounded-lg"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }


import { Link, useNavigate, useLocation } from "react-router-dom";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import {
  Plus,
  LogOut,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

export default function Sidebar() {
  const { token, logout } = useAuthStore();
  const { chats, fetchChats } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchChats(token);
  }, []);

  // Sort chats: Newest first
  const sortedChats = [...chats].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredChats = sortedChats.filter(chat =>
    (chat.title || chat.websiteUrl || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <aside
        className={`relative h-screen bg-gradient-to-b from-gray-900/80 to-gray-950/80 
          backdrop-blur-2xl border-r border-white/10 text-gray-300
          transition-all duration-500 ease-in-out flex flex-col
          ${collapsed ? "w-20" : "w-80"} shadow-2xl shadow-black/30`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-20 h-8 w-8 rounded-full 
          bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 
          hover:from-gray-700 hover:to-gray-800 hover:border-white/20
          flex items-center justify-center transition-all duration-300 
          shadow-lg hover:shadow-xl hover:scale-110 group"
        >
          {collapsed ? (
            <ChevronRight size={16} className="text-gray-400 group-hover:text-white" />
          ) : (
            <ChevronLeft size={16} className="text-gray-400 group-hover:text-white" />
          )}
        </button>

        {/* Branding */}
        <div
          className={`px-6 py-7 border-b border-white/10 transition-all duration-300
            ${collapsed ? "px-4" : ""}`}
        >
          {!collapsed && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  PrashnaAI
                </h1>
              </div>
              <p className="text-xs text-gray-400 font-light tracking-wide">
                Intelligent Research Assistant
              </p>
            </div>
          )}

          {collapsed && (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
            </div>
          )}
        </div>

        {/* New Chat Button */}
        <div
          className={`px-4 py-6 ${collapsed ? "flex justify-center" : "block"}`}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className={`h-12 flex items-center justify-center gap-3 w-full
            bg-gradient-to-r from-gray-800/50 to-gray-900/50 
            hover:from-gray-700/50 hover:to-gray-800/50
            backdrop-blur-sm border border-white/10 
            text-gray-200 rounded-xl transition-all duration-300 
            shadow-lg hover:shadow-xl hover:scale-[1.02] group
            ${collapsed ? "w-12" : ""}`}
          >
            <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
              <Plus size={16} className="text-gray-300 group-hover:text-white" />
            </div>
            {!collapsed && (
              <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                New Research
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        {!collapsed && (
          <div className="px-4 pb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-gray-900/50 backdrop-blur-sm 
                  border border-white/10 rounded-xl text-sm text-gray-200 
                  placeholder-gray-500 focus:outline-none focus:border-white/20 
                  focus:bg-gray-800/50 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* History Label */}
        <div className={`px-4 mb-3 ${collapsed ? "px-1 mt-2" : ""}`}>
          {!collapsed && (
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Recent Chats
              </p>
              <span className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded-md">
                {filteredChats.length}
              </span>
            </div>
          )}
        </div>

        {/* Chat History */}
        <div className="flex-1 px-3 overflow-y-auto custom-scrollbar">
          <div className="space-y-1.5">
            {filteredChats.map((chat) => {
              const isActive = location.pathname === `/chat/${chat._id}`;

              return (
                <Link
                  key={chat._id}
                  to={`/chat/${chat._id}`}
                  className={`
                    group flex items-center gap-3 px-3 py-3 text-sm rounded-xl
                    transition-all duration-300 cursor-pointer border
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20 shadow-lg"
                      : "bg-gray-900/30 hover:bg-gray-800/50 border-white/5 hover:border-white/10"
                    }
                    ${collapsed ? "justify-center" : ""}
                    hover:shadow-md hover:scale-[1.02]
                  `}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${isActive
                    ? "bg-blue-500/20"
                    : "bg-gray-800/50 group-hover:bg-gray-700/50"
                    }`}>
                    <MessageSquare
                      size={16}
                      className={
                        isActive
                          ? "text-blue-400"
                          : "text-gray-500 group-hover:text-gray-300"
                      }
                    />
                  </div>

                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-gray-200 group-hover:text-white">
                        {chat.title || chat.websiteUrl || "Untitled Session"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-4 py-3 border-t border-white/10 bg-gray-900/30 
            backdrop-blur-xl space-y-2 ${collapsed ? "flex flex-col items-center px-0" : ""}`}
        >
          {/* Settings */}
          <button
            onClick={() => navigate("/settings")}
            className={`flex items-center gap-3 w-full px-4 py-2 text-sm rounded-xl 
            bg-transparent hover:bg-white/5 border border-transparent
            hover:border-white/5 text-gray-400 hover:text-white
            transition-all duration-300 group
            ${collapsed ? "w-10 justify-center px-0" : ""}`}
          >
            <div className="p-1.5 rounded-lg group-hover:bg-white/10 transition-colors">
              <Search size={16} className="hidden" /> {/* Hack to align if needed, but better use cog icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
            </div>
            {!collapsed && (
              <span className="font-medium">Settings</span>
            )}
          </button>

          <button
            onClick={logout}
            className={`flex items-center gap-3 w-full px-4 py-2 text-sm rounded-xl 
            bg-gray-800/30 hover:bg-red-500/20 border border-white/5 
            hover:border-red-500/30 text-gray-400 hover:text-red-300
            transition-all duration-300 hover:shadow-lg group
            ${collapsed ? "w-10 justify-center px-0" : ""}`}
          >
            <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-red-500/20 transition-colors">
              <LogOut size={16} />
            </div>
            {!collapsed && (
              <span className="font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </aside>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(-180deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(90deg); }
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}