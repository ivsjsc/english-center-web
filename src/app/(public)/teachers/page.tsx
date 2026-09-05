import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { Award, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "Đội Ngũ Giảng Viên Quốc Tế & Bản Ngữ",
  description: "Đội ngũ chuyên gia học thuật, giảng viên bản ngữ và Việt Nam giàu kinh nghiệm, 100% chứng chỉ CELTA, DELTA, TESOL tại AURA Academy.",
  canonicalPath: "/teachers",
});

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    where: { active: true },
    include: {
      qualifications: true,
    },
    orderBy: { yearsExperience: "desc" },
  });

  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Đội ngũ giảng viên</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Đội Ngũ Chuyên Gia & Giảng Viên Chuẩn Quốc Tế
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl">
            Sức mạnh đào tạo của AURA đến từ đội ngũ thầy cô giáo tâm huyết, giỏi chuyên môn và am hiểu tâm lý học sinh. 100% giáo viên được tuyển chọn qua quy trình 5 bước nghiêm ngặt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={teacher.avatar}
                    alt={teacher.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-brand-navy/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {teacher.yearsExperience}+ năm kinh nghiệm
                  </div>
                </div>

                <div>
                  <h2 className="font-extrabold text-xl text-brand-navy group-hover:text-brand-600 transition-colors">
                    <Link href={`/teachers/${teacher.slug}`}>{teacher.name}</Link>
                  </h2>
                  <div className="text-xs font-semibold text-brand-600 mt-1">
                    {teacher.title}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {teacher.bio}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  {teacher.qualifications.map((q) => (
                    <div key={q.id} className="flex items-start gap-2 text-xs text-slate-700">
                      <Award className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span className="font-medium line-clamp-1">{q.name} ({q.issuer})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/teachers/${teacher.slug}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800"
                >
                  Xem chi tiết &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
