"use client";

import { motion } from "framer-motion";

export const metadata = {
  title: "DMCA Takedown Policy | Takouri Co.",
  description:
    "Takouri Co. respects the intellectual property rights of others. Read our DMCA policy for copyright claim procedures.",
};

export default function DMCA() {
  const year = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1], // Apple-like smooth curve
      }}
      className="min-h-screen bg-midnight text-text px-6 py-12 md:px-16 lg:px-32"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* --- HEADER --- */}
        <h1 className="text-4xl font-bold text-gold">DMCA Takedown Policy</h1>
        <p className="text-secondary">Last Updated: October {year}</p>

        <p>
          <strong>Takouri Co.</strong> respects intellectual property rights and
          expects all collaborators, partners, and users to do the same. This
          page outlines our policy under the{" "}
          <strong>Digital Millennium Copyright Act (DMCA)</strong>.
        </p>

        {/* --- REPORTING --- */}
        <h2 className="text-2xl font-semibold text-gold">
          1. Reporting Copyright Infringement
        </h2>
        <p>
          If you believe your copyrighted work has been used or displayed on our
          platform without permission, please send a written notice including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-text">
          <li>Your full legal name, address, and contact information.</li>
          <li>Description of the copyrighted work.</li>
          <li>The exact URL(s) where the material appears.</li>
          <li>
            A statement of good-faith belief that the use is unauthorized.
          </li>
          <li>Electronic or physical signature.</li>
        </ul>

        {/* --- CONTACT --- */}
        <h2 className="text-2xl font-semibold text-gold">
          2. Send Your DMCA Notice To:
        </h2>
        <div className="bg-white/5 p-4 rounded-xl shadow-lg">
          <p>
            <strong>Copyright Agent:</strong>
          </p>
          <p>Takouri Co. Legal Department</p>
          <p>
            📧{" "}
            <a
              href="mailto:legal@takouri.co.za"
              className="text-gold underline"
            >
              legal@takouri.co.za
            </a>
          </p>
          <p>
            🌐{" "}
            <a
              href="https://www.takouri.co.za"
              className="text-gold underline"
            >
              https://www.takouri.co.za
            </a>
          </p>
        </div>

        {/* --- COUNTER NOTICE --- */}
        <h2 className="text-2xl font-semibold text-gold">
          3. Counter-Notification
        </h2>
        <p>
          If you believe your content was removed in error, submit a
          counter-notice with your contact info, the removed material, and a
          statement under penalty of perjury that removal was a mistake.
        </p>

        {/* --- RELATED LINKS --- */}
        <p className="text-secondary pt-4">
          Related pages:{" "}
          <a href="/legal/privacy-terms" className="text-gold underline ml-1">
            Privacy & Terms
          </a>{" "}
          ·{" "}
          <a href="/cookie" className="text-gold underline ml-1">
            Cookie Settings
          </a>
        </p>

        {/* --- FOOTER --- */}
        <p className="pt-6 text-secondary text-sm">
          © {year} Takouri Co. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
}
