// pages/contact.jsx (or Footer component)
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa"; // sleek half arrow
import { useEffect, useState } from "react";

export default function Footer({ showTopLine = true }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show arrow when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✨ Cinematic smooth scroll to top
  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 800; // milliseconds (adjust for speed)
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);

      window.scrollTo(0, start * (1 - eased));

      if (elapsed < duration) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <footer className="relative bg-midnight text-text py-8 px-6">
      {/* Optional gold gradient line */}
      {showTopLine && (
        <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/80 to-gold mb-4"></div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-sm">
          © {new Date().getFullYear()} Takouri Co. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6 text-lg">
          <a
            href="https://www.facebook.com/takouri.co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaFacebookF className="text-[#1877F2]" />
          </a>

          <a
            href="https://www.instagram.com/takouri.co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaInstagram className="text-[#E4405F]" />
          </a>

          <a
            href="https://x.com/takouri_co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaTwitter className="text-[#1DA1F2]" />
          </a>

          <a href="#" className="cursor-not-allowed" aria-disabled="true">
            <FaLinkedinIn className="text-[#0A66C2]" />
          </a>

          <a
            href="https://wa.me/27720967077"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaWhatsapp className="text-[#25D366]" />
          </a>
        </div>
      </div>

      {/* Floating "Back to Top" button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gold text-midnight p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-pulse-slow"
          aria-label="Back to top"
        >
          <FaChevronUp className="text-xl" />
        </button>
      )}

      {/* Gold pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
