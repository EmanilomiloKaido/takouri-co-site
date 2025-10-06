"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
      {/* Blog Image */}
      <div className="relative w-full h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false} // set true for featured posts if needed
        />
      </div>

      {/* Blog Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Blog Title */}
        <h3 className="mt-3 font-semibold text-lg">{post.title}</h3>

        {/* Excerpt */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-block text-emerald-600 font-semibold hover:underline"
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
