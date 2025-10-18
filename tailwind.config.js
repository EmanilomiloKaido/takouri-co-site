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
        midnight: "#0B1F3F",      // Primary background
        takouriBlue: "#00B8D4",   // Main blue accent
        gold: "#D4AF37",           // Accent / buttons
        text: "#FFFFFF",           // Main text
        secondary: "#B0B0B0",      // Secondary text
        slate: "#2C2C2C",          // Cards / subtle contrast

        // Optional overlays / extras
        "white/5": "rgba(255, 255, 255, 0.05)",   // translucent background
        "gold/20": "rgba(212, 175, 55, 0.2)",     // subtle gold overlay
        "blue/20": "rgba(0, 184, 212, 0.2)"       // subtle blue overlay
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(-5px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
      },
      backgroundImage: {
        "gradient-apple": "linear-gradient(45deg, #ff5f6d, #ffc371, #1fd1f9, #a18cd1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-gradient-apple": {
          backgroundImage: "linear-gradient(45deg, #ff5f6d, #ffc371, #1fd1f9, #a18cd1)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      });
    },
  ],
};
