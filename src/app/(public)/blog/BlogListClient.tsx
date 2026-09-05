"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  excerpt: string;
  authorName: string;
  publishedAt: Date | string;
  category: { id: string; name: string; slug: string };
}

export function BlogListClient({
  categories,
  posts,
}: {
  categories: Category[];
  posts: Post[];
}) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category");

  const filteredPosts = catParam
    ? posts.filter((p) => p.category.slug === catParam)
    : posts;

  return (
    <>
      {/* Categories Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center gap-2.5">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            !catParam
              ? "bg-brand-navy text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Tất cả chủ đề
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/blog?category=${c.slug}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              catParam === c.slug
                ? "bg-brand-navy text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-brand-navy/90 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                {post.category.name}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="font-extrabold text-lg text-brand-navy group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {post.authorName}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800"
                >
                  Xem chi tiết &rarr;
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
