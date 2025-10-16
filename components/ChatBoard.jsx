"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaTimes, FaSmile, FaComments } from "react-icons/fa";

export default function ChatBoard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState([]);
  const [greeted, setGreeted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const chatRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);

  const automatedOptions = [
    "Startup advice 💡",
    "Marketing tips 📈",
    "Money & mindset 💰",
    "Growth strategy 🚀",
    "Creative direction 🎬",
    "Leadership wisdom 👑",
  ];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Queue handling
  useEffect(() => {
    if (!loading && queue.length > 0) {
      const next = queue.shift();
      setQueue([...queue]);
      sendMessage(next);
    }
  }, [queue, loading]);

  // Dragging logic
  const startDrag = (e) => {
    if (!chatRef.current) return;
    setDragging(true);
    offset.current = {
      x: e.clientX - chatPosition.x,
      y: e.clientY - chatPosition.y,
    };
  };
  const duringDrag = (e) => {
    if (!dragging) return;
    setChatPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };
  const endDrag = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", duringDrag);
      window.addEventListener("mouseup", endDrag);
    } else {
      window.removeEventListener("mousemove", duringDrag);
      window.removeEventListener("mouseup", endDrag);
    }
    return () => {
      window.removeEventListener("mousemove", duringDrag);
      window.removeEventListener("mouseup", endDrag);
    };
  }, [dragging]);

  const handleChatOpen = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const chatWidth = 320;
    const chatHeight = 460;
    setChatPosition({
      x: width - chatWidth - 24,
      y: height - chatHeight - 24,
    });
    setChatOpen(true);
  };

  // AI response generator
  const getResponse = (text) => {
    const lower = text.toLowerCase();
    if (!greeted && /hi|hello|hey/i.test(lower)) {
      setGreeted(true);
      return "👋 Welcome to Takouri — where ideas evolve into empires. What are you building today?";
    }
    if (lower.includes("startup") || lower.includes("business"))
      return "💡 Every startup begins with a story. Define your ‘why’, validate your vision fast, and build around impact — not just profit.";
    if (lower.includes("marketing") || lower.includes("brand"))
      return "📈 Marketing is energy. Tell stories that move people, not algorithms. What emotion do you want your brand to own?";
    if (lower.includes("money") || lower.includes("finance") || lower.includes("wealth"))
      return "💰 Money follows mastery. Focus on systems, habits, and value creation — not shortcuts.";
    if (lower.includes("growth") || lower.includes("scale"))
      return "🚀 Growth is a reflection of clarity and consistency. Track what works, remove noise, and repeat the signal.";
    if (lower.includes("creative") || lower.includes("film") || lower.includes("story"))
      return "🎬 Creativity is how you translate spirit into visuals. Every frame is a sentence in your legend.";
    if (lower.includes("leadership") || lower.includes("team"))
      return "👑 A true leader builds people, not followers. What kind of energy do you want your team to feel?";

    const deepReplies = [
      "⚡ Interesting... what’s your long-term vision behind that?",
      "🌱 Every challenge is a mirror — what’s it teaching you right now?",
      "🚀 That thought carries potential. How would you scale it if you had no limits?",
      "💭 Deep. Tell me — what emotion fuels this idea?",
      "🔥 Stay focused. Billion-dollar impact begins with one disciplined day.",
    ];
    return deepReplies[Math.floor(Math.random() * deepReplies.length)];
  };

  const sendMessage = async (text) => {
    if (!text?.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    const aiMessage = { role: "assistant", content: "", typing: true };
    setMessages((prev) => [...prev, aiMessage]);
    const aiIndex = messages.length + 1;
    const responseText = getResponse(text);

    await new Promise((r) => setTimeout(r, 700));

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setMessages((current) =>
        current.map((m, i) =>
          i === aiIndex
            ? { ...m, content: responseText.slice(0, idx), typing: idx < responseText.length }
            : m
        )
      );
      if (idx >= responseText.length) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 35 + Math.random() * 25);
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    if (loading) setQueue((prev) => [...prev, text]);
    else sendMessage(text);
    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={handleChatOpen}
          className="fixed bottom-8 right-8 z-[999] bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <FaComments size={22} />
        </button>
      )}

      {/* Draggable ChatBoard */}
      {chatOpen && (
        <div
          ref={chatRef}
          onMouseDown={startDrag}
          style={{
            position: "fixed",
            left: `${chatPosition.x}px`,
            top: `${chatPosition.y}px`,
            cursor: dragging ? "grabbing" : "grab",
            zIndex: 999,
            transition: "all 0.25s ease-in-out",
            width: "320px",
            height: "460px",
          }}
        >
          <div className="flex flex-col w-full h-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-blue-50 border-b border-gray-200">
              <span className="font-semibold text-gray-800 text-sm">Takouri ChatBoard</span>
              <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="flex items-start space-x-2 max-w-[75%]">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">AI</div>
                      <div className="bg-gray-100 px-3 py-1.5 rounded-2xl rounded-bl-none shadow-sm text-sm leading-snug">
                        {msg.content || (msg.typing && <span className="animate-pulse text-gray-400">•••</span>)}
                      </div>
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div className="flex items-end space-x-2 max-w-[75%] justify-end">
                      <div className="bg-blue-600 text-white px-3 py-1.5 rounded-2xl rounded-br-none shadow-sm text-sm leading-snug">{msg.content}</div>
                      <FaUserCircle className="text-blue-700" size={18} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {greeted && (
              <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-t border-gray-200">
                {automatedOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(opt)}
                    className="flex items-center gap-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-600 transition-all"
                  >
                    {opt} <FaSmile className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-1 p-2 bg-gray-50 border-t border-gray-200">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder={loading ? "Takouri is thinking..." : "Type a message..."}
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400 resize-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`px-3 py-1 rounded-lg text-white text-sm ${
                  input.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
