"use client";

import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <p className="text-sm font-medium text-gray-500 mb-4">{post.category}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
