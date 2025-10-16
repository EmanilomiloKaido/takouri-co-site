"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatBoard from "../components/ChatBoard";
import {
  FaComments,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const COOKIE_KEY = "takouri_cookie_v2";

export default function Footer() {
  const [cookieAccepted, setCookieAccepted] = useState(undefined);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const chatRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const year = new Date().getFullYear();

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    setCookieAccepted(stored === "1");
  }, []);

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

  if (cookieAccepted === undefined) return null;

  return (
    <>
      <footer className="relative z-10 bg-white border-t border-gray-200 shadow-lg py-8 px-6">
        {/* Top Line Gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-6 rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding & Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-300 via-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                T
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-lg text-gray-900 hover:text-blue-600 transition">
                  Takouri Co.
                </div>
                <div className="text-sm text-gray-500">
                  Legendary creatives for brands & artists.
                </div>
              </div>
            </div>

            <form className="flex flex-col gap-2 relative">
              <input
                type="email"
                placeholder="Your email — weekly ideas & drops"
                className="rounded-md px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 text-white w-full sm:w-auto hover:bg-blue-700 transition"
              >
                Join
              </button>
            </form>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["About", "Work", "Pricing", "Blog", "Developer playground"].map(
                (item, i) => {
                  const link =
                    item === "Work"
                      ? "/portfolio"
                      : `/${item.toLowerCase().replace(" ", "-")}`;
                  return (
                    <li key={i}>
                      <a
                        href={link}
                        className="underline hover:text-blue-600 transition"
                      >
                        {item}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Support</h4>
            <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-3">
              <button
                onClick={handleChatOpen}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 font-medium transition"
              >
                Live Chat
              </button>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  FAQ:{" "}
                  <a
                    href="/faq"
                    className="underline hover:text-blue-600 transition"
                  >
                    View common questions
                  </a>
                </div>
                <div>Support Hours: 24/7</div>
              </div>
            </div>
          </div>

          {/* Legal & Business */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">
              Legal & Business
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="/legal/privacy-terms"
                  className="underline hover:text-blue-600 transition"
                >
                  Privacy & Terms
                </a>
              </li>
              <li>
                <a
                  href="/cookie"
                  className="underline hover:text-blue-600 transition"
                >
                  Cookie Settings
                </a>
              </li>
              <li>
                <a
                  href="/legal/dmca"
                  className="underline hover:text-blue-600 transition"
                >
                  DMCA
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@takouri.co.za"
                  className="underline hover:text-blue-600 transition"
                >
                  info@takouri.co.za
                </a>
              </li>
            </ul>
            <div className="mt-4 text-sm text-gray-400">
              © {year} Takouri Co. All rights reserved.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="text-xs">Trusted by</div>
            <div className="flex gap-3 items-center">
              {["Client A", "Client B", "Award 2025"].map((txt, i) => (
                <div
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-blue-100 transition"
                >
                  {txt}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex space-x-5 md:justify-end">
              <FaFacebookF className="text-[#1877F2] hover:brightness-110 cursor-pointer transition-all duration-300 transform hover:scale-110" />
              <FaInstagram className="text-[#E1306C] hover:brightness-110 cursor-pointer transition-all duration-300 transform hover:scale-110" />
              <FaTwitter className="text-[#1DA1F2] hover:brightness-110 cursor-pointer transition-all duration-300 transform hover:scale-110" />
              <FaLinkedinIn className="text-[#0077B5] hover:brightness-110 cursor-pointer transition-all duration-300 transform hover:scale-110" />
              <FaWhatsapp className="text-[#25D366] hover:brightness-110 cursor-pointer transition-all duration-300 transform hover:scale-110" />
            </div>

            <div className="flex items-center gap-4">
              <select className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 transition">
                <option>EN</option>
                <option>AF</option>
                <option>ES</option>
              </select>
              <div>Made with ❤️ in South Africa</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Draggable Floating ChatBox */}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ChatBoard perfectly sized inside */}
          <div
            style={{
              width: "320px",
              height: "460px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            }}
          >
            <ChatBoard onClose={() => setChatOpen(false)} />
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={handleChatOpen}
          className="fixed bottom-8 right-8 z-[999] bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <FaComments size={22} />
        </button>
      )}
    </>
  );
}
