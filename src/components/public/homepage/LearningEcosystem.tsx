import React from "react";
import Image from "next/image";
import { Layers, Calendar, BarChart3, Mic2, BookOpen } from "lucide-react";

export function LearningEcosystem() {
  const features = [
    {
      icon: Calendar,
      title: "Lịch học & Điểm danh",
      description: "Thông báo lịch học, bù buổi linh hoạt, điểm danh tức thì trên ứng dụng.",
      iconColor: "text-accent-amber",
    },
    {
      icon: BarChart3,
      title: "Theo dõi kết quả 24/7",
      description: "Biểu đồ đánh giá kỹ năng 4 chiều chi tiết và nhận xét giáo viên sau từng buổi học.",
      iconColor: "text-growth",
    },
    {
      icon: Mic2,
      title: "AI Luyện Phát Âm",
      description: "Công nghệ AI nhận diện âm vị chuẩn Oxford, luyện phản xạ và chấm điểm tức thì.",
      iconColor: "text-accent-amber",
    },
    {
      icon: BookOpen,
      title: "Kho bài giảng số",
      description: "Hơn 10.000+ đề thi thử Cambridge, IELTS và tài liệu ôn luyện có đáp án chi tiết.",
      iconColor: "text-growth",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-primary-deep text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-vibrant rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-growth rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Col: Capabilities */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15">
              <Layers className="w-4 h-4 text-accent-amber" />
              <span className="text-xs uppercase font-bold tracking-wider">
                HỆ SINH THÁI CÔNG NGHỆ ĐỘC QUYỀN
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              CenterCare™ — Nền tảng số quản lý & đồng hành học tập toàn diện
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Kết nối thông minh giữa Nhà trường – Giáo viên – Học viên – Phụ huynh trên một hệ sinh thái đồng nhất. Tối ưu thời gian, theo dõi sát sao sự tiến bộ từng ngày.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 border border-white/15 p-4 rounded-xl backdrop-blur-sm flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2.5 font-bold text-sm text-white">
                      <IconComponent className={`w-5 h-5 ${feat.iconColor} shrink-0`} />
                      <span>{feat.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: App Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-white/5 p-4 sm:p-5 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                  alt="CenterCare EdTech Platform"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-primary-deep/90 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-left">
                  <div className="text-xs font-bold text-accent-amber uppercase tracking-wider">
                    Ứng Dụng CenterCare Mobile
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    Đã có mặt trên iOS App Store & Google Play
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
