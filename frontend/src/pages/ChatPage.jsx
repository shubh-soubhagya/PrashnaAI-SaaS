// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";
// import ChatBubble from "../components/ChatBubble";
// import { useAuthStore } from "../store/authStore";
// import AppLayout from "../layouts/AppLayout";

// export default function ChatPage() {
//   const { chatId } = useParams();
//   const { token } = useAuthStore();

//   const [chat, setChat] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loadingStep, setLoadingStep] = useState("");

//   const fetchChat = async () => {
//     try {
//       const res = await api.get(`/chats/${chatId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setChat(res.data);
//     } catch (err) {
//       console.log("Load chat error:", err);
//     }
//   };

//   const sendMessage = async () => {
//     try {
//       const res = await api.post(
//         `/chats/${chatId}/message`,
//         { message },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setChat(res.data);
//       setMessage("");
//     } catch (err) {
//       console.log("Message error:", err);
//     }
//   };

//   useEffect(() => {
//     setLoadingStep("Loading chat...");
//     fetchChat().then(() => {
//       setLoadingStep("");
//     });
//   }, [chatId]);

//   return (
//     <AppLayout>
//       <div className="flex flex-col h-full">

//         {/* Header */}
//         <div className="p-4 bg-white shadow flex items-center justify-between">
//           <h1 className="text-xl font-semibold">{chat?.websiteUrl}</h1>
//         </div>

//         {/* Loading State */}
//         {loadingStep && (
//           <div className="p-4 text-gray-600">
//             {loadingStep}
//           </div>
//         )}

//         {/* Messages */}
//         {!loadingStep && (
//           <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-100">
//             {chat?.messages?.map((m, index) => (
//               <ChatBubble key={index} role={m.role} content={m.content} />
//             ))}
//           </div>
//         )}

//         {/* Input */}
//         <div className="p-4 bg-white flex gap-3 shadow">
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 p-3 border rounded-lg"
//             placeholder="Ask something..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ChatBubble from "../components/ChatBubble";
import { useAuthStore } from "../store/authStore";
import AppLayout from "../layouts/AppLayout";
import { Send, Globe, Bot, User, Loader2, Sparkles } from "lucide-react";

export default function ChatPage() {
  const { chatId } = useParams();
  const { token } = useAuthStore();

  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingStep, setLoadingStep] = useState("");
  const [isSending, setIsSending] = useState(false);

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
    if (!message.trim() || isSending) return;

    try {
      setIsSending(true);
      const res = await api.post(
        `/chats/${chatId}/message`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChat(res.data);
      setMessage("");
    } catch (err) {
      console.log("Message error:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    setLoadingStep("Loading chat...");
    fetchChat().then(() => {
      setLoadingStep("");
    });
  }, [chatId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [chat?.messages]);

  return (
    <AppLayout>
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <div className="flex flex-col h-screen bg-transparent">
        {/* Enhanced Header */}
        <div className="bg-gray-900/80 backdrop-blur-2xl border-b border-gray-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {chat?.websiteUrl || "Research Session"}
                </h1>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <Bot size={14} />
                  AI Research Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className={`w-2 h-2 rounded-full ${chat ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm">{chat ? 'Active' : 'Loading...'}</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loadingStep && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <Loader2 size={28} className="text-white animate-spin" />
              </div>
              <div>
                <p className="text-gray-300 text-lg font-medium mb-2">{loadingStep}</p>
                <p className="text-gray-500 text-sm">Preparing your research session...</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages Container */}
        {!loadingStep && (
          <div 
            id="messages-container"
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent custom-scrollbar"
          >
            {chat?.messages?.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Sparkles size={40} className="text-blue-400" />
                </div>
                <div className="space-y-3 max-w-md">
                  <h3 className="text-2xl font-bold text-white">
                    Start Your Research
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Ask questions about the website content and get intelligent insights from your AI research assistant.
                  </p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 max-w-sm">
                  <p className="text-gray-300 text-sm">
                    <strong>Try asking:</strong> "Summarize the main points" or "What are the key features mentioned?"
                  </p>
                </div>
              </div>
            ) : (
              // Messages List
              <div className="max-w-4xl mx-auto space-y-6">
                {chat?.messages?.map((m, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      m.role === 'user' 
                        ? 'bg-blue-500/20 border border-blue-500/30' 
                        : 'bg-purple-500/20 border border-purple-500/30'
                    }`}>
                      {m.role === 'user' ? (
                        <User size={16} className="text-blue-400" />
                      ) : (
                        <Bot size={16} className="text-purple-400" />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className="flex-1 min-w-0">
                      <ChatBubble 
                        role={m.role} 
                        content={m.content} 
                      />
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isSending && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-purple-500/20 border border-purple-500/30">
                      <Bot size={16} className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 max-w-md">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Enhanced Input Area */}
        <div className="bg-gray-900/80 backdrop-blur-2xl border-t border-gray-700/50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-gray-800/70 backdrop-blur-sm border border-gray-600/50 
                    rounded-2xl px-5 py-4 text-gray-200 placeholder-gray-400
                    focus:outline-none focus:border-blue-500/70 focus:bg-gray-800/90
                    transition-all duration-300 resize-none min-h-[60px] max-h-32
                    focus:ring-2 focus:ring-blue-500/20 custom-scrollbar"
                  placeholder="Ask a question about the website content..."
                  rows={1}
                  disabled={isSending}
                  style={{
                    height: 'auto',
                    minHeight: '60px'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                  ⏎ Enter to send
                </div>
              </div>
              
              <button
                onClick={sendMessage}
                disabled={!message.trim() || isSending}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 
                  hover:from-blue-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-800
                  text-white rounded-2xl font-semibold transition-all duration-300
                  flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105
                  disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[100px] justify-center
                  border border-blue-500/30 hover:border-blue-400/50 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {isSending ? (
                  <Loader2 size={18} className="text-white animate-spin relative z-10" />
                ) : (
                  <Send size={18} className="text-white relative z-10" />
                )}
                <span className="relative z-10 hidden sm:inline">
                  {isSending ? 'Sending...' : 'Send'}
                </span>
              </button>
            </div>
            
            {/* Quick Suggestions */}
            {chat?.messages?.length === 0 && !message && (
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Summarize the main points",
                  "What are the key features?",
                  "Explain the core concepts",
                  "What problems does this solve?"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(suggestion)}
                    className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                      rounded-xl text-gray-300 text-sm hover:bg-gray-700/50 hover:border-gray-600/70
                      transition-all duration-300 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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
    </AppLayout>
  );
}