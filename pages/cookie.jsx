"use client";

import { useEffect, useState } from "react";

export const metadata = {
  title: "Cookie Settings | Takouri Co.",
  description:
    "Manage your cookie preferences for Takouri Co. We respect your privacy and give you full control over your data.",
};

export default function CookieSettings() {
  const defaultPrefs = {
    essential: true,
    analytics: true,
    marketing: false,
    functional: true,
  };

  const [prefs, setPrefs] = useState(defaultPrefs);
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookiePrefs");
    if (stored) setPrefs(JSON.parse(stored));
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const savePrefs = () => {
    localStorage.setItem("cookiePrefs", JSON.stringify(prefs));
    setSaved(true);
    loadConditionalScripts();
  };

  const loadConditionalScripts = () => {
    if (prefs.analytics && !document.getElementById("ga-script")) {
      const script = document.createElement("script");
      script.id = "ga-script";
      script.src =
        "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID";
      script.async = true;
      document.body.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "GA_MEASUREMENT_ID");
    }

    if (prefs.marketing) console.log("Marketing scripts would load here.");
  };

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  return (
    <div
      className={`min-h-screen bg-midnight text-text px-6 py-12 md:px-16 lg:px-32 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gold">
            Cookie Settings
          </h1>
          <p className="text-secondary">Last Updated: October 2025</p>
        </div>

        <p className="text-lg text-secondary/90 leading-relaxed">
          At <strong>Takouri Co.</strong>, we use cookies to enhance your
          browsing experience, analyze traffic, and improve services. You have
          full control over which cookies you allow.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gold">
            1. What Are Cookies?
          </h2>
          <p className="text-secondary/90 leading-relaxed">
            Cookies are small text files stored on your device to remember
            preferences and measure performance.
          </p>

          <h2 className="text-2xl font-semibold text-gold">
            2. Types of Cookies We Use
          </h2>
          <div className="bg-white/5 p-6 rounded-2xl shadow-lg space-y-4 backdrop-blur-sm">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked disabled />
              <span>Essential cookies (required)</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={() => togglePref("analytics")}
              />
              <span>Analytics cookies</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={() => togglePref("marketing")}
              />
              <span>Marketing cookies</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={prefs.functional}
                onChange={() => togglePref("functional")}
              />
              <span>Functional cookies</span>
            </label>

            <button
              onClick={savePrefs}
              className="mt-6 w-full md:w-auto px-6 py-3 rounded-full bg-gold text-midnight font-semibold hover:bg-gold/80 transition-all duration-300"
            >
              Save Preferences
            </button>

            {saved && (
              <p className="text-green-500 text-sm pt-2">
                Preferences saved successfully!
              </p>
            )}
          </div>
        </div>

        <div className="pt-6 text-secondary text-center md:text-left">
          Related pages:{" "}
          <a
            href="/legal/privacy-terms"
            className="text-gold underline hover:text-gold/80 transition-colors"
          >
            Privacy & Terms
          </a>{" "}
          ·{" "}
          <a
            href="/legal/dmca"
            className="text-gold underline hover:text-gold/80 transition-colors"
          >
            DMCA Policy
          </a>
        </div>

        <p className="pt-8 text-secondary/70 text-center text-sm">
          © {new Date().getFullYear()} Takouri Co. All rights reserved.
        </p>
      </div>
    </div>
  );
}
