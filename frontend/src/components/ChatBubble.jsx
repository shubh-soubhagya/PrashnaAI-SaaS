


import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`my-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`prose prose-invert max-w-xl p-4 rounded-2xl text-md leading-relaxed
          ${isUser 
            ? "bg-blue-600 text-white prose-p:text-white prose-strong:text-white" 
            : "bg-gray-800 text-gray-200 prose-p:text-gray-200"
          }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

