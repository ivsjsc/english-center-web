"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Outcome {
  description: string;
}

interface Course {
  id: string;
  name: string;
  slug: string;
  featuredImage: string;
  targetAudience: string;
  duration: string;
  shortDescription: string;
  classSize: string;
  CEFRLevel: string | null;
  category: { id: string; name: string; slug: string };
  outcomes: Outcome[];
}

export function CoursesListClient({
  categories,
  courses,
}: {
  categories: Category[];
  courses: Course[];
}) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category");

  const filteredCourses = catParam
    ? courses.filter((c) => c.category.slug === catParam)
    : courses;

  return (
    <>
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
        {filteredCourses.map((course) => (
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
    </>
  );
}
