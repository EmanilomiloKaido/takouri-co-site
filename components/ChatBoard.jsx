// ChatBoard.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";

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

  // Position chat box bottom-right by default
  useEffect(() => {
    if (typeof window !== "undefined") {
      setChatPosition({
        x: Math.max(10, window.innerWidth - 320),
        y: Math.max(10, window.innerHeight - 420),
      });
    }
  }, []);

  // Listen for FAQ "openChat" event
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

  // Auto-scroll to latest message
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

  // --- Dragging logic ---
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

  // --- Billion-Dollar Response Logic ---
  const getResponse = (text) => {
    const lower = text.toLowerCase();

    if (!greeted && /hi|hello|hey/i.test(lower)) {
      setGreeted(true);
      return `👋 Hey visionary! Welcome to Takouri — where raw ideas become a reality.
What’s your focus today — Startup, Marketing, Growth, Creative, Money, or Leadership?`;
    }

    if (lower.includes("startup"))
      return `💡 Every company started as a sketch on paper.
Don’t wait for perfect — build small, test fast, and talk to real people.
Document every lesson. Your early chaos is your future strategy.
⚙️ Want me to help you design your first *3-step startup blueprint*?`;

    if (lower.includes("marketing"))
      return `📈 Marketing isn’t selling — it’s storytelling.
Find the emotion behind your product and make people *feel* it.
Build community first, sell second.
Start posting insights, behind-the-scenes, or transformations that prove your brand *gets people*.
🎯 Want me to outline a *one-page marketing plan* for your brand?`;

    if (lower.includes("money"))
      return `💰 Money follows mastery.
Focus on becoming the most *trusted* and *consistent* in your lane.
Track every cent, invest in tools that multiply time, not comfort.
Make your money work while you sleep — even if it starts with R500.
💡 Want me to show you how to turn your skill into passive income?`;

    if (lower.includes("growth"))
      return `🚀 Growth is the reward for discipline.
Study your results weekly, not your emotions daily.
Outgrow your habits, not just your goals.
One percent better every day turns into legendary impact in a year.
🧭 Want to see your *next 3 growth moves* for the next 30 days?`;

    if (lower.includes("creative"))
      return `🎬 Creativity is divine. Don’t chase trends — create tone.
Your originality is your currency.
Keep a *vision journal*, experiment weekly, and collaborate with dreamers who make your ideas louder.
🎨 Want me to give you *5 creative project ideas* to grow your brand presence?`;

    if (lower.includes("leadership"))
      return `👑 Leadership is service, not status.
Move like someone who already runs an empire, even if your team is just you right now.
Listen twice as much as you speak. Build people, not followers.
⚔️ Want me to share *Takouri’s 3 Laws of Legendary Leadership*?`;

    const replies = [
      "⚡ Interesting. Tell me more — what’s the vision behind that?",
      "🌱 Every great idea starts small. Let’s shape it into something unstoppable.",
      "🔥 That’s the spark! What do you think your next bold step could be?",
      "💭 I see where your mind’s going — want help turning that into a real plan?",
      "💡 Love that direction. Want me to break it into your next 3 action points?",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  // --- Send Message Logic ---
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

  // --- Compact Floating Button ---
  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-takouriBlue text-white px-3 py-2 rounded-full shadow-lg text-xs hover:bg-blue-600 transition-all z-50"
      >
        💬 Chat with Takouri AI
      </button>
    );

  // --- Chat Box ---
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
                <div className="bg-white px-2 py-1 rounded-xl shadow text-[11px] whitespace-pre-line">
                  {msg.content || (msg.typing && "•••")}
                </div>
              </div>
            ) : (
              <div className="flex items-end space-x-1 max-w-[75%] justify-end">
                <div className="bg-takouriBlue text-white px-2 py-1 rounded-xl shadow text-[11px] whitespace-pre-line">
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
