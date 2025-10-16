"use client";

import React, { useEffect, useRef, useState } from "react";

const colors = ["#00B8D4", "#00ACC1", "#FFD700", "#FF6B6B", "#6B5B95", "#FF69B4", "#8A2BE2"];
const emojiOptions = ["🚀", "🎨", "💻", "🔥", "🌟", "😎", "🤖", "✨"];

export default function DeveloperPlayground() {
  const canvasRef = useRef(null);
  const [themeColor, setThemeColor] = useState("#00B8D4");
  const [customMessage, setCustomMessage] = useState("");
  const emojisRef = useRef([]);
  const particlesRef = useRef([]);
  const messageParticlesRef = useRef([]);
  const draggingRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const gravity = 0.3;
  const friction = 0.8;
  const emojiRadius = 20;

  // Launch emoji
  const launchEmoji = (char) => {
    const newEmoji = {
      id: Date.now(),
      char,
      x: Math.random() * 250 + 40,
      y: Math.random() * 150 + 40,
      vx: Math.random() * 6 - 3,
      vy: Math.random() * -4 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    emojisRef.current.push(newEmoji);
  };

  // Particle explosion
  const createParticles = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 50 + Math.random() * 30,
        color,
      });
    }
  };

  // Message particles
  const createMessageParticles = (char, startX, startY) => {
    for (let i = 0; i < 5; i++) {
      messageParticlesRef.current.push({
        char,
        x: startX + Math.random() * 10 - 5,
        y: startY + Math.random() * 10 - 5,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * -2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60 + Math.random() * 20,
      });
    }
  };

  // Dragging
  const startDrag = (e, emoji) => {
    draggingRef.current = emoji;
    offsetRef.current = { x: e.clientX - emoji.x, y: e.clientY - emoji.y };
  };
  const duringDrag = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current.x = e.clientX - offsetRef.current.x;
    draggingRef.current.y = e.clientY - offsetRef.current.y;
    draggingRef.current.vx = 0;
    draggingRef.current.vy = 0;
  };
  const endDrag = () => (draggingRef.current = null);

  // Typing letters
  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setCustomMessage(newMessage);

    if (newMessage.length > 0) {
      const lastChar = newMessage[newMessage.length - 1];
      createMessageParticles(lastChar, 20 + (newMessage.length - 1) * 18, 30);
    }
  };

  // Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 280;

    const animate = () => {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Emojis
      for (let i = 0; i < emojisRef.current.length; i++) {
        const e = emojisRef.current[i];
        if (draggingRef.current !== e) {
          e.vy += gravity;
          e.x += e.vx;
          e.y += e.vy;

          if (e.x < emojiRadius) { e.x = emojiRadius; e.vx *= -1; createParticles(e.x, e.y, e.color); }
          if (e.x > canvas.width - emojiRadius) { e.x = canvas.width - emojiRadius; e.vx *= -1; createParticles(e.x, e.y, e.color); }
          if (e.y > canvas.height - emojiRadius) { e.y = canvas.height - emojiRadius; e.vy *= -friction; createParticles(e.x, e.y, e.color); }
        }

        ctx.font = "30px sans-serif";
        ctx.fillStyle = e.color;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 10;
        ctx.fillText(e.char, e.x - emojiRadius / 2, e.y + emojiRadius / 2);

        // Collisions
        for (let j = i + 1; j < emojisRef.current.length; j++) {
          const other = emojisRef.current[j];
          const dx = other.x - e.x;
          const dy = other.y - e.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < emojiRadius * 2) {
            const angle = Math.atan2(dy, dx);
            const speed1 = Math.sqrt(e.vx * e.vx + e.vy * e.vy);
            const speed2 = Math.sqrt(other.vx * other.vx + other.vy * other.vy);
            const direction1 = Math.atan2(e.vy, e.vx);
            const direction2 = Math.atan2(other.vy, other.vx);

            e.vx = speed2 * Math.cos(direction2 - angle);
            e.vy = speed2 * Math.sin(direction2 - angle);
            other.vx = speed1 * Math.cos(direction1 - angle);
            other.vy = speed1 * Math.sin(direction1 - angle);

            createParticles((e.x + other.x)/2, (e.y + other.y)/2, e.color);
          }
        }
      }

      // Emoji particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vy += gravity * 0.1;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 80;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (p.life <= 0) particlesRef.current.splice(i, 1);
      }

      // Message particles
      for (let i = messageParticlesRef.current.length - 1; i >= 0; i--) {
        const p = messageParticlesRef.current[i];
        p.vy += gravity * 0.2;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(p.life / 60, 1);
        ctx.fillText(p.char, p.x, p.y);
        ctx.globalAlpha = 1;
        if (p.life <= 0) messageParticlesRef.current.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", duringDrag);
    window.addEventListener("mouseup", endDrag);
    return () => {
      window.removeEventListener("mousemove", duringDrag);
      window.removeEventListener("mouseup", endDrag);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00B8D4] via-[#00ACC1] to-[#00B8D4]">
          Developer Playground
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Play with colors, emojis, and custom message particles in real-time!
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Theme Color Picker */}
        <div
          style={{ borderColor: themeColor }}
          className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-4 hover:scale-105 transition-transform border-4"
        >
          <h2 className="text-2xl font-bold text-gray-900">Theme Color</h2>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setThemeColor(color)}
                style={{ backgroundColor: color }}
                className="w-10 h-10 rounded-full border-2 border-gray-200 transition-transform hover:scale-110"
              />
            ))}
          </div>
          <p className="text-gray-600">
            Current color: <span style={{ color: themeColor }}>{themeColor}</span>
          </p>
        </div>

        {/* Emoji Sandbox */}
        <div
          style={{ borderColor: themeColor }}
          className="bg-white p-4 rounded-3xl shadow-xl border-4 relative"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Emoji Sandbox</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {emojiOptions.map((emj) => (
              <button
                key={emj}
                onClick={() => launchEmoji(emj)}
                className="text-3xl hover:scale-125 transition-transform"
              >
                {emj}
              </button>
            ))}
          </div>
          <canvas
            ref={canvasRef}
            className="rounded-2xl shadow-inner w-full h-72 border"
          />
        </div>

        {/* Custom Message */}
        <div
          style={{ borderColor: themeColor }}
          className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-4 hover:scale-105 transition-transform border-4"
        >
          <h2 className="text-2xl font-bold text-gray-900">Custom Message</h2>
          <input
            type="text"
            value={customMessage}
            onChange={handleMessageChange}
            placeholder="Type something fun..."
            className="rounded-lg px-4 py-2 w-full border border-gray-300 focus:ring-2 focus:ring-[#00B8D4] focus:outline-none transition"
          />
          <p className="mt-4 text-gray-600 text-center">
            Watch your letters come alive with rainbow particles!
          </p>
        </div>
      </div>
    </div>
  );
}
