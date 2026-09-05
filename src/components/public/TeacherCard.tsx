import React from "react";
import Image from "next/image";

export interface TeacherCardProps {
  name: string;
  avatarUrl?: string;
  country?: string;
  yearsExperience?: number;
  qualificationsSummary?: string;
  specialization?: string;
}

export function TeacherCard({
  name,
  avatarUrl,
  country = "Quốc tế",
  yearsExperience = 5,
  qualificationsSummary,
  specialization,
}: TeacherCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col group">
      {/* Portrait Photo */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-primary-vibrant uppercase tracking-wider">
              {country}
            </span>
            <span className="text-xs font-medium bg-slate-100 text-text-default px-2 py-0.5 rounded">
              {yearsExperience} năm KN
            </span>
          </div>

          <h3 className="text-lg font-bold text-text-heading mt-2 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>

          <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
            {qualificationsSummary || "Chứng chỉ giảng dạy quốc tế TESOL/CELTA xuất sắc."}
          </p>
        </div>

        {/* Specialization Pill */}
        {specialization && (
          <div className="pt-2 mt-4 bg-primary-light border border-primary-highlight rounded-lg p-2 text-center">
            <span className="text-xs font-bold text-primary truncate block">
              Phụ trách: {specialization}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
