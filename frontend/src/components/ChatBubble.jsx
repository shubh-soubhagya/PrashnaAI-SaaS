export default function ChatBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-xl max-w-xl ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
