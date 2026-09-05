import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { PlacementTestForm } from "./PlacementTestForm";
import { ShieldCheck, Award, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Đăng Ký Thi Thử & Xếp Lớp Tiếng Anh Chuẩn Quốc Tế",
  description: "Đánh giá chính xác 4 kỹ năng Nghe - Nói - Đọc - Viết cùng hội đồng chuyên môn AURA. Nhận kết quả và tư vấn lộ trình học ngay trong ngày.",
  canonicalPath: "/placement-test",
});

export default async function PlacementTestPage() {
  const centers = await prisma.center.findMany({
    where: { active: true },
    select: { id: true, name: true, province: true, district: true },
    orderBy: { province: "asc" },
  });

  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Thi xếp lớp</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Explanations */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-accent-amber uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Đánh Giá Năng Lực Toàn Diện
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              Kiểm Tra Năng Lực 4 Kỹ Năng Chuẩn Cambridge & IELTS
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Bài thi xếp lớp tại AURA được xây dựng dựa trên ngân hàng câu hỏi khảo thí Cambridge và IELTS, giúp xác định chính xác trình độ hiện tại và điểm nghẽn kiến thức cần khắc phục.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="p-2 bg-blue-50 text-brand-600 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-brand-navy">Thời lượng bài thi 45 - 60 phút</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Bao gồm 3 phần: Trắc nghiệm Từ vựng/Ngữ pháp, Đọc hiểu và Phỏng vấn 1-1 với giáo viên.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-brand-navy">Bản báo cáo năng lực chi tiết</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Nhận phân tích điểm mạnh - điểm yếu và lộ trình nâng band điểm rõ ràng trong 2 giờ.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-brand-navy">Hoàn toàn miễn phí 100%</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Chương trình tài trợ cộng đồng nhằm giúp học viên có định hướng học tập đúng đắn.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-6">
            <PlacementTestForm centers={centers} />
          </div>
        </div>
      </div>
    </div>
  );
}
