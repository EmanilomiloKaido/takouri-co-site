// pages/contact.jsx (or Footer component)
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

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
            href="https://www.facebook.com/takouri.co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaFacebookF className="text-[#1877F2]" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/takouri.co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaInstagram className="text-[#E4405F]" />
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/takouri_co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaTwitter className="text-[#1DA1F2]" />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/27720967077"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaWhatsapp className="text-[#25D366]" />
          </a>
          
          {/* LinkedIn (inactive) */}
          <a href="#" className="cursor-not-allowed" aria-disabled="true">
            <FaLinkedinIn className="text-[#0A66C2]" />
          </a>

        </div>
      </div>
    </footer>
  );
}
