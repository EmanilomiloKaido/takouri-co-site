// pages/blog/[slug].tsx
import { useRouter } from "next/router";
import { blogPosts } from "../../data/blogPosts";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null;

  const post = blogPosts.find((p) => p.link === `/blog/${slug}`);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-6">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="text-indigo-600 font-semibold hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[50vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <span className="text-sm md:text-base text-gray-300">{post.category}</span>
      </motion.section>

      {/* Featured Image with hover scale */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 py-12"
      >
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={500}
            className="w-full rounded-xl object-cover shadow-lg"
          />
        </motion.div>
      </motion.section>

      {/* Full Content with scroll reveal */}
      <section className="max-w-4xl mx-auto px-6 pb-16 prose text-gray-700">
        {post.content.split("\n").map((line, index) =>
          line.trim() ? (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {line}
            </motion.p>
          ) : (
            <br key={index} />
          )
        )}
        {/* Example inline link animation */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-6 text-center"
        >
          <Link
            href="/blog"
            className="text-indigo-600 font-semibold hover:underline"
          >
            ← Back to Blog
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
