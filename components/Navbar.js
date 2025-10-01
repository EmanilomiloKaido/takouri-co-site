import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Insights", href: "/blog", badge: true },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setVisible(true);
      } else if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-md bg-midnight/80 shadow-md ${
        visible ? "opacity-100 top-0" : "opacity-0 -top-24"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gold">Takouri Co.</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-semibold items-center">
          {links.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={`transition-colors hover:text-gold ${
                  router.pathname === link.href ? "text-gold" : ""
                }`}
              >
                {link.name}
              </Link>
              {link.badge && (
                <span className="absolute -top-2 -right-4 bg-gold text-midnight text-xs font-bold px-1 rounded-full">
                  New
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6 text-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-midnight/95 text-text space-y-4 px-6 py-4 font-semibold backdrop-blur-md">
          {links.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={`transition-colors hover:text-gold ${
                  router.pathname === link.href ? "text-gold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
              {link.badge && (
                <span className="absolute top-0 right-0 bg-gold text-midnight text-xs font-bold px-1 rounded-full">
                  New
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
