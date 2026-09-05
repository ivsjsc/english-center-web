import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TeacherCard } from "@/components/public/TeacherCard";
import { isSampleDeployment } from "@/lib/deployment";

interface TeacherItem {
  id?: string;
  name?: string;
  fullName?: string;
  nationality?: string | null;
  yearsExperience?: number;
  bio?: string | null;
  specialization?: string;
  avatarUrl?: string | null;
}

interface TeacherShowcaseProps {
  teachers?: TeacherItem[];
}

export function TeacherShowcase({ teachers = [] }: TeacherShowcaseProps) {
  const isSample = isSampleDeployment();
  // Canonical default 4 teachers from Stitch specification if db items are fewer
  const defaultTeachers = [
    {
      name: "Thầy James Alexander",
      country: "Vương Quốc Anh",
      yearsExperience: 12,
      qualificationsSummary: "Cựu Giám khảo chấm thi IELTS, Thạc sĩ TESOL Đại học Cambridge.",
      specialization: "IELTS 7.5+ & Academic Writing",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Cô Sarah Jenkins",
      country: "Hoa Kỳ (USA)",
      yearsExperience: 9,
      qualificationsSummary: "Chuyên gia tâm lý giáo dục mầm non, Chứng chỉ CELTA loại Xuất sắc.",
      specialization: "SmartKids & Phonics chuẩn Mỹ",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Thầy Liam O'Connor",
      country: "Úc (Australia)",
      yearsExperience: 10,
      qualificationsSummary: "Cử nhân Ngôn ngữ học Đại học Melbourne, Chứng chỉ Cambridge DELTA.",
      specialization: "Tiếng Anh THCS & Thuyết trình",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Cô Mai Phương, M.Ed",
      country: "Việt Nam",
      yearsExperience: 14,
      qualificationsSummary: "Thủ khoa Sư phạm Anh, IELTS 8.5, Thạc sĩ Lý luận & Phương pháp giảng dạy.",
      specialization: "Chuyên ngữ & Chiến thuật đề thi",
      avatarUrl: "https://images.unsplash.com/photo-1580894732415-467f502bb6a4?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const displayTeachers = teachers.length >= 4
    ? teachers.slice(0, 4).map((t, idx) => ({
        name: t.fullName || t.name,
        country: t.nationality || defaultTeachers[idx].country,
        yearsExperience: t.yearsExperience || defaultTeachers[idx].yearsExperience,
        qualificationsSummary: t.bio || defaultTeachers[idx].qualificationsSummary,
        specialization: defaultTeachers[idx].specialization,
        avatarUrl: t.avatarUrl || defaultTeachers[idx].avatarUrl,
      }))
    : defaultTeachers;

  return (
    <section className="w-full py-16 lg:py-24 bg-surface" id="doi-ngu-giao-vien">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
              ĐỘI NGŨ GIẢNG DẠY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
              Giảng viên bản ngữ tâm huyết & tài năng
            </h2>
            <p className="text-sm sm:text-base text-text-default mt-2">
              {isSample
                ? "Giao diện minh họa hồ sơ đội ngũ giảng viên — Sẽ cập nhật theo danh sách nhân sự chính thức."
                : "100% giáo viên sở hữu bằng cử nhân/thạc sĩ quốc tế cùng các chứng chỉ giảng dạy sư phạm danh giá."}
            </p>
            {isSample && (
              <div className="mt-3">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                  Hồ sơ giảng viên mẫu minh họa — Sẽ cập nhật theo danh sách nhân sự chính thức
                </span>
              </div>
            )}
          </div>

          <Link
            href="/teachers"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-vibrant transition-colors shrink-0"
          >
            <span>Xem hồ sơ tất cả giáo viên</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Teacher Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTeachers.map((teacher, idx) => (
            <TeacherCard
              key={idx}
              name={teacher.name || "Giảng viên IVS"}
              country={teacher.country}
              yearsExperience={teacher.yearsExperience}
              qualificationsSummary={teacher.qualificationsSummary}
              specialization={teacher.specialization}
              avatarUrl={teacher.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
