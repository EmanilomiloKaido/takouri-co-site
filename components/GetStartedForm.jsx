import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

export default function GetStartedForm({ onClose }) {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const services = [
    {
      id: "brand",
      title: "Brand Identity",
      desc: "Forge symbols and systems that embody who you truly are.",
    },
    {
      id: "web",
      title: "Web Experiences",
      desc: "Create digital worlds that captivate and convert.",
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      desc: "Amplify your voice until your presence fills the room.",
    },
    {
      id: "unsure",
      title: "Not Sure Yet",
      desc: "You bring the dream. We’ll define the direction together.",
    },
  ];

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError("");

    if (!service) return setError("Choose the path that feels right for you.");
    if (!name || !email) return setError("We’ll need your name and an email to reach you.");
    if (!validateEmail(email)) return setError("Please provide a valid email address.");

    setLoading(true);
    try {
      const res = await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || "Submission failed");
      setSuccess(true);
      setTimeout(() => onClose?.(), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center max-w-md w-full"
      >
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-gold"
        >
          Step One Complete ✨
        </motion.h3>
        <p className="mt-2 text-sm text-white/80">
          A Takouri Co. guide will reach out soon to begin your story.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/10"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => onClose?.()}
        className="absolute top-3 right-3 text-white/70 hover:text-white"
      >
        ✕
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Your Journey Starts Here</h2>
        <p className="text-sm text-white/70 mt-1">
          Choose a pillar that aligns with your vision — or let us guide you.
        </p>
      </div>

      {/* Service Options */}
      <div className="grid md:grid-cols-2 gap-3 mb-5">
        {services.map((s) => (
          <motion.button
            key={s.id}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setService(s.id)}
            className={`p-3 rounded-lg text-left border transition text-sm ${
              service === s.id
                ? "bg-gold/20 border-gold text-gold"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white/90"
            }`}
          >
            <div className="font-semibold">{s.title}</div>
            <div className="opacity-80 mt-1 text-xs">{s.desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <label className="block text-sm text-white/90">
          What should we call you?
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
            className="w-full mt-2 px-3 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Your name"
          />
        </label>

        <label className="block text-sm text-white/90">
          Where shall we send your first message?
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            required
            className="w-full mt-2 px-3 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="you@company.com"
          />
        </label>

        <label className="block text-sm text-white/90">
          Add your direct line (optional)
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            type="tel"
            className="w-full mt-2 px-3 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="+27 71 000 0000"
          />
        </label>
      </div>

      {error && <p className="text-red-400 mt-3 text-sm text-center">{error}</p>}

      <div className="mt-6">
        <Button type="submit" className="w-full">
          {loading ? "Sending..." : "Begin My Journey"}
        </Button>
      </div>

      <p className="text-xs text-center text-white/50 mt-4">
        Your story stays confidential. We only use your info to start your project.
      </p>
    </motion.form>
  );
}
