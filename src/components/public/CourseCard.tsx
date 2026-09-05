import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  ageRange?: string | null;
  categoryName?: string | null;
  imageUrl?: string | null;
  keyOutcome?: string | null;
  badgeColor?: "primary" | "vibrant" | "amber" | "emerald" | "slate";
}

export function CourseCard({
  slug,
  title,
  description,
  ageRange,
  categoryName,
  imageUrl,
  keyOutcome,
  badgeColor = "vibrant",
}: CourseCardProps) {
  const badgeClasses = {
    primary: "bg-primary-deep text-white",
    vibrant: "bg-primary-vibrant text-white",
    amber: "bg-amber-600 text-white",
    emerald: "bg-growth text-white",
    slate: "bg-slate-700 text-white",
  };

  const badgeText = ageRange || categoryName || "Chính quy";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {/* Thumbnail Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={imageUrl || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${badgeClasses[badgeColor]}`}
        >
          {badgeText}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-text-heading group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-text-default mt-2 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer Pill & Action Link */}
        <div className="mt-4 pt-3 bg-surface-subtle border border-slate-100 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
          <span className="text-xs text-growth-dark font-semibold truncate">
            {keyOutcome || "✓ Chuẩn Cambridge & CEFR"}
          </span>
          <Link
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-vibrant shrink-0 transition-colors"
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
