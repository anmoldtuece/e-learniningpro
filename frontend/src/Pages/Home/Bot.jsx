import { useState, useRef, useEffect } from "react";
import botGif from "../Images/bot.gif";

const STORAGE_KEY = "Chathistory";

const Bot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [{ from: "bot", text: "Hi! I'm EduBot 🇮🇳 — your personal Learning guide. Ask me anything!" }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are 'EduBot', a smart, friendly assistant on the e-Learning website. Your job is to help users with course information, study tips, platform navigation, and general learning support. Be warm, conversational, and helpful. Give clear, concise advice like an expert tutor or guide.",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      const botReply =
        data?.choices?.[0]?.message?.content || "Hmm, I didn't quite get that.";

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Oops! Something went wrong. Please try again in a bit.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {open ? (
        <div className="bg-white shadow-2xl rounded-xl w-80 h-96 flex flex-col border border-gray-200">
          <div className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded-t-xl">
            <span className="text-white font-semibold">Edu-bot — Learning Bot 🇮🇳</span>
            <button onClick={() => setOpen(false)} className="text-white text-lg font-bold">×</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-3 p-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-xs whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-100 text-gray-800 self-start mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-500 italic self-start">
                EduBot is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2 p-3 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Best places to visit in December?"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
    onClick={() => setOpen(true)}
    title="Chat with EduBot"
    className="fixed bottom-5 right-5 z-50 bg-transparent p-0 border-0 focus:outline-none"
  >
    <img
      src={botGif}
      alt="Open chat"
      className="w-20 sm:w-40 cursor-pointer"
    />
  </button>
      )}
    </div>
  );
};

export default Bot; 