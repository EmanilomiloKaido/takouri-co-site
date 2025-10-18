"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ_DATA = [
  {
    question: "How do I get started with Takouri Co?",
    answer:
      "Reach out via live chat or email at info@takouri.co.za. We'll guide you step by step.",
  },
  {
    question: "What services do you offer?",
    answer:
      "Brand consulting, media production, video storytelling, artist marketing campaigns, and digital strategy.",
  },
  {
    question: "Can I request a custom package?",
    answer:
      "Yes! Contact us with your vision and budget, and we’ll craft a unique plan.",
  },
  {
    question: "What are your support hours?",
    answer:
      "Our team is available 24/7 via live chat. Emails are typically answered within 12 hours.",
  },
  {
    question: "How do I pay for your services?",
    answer:
      "We accept bank transfers, card payments, and online gateways. Payment plans are available.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

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
              className="bg-white shadow-md rounded-xl overflow-hidden transition transform hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-800 text-lg">
                  {item.question}
                </span>
                {openIndex === i ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-600 text-sm">
                  <p>{item.answer}</p>
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
    </div>
  );
}
