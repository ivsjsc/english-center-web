import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Chính Sách Bảo Mật Thông Tin",
  description: "Chính sách bảo mật thông tin cá nhân của học viên và khách hàng tại Hệ thống Anh ngữ AURA Academy.",
  canonicalPath: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Chính sách bảo mật</span>
        </div>

        {/* Legal Review Notice Box */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>LƯU Ý PHÁP LÝ NỘI BỘ:</strong> Văn bản này là biểu mẫu quy chuẩn bảo mật thông tin dành cho tổ chức giáo dục. Doanh nghiệp cần phối hợp cùng bộ phận pháp chế rà soát và điều chỉnh theo chính sách nội bộ trước khi ban hành chính thức.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Chính Sách Bảo Mật Thông Tin Khách Hàng
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Có hiệu lực từ ngày: 01/01/2026 | Phiên bản 2.1
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Mục Đích Thu Thập Thông Tin</h2>
              <p>
                AURA Academy thu thập thông tin cá nhân của học viên và phụ huynh nhằm mục đích:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tư vấn lộ trình học tập, xếp lớp và kiểm tra năng lực tiếng Anh phù hợp.</li>
                <li>Thông báo lịch học, kết quả học tập và các sự kiện ngoại khóa.</li>
                <li>Hỗ trợ giải quyết khiếu nại, dịch vụ học viên và xuất hóa đơn học phí.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Phạm Vi Thu Thập Thông Tin</h2>
              <p>
                Các trường dữ liệu được thu thập thông qua website bao gồm: Họ và tên, số điện thoại, địa chỉ email, độ tuổi của học viên, cơ sở quan tâm và lời nhắn đính kèm.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Thời Gian Lưu Trữ</h2>
              <p>
                Dữ liệu cá nhân sẽ được lưu trữ an toàn trên hệ thống máy chủ của AURA cho đến khi có yêu cầu hủy bỏ từ phía chủ thể dữ liệu hoặc theo quy định lưu trữ hồ sơ của ngành giáo dục.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Cam Kết Không Chia Sẻ Dữ Liệu</h2>
              <p>
                AURA cam kết không bán, cho thuê hoặc chia sẻ dữ liệu cá nhân của học viên cho bất kỳ bên thứ ba nào vì mục đích thương mại khi chưa có sự đồng ý bằng văn bản của chủ thể dữ liệu.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">5. Thông Tin Liên Hệ Bộ Phận Bảo Vệ Dữ Liệu</h2>
              <p>
                Mọi thắc mắc hoặc yêu cầu chỉnh sửa/xóa dữ liệu cá nhân, quý khách vui lòng liên hệ:
              </p>
              <div className="bg-surface-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                <div>Đơn vị: <strong>Bộ Phận DPO — AURA English Academy</strong></div>
                <div>Email: <strong>privacy@aura.edu.vn</strong> | Hotline: <strong>1900 6886</strong></div>
                <div>Địa chỉ: 189 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP.HCM</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
