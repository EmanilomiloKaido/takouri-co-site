"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Hero() {
  const [typedText, setTypedText] = useState("");      // text that is typed
  const [part, setPart] = useState(0);                // 0 = first, 1 = highlight, 2 = last
  const [highlightDone, setHighlightDone] = useState(false);

  const part1 = "Crafting digital experiences that";
  const part2 = " define legacy";
  const part3 = ", elevate brands, and inspire a global audience.";

  useEffect(() => {
    let timeout;
    if (part === 0) {
      // Type part 1
      if (typedText.length < part1.length) {
        timeout = setTimeout(() => {
          setTypedText(part1.slice(0, typedText.length + 1));
        }, 80); // slower start
      } else {
        setPart(1); // move to highlight
      }
    } else if (part === 1) {
      // Type part 2 (highlight)
      if (typedText.length < part1.length + part2.length) {
        timeout = setTimeout(() => {
          setTypedText(
            part1 + part2.slice(0, typedText.length - part1.length + 1)
          );
        }, 50); // slightly faster
      } else {
        setHighlightDone(true);
        setPart(2); // move to final
      }
    } else if (part === 2) {
      // Type part 3
      if (typedText.length < part1.length + part2.length + part3.length) {
        timeout = setTimeout(() => {
          setTypedText(
            part1 +
              part2 +
              part3.slice(0, typedText.length - part1.length - part2.length + 1)
          );
        }, 30); // fastest, dramatic finish
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, part]);

  // Split the typedText to style highlight separately
  const beforeHighlight = typedText.slice(0, part1.length);
  const highlight = typedText.slice(part1.length, part1.length + part2.length);
  const afterHighlight = typedText.slice(part1.length + part2.length);

  return (
    <>
      <Navbar />

      <section className="relative bg-midnight text-text min-h-[60vh] flex flex-col justify-start items-center text-center px-6 pt-24 pb-4 overflow-hidden">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Takouri Co.
        </motion.h1>

        <div className="text-secondary max-w-2xl mb-8 text-lg md:text-xl relative z-10 flex flex-wrap justify-center gap-1">
          <span>{beforeHighlight}</span>
          <span
            className={`font-semibold transition-colors duration-500 ${
              highlightDone ? "text-gold shadow-[0_0_10px_rgba(255,215,0,0.7)]" : "text-white"
            }`}
          >
            {highlight}
          </span>
          <span>{afterHighlight}</span>
          <span className="animate-pulse">|</span> {/* optional cursor */}
        </div>

        <div className="absolute bottom-0 w-full h-12 bg-gradient-to-b from-transparent to-midnight z-0" />
      </section>

      <Footer showTopLine={true} />
    </>
  );
}
