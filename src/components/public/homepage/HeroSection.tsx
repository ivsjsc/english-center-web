import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-brand-sapphire to-brand-navy text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-accent-amber rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Col */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-accent-amber">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chương Trình Đào Tạo Ngoại Ngữ & Kỹ Năng Định Hướng Quốc Tế</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Khơi Mở Tiềm Năng, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-accent-amber to-orange-400">
                Tự Tin Vươn Ra Thế Giới
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              Hệ thống đào tạo tiếng Anh IVS Academy với lộ trình học bài bản từ Mầm non đến Luyện thi IELTS chuyên sâu, giúp học viên làm chủ 4 kỹ năng và phát triển tư duy phản biện.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link href="/courses">
                <Button variant="accent" size="lg" className="w-full sm:w-auto shadow-xl">
                  <span>Khám Phá Các Khóa Học</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/placement-test">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-brand-navy hover:bg-white/10 hover:text-white">
                  <span>Thi Xếp Lớp Miễn Phí</span>
                </Button>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lộ trình đào tạo theo chuẩn CEFR</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Giảng viên có chứng chỉ sư phạm</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Định hướng khảo thí Cambridge & IELTS</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] sm:aspect-[1/1]">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
                  alt="Lớp học tương tác tại IVS Academy"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1: CEFR Standard */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white text-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-slate-500">Khung Tham Chiếu</div>
                  <div className="font-extrabold text-sm text-brand-navy">Chuẩn CEFR Châu Âu</div>
                </div>
              </div>

              {/* Floating Badge 2: Personalized Path */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-brand-navy/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm">
                  1:1
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs text-white">Lộ Trình Học Tập</div>
                  <div className="text-[10px] text-slate-300">Cá nhân hóa theo mục tiêu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
