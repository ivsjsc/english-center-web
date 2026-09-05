import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata, generateArticleSchema } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag } from "lucide-react";
import { LeadForm } from "@/components/public/LeadForm";

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) return constructMetadata({ title: "Bài viết không tồn tại" });

  return constructMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.featuredImage,
    canonicalPath: `/blog/${post.slug}`,
  });
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!post || !post.published) notFound();

  // Related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      categoryId: post.categoryId,
      id: { not: post.id },
      published: true,
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  const articleSchema = generateArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    featuredImage: post.featuredImage,
    authorName: post.authorName,
    publishedAt: post.publishedAt,
  });

  const tagsList = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];

  return (
    <article className="py-12 bg-surface-50 text-left min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-600">Cẩm nang</Link>
          <span>/</span>
          <Link href={`/blog?category=${post.category.slug}`} className="hover:text-brand-600">
            {post.category.name}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-3">
                <Badge variant="primary" className="text-xs">
                  {post.category.name}
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight leading-snug">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {post.authorName}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Excerpt Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-sm sm:text-base text-amber-950 font-medium leading-relaxed italic">
                &ldquo;{post.excerpt}&rdquo;
              </div>

              {/* Cover Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Body Content */}
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 pt-4 border-t border-slate-100 whitespace-pre-line">
                {post.content}
              </div>

              {/* Tags */}
              {tagsList.length > 0 && (
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  {tagsList.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold text-brand-navy">
                  Bài Viết Cùng Chuyên Mục
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((r) => (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="bg-white p-4 rounded-2xl border border-slate-200 hover:shadow-card transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-2">
                        <Image
                          src={r.featuredImage}
                          alt={r.title}
                          fill
                          className="object-cover"
                          sizes="33vw"
                        />
                      </div>
                      <h4 className="font-bold text-xs text-brand-navy line-clamp-2 hover:text-brand-600">
                        {r.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Consultation Form Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <LeadForm
                variant="card"
                title="Đăng Ký Tư Vấn Khóa Học"
                subtitle="Nhận học bổng và tài liệu học tiếng Anh độc quyền từ ban chuyên môn."
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
