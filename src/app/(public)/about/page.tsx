import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "Về Chúng Tôi — IVS Academy",
  description: "Hành trình phát triển và sứ mệnh đào tạo thế hệ trẻ Việt Nam tự tin làm chủ ngôn ngữ toàn cầu của IVS Academy.",
  canonicalPath: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-surface-50 text-left min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-accent-amber font-semibold">Về chúng tôi</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-accent-amber uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
              Sứ Mệnh Giáo Dục Vươn Tầm
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              IVS Academy — Tiêu Chuẩn Anh Ngữ Quốc Tế Hàng Đầu
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Thành lập với khát vọng trao quyền cho thế hệ trẻ Việt Nam tự tin bước ra thế giới, IVS Academy không ngừng kiến tạo chuẩn mực đào tạo ngoại ngữ chất lượng cao, bền vững và nhân văn.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy">Sứ Mệnh (Mission)</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cung cấp giải pháp học tiếng Anh tối ưu, xây dựng nền tảng tư duy phản biện và khả năng hòa nhập quốc tế vững vàng cho mọi thế hệ học viên Việt Nam.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy">Tầm Nhìn (Vision)</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Trở thành hệ thống tổ chức giáo dục ngoại ngữ được tin cậy tại Việt Nam, mang đến môi trường học tập hiện đại và chuẩn mực cho người học.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy">Giá Trị Cốt Lõi</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Chính trực trong cam kết chuẩn đầu ra — Tận tâm vì sự tiến bộ của từng học sinh — Đổi mới sáng tạo không ngừng trong phương pháp giảng dạy.
            </p>
          </div>
        </div>

        {/* Academic Standards Grid */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Định Hướng Học Thuật & Chuẩn Khung Quốc Tế
            </h3>
            <p className="text-slate-600 text-sm">
              Chương trình đào tạo tại IVS Academy được nghiên cứu và thiết kế bám sát các tiêu chuẩn ngôn ngữ quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-50 border border-slate-100 text-center space-y-2">
              <div className="font-black text-brand-navy text-lg">Chuẩn Khung CEFR</div>
              <div className="text-xs text-slate-500">Tham chiếu khung năng lực ngôn ngữ chung Châu Âu từ A1 đến C2</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-50 border border-slate-100 text-center space-y-2">
              <div className="font-black text-brand-navy text-lg">Định Hướng Cambridge</div>
              <div className="text-xs text-slate-500">Lộ trình rèn luyện năng lực toàn diện theo chuẩn Starters, Movers, Flyers</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-50 border border-slate-100 text-center space-y-2">
              <div className="font-black text-brand-navy text-lg">Tiêu Chuẩn IELTS</div>
              <div className="text-xs text-slate-500">Rèn luyện tư duy học thuật và phản xạ 4 kỹ năng Nghe - Nói - Đọc - Viết</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-50 border border-slate-100 text-center space-y-2">
              <div className="font-black text-brand-navy text-lg">Học Liệu Hiện Đại</div>
              <div className="text-xs text-slate-500">Tài liệu học tập chọn lọc quốc tế kết hợp bài tập thực hành tương tác</div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link href="/courses">
            <Button variant="primary" size="lg">
              Khám Phá Các Khóa Học Tại IVS Academy &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
