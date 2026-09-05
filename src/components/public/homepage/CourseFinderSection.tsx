"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, Headphones, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          learningFormat: "center",
          province,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.courses || []);
      }
    } catch {
      // fallback handled gracefully
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-light/50 border border-primary-highlight p-6 sm:p-10 rounded-3xl shadow-sm text-left">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-primary-vibrant mb-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-xs uppercase font-bold tracking-wider">
                HỖ TRỢ ĐỊNH HƯỚNG THÔNG MINH
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-heading">
              Tìm khóa học phù hợp nhất với bạn
            </h2>
            <p className="text-sm sm:text-base text-text-default mt-1.5">
              Chỉ mất 30 giây lựa chọn tiêu chí để hệ thống gợi ý lộ trình và học phí tối ưu nhất.
            </p>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-text-heading mb-1.5 uppercase tracking-wider">
                  1. Độ tuổi học viên
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white border border-border text-text-heading text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-vibrant"
                >
                  <option value="5">4 - 6 Tuổi (Mầm non)</option>
                  <option value="8">6 - 11 Tuổi (Tiểu học)</option>
                  <option value="13">11 - 15 Tuổi (THCS)</option>
                  <option value="17">15 - 18 Tuổi (THPT)</option>
                  <option value="25">Sinh viên & Người đi làm</option>
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-bold text-text-heading mb-1.5 uppercase tracking-wider">
                  2. Mục tiêu học tập
                </label>
                <select
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white border border-border text-text-heading text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-vibrant"
                >
                  <option value="cambridge">Lấy chứng chỉ Cambridge (Starters/Flyers)</option>
                  <option value="ielts">Thi chứng chỉ IELTS (6.5 - 8.0+)</option>
                  <option value="communication">Giao tiếp phản xạ chuẩn bản ngữ</option>
                  <option value="toeic">Thi TOEIC đột phá điểm số</option>
                  <option value="school">Bổ trợ tiếng Anh học đường</option>
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-xs font-bold text-text-heading mb-1.5 uppercase tracking-wider">
                  3. Trình độ hiện tại
                </label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white border border-border text-text-heading text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-vibrant"
                >
                  <option value="zero">Mất gốc / Người mới bắt đầu</option>
                  <option value="beginner">Căn bản (Nghe hiểu chậm)</option>
                  <option value="intermediate">Trung cấp (Giao tiếp cơ bản)</option>
                  <option value="advanced">Nâng cao (Cần luyện thi chuyên sâu)</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-text-heading mb-1.5 uppercase tracking-wider">
                  4. Khu vực mong muốn học
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white border border-border text-text-heading text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-vibrant"
                >
                  <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">TP. Hà Nội</option>
                  <option value="Đà Nẵng">TP. Đà Nẵng</option>
                  <option value="Cần Thơ">TP. Cần Thơ</option>
                  <option value="Online">Lớp trực tuyến E-learning</option>
                </select>
              </div>
            </div>

            {/* Action & Hotline note */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-primary-highlight">
              <div className="flex items-center gap-2 text-text-default text-xs sm:text-sm">
                <Headphones className="w-4 h-4 text-primary-vibrant shrink-0" />
                <span>
                  Cần hỗ trợ trực tiếp? Tổng đài miễn phí:{" "}
                  <strong className="text-primary font-bold">1900 xxxx</strong> (08:00 - 21:30)
                </span>
              </div>

              <Button
                type="submit"
                variant="deep"
                size="lg"
                isLoading={isLoading}
                className="w-full sm:w-auto"
              >
                <span>Tìm khóa học phù hợp cho tôi</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Results Display */}
          {hasSearched && (
            <div className="mt-8 pt-8 border-t border-primary-highlight">
              <h3 className="text-lg font-bold text-text-heading mb-4">
                Khóa học gợi ý cho bạn:
              </h3>
              {recommendations.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-border text-center">
                  <p className="text-sm text-text-muted">
                    Để nhận lộ trình chính xác nhất theo nguyện vọng cá nhân, vui lòng{" "}
                    <Link href="/placement-test" className="text-primary font-bold underline">
                      Làm bài kiểm tra năng lực trực tuyến
                    </Link>{" "}
                    hoặc liên hệ hotline 1900 xxxx.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.slice(0, 2).map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-growth-dark bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Phù hợp {rec.matchScore}%
                          </span>
                          <span className="text-xs text-text-muted">{rec.categoryName}</span>
                        </div>
                        <h4 className="text-base font-bold text-text-heading">{rec.name}</h4>
                        <p className="text-xs text-text-default mt-1 leading-relaxed">
                          {rec.shortDescription}
                        </p>
                        <p className="text-xs text-primary font-medium mt-2 bg-primary-light/80 p-2 rounded-lg">
                          💡 {rec.matchReason}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/courses/${rec.slug}`}
                          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          <span>Xem chi tiết khóa học</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link href="/placement-test">
                          <Button variant="outline" size="sm">
                            Đăng ký test thử
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
