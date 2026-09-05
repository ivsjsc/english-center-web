import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Chính Sách Xử Lý & Bảo Vệ Dữ Liệu Cá Nhân (Nghị Định 13)",
  description: "Quy định về việc bảo vệ và xử lý dữ liệu cá nhân theo Nghị định số 13/2023/NĐ-CP của Chính phủ tại IVS Academy.",
  canonicalPath: "/personal-data-policy",
});

export default function PersonalDataPolicyPage() {
  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Bảo vệ dữ liệu cá nhân (Nghị định 13)</span>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>LƯU Ý PHÁP LÝ:</strong> Biểu mẫu này tuân thủ các quy tắc cốt lõi của Nghị định số 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân. Các trường thông tin cụ thể cần được Giám đốc điều hành và Ban Pháp chế trung tâm phê duyệt trước khi áp dụng vào quy trình vận hành chính thức.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Chính Sách Xử Lý Dữ Liệu Cá Nhân Theo Nghị Định 13/2023/NĐ-CP
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Áp dụng cho toàn bộ học viên, phụ huynh và khách hàng đăng ký dịch vụ tại IVS Academy.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Nguyên Tắc Xử Lý Dữ Liệu</h2>
              <p>
                IVS Academy cam kết tuân thủ đầy đủ các nguyên tắc bảo vệ dữ liệu cá nhân theo quy định pháp luật Việt Nam:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Dữ liệu chỉ được thu thập khi có sự đồng thuận rõ ràng của chủ thể dữ liệu (hoặc người giám hộ hợp pháp đối với trẻ em dưới 16 tuổi).</li>
                <li>Dữ liệu được xử lý đúng mục đích đã thông báo và không vượt quá phạm vi cần thiết.</li>
                <li>Áp dụng các biện pháp bảo mật kỹ thuật hiện đại (mã hóa, phân quyền truy cập) để ngăn ngừa rò rỉ, mất mát.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Loại Dữ Liệu Cá Nhân Được Xử Lý</h2>
              <p>
                Bao gồm dữ liệu cơ bản: Họ tên, số điện thoại, địa chỉ email, năm sinh, hình ảnh học viên chụp tại lớp học/sự kiện (khi đã có văn bản đồng thuận từ phụ huynh).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Quyền Của Chủ Thể Dữ Liệu</h2>
              <p>Theo Điều 9 Nghị định 13/2023/NĐ-CP, chủ thể dữ liệu có các quyền:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Quyền được biết và quyền đồng ý.</li>
                <li>Quyền truy cập để xem, chỉnh sửa hoặc yêu cầu chỉnh sửa dữ liệu cá nhân.</li>
                <li>Quyền rút lại sự đồng ý hoặc yêu cầu xóa dữ liệu (trừ trường hợp pháp luật có quy định khác).</li>
                <li>Quyền khiếu nại, tố cáo, khởi kiện theo quy định của pháp luật.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Quy Trình Tiếp Nhận Yêu Cầu Của Khách Hàng</h2>
              <p>
                Để thực hiện bất kỳ quyền nào nêu trên, khách hàng gửi yêu cầu qua email <strong>privacy@ivs.edu.vn</strong> kèm bản chụp CCCD/hộ chiếu để xác thực danh tính. Chúng tôi sẽ phản hồi bằng văn bản trong thời hạn 72 giờ làm việc.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
