import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { Trophy, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "Bảng Vàng Thành Tích Học Viên",
  description: "Vinh danh các học viên xuất sắc đạt IELTS 8.5, 15/15 Khiên Cambridge và học bổng du học quốc tế tại AURA Academy.",
  canonicalPath: "/student-achievements",
});

export default async function StudentAchievementsPage() {
  const achievements = await prisma.studentAchievement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Bảng vàng thành tích</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 mb-3">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>5.200+ Học Viên Đạt Chuẩn Xuất Sắc</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Bảng Vàng Danh Dự & Câu Chuyện Thành Công
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl">
            Mỗi số điểm cao là một hành trình nỗ lực không ngừng nghỉ của học viên cùng sự đồng hành sát sao của thầy cô AURA. Cùng lắng nghe câu chuyện bứt phá của các bạn!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.studentName}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg text-brand-navy">
                      {item.studentName}
                    </h2>
                    <div className="text-xs text-slate-500 font-medium">
                      Năm đạt thành tích: {item.year}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-center">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    {item.certificateType}
                  </span>
                  <div className="text-2xl font-black text-amber-900 mt-0.5">
                    {item.score}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item.story}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <Award className="w-3.5 h-3.5" />
                  Xác thực học bổng
                </span>
                <Link href="/placement-test" className="font-bold text-brand-600 hover:underline">
                  Thi thử miễn phí &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
