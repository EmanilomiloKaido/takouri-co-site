// components/Button.jsx
import React from "react";

/**
 * Default export so existing `import Button from "../components/Button"` keeps working.
 * Accepts className, onClick, type, etc.
 */
export default function Button({ children, onClick, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-midnight bg-gold transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-sm overflow-hidden ${className} shimmer-button`}
      {...props}
    >
      {/* shimmer overlay (animated via global CSS) */}
      <span className="absolute inset-0 rounded-xl pointer-events-none">
        <span className="shimmer-overlay" aria-hidden="true" />
      </span>

      {/* visible content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
