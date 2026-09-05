import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  categoryName?: string;
  coverImage?: string | null;
  publishedAt?: string | Date;
  readTimeMinutes?: number;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  categoryName = "Học thuật",
  coverImage,
  publishedAt,
  readTimeMinutes = 5,
}: BlogCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Mới cập nhật";

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col group">
      {/* Thumbnail */}
      <Link href={`/blog/${slug}`} className="relative h-48 w-full overflow-hidden bg-slate-100 block">
        <Image
          src={coverImage || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-primary-vibrant uppercase tracking-wider">
            {categoryName}
          </span>
          <Link href={`/blog/${slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-text-heading mt-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>
          {excerpt && (
            <p className="text-sm text-text-default mt-2 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>

        {/* Meta info */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-text-muted">
          <span>{formattedDate}</span>
          <span>{readTimeMinutes} phút đọc</span>
        </div>
      </div>
    </article>
  );
}
