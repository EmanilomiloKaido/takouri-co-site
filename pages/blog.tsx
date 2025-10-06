// pages/blog.tsx
"use client";

import { blogPosts } from "../data/blogPosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const featuredPost = blogPosts[0]; // optional: first post as featured

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-midnight text-text min-h-[60vh] flex flex-col justify-end items-center text-center px-6 pt-24 pb-16 overflow-hidden">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Insights & Stories
        </motion.h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl z-10">
          Thought leadership, case studies, and legacy-building wisdom from Takouri Co. and Emanilomilo visionaries.
        </p>
        <div className="absolute inset-0">
          <Image
            src="/images/blog-hero.jpg" // replace with your hero image
            alt="Blog Hero"
            fill
            className="object-cover opacity-30"
          />
        </div>
      </section>

      {/* Featured Post */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <article className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="relative w-full h-72 md:h-full">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 bg-white">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{featuredPost.category}</span>
              <h2 className="mt-3 text-2xl font-bold">{featuredPost.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-4">{featuredPost.excerpt}</p>
              <Link href={featuredPost.link} className="mt-4 inline-block text-emerald-600 font-semibold">
                Read → 
              </Link>
            </div>
          </article>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h3 className="text-3xl font-bold mb-8 text-midnight">All Posts</h3>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-midnight text-text mt-16 py-16 px-6 text-center rounded-2xl mx-6 md:mx-auto max-w-4xl shadow-lg">
        <h3 className="text-3xl font-bold mb-4 text-gold">Inspired to Build Your Legacy?</h3>
        <p className="mb-6 text-white/80 max-w-xl mx-auto">
          Let’s craft something legendary together. Our team at Takouri Co. and Emanilomilo visionaries will help elevate your brand and impact.
        </p>
        <Link href="/contact">
          <button className="px-8 py-3 bg-gold text-midnight font-semibold rounded-xl hover:scale-105 transition-all shadow-sm">
            Get Started
          </button>
        </Link>
      </section>

      <Footer showTopLine={true} />
    </>
  );
}
