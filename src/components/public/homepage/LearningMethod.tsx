import React from "react";
import { ClipboardCheck, Users, Mic, LineChart } from "lucide-react";

export function LearningMethod() {
  const steps = [
    {
      number: "01",
      icon: ClipboardCheck,
      title: "Đánh Giá & Khám Phá",
      description:
        "Kiểm tra năng lực 4 kỹ năng chuẩn CEFR và phỏng vấn trực tiếp 1-1 với giám khảo để xác định chính xác trình độ khởi đầu.",
      badgeBg: "bg-primary-light text-primary",
      iconColor: "text-primary",
    },
    {
      number: "02",
      icon: Users,
      title: "Học Chủ Động & Dự Án",
      description:
        "Tiếp cận ngữ cảnh bài giảng đa phương tiện, tranh luận nhóm và hoàn thành mini-projects để phát triển tư duy giải quyết vấn đề.",
      badgeBg: "bg-blue-100 text-primary-vibrant",
      iconColor: "text-primary-vibrant",
    },
    {
      number: "03",
      icon: Mic,
      title: "Phản Xạ Đời Thường",
      description:
        "Thực hành mô phỏng các tình huống thực tế (thuyết trình, phỏng vấn, đàm phán) giúp ghi nhớ từ vựng và cấu trúc vĩnh viễn.",
      badgeBg: "bg-amber-100 text-amber-800",
      iconColor: "text-accent-amber-hover",
    },
    {
      number: "04",
      icon: LineChart,
      title: "Đo Lường & Cải Tiến",
      description:
        "Đánh giá tiến độ sau mỗi 12 buổi học qua hệ thống CenterCare Dashboard và tinh chỉnh lộ trình mục tiêu tiếp theo.",
      badgeBg: "bg-emerald-100 text-growth-dark",
      iconColor: "text-growth-dark",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-surface-subtle border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
            QUY CHUẨN ĐÀO TẠO
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
            Phương pháp học tập 4 bước chuẩn CEFR
          </h2>
          <p className="text-sm sm:text-base text-text-default mt-2">
            Chu trình khép kín giúp học viên bứt phá phản xạ ngôn ngữ và hấp thu kiến thức bền vững.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative text-left">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`w-11 h-11 rounded-full ${step.badgeBg} text-lg font-black flex items-center justify-center`}
                    >
                      {step.number}
                    </span>
                    <IconComponent className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-text-heading">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-default mt-2 leading-relaxed">
                    {step.description}
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
