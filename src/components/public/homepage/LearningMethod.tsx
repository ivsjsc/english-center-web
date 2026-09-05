import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LearningMethod() {
  const steps = [
    {
      num: "01",
      title: "Chủ Động Khám Phá (Inquiry-Based Learning)",
      desc: "Thay vì nghe giảng thụ động, học viên được đặt vào các tình huống thực tế để tự đặt câu hỏi và tìm tòi giải pháp.",
    },
    {
      num: "02",
      title: "Tích Hợp Liên Môn CLIL (Ngôn Ngữ & Tri Thức)",
      desc: "Tiếp thu tiếng Anh thông qua kiến thức Khoa học, Nghệ thuật, Lịch sử và Công nghệ, biến ngôn ngữ thành công cụ tư duy.",
    },
    {
      num: "03",
      title: "Rèn Luyện Tư Duy Phản Biện (Critical Thinking)",
      desc: "Học cách bảo vệ quan điểm, phân tích đa chiều và thuyết trình tự tin trước đám đông.",
    },
    {
      num: "04",
      title: "Đánh Giá Tiến Bộ Liên Tục (Continuous Assessment)",
      desc: "Đo lường sự tiến bộ chuẩn CEFR qua từng chặng học tập, hỗ trợ kịp thời để học viên luôn theo kịp tiến độ.",
    },
  ];

  return (
    <section className="py-20 bg-surface-50 text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Steps */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
              Phương Pháp Sư Phạm
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Mô Hình Đào Tạo Tương Tác Định Hướng Chuẩn Quốc Tế
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Mô hình học tập tại IVS Academy tập trung vào học viên, tạo môi trường tự nhiên giúp người học tự tin làm chủ tư duy và kỹ năng ngôn ngữ.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm space-y-2 hover:border-brand-300 transition-colors"
                >
                  <div className="text-xs font-black text-brand-600 tracking-wider">
                    BƯỚC {s.num}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/methodology">
                <Button variant="outline" size="md">
                  <span>Tìm Hiểu Chi Tiết Phương Pháp Sư Phạm</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80"
                alt="Phương pháp giảng dạy tương tác tại IVS Academy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <div className="text-xs font-bold uppercase text-accent-amber mb-1">
                  Khung Tham Chiếu CEFR
                </div>
                <div className="text-base font-extrabold leading-snug">
                  Định hướng chuẩn đầu ra bài thi Cambridge & IELTS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
