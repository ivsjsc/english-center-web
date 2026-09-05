import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeacherItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  yearsExperience: number;
  qualifications: { name: string; issuer: string }[];
}

interface TeacherShowcaseProps {
  teachers: TeacherItem[];
}

export function TeacherShowcase({ teachers }: TeacherShowcaseProps) {
  return (
    <section className="py-20 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
              Đội Ngũ Chuyên Gia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
              Đội Ngũ Giảng Viên Quốc Tế & Bản Ngữ Tận Tâm
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              100% sở hữu chứng chỉ giảng dạy ngoại ngữ quốc tế CELTA, DELTA hoặc Thạc sĩ Ngôn ngữ ứng dụng từ các trường đại học hàng đầu thế giới.
            </p>
          </div>

          <Link href="/teachers" className="shrink-0">
            <Button variant="outline" size="sm">
              <span>Gặp Gỡ Toàn Bộ Giảng Viên</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.slice(0, 3).map((teacher) => (
            <div
              key={teacher.id}
              className="bg-surface-50 rounded-3xl border border-slate-100 p-6 flex flex-col justify-between hover:shadow-card hover:border-brand-200 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200">
                  <Image
                    src={teacher.avatar}
                    alt={teacher.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-brand-navy/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                    {teacher.yearsExperience}+ năm kinh nghiệm
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-brand-navy group-hover:text-brand-600 transition-colors">
                    <Link href={`/teachers/${teacher.slug}`}>{teacher.name}</Link>
                  </h3>
                  <div className="text-xs font-semibold text-brand-600 mt-0.5">
                    {teacher.title}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {teacher.bio}
                </p>

                {teacher.qualifications && teacher.qualifications.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-200/60">
                    {teacher.qualifications.slice(0, 2).map((q, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700"
                      >
                        <Award className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span className="font-medium line-clamp-1">{q.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <Link
                  href={`/teachers/${teacher.slug}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  Xem hồ sơ chi tiết &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
