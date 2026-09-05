import React from "react";
import { MonitorPlay, Smartphone, BookOpen, Compass } from "lucide-react";

export function LearningEcosystem() {
  const pillars = [
    {
      icon: MonitorPlay,
      title: "Lớp Học Tương Tác Trực Tiếp",
      desc: "Trang bị màn hình tương tác thông minh và học cụ trực quan giúp học viên hứng thú tham gia bài học.",
    },
    {
      icon: Smartphone,
      title: "Hệ Thống Trực Tuyến IVS LMS",
      desc: "Học mọi lúc mọi nơi: Luyện tập phát âm, làm bài tập trực tuyến và theo dõi tiến trình học tập của con.",
    },
    {
      icon: BookOpen,
      title: "Thư Viện Tài Liệu Tham Khảo",
      desc: "Không gian đọc và tự học với các đầu sách tiếng Anh, truyện tranh và bộ đề thi thử Cambridge/IELTS.",
    },
    {
      icon: Compass,
      title: "Hoạt Động Trải Nghiệm Ngoại Khóa",
      desc: "Môi trường giao lưu tiếng Anh cuối tuần, câu lạc bộ thuyết trình và các buổi sinh hoạt chuyên đề.",
    },
  ];

  return (
    <section className="py-20 bg-surface-50 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
            Hệ Sinh Thái Học Tập
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
            Môi Trường Đào Tạo Toàn Diện Tại IVS Academy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Kết hợp hài hòa giữa giờ học trên lớp và các công cụ bổ trợ trực tuyến giúp học viên duy trì thói quen học tập liên tục.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
