"use client";

import { useEffect, useState } from "react";

export const metadata = {
  title: "Privacy & Terms | Takouri Co.",
  description:
    "Learn how Takouri Co. protects your privacy, handles your data, and outlines the terms of service for all clients and visitors.",
};

export default function PrivacyTerms() {
  const [visible, setVisible] = useState(false);
  const [cookieChoice, setCookieChoice] = useState(null);
  const [year, setYear] = useState(""); // avoid SSR mismatch

  useEffect(() => {
    // Set year client-side to avoid hydration mismatch
    setYear(new Date().getFullYear());

    // Load cookie choice
    const stored = localStorage.getItem("takouri_cookie_v1");
    if (stored !== null) setCookieChoice(stored);

    // Trigger fade-in animation
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("takouri_cookie_v1", "1");
    setCookieChoice("1");
  };

  const handleDecline = () => {
    localStorage.setItem("takouri_cookie_v1", "0");
    setCookieChoice("0");
  };

  return (
    <div
      className={`min-h-screen bg-midnight text-text px-6 py-12 md:px-16 lg:px-32 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* --- HEADER --- */}
        <div className="space-y-3 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gold">Privacy & Terms</h1>
          <p className="text-secondary">
            Last Updated: October {year || "2025"}
          </p>
          <p className="text-white/70 max-w-2xl mx-auto">
            Welcome to <strong>Takouri Co.</strong> — a creative company built on
            trust, transparency, and vision. This page explains how we protect your
            data and the terms that govern our partnership.
          </p>
        </div>

        {/* --- PRIVACY SECTION --- */}
        <section id="privacy" className="space-y-6">
          <h2 className="text-3xl font-semibold text-gold">Privacy Policy</h2>
          <p>
            Your privacy is central to our mission. We collect only the data we
            need to deliver great creative experiences — nothing more.
          </p>

          <h3 className="text-2xl font-semibold text-gold">1. Information We Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal information you provide directly (like contact forms).</li>
            <li>Usage data through cookies or analytics tools.</li>
            <li>Voluntary submissions — such as newsletter signups or feedback.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gold">2. How We Use It</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>To personalize and improve our website experience.</li>
            <li>To communicate updates, drops, and opportunities.</li>
            <li>To measure performance and improve client experience.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gold">3. Data Sharing</h3>
          <p>
            We do not sell or trade your personal data. We may share limited
            information with trusted service providers (like email or hosting
            platforms) — only when necessary to operate Takouri Co. securely and
            effectively.
          </p>

          <h3 className="text-2xl font-semibold text-gold">4. Your Rights</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to your stored data.</li>
            <li>Request correction or deletion of personal information.</li>
            <li>Opt-out of analytics or marketing emails anytime.</li>
          </ul>
        </section>

        {/* --- TERMS SECTION --- */}
        <section id="terms" className="space-y-6 border-t border-white/10 pt-12">
          <h2 className="text-3xl font-semibold text-gold">Terms of Service</h2>
          <p>
            By accessing or using <strong>Takouri Co.</strong> services, you agree to
            these terms. Please read them carefully — they protect both your rights
            and ours.
          </p>

          <h3 className="text-2xl font-semibold text-gold">1. Acceptance of Terms</h3>
          <p>
            These terms apply to all visitors, clients, and partners. Continued use
            of our site or services means you accept them in full.
          </p>

          <h3 className="text-2xl font-semibold text-gold">2. Use of Services</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use our content and tools responsibly.</li>
            <li>Do not misuse creative assets or infringe on IP rights.</li>
            <li>Collaborate respectfully with our team and community.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gold">3. Intellectual Property</h3>
          <p>
            All materials, visuals, and creative works produced by Takouri Co. are
            protected by copyright and remain the property of the company unless
            otherwise stated in a signed contract.
          </p>

          <h3 className="text-2xl font-semibold text-gold">4. Limitation of Liability</h3>
          <p>
            Takouri Co. is not liable for any indirect, incidental, or consequential
            damages resulting from the use of our website or services. Use them at
            your own discretion.
          </p>

          <h3 className="text-2xl font-semibold text-gold">5. Termination</h3>
          <p>
            We reserve the right to suspend or terminate access if you breach these
            terms or misuse our services.
          </p>
        </section>

        {/* --- COOKIE & CONSENT SECTION --- */}
        <section id="cookies" className="space-y-6 border-t border-white/10 pt-12">
          <h2 className="text-3xl font-semibold text-gold">Cookie & Consent</h2>
          <p>
            Cookies help us serve you better. They personalize content, analyze
            traffic, and improve site performance. You can accept or decline
            below — your choice will be remembered for 12 months.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleAccept}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                cookieChoice === "1"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gold text-midnight hover:bg-gold/80"
              }`}
            >
              Accept All
            </button>

            <button
              onClick={handleDecline}
              className={`px-5 py-2.5 rounded-full border font-semibold transition-all duration-300 ${
                cookieChoice === "0"
                  ? "border-red-500 text-red-400"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              Decline
            </button>
          </div>

          {cookieChoice && (
            <p className="text-sm text-white/70 pt-2">
              Your preference has been saved. Manage it anytime in{" "}
              <a href="/cookie" className="underline text-gold">
                Cookie Settings
              </a>
              .
            </p>
          )}
        </section>

        {/* --- RELATED LINKS --- */}
        <section className="space-y-4 border-t border-white/10 pt-12 text-center">
          <h3 className="text-xl font-semibold text-gold">Related Legal Pages</h3>
          <p className="text-sm text-white/70">
            Explore our other policies to understand your full rights and our
            creative standards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a href="/legal/dmca" className="text-gold underline">
              DMCA Policy
            </a>
            
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="pt-10 text-center text-sm text-white/60">
          <p>© {year || "2025"} Takouri Co. All rights reserved.</p>
          <p className="text-white/50">Made with ❤️ in South Africa.</p>
        </footer>
      </div>
    </div>
  );
}
