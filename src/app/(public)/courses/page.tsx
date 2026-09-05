import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { CoursesListClient } from "./CoursesListClient";

export const metadata: Metadata = constructMetadata({
  title: "Khóa Học Tiếng Anh Chuẩn Quốc Tế",
  description: "Danh sách các khóa học tiếng Anh mầm non, thiếu nhi, thiếu niên, luyện thi IELTS và tiếng Anh giao tiếp tại IVS Academy.",
  canonicalPath: "/courses",
});

export default async function CoursesPage() {
  const [categories, courses] = await Promise.all([
    prisma.courseCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.course.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: { select: { id: true, name: true, slug: true } },
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

        <Suspense fallback={<div className="py-12 text-center text-slate-400">Đang tải danh sách khóa học...</div>}>
          <CoursesListClient categories={categories} courses={courses} />
        </Suspense>
      </div>
    </div>
  );
}

