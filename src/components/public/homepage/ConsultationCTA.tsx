import React from "react";
import { Sparkles, CheckCircle2, Phone } from "lucide-react";
import { LeadForm } from "@/components/public/LeadForm";

export function ConsultationCTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-brand-navy to-slate-900 text-white relative overflow-hidden text-left">
      {/* Glow shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-amber rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-amber/20 text-accent-amber text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chương Trình Đăng Ký Đặc Biệt</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Nhận Ngay Học Bổng 25% & Bộ Quà Nhập Học Độc Quyền
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Hãy để AURA cùng bạn đồng hành trên con đường chinh phục tiếng Anh. Để lại thông tin ngay hôm nay để nhận được:
            </p>

            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-amber shrink-0" />
                <span>01 Buổi đánh giá năng lực 4 kỹ năng chuẩn Cambridge/IELTS miễn phí</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-amber shrink-0" />
                <span>Học bổng ưu đãi đến 25% học phí khóa học đầu tiên</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-amber shrink-0" />
                <span>Tặng balo cao cấp + Bộ giáo trình bản quyền quốc tế</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-amber shrink-0" />
                <span>Cam kết chuẩn đầu ra bằng văn bản pháp lý minh bạch</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-accent-amber" />
              <span>Hotline tư vấn tuyển sinh trực tiếp: <strong>1900 6886</strong> (8:00 - 21:30)</span>
            </div>
          </div>

          {/* Right Lead Form Card */}
          <div className="lg:col-span-6">
            <LeadForm variant="card" />
          </div>
        </div>
      </div>
    </section>
  );
}
