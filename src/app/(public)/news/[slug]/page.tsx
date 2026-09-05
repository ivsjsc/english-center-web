import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { Calendar } from "lucide-react";
import { LeadForm } from "@/components/public/LeadForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.newsArticle.findUnique({
    where: { slug },
  });

  if (!item) return constructMetadata({ title: "Tin tức không tồn tại" });

  return constructMetadata({
    title: item.title,
    description: item.excerpt,
    image: item.featuredImage,
    canonicalPath: `/news/${item.slug}`,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await prisma.newsArticle.findUnique({
    where: { slug },
  });

  if (!item || !item.published) notFound();

  return (
    <article className="py-12 bg-surface-50 text-left min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/news" className="hover:text-brand-600">Tin tức & Sự kiện</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold line-clamp-1">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight leading-snug">
                {item.title}
              </h1>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 pb-4 border-b border-slate-100">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(item.publishedAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm sm:text-base text-slate-700 font-medium leading-relaxed italic">
                {item.excerpt}
              </div>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image
                  src={item.featuredImage}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 pt-4 whitespace-pre-line">
                {item.content}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <LeadForm
                variant="card"
                title="Đăng Ký Nhận Thông Báo Mới"
                subtitle="Cập nhật các chương trình học bổng và kỳ thi thử Cambridge/IELTS sớm nhất."
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
