import React from "react";
import Image from "next/image";
import { MonitorPlay, Smartphone, BookOpen, Compass } from "lucide-react";

export function LearningEcosystem() {
  const pillars = [
    {
      icon: MonitorPlay,
      title: "Lớp Học Tương Tác Công Nghệ Cao",
      desc: "Trang bị màn hình cảm ứng SmartScreen 85 inch và hệ thống âm thanh vòm chuẩn rạp giúp học viên đắm chìm trong ngữ cảnh bản xứ.",
    },
    {
      icon: Smartphone,
      title: "Ứng Dụng AURA SmartLMS Trợ Lý AI",
      desc: "Học mọi lúc mọi nơi: Luyện phát âm nhận diện giọng nói AI, làm bài tập tương tác và theo dõi biểu đồ tiến độ học tập 24/7.",
    },
    {
      icon: BookOpen,
      title: "Thư Viện Mở & Trung Tâm Thi Thử",
      desc: "Không gian tự học yên tĩnh với hơn 10.000 đầu sách tiếng Anh, cùng phòng máy tính mô phỏng kỳ thi IELTS và Cambridge thật.",
    },
    {
      icon: Compass,
      title: "CLB Hùng Biện & Trại Hè Quốc Tế",
      desc: "Môi trường ngoại khóa đa dạng cuối tuần, phát triển kỹ năng sinh tồn, dã ngoại và giao lưu kết nối bạn bè quốc tế.",
    },
  ];

  return (
    <section className="py-20 bg-surface-50 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
            Hệ Sinh Thái Toàn Diện
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
            Học Mọi Lúc, Mọi Nơi Cùng Hệ Sinh Thái AURA 360°
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Sự kết hợp hoàn hảo giữa lớp học trực tiếp đầy cảm hứng và nền tảng kỹ thuật số thông minh hỗ trợ tối đa việc tự học tại nhà.
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
