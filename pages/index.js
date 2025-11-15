"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

// Projects with screenshots & short videos
const projects = [
  {
    name: "Spatlho – Food Ordering Platform",
    desc: "Fast, modern restaurant ordering experience built with responsive design and menu functionality.",
    category: "Web",
    images: [
      "/images/spatlho/home1.png",
      "/images/spatlho/home2.png",
      "/images/spatlho/home3.png",
      "/images/spatlho/order.png",
    ],
    videoUrl: "/images/spatlho/menu.mp4",
    caseStudy: {
      overview: "A modern platform for fast-food customers to browse a menu and place orders with speed and convenience.",
      challenge: "Traditional walk-ins were slowing customers down. No online visibility. Customers needed a simple way to view the menu and order quickly.",
      solution: "Designed a clean, mobile-first ordering website with a home hero section, menu display, item selection, checkout flow, responsive layout, and branding visuals.",
      impact: "Improved customer experience and set the foundation for real payments or QR table-ordering integration."
    }
  },
  {
    name: "Takouri Spotlight – Event Talent Platform",
    desc: "Cinematic online platform for creators to apply, join community, and showcase events.",
    category: "Web",
    images: [
      "/images/takouri/home1.png",
      "/images/takouri/home2.png",
      "/images/takouri/home3.png",
      "/images/takouri/community.png",
      "/images/takouri/event.png"
    ],
    videoUrl: "/images/takouri/apply.mp4",
    caseStudy: {
      overview: "A digital event platform to discover talent, register, and join the Spotlight community.",
      challenge: "Needed a system to manage applications, showcase events, and prepare for real audience ticketing.",
      solution: "Built multi-page platform including application forms, community overview, event showcase, and cinematic UI.",
      impact: "Created a strong foundation for a digital talent hub and community growth platform."
    }
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const [activeCase, setActiveCase] = useState(null);
  const [currentImages, setCurrentImages] = useState(projects.map(() => 0)); // track current image per card
  const [modalImage, setModalImage] = useState(0);
  const categories = ["All", "Branding", "Web", "Marketing"];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  // Auto-slider for main card previews (slow cinematic)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages(prev =>
        prev.map((val, idx) => (val + 1) % projects[idx].images.length)
      );
    }, 7500); // every 7.5 seconds
    return () => clearInterval(interval);
  }, []);

  // Reset modal slider when closed
  useEffect(() => {
    if (!activeCase) setModalImage(0);
  }, [activeCase]);

  // Manual modal controls
  const prevModalImage = () => {
    setModalImage(prev => (prev - 1 + activeCase.images.length) % activeCase.images.length);
  };
  const nextModalImage = () => {
    setModalImage(prev => (prev + 1) % activeCase.images.length);
  };

  return (
    <div className="scroll-smooth relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-midnight text-text h-[60vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
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
          {"See how Takouri Co. brings creativity, strategy, and cinematic design together."}
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/contact" legacyBehavior>
            <a className="px-6 py-3 bg-gold text-midnight font-semibold rounded-lg hover:ring-4 hover:ring-gold transition-all z-10">
              {"Get in Touch"}
            </a>
          </Link>
        </motion.div>
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
              onClick={() => setActiveCase(project)}
            >
              {/* Auto-Rotating Card Image */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={project.images[currentImages[idx]]}
                  alt={project.name}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {project.images.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentImages[idx] ? "bg-gold" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4">{project.desc}</p>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <button
                    className="px-4 py-2 bg-midnight text-white rounded-lg hover:ring-2 hover:ring-gold transition-all"
                    onClick={() => setActiveCase(project)}
                  >
                    {"View Case Study"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Study Modal */}
      {activeCase && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-start overflow-auto py-20 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 p-8 relative">
            <button
              onClick={() => setActiveCase(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold mb-4">{activeCase.name}</h2>
            <p className="text-gray-700 mb-6">{activeCase.caseStudy.overview}</p>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div>
                <h3 className="font-semibold mb-1">Challenge</h3>
                <p>{activeCase.caseStudy.challenge}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Solution</h3>
                <p>{activeCase.caseStudy.solution}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-1">Impact</h3>
                <p>{activeCase.caseStudy.impact}</p>
              </div>
            </div>

            {/* Modal Manual Slider Images */}
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg flex items-center justify-center">
              <img
                src={activeCase.images[modalImage]}
                alt={`screenshot-${modalImage}`}
                className="w-full h-full object-cover rounded-lg transition-all duration-700"
              />
              <button
                onClick={prevModalImage}
                className="absolute left-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ‹
              </button>
              <button
                onClick={nextModalImage}
                className="absolute right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ›
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {activeCase.images.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === modalImage ? "bg-gold" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Video if available */}
            {activeCase.videoUrl && (
              <video
                src={activeCase.videoUrl}
                controls
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-midnight text-white py-20 px-6 text-center relative overflow-hidden">
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
        <h2 className="text-4xl font-bold mb-4">{"Interested in Working With Us?"}</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          {"Let’s craft your next legacy-defining project together."}
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/contact" legacyBehavior>
            <a className="px-6 py-3 bg-gold text-midnight font-semibold rounded-lg hover:ring-4 hover:ring-gold transition-all">
              {"Contact Us"}
            </a>
          </Link>
        </motion.div>
      </section>

      <Footer showTopLine />
    </div>
  );
}
