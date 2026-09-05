import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Liên Hệ & Hỗ Trợ — IVS Academy",
  description: "Thông tin liên hệ, hotline tư vấn tuyển sinh và tiếp nhận phản ánh học viên tại Hệ thống Anh ngữ IVS Academy.",
  canonicalPath: "/contact",
});

export default function ContactPage() {
  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Liên hệ</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left contact info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Kết Nối Cùng IVS Academy
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Chúng Tôi Luôn Sẵn Sàng Lắng Nghe & Hỗ Trợ
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Mọi ý kiến đóng góp, thắc mắc về khóa học hoặc nhu cầu đào tạo doanh nghiệp xin vui lòng liên hệ theo các kênh dưới đây.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Tổng đài tuyển sinh:</div>
                  <a href="tel:19006886" className="text-lg font-black text-brand-navy hover:text-brand-600">
                    1900 6886
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">Thời gian: 08:00 - 21:30 (Thứ 2 - Chủ Nhật)</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Hộp thư điện tử:</div>
                  <a href="mailto:contact@ivs.edu.vn" className="text-base font-bold text-brand-navy hover:text-brand-600">
                    contact@ivs.edu.vn
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">Tiếp nhận thông tin 24/7</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Trụ sở điều hành:</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    189 Nguyễn Thị Minh Khai, P. Đa Kao, Quận 1, TP. Hồ Chí Minh
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right contact form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
