"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface RecommendedCourse {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  targetAudience: string;
  level: string;
  duration: string;
  featuredImage: string;
  categoryName: string;
  matchScore: number;
  matchReason: string;
}

export function CourseFinderSection() {
  const [age, setAge] = useState<string>("8");
  const [learningGoal, setLearningGoal] = useState<string>("cambridge");
  const [currentLevel, setCurrentLevel] = useState<string>("beginner");
  const [learningFormat, setLearningFormat] = useState<string>("center");
  const [province, setProvince] = useState<string>("Hồ Chí Minh");

  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedCourse[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(age, 10),
          learningGoal,
          currentLevel,
          learningFormat,
          province,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.courses || []);
      }
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-brand-navy text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-amber/20 text-accent-amber text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thuật Toán Khảo Sát Thông Minh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Tìm Khóa Học Phù Hợp Nhất Với Bạn
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Chỉ với 30 giây khảo sát nhu cầu, hệ thống sẽ đề xuất lộ trình chuẩn xác nhất theo độ tuổi và mục tiêu phát triển.
          </p>
        </div>

        {/* Finder Form Card */}
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-5xl mx-auto border border-slate-100 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. Độ tuổi học viên
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
                >
                  <option value="5">Mầm non (4 - 6 tuổi)</option>
                  <option value="8">Tiểu học (6 - 11 tuổi)</option>
                  <option value="13">Thiếu niên (11 - 15 tuổi)</option>
                  <option value="17">Học sinh THPT (15 - 18 tuổi)</option>
                  <option value="25">Sinh viên & Đi làm (18+ tuổi)</option>
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  2. Mục tiêu học tập
                </label>
                <select
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
                >
                  <option value="cambridge">Chứng chỉ Cambridge (Starters/Movers/Flyers)</option>
                  <option value="ielts">Luyện thi IELTS 6.5 - 8.0+</option>
                  <option value="communication">Giao tiếp công sở & phản xạ</option>
                  <option value="study_abroad">Digital SAT & Săn học bổng du học</option>
                  <option value="kids">Phát âm Phonics & phản xạ mầm non</option>
                </select>
              </div>

              {/* Current Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Trình độ hiện tại
                </label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
                >
                  <option value="beginner">Mới bắt đầu / Mất gốc</option>
                  <option value="intermediate">Đã có căn bản (A2 - B1)</option>
                  <option value="advanced">Khá - Tự tin (B2 trở lên)</option>
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  4. Hình thức học
                </label>
                <select
                  value={learningFormat}
                  onChange={(e) => setLearningFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
                >
                  <option value="center">Học tại trung tâm (Trực tiếp)</option>
                  <option value="1on1">Lớp kèm VIP 1-kèm-1</option>
                  <option value="online">Học trực tuyến tương tác cao</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  5. Khu vực thuận tiện
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
                >
                  <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
            </div>

            <div className="text-center pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full sm:w-auto px-10 shadow-lg shadow-brand-600/30"
              >
                <Search className="w-4 h-4" />
                <span>Tìm Khóa Học Phù Hợp Ngay</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Dynamic Results */}
        {hasSearched && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Đề Xuất Khóa Học Dành Riêng Cho Bạn ({recommendations.length})</span>
              </h3>
            </div>

            {recommendations.length === 0 ? (
              <div className="bg-white/10 rounded-2xl p-8 text-center text-slate-300">
                Không tìm thấy khóa học chính xác với tiêu chí này. Chuyên viên học thuật AURA sẽ hỗ trợ thiết kế lộ trình riêng cho bạn.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-100 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/9] bg-slate-200">
                      <Image
                        src={c.featuredImage}
                        alt={c.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md">
                          Phù hợp {c.matchScore}%
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[11px] font-bold text-brand-600 uppercase">
                          {c.categoryName}
                        </div>
                        <h4 className="font-bold text-base text-brand-navy line-clamp-2 mt-1">
                          {c.name}
                        </h4>
                        <div className="mt-2 text-xs bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200 font-medium">
                          ✨ {c.matchReason}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-2">
                          {c.shortDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500">{c.duration}</span>
                        <Link href={`/courses/${c.slug}`}>
                          <Button variant="accent" size="sm">
                            Xem lộ trình &rarr;
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
