import { useState, useRef, useEffect, useContext } from "react";
import { MessageCircle, Send, X } from "lucide-react";
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

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${url}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-red-500 hover:bg-red-600 
                   text-white rounded-xl shadow-lg flex items-center 
                   justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-20 right-3 sm:right-5 w-[95%] sm:w-96 
                     max-h-[75dvh] bg-white shadow-xl rounded-xl 
                     flex flex-col z-50 h-[500px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-red-500 
                          text-white px-4 py-2 font-semibold rounded-t-xl">
            Cravez AI Assistant
            <X
              className="w-5 h-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
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

            {/* Typing Indicator */}
            {loading && (
              <div className="mb-2 flex justify-start">
                <div className="px-3 py-2 rounded-lg bg-white 
                                border border-gray-200 flex space-x-1">
                  <span className="dot"></span>
                  <span className="dot delay-200"></span>
                  <span className="dot delay-400"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 flex items-center gap-2 bg-white rounded-b-xl">
            <input
              type="text"
              placeholder="Ask me about Cravez..."
              className="flex-1 border border-gray-300 rounded-full 
                         px-4 py-2 focus:outline-none 
                         focus:ring-2 focus:ring-red-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="p-3 bg-red-500 hover:bg-red-600 
                         text-white rounded-full flex 
                         items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tailwind-safe animation */}
      <style>{`
        .dot {
          width: 10px;
          height: 10px;
          background-color: #9ca3af;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
