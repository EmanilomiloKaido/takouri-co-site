import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "../../data/blogPosts";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import { motion } from "framer-motion";

export default function Blog() {
  const [activeCat, setActiveCat] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const categories = useMemo(() => {
    const cats = blogPosts.map((p) => p.category);
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCat = activeCat === "All" || p.category === activeCat;
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCat, search]);

  const featured = filtered.length > 0 ? filtered[0] : blogPosts[0];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-midnight text-white min-h-[60vh] flex flex-col justify-end items-center text-center px-6 pt-24 pb-16 overflow-hidden">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Insights & Stories
        </motion.h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl z-10">
          Thought leadership, creative philosophy, and lessons from the journey of building greatness.
        </p>
        <div className="absolute inset-0">
          <Image
            src="/images/blog-hero.jpg"
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
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 bg-white">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {featured.category}
              </span>
              <h2 className="mt-3 text-2xl font-bold">{featured.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-4">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-4 inline-block text-emerald-600 font-semibold hover:underline"
              >
                Read →
              </Link>
            </div>
          </article>
        </motion.div>
      </section>

      {/* Category Tabs + Search */}
      <section className="max-w-6xl mx-auto px-6 mt-12 mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full border ${
                activeCat === cat
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-8 mb-20">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {filtered.map((post) => (
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

      <Footer showTopLine={true} />
    </div>
  );
}
