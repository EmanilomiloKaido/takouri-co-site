"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "takouri_cookie_v2"; // unified key

export default function CookieBanner() {
  const [cookieAccepted, setCookieAccepted] = useState(undefined); // undefined = not checked yet
  const [bannerOpen, setBannerOpen] = useState(false);

  // Read cookie acceptance from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    setCookieAccepted(stored === "1"); // true | false
  }, []);

  // Auto-show mini banner if not accepted
  useEffect(() => {
    if (cookieAccepted === false) {
      const timer = setTimeout(() => setBannerOpen(true), 500); // slight delay for smooth appearance
      return () => clearTimeout(timer);
    }
  }, [cookieAccepted]);

  function acceptCookies() {
    localStorage.setItem(COOKIE_KEY, "1");
    setCookieAccepted(true);
    setBannerOpen(false);
  }

  function declineCookies() {
    localStorage.setItem(COOKIE_KEY, "0");
    setCookieAccepted(false);
    setBannerOpen(false);
  }

  // **Prevent flash**: don't render until cookie check is done
  if (cookieAccepted === undefined) return null;
  if (cookieAccepted === true) return null; // hide completely if accepted

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500`}
      style={{
        transform: bannerOpen ? "translateX(0)" : "translateX(120%)",
      }}
    >
      {!bannerOpen ? (
        <button
          onClick={() => setBannerOpen(true)}
          className="px-4 py-2 rounded-full bg-gold text-midnight shadow-lg text-xs font-semibold hover:scale-105 transition-transform"
        >
          🍪 Cookies
        </button>
      ) : (
        <div className="bg-midnight text-text p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 items-center max-w-xs">
          <div className="flex-1 text-sm">
            We use cookies to personalize content and analyze traffic. Accept to continue or manage preferences.
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={acceptCookies}
              className="px-3 py-2 rounded-md bg-gold text-midnight hover:scale-105 transition-transform"
            >
              Accept
            </button>
            <button
              onClick={declineCookies}
              className="px-3 py-2 rounded-md border hover:scale-105 transition-transform"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
