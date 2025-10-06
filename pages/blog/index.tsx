// pages/blog/index.tsx
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "../../data/blogPosts";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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

      {/* Hero */}
      <section className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Insights for Founders Who Value Time Above All
        </h1>
        <p className="max-w-2xl text-lg md:text-xl opacity-80">
          We share efficiency hacks, real case studies, and timeless principles so you can focus on building your legacy.
        </p>
        <button
          onClick={() =>
            document.getElementById("blog-grid")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-6 px-6 py-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          Explore Insights
        </button>
      </section>

      {/* Featured Post */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-lg group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={featured.image}
            alt={featured.title}
            width={1200}
            height={400}
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {featured.title}
            </h2>
            <p className="max-w-2xl mb-6">{featured.excerpt}</p>
            <Link href={`/blog/${featured.slug}`}>
              <a className="px-6 py-3 bg-white text-gray-900 rounded-full shadow hover:bg-gray-200 transition">
                Read More →
              </a>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Category Tabs + Search Input */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
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
      <section
        id="blog-grid"
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-16"
      >
        {filtered.map((post, idx) => (
          <motion.div
            key={post.slug}
            className="rounded-xl overflow-hidden shadow hover:shadow-xl transition group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6">
              <span className="text-sm text-gray-500">{post.category}</span>
              <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`}>
                <a className="mt-4 inline-block text-indigo-600 font-semibold hover:underline">
                  Read More →
                </a>
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Legacy Note or mid-section quote */}
      <section className="bg-gray-100 py-16 text-center">
        <p className="text-xl md:text-2xl max-w-2xl mx-auto italic">
          “At Takouri Co., efficiency isn’t just about speed. It’s about creating the time to build something timeless.”
        </p>
      </section>

      <Footer />
    </div>
  );
}
