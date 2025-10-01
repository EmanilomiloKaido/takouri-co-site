// pages/portfolio.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const projects = [
  {
    name: "Global Branding Campaign",
    desc: "Multi-channel strategy elevating brand presence worldwide.",
    category: "Branding",
    videoUrl: "",
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Branding", "Web", "Marketing"];
  const filteredProjects =
    filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="scroll-smooth relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-midnight text-text h-[60vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Floating shapes */}
        <motion.div
          className="absolute w-20 h-20 bg-gold/20 rounded-full top-10 left-10 filter blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-white/10 rounded-full bottom-10 right-10 filter blur-2xl"
          animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 relative z-10 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Projects That <span className="text-gold">Define Legacy</span>
        </motion.h1>
        <motion.p
          className="text-secondary max-w-3xl mb-8 text-lg md:text-xl relative z-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          See how Takouri Co. brings creativity, strategy, and cinematic design together.
        </motion.p>
        <a
          href="/contact"
          className="px-6 py-3 bg-gold text-midnight font-semibold rounded-lg hover:ring-4 hover:ring-gold transition-all z-10"
        >
          Get in Touch
        </a>
      </section>

      {/* Filter Buttons */}
      <section className="bg-gray-50 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto flex justify-center flex-wrap gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-gold text-midnight ring-2 ring-gold"
                  : "bg-white text-gray-700 hover:bg-gold hover:text-midnight"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="bg-gray-50 py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 border-2 border-transparent hover:border-gold cursor-pointer"
            >
              {/* Placeholder Gradient */}
              <div className="h-48 bg-gradient-to-tr from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
                <span className="text-gray-400 font-semibold">Project Preview</span>
              </div>

              {/* Card Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4">{project.desc}</p>
                <button className="px-4 py-2 bg-midnight text-white rounded-lg hover:ring-2 hover:ring-gold transition-all">
                  View Case Study
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-midnight text-white py-20 px-6 text-center relative overflow-hidden">
        {/* Floating shapes */}
        <motion.div
          className="absolute w-20 h-20 bg-gold/20 rounded-full top-10 left-10 filter blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-white/10 rounded-full bottom-10 right-10 filter blur-2xl"
          animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <h2 className="text-4xl font-bold mb-4">Interested in Working With Us?</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          Let’s craft your next legacy-defining project together.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-gold text-midnight font-semibold rounded-lg hover:ring-4 hover:ring-gold transition-all"
        >
          Contact Us
        </a>
      </section>

      {/* Footer */}
      <Footer showTopLine />
    </div>
  );
}
