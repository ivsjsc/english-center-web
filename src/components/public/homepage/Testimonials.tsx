import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  authorName: string;
  relationship: string;
  quote: string;
  avatar: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
            Cảm Nhận Học Viên
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
            Chia Sẻ Từ Phụ Huynh & Học Viên Tại IVS Academy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Sự hài lòng và tiến bộ của học viên là thước đo giá trị lớn nhất cho chất lượng đào tạo của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-surface-50 rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-card transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-brand-200 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic relative z-10">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-200/60">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.authorName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-navy">
                    {item.authorName}
                  </h4>
                  <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {item.relationship}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
