"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaComments,
} from "react-icons/fa";
import ChatBoard from "./ChatBoard";

export default function Footer({ showTopLine = true }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [preFilledMessage, setPreFilledMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const year = new Date().getFullYear();

  // --- Listen for FAQ "Ask AI" events ---
  useEffect(() => {
    const handleOpenChat = (e) => {
      setPreFilledMessage(e.detail || "");
      setChatOpen(true);
    };
    window.addEventListener("openChat", handleOpenChat);
    return () => window.removeEventListener("openChat", handleOpenChat);
  }, []);

  // --- Newsletter submission ---
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <footer className="relative z-10 bg-white border-t border-gray-200 shadow-lg py-8 px-6">
        {showTopLine && <div className="h-1 w-full bg-takouriBlue mb-6 rounded-full" />}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding & Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-takouriBlue/80 to-takouriBlue flex items-center justify-center text-white font-bold text-lg shadow-md">
                T
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-lg text-takouriBlue hover:opacity-80 transition">
                  Takouri Co.
                </div>
                <div className="text-sm text-gray-500">
                  Legendary creatives for brands & artists.
                </div>
              </div>
            </div>

            <form className="flex flex-col gap-2 relative" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email — weekly ideas & drops"
                className="rounded-md px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-takouriBlue focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={sending}
                className={`px-4 py-2 rounded-md text-white w-full sm:w-auto font-semibold transition ${
                  sending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-takouriBlue hover:bg-blue-500"
                }`}
              >
                {sending ? "Sending..." : "Join"}
              </button>
              {success && (
                <div className="absolute top-full mt-2 text-green-600 font-medium animate-fade-in">
                  🎉 Email successfully sent!
                </div>
              )}
              {error && (
                <div className="absolute top-full mt-2 text-red-600 font-medium animate-fade-in">
                  ⚠️ {error}
                </div>
              )}
            </form>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-3 text-takouriBlue">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["About", "Work", "Pricing", "Blog", "Developer playground"].map(
                (item, i) => {
                  const link =
                    item === "Work"
                      ? "/portfolio"
                      : `/${item.toLowerCase().replace(" ", "-")}`;
                  return (
                    <li key={i}>
                      <Link
                        href={link}
                        className="underline hover:text-takouriBlue transition"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 text-takouriBlue">Support</h4>
            <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-3">
              <button
                onClick={() => setChatOpen(true)}
                className="bg-takouriBlue hover:bg-blue-500 text-white rounded-md py-2 font-medium transition"
              >
                Live Chat
              </button>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  FAQ:{" "}
                  <Link
                    href="/faq"
                    className="underline hover:text-takouriBlue transition"
                  >
                    View common questions
                  </Link>
                </div>
                <div>Support Hours: 24/7</div>
              </div>
            </div>
          </div>

          {/* Legal & Business */}
          <div>
            <h4 className="font-semibold mb-3 text-takouriBlue">
              Legal & Business
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/legal/privacy-terms"
                  className="underline hover:text-takouriBlue transition"
                >
                  Privacy & Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie"
                  className="underline hover:text-takouriBlue transition"
                >
                  Cookie Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/dmca"
                  className="underline hover:text-takouriBlue transition"
                >
                  DMCA
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@takouri.co.za"
                  className="underline hover:text-takouriBlue transition"
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
            <div className="text-xs">A trusted partner of</div>
            <div className="flex gap-3 items-center">
              {["Emanilomilo Foundation"].map((txt, i) => (
                <div
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-blue-50 transition"
                >
                  {txt}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex space-x-5 md:justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-500 transition"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 transition"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 transition"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition"
              >
                <FaWhatsapp size={18} />
              </a>
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

      {/* Self-contained ChatBoard (no wrapper divs) */}
      {chatOpen && (
        <ChatBoard preFilledMessage={preFilledMessage} closeChat={() => setChatOpen(false)} />
      )}

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-8 right-8 z-[999] bg-takouriBlue hover:bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <FaComments size={22} />
        </button>
      )}
    </>
  );
}
