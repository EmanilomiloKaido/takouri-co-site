// components/GetStartedForm.jsx
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
    { id: "brand", title: "Brand Identity", desc: "Logos & luxury brand systems" },
    { id: "web", title: "Web Experiences", desc: "Websites & platforms built for impact" },
    { id: "marketing", title: "Digital Marketing", desc: "Strategy & growth for global reach" },
    { id: "unsure", title: "Not Sure Yet", desc: "I just know I want Takouri Co. " },
  ];

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError("");
    if (!service) return setError("Please select a service.");
    if (!name || !email) return setError("Please provide your name and an email.");
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
      setTimeout(() => onClose?.(), 1800);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center max-w-md w-full">
        <h3 className="text-xl font-bold">Thanks — we received it ✨</h3>
        <p className="mt-2 text-sm text-white/80">A Takouri Co. team member will reach out shortly.</p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => onClose?.()}
        className="absolute top-3 right-3 text-white/80 hover:text-white"
      >
        ✕
      </button>

      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white">Let’s craft your legacy together</h2>
        <p className="text-sm text-white/80 mt-1">Pick a pillar. If unsure, choose "Not Sure Yet".</p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setService(s.id)}
            aria-pressed={service === s.id}
            className={`p-3 rounded-lg text-left border transition focus:outline-none text-sm ${
              service === s.id
                ? "bg-gold/20 border-gold text-gold"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white/90"
            }`}
          >
            <div className="font-semibold">{s.title}</div>
            <div className="opacity-80 mt-1 text-xs">{s.desc}</div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-white/90">
          Who should we address this masterpiece to?
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
          Where shall we send your tailored vision?
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
          For quicker collaboration, leave us a direct line (optional)
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

      {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

      <div className="mt-4">
        <Button type="submit" className="w-full">
          {loading ? "Sending..." : "Begin My Journey"}
        </Button>
      </div>
    </motion.form>
  );
}
