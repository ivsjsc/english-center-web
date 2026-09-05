import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Khóa Học Tiếng Anh Chuẩn Quốc Tế",
  description: "Danh sách các khóa học tiếng Anh mầm non, thiếu nhi, thiếu niên, luyện thi IELTS và tiếng Anh giao tiếp tại IVS Academy.",
  canonicalPath: "/courses",
});

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; level?: string }>;
}) {
  const { category: catParam, level: levelParam } = await searchParams;

  const [categories, courses] = await Promise.all([
    prisma.courseCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.course.findMany({
      where: {
        status: "PUBLISHED",
        ...(catParam ? { category: { slug: catParam } } : {}),
        ...(levelParam ? { level: { contains: levelParam } } : {}),
      },
      include: {
        category: true,
        outcomes: { orderBy: { orderIndex: "asc" }, take: 2 },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Khóa học</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Chương Trình Đào Tạo Tiêu Chuẩn Quốc Tế
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl">
            Lộ trình học bài bản theo khung chuẩn quốc tế CEFR giúp học viên phát triển toàn diện 4 kỹ năng và tự tin chinh phục các kỳ thi quốc tế.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">
            Lọc theo danh mục:
          </span>
          <Link
            href="/courses"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              !catParam
                ? "bg-brand-navy text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Tất cả
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/courses?category=${c.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                catParam === c.slug
                  ? "bg-brand-navy text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={course.featuredImage}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary">{course.category.name.split("(")[0]}</Badge>
                  {course.CEFRLevel && (
                    <Badge variant="warning">{course.CEFRLevel}</Badge>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-brand-600" />
                      {course.targetAudience}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                  </div>

                  <h2 className="font-extrabold text-lg text-brand-navy group-hover:text-brand-600 transition-colors">
                    <Link href={`/courses/${course.slug}`}>{course.name}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {course.outcomes && course.outcomes.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      {course.outcomes.map((out, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{out.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Sĩ số: {course.classSize}
                  </span>
                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="accent" size="sm">
                      Chi tiết &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
