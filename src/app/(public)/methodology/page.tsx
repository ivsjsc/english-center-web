import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { ShieldCheck, Sparkles, BookOpen, BrainCircuit, Users2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "Phương Pháp Giảng Dạy Chuẩn NEAS Úc",
  description: "Tìm hiểu triết lý giáo dục chủ động tương tác và phương pháp học tích hợp liên môn CLIL tại AURA Academy.",
  canonicalPath: "/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="bg-surface-50 text-left min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-accent-amber font-semibold">Phương pháp đào tạo</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent-amber text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Tiêu Chuẩn Kiểm Định Quốc Tế NEAS (Úc)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Phương Pháp Sư Phạm Khơi Mở Tiềm Năng
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Tại AURA, chúng tôi tin rằng ngôn ngữ không phải là môn học để ghi nhớ công thức khô khan, mà là chiếc chìa khóa vạn năng để khám phá tri thức nhân loại và khẳng định bản sắc cá nhân.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Pillar 1 */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black text-brand-600 uppercase tracking-widest">
              TRỤ CỘT 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Học Tập Chủ Động & Trải Nghiệm Thực Tế (Active Learning)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Mô hình lớp học đảo ngược (Flipped Classroom) giúp học viên chủ động chuẩn bị từ vựng và ngữ cảnh trước buổi học qua ứng dụng AURA LMS. Thời gian trên lớp dành trọn vẹn cho việc thảo luận, thực hành phản xạ và giải quyết vấn đề theo nhóm.
            </p>
            <div className="space-y-2 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Học viên nói tối thiểu 70% thời lượng mỗi buổi học</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Không gò bó sách vở, tiếp thu qua các dự án và tình huống thực tiễn</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
              alt="Học tập chủ động tương tác"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80"
              alt="Tích hợp liên môn CLIL"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-black text-brand-600 uppercase tracking-widest">
              TRỤ CỘT 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Học Tích Hợp Ngôn Ngữ & Nội Dung (CLIL)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Phương pháp giáo dục tiên tiến nhất tại Châu Âu được AURA áp dụng vào toàn bộ hệ thống khóa học. Trẻ em và thanh thiếu niên học Khoa học, Địa lý, Thiên văn và Nghệ thuật bằng tiếng Anh, giúp tư duy song ngữ hình thành tự nhiên và vững bền.
            </p>
            <div className="space-y-2 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mở rộng vốn từ vựng học thuật vượt trội so với sách giáo khoa</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kích thích niềm say mê khám phá khoa học từ thuở ấu thơ</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-navy rounded-3xl p-8 sm:p-12 text-center text-white space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            Trải Nghiệm Phương Pháp Giảng Dạy Chuẩn Quốc Tế Ngay Hôm Nay
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Đăng ký tham dự buổi học thử miễn phí cùng giảng viên bản ngữ để cảm nhận sự khác biệt.
          </p>
          <div className="pt-2">
            <Link href="/placement-test">
              <Button variant="accent" size="lg">
                Đăng Ký Học Thử & Kiểm Tra Năng Lực Miễn Phí
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
