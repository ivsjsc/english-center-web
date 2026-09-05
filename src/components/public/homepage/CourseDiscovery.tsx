"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/public/CourseCard";

interface CourseItem {
  id?: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  description?: string;
  ageRange?: string | null;
  thumbnailUrl?: string | null;
  category?: { slug: string; name: string } | null;
  outcomes?: { description: string }[];
}

interface CourseDiscoveryProps {
  categories?: { id: string; slug: string; name: string }[];
  courses?: CourseItem[];
}

export function CourseDiscovery({ categories: _categories = [], courses = [] }: CourseDiscoveryProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Canonical default 8 courses from Stitch approved specification if db courses are fewer
  const defaultCourses = [
    {
      slug: "smartkids-mam-non",
      title: "SmartKids Mầm Non",
      description:
        "Xây dựng phản xạ tự nhiên, tiếp thu tiếng Anh như tiếng mẹ đẻ qua phương pháp cảm thụ âm thanh chuẩn bản xứ.",
      ageRange: "4 – 6 Tuổi",
      categorySlug: "smartkids-mam-non",
      keyOutcome: "✓ Chuẩn ngữ âm Phonics",
      badgeColor: "primary" as const,
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "superkids-tieu-hoc",
      title: "SuperKids Tiểu Học",
      description:
        "Vững chắc 4 kỹ năng Nghe - Nói - Đọc - Viết. Chinh phục chứng chỉ Cambridge Starters, Movers và Flyers với số khiên tối đa.",
      ageRange: "6 – 11 Tuổi",
      categorySlug: "superkids-tieu-hoc",
      keyOutcome: "✓ Cambridge 15 Khiên",
      badgeColor: "vibrant" as const,
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "young-leaders-thcs",
      title: "Young Leaders THCS",
      description:
        "Rèn luyện tư duy phản biện, kỹ năng thuyết trình học thuật, ngữ pháp chuyên sâu và tiền đề vững chắc cho IELTS 6.0+.",
      ageRange: "11 – 15 Tuổi",
      categorySlug: "young-leaders-thcs",
      keyOutcome: "✓ KET / PET & Pre-IELTS",
      badgeColor: "primary" as const,
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "thpt-du-bi-du-hoc",
      title: "THPT & Dự Bị Du Học",
      description:
        "Tối ưu điểm thi tốt nghiệp THPT Quốc gia, hoàn thiện hồ sơ học bổng du học quốc tế và chuẩn hóa kỹ năng viết luận.",
      ageRange: "15 – 18 Tuổi",
      categorySlug: "thpt-du-bi-du-hoc",
      keyOutcome: "✓ Miễn thi tốt nghiệp",
      badgeColor: "slate" as const,
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "ielts-master-chuyen-sau",
      title: "IELTS Master Chuyên Sâu",
      description:
        "Lộ trình cá nhân hóa tinh gọn, luyện đề thi thử áp lực thực tế cùng cựu giám khảo chấm thi IDP/British Council.",
      ageRange: "Band 4.5 – 8.5+",
      categorySlug: "ielts-chuyen-sau",
      keyOutcome: "✓ Cam kết điểm số bằng HĐ",
      badgeColor: "amber" as const,
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "toeic-dot-pha-ky-nang",
      title: "TOEIC Đột Phá Kỹ Năng",
      description:
        "Chiến thuật giải đề bứt phá điểm số trong 2 - 3 tháng, chuẩn hóa kỹ năng đáp ứng chuẩn đầu ra đại học và tuyển dụng.",
      ageRange: "Target 650+ / 850+",
      categorySlug: "toeic-dot-pha",
      keyOutcome: "✓ Đột phá trong 60 giờ",
      badgeColor: "vibrant" as const,
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "giao-tiep-phan-xa-quoc-te",
      title: "Giao Tiếp Phản Xạ Quốc Tế",
      description:
        "Phương pháp kích hoạt phản xạ vô điều kiện, xóa bỏ rào cản sợ nói, tự tin thuyết trình và giao tiếp thương mại.",
      ageRange: "Mọi Trình Độ",
      categorySlug: "tieng-anh-giao-tiep-italk",
      keyOutcome: "✓ 100% Giáo viên bản ngữ",
      badgeColor: "emerald" as const,
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "tieng-anh-doanh-nghiep",
      title: "Tiếng Anh Doanh Nghiệp",
      description:
        "Giải pháp đào tạo ngoại ngữ may đo theo đặc thù ngành hàng (IT, Xuất nhập khẩu, Tài chính, Du lịch khách sạn).",
      ageRange: "Doanh Nghiệp",
      categorySlug: "tieng-anh-doanh-nghiep",
      keyOutcome: "✓ Thiết kế theo yêu cầu",
      badgeColor: "primary" as const,
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
    },
  ];

  // Merge with db courses if available while preserving canonical visual presentation
  const displayCourses = courses.length >= 8
    ? courses.map((c, idx) => ({
        slug: c.slug,
        title: c.name,
        description: c.shortDescription || c.description,
        ageRange: c.ageRange || defaultCourses[idx % defaultCourses.length].ageRange,
        categorySlug: c.category?.slug,
        keyOutcome: c.outcomes?.[0]?.description || "✓ Cam kết chuẩn đầu ra",
        badgeColor: defaultCourses[idx % defaultCourses.length].badgeColor,
        imageUrl: c.thumbnailUrl || defaultCourses[idx % defaultCourses.length].imageUrl,
      }))
    : defaultCourses;

  const filteredCourses = activeTab === "all"
    ? displayCourses
    : displayCourses.filter((c) =>
        c.categorySlug?.toLowerCase().includes(activeTab) ||
        c.slug?.toLowerCase().includes(activeTab)
      );

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "smartkids", label: "Mầm non (4-6T)" },
    { id: "superkids", label: "Tiểu học (6-11T)" },
    { id: "young-leaders", label: "THCS (11-15T)" },
    { id: "ielts", label: "IELTS & Luyện thi" },
    { id: "giao-tiep", label: "Giao tiếp & Đi làm" },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-surface-subtle" id="khoa-hoc-dao-tao">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl text-left">
            <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
              LỘ TRÌNH ĐÀO TẠO TOÀN DIỆN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
              Khóa học phù hợp cho mọi độ tuổi & mục tiêu
            </h2>
            <p className="text-sm sm:text-base text-text-default mt-2">
              Hệ thống giáo trình chuẩn Cambridge, Oxford được thiết kế chuyên biệt từ giai đoạn vàng mầm non đến người đi làm chuyên nghiệp.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-vibrant transition-colors shrink-0"
          >
            <span>Xem tất cả khung chương trình</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 min-h-[40px] ${
                activeTab === tab.id
                  ? "bg-primary-deep text-white shadow-sm"
                  : "bg-white text-text-default hover:bg-slate-100 border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 8 Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.slice(0, 8).map((course) => (
            <CourseCard
              key={course.slug}
              slug={course.slug}
              title={course.title}
              description={course.description}
              ageRange={course.ageRange}
              keyOutcome={course.keyOutcome}
              badgeColor={course.badgeColor}
              imageUrl={course.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
