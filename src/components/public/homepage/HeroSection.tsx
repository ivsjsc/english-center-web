import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#EFF4FF] via-surface to-surface overflow-hidden pb-14 pt-8 lg:pt-14 lg:pb-24">
      {/* Soft Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-highlight rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-accent-amber/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Value Proposition & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col items-start gap-4 sm:gap-5 z-10 text-left">
            {/* Standard Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary-highlight shadow-sm text-primary">
              <ShieldCheck className="w-4 h-4 text-primary-vibrant shrink-0" />
              <span className="text-xs uppercase font-bold tracking-wider">
                Hệ Thống Anh Ngữ Quốc Tế Chuẩn Cambridge & IELTS
              </span>
            </div>

            {/* Exactly One H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-text-heading leading-[1.15] tracking-tight">
              Khai Phóng{" "}
              <span className="text-primary relative inline-block">
                Tiềm Năng
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-primary-vibrant/35 -z-10"
                  fill="none"
                  height="10"
                  preserveAspectRatio="none"
                  viewBox="0 0 200 10"
                >
                  <path
                    d="M2 8C58 0 142 0 198 8"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
              </span>{" "}
              Ngoại Ngữ, Vững Bước Tương Lai Toàn Cầu
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-default leading-relaxed max-w-2xl">
              Chương trình đào tạo tiếng Anh chuẩn quốc tế cho mọi lứa tuổi từ 4-18+, người đi làm và luyện thi chứng chỉ. 100% giáo viên bản ngữ/quốc tế giàu kinh nghiệm cùng phương pháp phản xạ chủ động.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
              {onOpenConsultation ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto shadow-md"
                >
                  <span>Đăng ký tư vấn ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Link href="#dang-ky-tu-van-ngay" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                    <span>Đăng ký tư vấn ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}

              <Link href="#khoa-hoc-dao-tao" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto shadow-sm">
                  <Compass className="w-4 h-4 text-primary" />
                  <span>Khám phá khóa học</span>
                </Button>
              </Link>
            </div>

            {/* 3 Micro Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 pt-4 text-xs font-semibold text-text-default w-full border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-growth-dark flex items-center justify-center font-bold text-xs shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Hơn 98% đạt cam kết</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-growth-dark flex items-center justify-center font-bold text-xs shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Chuẩn Quốc tế công nhận</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-growth-dark flex items-center justify-center font-bold text-xs shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Lộ trình cá nhân hóa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Learning Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-border aspect-[4/3] sm:aspect-[16/11]">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80"
                alt="Lớp học tương tác chuẩn Cambridge tại IVS Academy"
                fill
                priority
                className="object-cover transform hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating CenterCare Suite Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-deep text-white flex items-center justify-center font-black text-sm shrink-0">
                  IVS
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-primary-deep truncate">
                      CenterCare™ Hệ Thống Quản Lý
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-growth-dark text-[10px] font-bold border border-emerald-200 shrink-0">
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-text-muted truncate mt-0.5">
                    Báo cáo tiến độ học tập real-time & tương tác phụ huynh 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Ambient Accents */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary-vibrant/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-growth/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
