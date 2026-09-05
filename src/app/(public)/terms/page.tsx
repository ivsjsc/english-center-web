import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Điều Khoản Sử Dụng Dịch Vụ",
  description: "Các điều khoản và điều kiện áp dụng khi sử dụng website và đăng ký học tại Hệ thống Anh ngữ IVS Academy.",
  canonicalPath: "/terms",
});

export default function TermsPage() {
  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Điều khoản sử dụng</span>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>LƯU Ý:</strong> Điều khoản sử dụng dịch vụ đào tạo cần được rà soát đồng bộ cùng Hợp đồng đào tạo học viên của trung tâm trước khi áp dụng thương mại chính thức.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Điều Khoản Sử Dụng Dịch Vụ & Đăng Ký Khóa Học
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Có hiệu lực từ ngày: 01/01/2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Chấp Nhận Điều Khoản</h2>
              <p>
                Khi truy cập website hoặc gửi thông tin đăng ký tư vấn/thi xếp lớp tại IVS Academy, quý khách được xem là đã đọc, hiểu rõ và đồng ý tuân thủ toàn bộ các điều khoản được nêu tại đây.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Quyền Sở Hữu Trí Tuệ</h2>
              <p>
                Toàn bộ nội dung giáo trình, đề thi thử, cấu trúc khóa học, hình ảnh, nhãn hiệu và bài viết trên website thuộc quyền sở hữu trí tuệ của IVS Academy hoặc các đơn vị cấp phép. Nghiêm cấm mọi hành vi sao chép nhằm mục đích thương mại khi chưa có sự đồng ý bằng văn bản.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Chính Sách Học Phí & Hoàn Trả</h2>
              <p>
                Chính sách bảo lưu, chuyển nhượng khóa học hoặc hoàn phí được quy định chi tiết trong Hợp đồng Đào tạo ký kết trực tiếp giữa phụ huynh/học viên và Ban Quản lý Cơ sở của IVS Academy khi hoàn tất thủ tục nhập học.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
