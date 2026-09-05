import React from "react";
import { ShieldCheck, BookOpenCheck, Laptop2, HeartHandshake } from "lucide-react";

export function WhyChooseUs() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Phương Pháp Tương Tác Hiện Đại",
      desc: "Lộ trình đào tạo chú trọng phát triển phản xạ tự nhiên, tăng cường tương tác và thời lượng thực hành ngôn ngữ trực tiếp.",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: BookOpenCheck,
      title: "Giáo Trình Bản Quyền Quốc Tế",
      desc: "Nội dung học tập chọn lọc theo khung tham chiếu CEFR, tích hợp kỹ năng thế kỷ 21 và tư duy học thuật độc lập.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Laptop2,
      title: "Hệ Thống Học Tập IVS LMS",
      desc: "Cổng tương tác trực tuyến hỗ trợ tự học tại nhà, ôn tập từ vựng, làm bài tập và theo dõi tiến độ học tập xuyên suốt.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: HeartHandshake,
      title: "Hỗ Trợ Học Viên Tận Tâm",
      desc: "Đội ngũ trợ giảng và chuyên viên học thuật theo sát từng buổi học, bổ trợ kiến thức kịp thời cho từng học viên.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section className="py-20 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
            Giá Trị Đào Tạo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
            Điểm Nổi Bật Tại IVS Academy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Môi trường học tập cởi mở, khuyến khích sáng tạo và giúp mỗi học viên tự tin thể hiện năng lực bản thân.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-surface-50 border border-slate-100 hover:border-brand-200 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-lg text-brand-navy">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
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
