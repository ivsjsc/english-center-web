import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata, generateCourseSchema, generateFAQSchema } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { LeadForm } from "@/components/public/LeadForm";
import {
  Award,
  BookOpen,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export async function generateStaticParams() {
  try {
    const courses = await prisma.course.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return courses.map((course) => ({ slug: course.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course) return constructMetadata({ title: "Khóa học không tồn tại" });

  return constructMetadata({
    title: course.seoTitle || course.name,
    description: course.seoDescription || course.shortDescription,
    image: course.featuredImage,
    canonicalPath: `/courses/${course.slug}`,
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      category: true,
      curriculums: { orderBy: { orderIndex: "asc" } },
      outcomes: { orderBy: { orderIndex: "asc" } },
      faqs: { orderBy: { orderIndex: "asc" } },
    },
  });

  if (!course) notFound();

  const courseSchema = generateCourseSchema({
    name: course.name,
    description: course.description,
    slug: course.slug,
    duration: course.duration,
    featuredImage: course.featuredImage,
  });

  const faqSchema = course.faqs.length > 0 ? generateFAQSchema(course.faqs) : null;

  return (
    <div className="bg-surface-50 text-left min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Header */}
      <section className="bg-brand-navy text-white pt-12 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white">Khóa học</Link>
            <span>/</span>
            <span className="text-accent-amber font-semibold">{course.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {course.category.name}
                </Badge>
                {course.CEFRLevel && (
                  <Badge variant="warning">Khung CEFR: {course.CEFRLevel}</Badge>
                )}
                <Badge variant="success">Cam kết đầu ra</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {course.name}
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Key Quick Stats */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 border-t border-white/15">
                <div>
                  <div className="text-slate-400">Đối tượng:</div>
                  <div className="font-bold text-white mt-0.5">{course.targetAudience}</div>
                </div>
                <div>
                  <div className="text-slate-400">Thời lượng:</div>
                  <div className="font-bold text-white mt-0.5">{course.duration}</div>
                </div>
                <div>
                  <div className="text-slate-400">Số buổi:</div>
                  <div className="font-bold text-white mt-0.5">{course.numberOfSessions} buổi học</div>
                </div>
                <div>
                  <div className="text-slate-400">Quy mô lớp:</div>
                  <div className="font-bold text-white mt-0.5">{course.classSize}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[16/10]">
                <Image
                  src={course.featuredImage}
                  alt={course.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Registration Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Course Information */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-brand-navy">
                Tổng Quan Khóa Học
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {course.description}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="font-bold text-slate-800">Phương pháp đào tạo: </span>
                  <span className="text-slate-600">{course.teachingMethod}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800">Tài liệu học tập: </span>
                  <span className="text-slate-600">{course.learningMaterials || "Giáo trình độc quyền hợp tác quốc tế"}</span>
                </div>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2">
                <Award className="w-6 h-6 text-accent-amber" />
                <span>Mục Tiêu & Chuẩn Đầu Ra Khóa Học</span>
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {course.outcomes.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-brand-600" />
                <span>Nội Dung Khung Chương Trình Đào Tạo</span>
              </h2>

              <Accordion>
                {course.curriculums.map((curr, idx) => (
                  <AccordionItem
                    key={curr.id}
                    title={`Học Phần ${idx + 1}: ${curr.title} (${curr.sessionsCount} buổi)`}
                    defaultOpen={idx === 0}
                  >
                    <p className="text-slate-700 leading-relaxed">
                      {curr.description}
                    </p>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* FAQ Accordion */}
            {course.faqs.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-purple-600" />
                  <span>Câu Hỏi Thường Gặp (FAQ)</span>
                </h2>

                <Accordion>
                  {course.faqs.map((faq, idx) => (
                    <AccordionItem
                      key={faq.id}
                      title={faq.question}
                      defaultOpen={idx === 0}
                    >
                      <p className="text-slate-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Right Lead Registration Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <LeadForm
                variant="card"
                initialCourseId={course.id}
                title="Đăng Ký Tư Vấn Khóa Học Này"
                subtitle="Nhận ngay học bổng 25% và lịch xếp lớp kiểm tra năng lực miễn phí."
              />

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs text-slate-600">
                <div className="font-bold text-slate-800 text-sm">
                  Chính sách đảm bảo quyền lợi:
                </div>
                <div>• Cam kết chuẩn đầu ra văn bản minh bạch</div>
                <div>• Học bù linh hoạt nếu có lịch bận đột xuất</div>
                <div>• Được trải nghiệm 03 buổi đầu đổi giáo viên nếu chưa phù hợp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
