/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors
        midnight: "#0B1F3F",   // Primary background (slightly darker than 0B1220)
        gold: "#D4AF37",       // Accent / buttons
        text: "#FFFFFF",       // Main text
        secondary: "#B0B0B0",  // Secondary text
        slate: "#2C2C2C",      // Cards / subtle contrast

        // Optional extras for design system
        "white/5": "rgba(255, 255, 255, 0.05)",   // translucent background
        "gold/20": "rgba(212, 175, 55, 0.2)",     // subtle gold overlay
      }
    },
  },
  plugins: [],
};
