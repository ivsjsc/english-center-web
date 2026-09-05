"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users, Award, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCategoryItem {
  id: string;
  slug: string;
  name: string;
}

interface CourseItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  targetAudience: string;
  minimumAge: number;
  maximumAge: number;
  duration: string;
  level: string;
  CEFRLevel: string | null;
  featuredImage: string;
  categoryId: string;
  category: { slug: string; name: string };
  outcomes: { description: string }[];
}

interface CourseDiscoveryProps {
  categories: CourseCategoryItem[];
  courses: CourseItem[];
}

export function CourseDiscovery({ categories, courses }: CourseDiscoveryProps) {
  const [activeCat, setActiveCat] = useState<string>("all");

  const filteredCourses =
    activeCat === "all"
      ? courses
      : courses.filter((c) => c.category.slug === activeCat);

  return (
    <section className="py-20 bg-surface-50 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
              Chương Trình Đào Tạo
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight mt-3">
              Lộ Trình Toàn Diện Cho Mọi Độ Tuổi
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Từ bước khởi đầu mầm non đến chinh phục các chứng chỉ quốc tế Cambridge, IELTS và tiếng Anh công sở.
            </p>
          </div>

          <Link href="/courses" className="shrink-0">
            <Button variant="outline" size="sm">
              <span>Xem Toàn Bộ Khóa Học</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setActiveCat("all")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeCat === "all"
                ? "bg-brand-navy text-white shadow-md shadow-brand-navy/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Tất Cả Khóa Học
          </button>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCat === cat.slug
                  ? "bg-brand-navy text-white shadow-md shadow-brand-navy/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, 6).map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image & Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={course.featuredImage}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="shadow-sm">
                    {course.category.name.split("(")[0]}
                  </Badge>
                  {course.CEFRLevel && (
                    <Badge variant="warning" className="shadow-sm">
                      {course.CEFRLevel}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-brand-600" />
                      {course.targetAudience}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-brand-navy group-hover:text-brand-600 transition-colors line-clamp-2">
                    <Link href={`/courses/${course.slug}`}>{course.name}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Top Key Outcomes */}
                  {course.outcomes && course.outcomes.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      {course.outcomes.slice(0, 2).map((out, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{out.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Đảm bảo chất lượng
                  </span>
                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="outline" size="sm">
                      Chi tiết &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
