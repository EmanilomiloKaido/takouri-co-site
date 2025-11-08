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
      desc: "We help you uncover your true essence and craft a visual language that speaks power. No trends—just timeless clarity that positions you as unforgettable.",
    },
    {
      title: "Web Experiences",
      desc: "Your website isn’t a brochure. It’s a stage. We design immersive, high-performance experiences that make every visitor feel your story.",
    },
    {
      title: "Digital Marketing",
      desc: "You’ve got the message—let’s amplify it. We create strategies that move audiences and turn quiet brands into cultural voices.",
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
          You’re the Hero. We’re Your Guide.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto"
        >
          At Takouri Co., we don’t just design—we train heroes to lead their industries
          through story, design, and digital mastery.
        </motion.p>

        <div className="absolute top-20 right-40 w-24 h-24 bg-gold/20 rounded-full blur-3xl animate-pulse" />
      </section>

      {/* Services */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-2"
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
          className="text-3xl font-bold mb-4"
        >
          Every Hero Needs a Plan.
        </motion.h2>
        <p className="text-slate-300 mb-8">
          Let’s clarify your story, craft your visuals, and build your digital
          presence—so your brand moves people and builds legacy.
        </p>
        <Button onClick={() => setShowForm(true)}>Get Started</Button>
      </section>

      {/* Modal */}
      {showForm && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowForm(false)}
          />
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
