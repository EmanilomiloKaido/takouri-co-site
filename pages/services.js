// pages/services.js
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import GetStartedForm from "../components/GetStartedForm";

export default function Services() {
  const [showForm, setShowForm] = useState(false);

  const services = [
    {
      title: "Brand Identity",
      desc: "Luxury branding systems that tell your story and command attention worldwide.",
    },
    {
      title: "Web Experiences",
      desc: "High-performance websites that balance elegance, speed, and global accessibility.",
    },
    {
      title: "Digital Marketing",
      desc: "Premium strategies designed to elevate brands and expand influence.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-midnight text-white py-28 text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto"
        >
          World-class design, strategy, and digital solutions crafted for brands
          that lead globally.
        </motion.p>

        {/* Floating Gold Accent */}
        <div className="absolute top-20 right-40 w-24 h-24 bg-gold/20 rounded-full blur-3xl animate-pulse" />
      </section>

      {/* Services Grid */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-xl 
                         transition duration-300 hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold text-midnight mb-4">
                {service.title}
              </h3>
              <p className="text-slate-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-midnight text-white py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6"
        >
          Ready to Work With Takouri Co.?
        </motion.h2>
        <Button onClick={() => setShowForm(true)}>Get Started</Button>
      </section>

      {/* Modal */}
      {showForm && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowForm(false)}
          />
          {/* Form Panel */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 mx-4"
          >
            <GetStartedForm onClose={() => setShowForm(false)} />
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  );
}
