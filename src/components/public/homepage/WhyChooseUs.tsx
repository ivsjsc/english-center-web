import React from "react";
import { ShieldCheck, BookOpenCheck, Laptop2, HeartHandshake } from "lucide-react";

export function WhyChooseUs() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Chất Lượng Kiểm Định NEAS Úc",
      desc: "Hệ thống đạt tiêu chuẩn quốc tế nghiêm ngặt về chất lượng giảng dạy, môi trường học tập an toàn và độ hài lòng của học viên.",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: BookOpenCheck,
      title: "Giáo Trình Độc Quyền Hợp Tác Quốc Tế",
      desc: "Nội dung học tập phối hợp cùng National Geographic Learning và Oxford University Press, tích hợp kiến thức xã hội thế kỷ 21.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Laptop2,
      title: "Hệ Sinh Thái Công Nghệ AURA SmartLMS",
      desc: "Ứng dụng luyện phát âm AI tương tác hàng ngày, ngân hàng đề thi thử không giới hạn và sổ liên lạc điện tử cập nhật theo từng buổi học.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: HeartHandshake,
      title: "Đồng Hành Cá Nhân Hóa 1-Kèm-1",
      desc: "Đội ngũ cố vấn học thuật và trợ giảng chuyên trách theo sát tiến độ, bổ trợ kiến thức kịp thời cho từng học viên.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section className="py-20 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
            Giá Trị Khác Biệt
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
            Vì Sao Hơn 50.000 Học Viên Lựa Chọn AURA?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Chúng tôi kiến tạo môi trường học tập truyền cảm hứng, nơi mỗi học viên được trân trọng và bứt phá giới hạn bản thân.
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
