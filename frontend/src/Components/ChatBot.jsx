import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Chatbot = () => {
  const { url } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I’m Cravez AI Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${url}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Oops! Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-5 right-5 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg flex cursor-pointer items-center justify-center z-50"
        onClick={() => setOpen(!open)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 md:w-96 h-[500px] bg-white shadow-xl rounded-xl flex flex-col z-50 overflow-hidden p-2.5">
          {/* Header */}
          <div className="flex items-center justify-between bg-red-500 text-white px-4 py-2 font-semibold rounded-t-xl">
            Cravez AI Assistant
            <X
              className="w-5 h-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] break-words ${
                    msg.role === "user"
                      ? "bg-red-500 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Animated typing indicator */}
            {loading && (
              <div className="mb-2 flex justify-start">
                <div className="px-3 py-2 rounded-lg max-w-[20%] bg-white border border-gray-200 flex space-x-1">
                  <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce-dot"></span>
                  <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce-dot animation-delay-200"></span>
                  <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce-dot animation-delay-400"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex p-3 border-t border-gray-200">
            <input
              type="text"
              placeholder="Ask me about Cravez..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className=" cursor-pointer ml-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 flex items-center justify-center"
              onClick={sendMessage}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tailwind animation styles */}
      <style jsx>{`
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-dot { animation: bounce-dot 1.4s infinite ease-in-out both; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </>
  );
};

export default Chatbot;
