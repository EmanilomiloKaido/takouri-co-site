// pages/contact.jsx
"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.message);
      if (res.ok) form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-midnight text-text min-h-[70vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 overflow-hidden">
        {/* Floating shapes */}
        <motion.div
          className="absolute w-72 h-72 bg-gold/20 rounded-full top-10 left-10 filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-60 h-60 bg-white/10 rounded-full bottom-20 right-20 filter blur-2xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 relative z-10 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Let’s craft your next <span className="text-gold">legacy</span>.
        </motion.h1>

        <motion.p
          className="text-secondary max-w-3xl mb-12 text-lg md:text-2xl relative z-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Reach out and let us bring your vision to life — quickly, clearly, and stress-free.
        </motion.p>

        <a
          href="#contactForm"
          className="px-8 py-4 bg-gold text-midnight font-semibold rounded-lg hover:ring-4 hover:ring-gold transition-all z-10"
        >
          Send a Message
        </a>
      </section>

      {/* Contact Form Section */}
      <section
        id="contactForm"
        className="relative bg-gray-50 py-20 px-6 md:px-12 max-w-3xl mx-auto rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Floating particles */}
        <motion.div
          className="absolute w-16 h-16 bg-gold opacity-20 rounded-full top-10 left-10"
          animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-20 h-20 bg-midnight opacity-10 rounded-full bottom-10 right-10"
          animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            Fill out the form below and our team will reach out to craft your next legacy-defining project.
          </p>
        </motion.div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold focus:outline-none transition transform hover:scale-105"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold focus:outline-none transition transform hover:scale-105"
          />
          <select
            name="service"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold focus:outline-none transition transform hover:scale-105"
          >
            <option value="">Select a Service (Optional)</option>
            <option value="branding">Branding</option>
            <option value="web">Web Design</option>
            <option value="marketing">Marketing</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold focus:outline-none transition transform hover:scale-105 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-4 bg-midnight text-white font-semibold rounded-lg hover:ring-4 hover:ring-gold transition-all self-center transform hover:scale-105 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </section>

      {/* Optional CTA Section */}
      <section className="relative bg-midnight text-white py-24 px-6 text-center overflow-hidden">
        {/* Floating shapes */}
        <motion.div
          className="absolute w-16 h-16 bg-gold opacity-20 rounded-full top-10 left-10"
          animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-20 h-20 bg-white/10 opacity-10 rounded-full bottom-10 right-10"
          animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Prefer a Direct Conversation?
        </motion.h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg md:text-xl">
          Call or email us and we’ll discuss your vision personally.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href="mailto:emanilomilokaido@gmail.com"
            className="px-8 py-4 bg-gold text-midnight font-semibold rounded-lg hover:ring-4 hover:ring-gold transition-all"
          >
            Email Us
          </a>
          <a
            href="tel:+27720967077"
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:ring-4 hover:ring-white/30 transition-all"
          >
            Call Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer showTopLine />
    </>
  );
}
