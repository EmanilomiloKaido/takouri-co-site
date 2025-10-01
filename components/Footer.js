// pages/contact.jsx (or your Footer component)
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer({ showTopLine = true }) {
  return (
    <footer className="bg-midnight text-text py-8 px-6">
      {/* Optional gold gradient line */}
      {showTopLine && (
        <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/80 to-gold mb-4"></div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} Takouri Co. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6 text-lg">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/takouri.co" // ✅ use your real username
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            <FaFacebookF />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/takouri.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            <FaInstagram />
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/takouri_co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            <FaTwitter />
          </a>

          {/* LinkedIn (placeholder for now) */}
          <a
            href="#"
            className="text-gray-500 cursor-not-allowed"
            aria-disabled="true"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
