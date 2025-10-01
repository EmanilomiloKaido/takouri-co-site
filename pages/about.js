import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function About() {
  return (
    <>
      <Navbar />

      {/* Particle Layer (Full Page Subtle Particles) */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gold/20 rounded-full"
            style={{
              width: `${Math.random() * 10 + 4}px`,
              height: `${Math.random() * 10 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 30, 0],
              y: [0, (Math.random() - 0.5) * 30, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="relative bg-midnight text-text min-h-[70vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 z-10">
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

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-8 relative z-10 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The team that <span className="text-gold">values your time</span> as much as you do.
        </motion.h1>

        <motion.p
          className="text-secondary max-w-3xl mb-12 text-lg md:text-2xl relative z-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Building trust through transparency, speed, and creativity —<br className="hidden md:block" />
          so you can focus on growth.
        </motion.p>
      </section>

      {/* Vision Section */}
      <section className="bg-midnight text-text py-24 px-6 z-10 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            Our Vision
            <span className="block w-16 h-1 bg-gold mt-2 rounded-full mx-auto md:mx-0"></span>
          </h2>
          <p className="text-secondary text-lg md:text-xl leading-relaxed">
            Takouri Co. exists to simplify the digital journey for businesses. We focus on quality, speed, and reliability — so you can focus on growth.
          </p>
        </motion.div>
      </section>

      {/* Approach Section */}
      <section className="bg-midnight text-text py-24 px-6 z-10 relative">
        <motion.div
          className="max-w-4xl mx-auto text-left md:text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 relative inline-block">
            Our Approach
            <span className="block w-16 h-1 bg-gold mt-2 rounded-full"></span>
          </h2>
          <ul className="text-secondary text-lg md:text-xl list-disc list-inside space-y-6 md:space-y-4 leading-relaxed">
            <li><strong className="text-gold">Streamlined process:</strong> Discovery → Design → Launch → Support</li>
            <li><strong className="text-gold">Communication transparency:</strong> real timelines, honest updates</li>
            <li><strong className="text-gold">Problem-solving mindset:</strong> we don’t just build, we solve business challenges digitally</li>
          </ul>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="bg-midnight text-text py-24 px-6 max-w-4xl mx-auto text-center z-10 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            Founder
            <span className="block w-16 h-1 bg-gold mt-2 rounded-full mx-auto"></span>
          </h2>
          <p className="text-secondary text-lg md:text-xl leading-relaxed">
            Inspired by the Emanilomilo vision, our founder blends creativity and strategy to deliver not just projects, but <span className="text-gold font-semibold">storytelling experiences</span> that elevate your brand. Every solution is crafted to serve your growth and leave a lasting impact.
          </p>
        </motion.div>
      </section>

      {/* Closing CTA */}
      <section className="bg-midnight text-text py-24 px-6 text-center z-10 relative">
        <motion.h3
          className="text-3xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to elevate your story?
        </motion.h3>
        <Button
          label="Work With Takouri Co."
          href="/contact"
          className="transform transition-transform hover:scale-105"
        />
        <p className="text-secondary mt-4 text-lg md:text-xl">
          Let’s start building your legacy today.
        </p>
      </section>

      <Footer showTopLine={true} />
    </>
  );
}
