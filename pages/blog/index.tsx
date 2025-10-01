// pages/blog/index.tsx
import { blogPosts } from "../../data/blogPosts";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Insights for Founders Who Value Time Above All
        </h1>
        <p className="max-w-2xl text-lg md:text-xl opacity-80">
          We share efficiency hacks, real case studies, and timeless principles
          so you can focus on building your legacy.
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
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            width={1200}
            height={400}
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {blogPosts[0].title}
            </h2>
            <p className="max-w-2xl mb-6">{blogPosts[0].excerpt}</p>
            <Link
              href={blogPosts[0].link}
              className="px-6 py-3 bg-white text-gray-900 rounded-full shadow hover:bg-gray-200 transition"
            >
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="flex justify-center space-x-4 mb-12">
        {["All", "Efficiency Hacks", "Case Study", "Philosophy"].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Blog Grid */}
      <section
        id="blog-grid"
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-16"
      >
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-xl transition group"
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
              <Link
                href={post.link}
                className="mt-4 inline-block text-indigo-600 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Legacy Note */}
      <section className="bg-gray-100 py-16 text-center">
        <p className="text-xl md:text-2xl max-w-2xl mx-auto italic">
          “At Takouri Co., efficiency isn’t just about speed. It’s about creating
          the time to build something timeless.”
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
