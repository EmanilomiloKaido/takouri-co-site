// ChatBoard.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaUserCircle, FaSmile } from "react-icons/fa";

const WHATSAPP_NUMBER = "27600000000";

export default function ChatBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState([]);
  const [greeted, setGreeted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 20, y: 80 });

  const chatRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);

  const automatedOptions = [
    "Startup 💡",
    "Marketing 📈",
    "Money 💰",
    "Growth 🚀",
    "Creative 🎬",
    "Leadership 👑",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setChatPosition({
        x: Math.max(10, window.innerWidth - 320),
        y: Math.max(10, window.innerHeight - 420),
      });
    }
  }, []);

  // ✅ Listen for openChat events
  useEffect(() => {
    const handleOpenChat = (e) => {
      const question = (e && e.detail) || "";
      setIsOpen(true);
      setInput(question);
      if (question.trim()) setTimeout(() => handleSend(question), 250);
    };
    window.addEventListener("openChat", handleOpenChat);
    return () => window.removeEventListener("openChat", handleOpenChat);
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Queue handling
  useEffect(() => {
    if (!loading && queue.length > 0) {
      const [next, ...rest] = queue;
      setQueue(rest);
      sendMessage(next);
    }
  }, [queue, loading]);

  // Drag logic
  const handleMouseDown = (e) => {
    if (!chatRef.current) return;
    setIsDragging(true);
    const rect = chatRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = Math.min(
      Math.max(5, e.clientX - offset.current.x),
      window.innerWidth - 280
    );
    const y = Math.min(
      Math.max(5, e.clientY - offset.current.y),
      window.innerHeight - 340
    );
    setChatPosition({ x, y });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const getResponse = (text) => {
    const lower = text.toLowerCase();
    if (!greeted && /hi|hello|hey/i.test(lower)) {
      setGreeted(true);
      return "👋 Hey! What’s your vision today?";
    }
    if (lower.includes("startup")) return "💡 Start small. Move fast.";
    if (lower.includes("marketing")) return "📈 Marketing is storytelling.";
    if (lower.includes("money")) return "💰 Money follows mastery.";
    if (lower.includes("growth")) return "🚀 Keep improving every day.";
    if (lower.includes("creative")) return "🎬 Your ideas paint the world.";
    if (lower.includes("leadership")) return "👑 Lead with purpose.";
    const replies = [
      "⚡ Tell me more.",
      "🌱 What drives that thought?",
      "🔥 Keep building.",
      "💭 That’s powerful.",
      "💡 I like where this is going.",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    setMessages((p) => [...p, { role: "user", content: text }]);
    const aiIndex = messages.length + 1;
    setMessages((p) => [...p, { role: "assistant", content: "", typing: true }]);
    const response = getResponse(text);
    await new Promise((r) => setTimeout(r, 400));

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((cur) =>
        cur.map((m, idx) =>
          idx === aiIndex
            ? { ...m, content: response.slice(0, i), typing: i < response.length }
            : m
        )
      );
      if (i >= response.length) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 20 + Math.random() * 20);
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    if (loading) setQueue((p) => [...p, text]);
    else sendMessage(text);
    setInput("");
  };

  // ✳️ Compact Floating Button
  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-takouriBlue text-white px-3 py-2 rounded-full shadow-lg text-xs hover:bg-blue-600 transition-all z-50"
      >
        💬
      </button>
    );

  // ✳️ Compact Chat Box
  return (
    <div
      ref={chatRef}
      style={{
        position: "fixed",
        left: `${chatPosition.x}px`,
        top: `${chatPosition.y}px`,
        width: "280px",
        height: "380px",
        zIndex: 9999,
      }}
      className="bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col overflow-hidden text-xs"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between bg-takouriBlue px-3 py-2 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1 text-white font-semibold text-xs">
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-bold">
            T
          </div>
          Takouri AI
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
        >
          <FaTimes size={10} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-2 overflow-y-auto space-y-1 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className="flex items-start space-x-1 max-w-[75%]">
                <div className="bg-takouriBlue text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center">
                  AI
                </div>
                <div className="bg-white px-2 py-1 rounded-xl shadow text-[11px]">
                  {msg.content || (msg.typing && "•••")}
                </div>
              </div>
            ) : (
              <div className="flex items-end space-x-1 max-w-[75%] justify-end">
                <div className="bg-takouriBlue text-white px-2 py-1 rounded-xl shadow text-[11px]">
                  {msg.content}
                </div>
                <FaUserCircle className="text-takouriBlue" size={14} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {greeted && (
        <div className="flex flex-wrap gap-1 p-1 bg-gray-100 border-t border-gray-300">
          {automatedOptions.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(opt)}
              className="bg-takouriBlue text-white text-[10px] px-2 py-0.5 rounded-full hover:opacity-90"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-1 p-1 bg-gray-100 border-t border-gray-300">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
          }
          placeholder={loading ? "Thinking..." : "Type..."}
          className="flex-1 border border-gray-300 rounded-md px-2 py-0.5 text-[11px] focus:ring-1 focus:ring-takouriBlue resize-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className={`px-2 py-0.5 rounded-md text-white text-[11px] ${
            input.trim()
              ? "bg-takouriBlue hover:bg-blue-600"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
