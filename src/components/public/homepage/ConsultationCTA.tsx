import React from "react";
import { CheckCircle2, Phone, Sparkles } from "lucide-react";
import { LeadForm } from "../LeadForm";

export function ConsultationCTA() {
  return (
    <section className="w-full py-16 lg:py-24 bg-surface" id="dang-ky-tu-van-ngay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-deep via-[#0A329E] to-primary text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Benefits & Hotline */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-accent-amber mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ƯU ĐÃI TUYỂN SINH THÁNG NÀY</span>
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Đăng ký tư vấn & Thi thử trình độ miễn phí
                </h2>

                <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
                  Nhận ngay suất kiểm tra toàn diện 4 kỹ năng cùng lộ trình học tập tối ưu hóa dành riêng cho bạn khi đăng ký hôm nay.
                </p>

                <div className="space-y-3.5 mt-8 text-white text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
                    <span>Đánh giá 1-1 trực tiếp với Giám khảo bản ngữ / quốc tế</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
                    <span>Nhận kết quả và bản đồ năng lực chi tiết trong 2 giờ</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
                    <span>Trải nghiệm 1 buổi học thử phương pháp CenterCare miễn phí</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15">
                <span className="text-xs uppercase text-slate-300 block tracking-wider font-semibold">
                  Cần hỗ trợ tư vấn trực tiếp?
                </span>
                <a
                  href="tel:1900xxxx"
                  className="text-xl sm:text-2xl font-extrabold text-accent-amber hover:text-white transition-colors flex items-center gap-2 mt-1"
                >
                  <Phone className="w-5 h-5" />
                  <span>Hotline: 1900 xxxx</span>
                </a>
              </div>
            </div>

            {/* Right Col: Consultation Form Container */}
            <div className="lg:col-span-7">
              <LeadForm variant="card" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
