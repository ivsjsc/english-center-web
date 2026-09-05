import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AchievementItem {
  id: string;
  studentName: string;
  score: string;
  certificateType: string;
  story: string;
  avatar: string;
  year: number;
}

interface StudentAchievementsProps {
  achievements: AchievementItem[];
}

export function StudentAchievements({ achievements }: StudentAchievementsProps) {
  return (
    <section className="py-20 bg-surface-50 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              Bảng Vàng Danh Dự
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
              Những Kỷ Lục Điểm Số Tự Hào Của Học Viên AURA
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Minh chứng thực tế cho hiệu quả đào tạo chất lượng cao. Hơn 5.200 học viên đạt IELTS 7.0 - 8.5+ và hàng ngàn điểm tối đa Cambridge.
            </p>
          </div>

          <Link href="/student-achievements" className="shrink-0">
            <Button variant="outline" size="sm">
              <span>Xem Thêm Thành Tích</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.studentName}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-brand-navy">
                      {item.studentName}
                    </h3>
                    <div className="text-xs text-slate-500">{item.year}</div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200/80 text-center">
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                    {item.certificateType}
                  </div>
                  <div className="text-xl font-black text-amber-900 mt-0.5">
                    {item.score}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.story}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <Award className="w-3.5 h-3.5" />
                  Chứng thực AURA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
