import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { BlogListClient } from "./BlogListClient";

export const metadata: Metadata = constructMetadata({
  title: "Cẩm Nang Học Tiếng Anh & Luyện Thi IELTS",
  description: "Tổng hợp các bài viết chia sẻ chiến thuật thi IELTS 8.0+, phương pháp dạy tiếng Anh mầm non và cẩm nang săn học bổng du học Mỹ, Úc.",
  canonicalPath: "/blog",
});

export default async function BlogPage() {
  const [categories, posts] = await Promise.all([
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Cẩm nang</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Góc Chuyên Gia & Cẩm Nang Học Ngoại Ngữ
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl">
            Những bài viết chuyên sâu từ hội đồng học thuật IVS Academy, tổng hợp bí quyết bứt phá 4 kỹ năng và cập nhật thông tin học bổng du học quốc tế mới nhất.
          </p>
        </div>

        <Suspense fallback={<div className="py-12 text-center text-slate-400">Đang tải bài viết...</div>}>
          <BlogListClient categories={categories} posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}

