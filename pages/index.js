"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const features = [
    {
      title: "World-Class Design",
      desc: "Interfaces that balance elegance, clarity, and performance — admired globally.",
    },
    {
      title: "Seamless Digital Solutions",
      desc: "Platforms engineered for speed, responsiveness, and international standards.",
    },
    {
      title: "Brand Legacy Amplification",
      desc: "Elevating your story with visuals and messaging that resonate across cultures.",
    },
  ];

  const services = [
    {
      title: "Brand & Logo Design",
      desc: "Creating timeless brand identities that capture your story and resonate globally.",
      color: "bg-gold/10 text-gold",
    },
    {
      title: "Website Design & Development",
      desc: "High-converting, responsive websites that embody elegance, performance, and clarity.",
      color: "bg-white/5 text-white",
    },
    {
      title: "Digital Marketing Strategy",
      desc: "Tailored strategies that boost visibility, engagement, and brand authority online.",
      color: "bg-gold/5 text-gold",
    },
    {
      title: "SEO & Local Optimization",
      desc: "Optimized to rank higher, attract ideal customers, and dominate local searches.",
      color: "bg-white/5 text-white",
    },
    {
      title: "Content Creation (Photo/Video)",
      desc: "Visual storytelling that captivates audiences and strengthens brand presence.",
      color: "bg-gold/10 text-gold",
    },
    {
      title: "Social Media Management",
      desc: "Building strong, engaging communities while maintaining a cohesive brand voice.",
      color: "bg-white/5 text-white",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-midnight text-text min-h-[60vh] flex flex-col justify-start items-center text-center px-6 pt-24 pb-4 overflow-hidden">
        {/* Floating shapes */}
        <motion.div
          className="absolute w-72 h-72 bg-gold/20 rounded-full top-10 left-10 filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-60 h-60 bg-white/10 rounded-full bottom-20 right-20 filter blur-2xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main Hero Content */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Takouri Co.
        </motion.h1>

        {/* Typed Subline */}
        <motion.div
          className="text-secondary max-w-2xl mb-8 text-lg md:text-xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typewriter
            words={[
              "Crafting digital experiences that define legacy, elevate brands, and inspire a global audience."
            ]}
            loop={1}         // type once
            cursor={false}   // hide blinking cursor
            typeSpeed={50}   // speed per character
            deleteSpeed={0}  // no delete
          />
        </motion.div>

        {/* Optional gradient divider */}
        <div className="absolute bottom-0 w-full h-12 bg-gradient-to-b from-transparent to-midnight z-0" />
      </section>

      {/* Features Section */}
      <section className="bg-midnight text-text pt-4 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow bg-white/5`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.25 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-2 relative">
                {feature.title}
                <span className="block w-12 h-1 bg-gold mt-2 rounded"></span>
              </h3>
              <p className="text-secondary">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Floating accents */}
        <motion.div
          className="absolute w-40 h-40 bg-gold/10 rounded-full top-1/4 left-0 filter blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-white/10 rounded-full bottom-0 right-10 filter blur-2xl"
          animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Services Section */}
      <section className="bg-midnight text-text py-16 px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Premium Services
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg md:text-xl">
            We craft digital experiences that elevate brands and amplify stories across every platform.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow ${service.color}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-secondary">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer showTopLine={true} />
    </>
  );
}
