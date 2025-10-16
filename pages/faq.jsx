"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaTimes, FaComments } from "react-icons/fa";
import ChatBoard from "../components/ChatBoard";

const FAQ_DATA = [
  {
    question: "How do I get started with Takouri Co?",
    answer: "Reach out via live chat or email at info@takouri.co.za. We'll guide you step by step."
  },
  {
    question: "What services do you offer?",
    answer: "Brand consulting, media production, video storytelling, artist marketing campaigns, and digital strategy."
  },
  {
    question: "Can I request a custom package?",
    answer: "Yes! Contact us with your vision and budget, and we’ll craft a unique plan."
  },
  {
    question: "What are your support hours?",
    answer: "Our team is available 24/7 via live chat. Emails are typically answered within 12 hours."
  },
  {
    question: "How do I pay for your services?",
    answer: "We accept bank transfers, card payments, and online gateways. Payment plans are available."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [preFilledMessage, setPreFilledMessage] = useState("");
  const chatRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  // Drag handlers
  const startDrag = (e) => {
    if (!chatRef.current) return;
    setDragging(true);
    offset.current = { x: e.clientX - chatPosition.x, y: e.clientY - chatPosition.y };
  };
  const duringDrag = (e) => {
    if (!dragging) return;
    setChatPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
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

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleAskQuestion = (question) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setChatPosition({ x: width - 360, y: height - 380 });
    setPreFilledMessage(question);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-10">
          Frequently Asked Questions
        </h1>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl overflow-hidden transition transform hover:scale-[1.01]"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-800 text-lg">{item.question}</span>
                {openIndex === i ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-600 text-sm flex flex-col gap-3">
                  <p>{item.answer}</p>
                  <button
                    onClick={() => handleAskQuestion(item.question)}
                    className="self-start px-4 py-2 bg-[#00B8D4] text-white rounded-md hover:bg-[#00ACC1] transition"
                  >
                    Ask AI about this
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Extra Support Info */}
        <div className="bg-[#00B8D4]/10 rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Need more help?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
            <li>Contact our live chat for instant assistance.</li>
            <li>Check out our tutorial videos and guides.</li>
            <li>Follow us on Instagram and LinkedIn for updates and tips.</li>
            <li>Join our newsletter for weekly insights and free resources.</li>
          </ul>
        </div>
      </div>

      {/* Draggable Floating Chat Box */}
      {chatOpen && (
        <div
          ref={chatRef}
          onMouseDown={startDrag}
          style={{
            position: "fixed",
            left: `${chatPosition.x}px`,
            top: `${chatPosition.y}px`,
            cursor: dragging ? "grabbing" : "grab",
            zIndex: 999
          }}
          className="w-80 max-h-[480px] bg-gradient-to-br from-[#0B0D14] to-[#1C1F2E] rounded-3xl shadow-2xl border border-[#00B8D4]/30 overflow-hidden transition-all"
        >
          <div className="flex justify-end items-center bg-[#1C1F2E] p-2 border-b border-[#00B8D4]/20">
            <button
              onClick={() => setChatOpen(false)}
              className="text-[#FFD700] hover:text-[#00B8D4] transition"
            >
              <FaTimes size={18} />
            </button>
          </div>
          <ChatBoard preFilledMessage={preFilledMessage} />
        </div>
      )}

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-20 right-8 z-[999] bg-[#00B8D4] hover:bg-[#00ACC1] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <FaComments size={20} />
        </button>
      )}
    </div>
  );
}
