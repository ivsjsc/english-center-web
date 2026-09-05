import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { Award, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/public/LeadForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const teacher = await prisma.teacher.findUnique({
    where: { slug },
  });

  if (!teacher) return constructMetadata({ title: "Giảng viên không tồn tại" });

  return constructMetadata({
    title: `${teacher.name} — ${teacher.title}`,
    description: teacher.bio,
    image: teacher.avatar,
    canonicalPath: `/teachers/${teacher.slug}`,
  });
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const teacher = await prisma.teacher.findUnique({
    where: { slug },
    include: {
      qualifications: true,
    },
  });

  if (!teacher) notFound();

  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/teachers" className="hover:text-brand-600">Đội ngũ giảng viên</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{teacher.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="relative w-44 h-44 rounded-3xl overflow-hidden bg-slate-100 shrink-0 shadow-md">
                <Image
                  src={teacher.avatar}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <div className="text-xs font-bold text-brand-600 uppercase">
                  {teacher.yearsExperience}+ năm kinh nghiệm đào tạo
                </div>
                <h1 className="text-3xl font-black text-brand-navy">
                  {teacher.name}
                </h1>
                <div className="text-sm font-semibold text-slate-600">
                  {teacher.title}
                </div>
                <div className="pt-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Giảng viên chuẩn NEAS & Cambridge
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-brand-navy">
                Tiểu Sử & Phong Cách Giảng Dạy
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {teacher.bio}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2">
                <Award className="w-6 h-6 text-accent-amber" />
                <span>Bằng Cấp & Chứng Chỉ Học Thuật</span>
              </h2>
              <div className="space-y-3 pt-2">
                {teacher.qualifications.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-surface-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{q.name}</div>
                      <div className="text-xs text-slate-500">
                        Cơ quan cấp: {q.issuer} {q.year && `• Năm ${q.year}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <LeadForm
                variant="card"
                title="Đăng Ký Học Cùng Thầy Cô"
                subtitle="Nhận tư vấn lộ trình và cơ hội tham gia lớp học thử cùng giảng viên."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
