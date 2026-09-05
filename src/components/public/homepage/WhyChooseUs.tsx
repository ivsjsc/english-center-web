import React from "react";
import { Award, Brain, MessageSquare, Smartphone, Users, Building2 } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Award,
      title: "100% Giảng Viên Chuẩn Sư Phạm",
      description:
        "Đội ngũ giáo viên quốc tế & Việt Nam giàu năng lượng với chứng chỉ giảng dạy quốc tế TESOL, CELTA hoặc Thạc sĩ chuyên ngành được xác thực minh bạch.",
      iconColor: "text-primary",
      iconBg: "bg-primary-light",
    },
    {
      icon: Brain,
      title: "Lộ Trình Cá Nhân Hóa Toàn Diện",
      description:
        "Hệ thống Diagnostic phân tích chính xác điểm mạnh và lỗ hổng kiến thức ngữ pháp, từ vựng, phát âm để may đo bài tập bổ trợ riêng cho từng học viên.",
      iconColor: "text-primary-vibrant",
      iconBg: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "Kích Hoạt Phản Xạ Đa Chiều",
      description:
        "Phương pháp học Active Engagement kết hợp dự án nhóm thực tế, giúp học viên tự tin giao tiếp phản xạ tự nhiên mà không cần dịch thầm trong đầu.",
      iconColor: "text-growth-dark",
      iconBg: "bg-emerald-50",
    },
    {
      icon: Smartphone,
      title: "Hệ Sinh Thái CenterCare",
      description:
        "Nền tảng quản lý học tập thông minh số hóa toàn diện: điểm danh, nhận xét buổi học, luyện đề 24/7 và kho học liệu độc quyền.",
      iconColor: "text-primary",
      iconBg: "bg-primary-light",
    },
    {
      icon: Users,
      title: "Đồng Hành Sát Sao Phụ Huynh",
      description:
        "Báo cáo học tập số gửi sau mỗi buổi học. Cố vấn học tập (Academic Coach) luôn kề vai giải đáp thắc mắc và kèm cặp học viên kịp thời.",
      iconColor: "text-primary-vibrant",
      iconBg: "bg-blue-50",
    },
    {
      icon: Building2,
      title: "Cơ Sở Vật Chất Chuẩn Cambridge",
      description:
        "100% phòng học trang bị bảng tương tác thông minh, thư viện mở đa phương tiện và không gian an toàn, truyền cảm hứng học tập tối đa.",
      iconColor: "text-growth-dark",
      iconBg: "bg-emerald-50",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
            GIÁ TRỊ KHÁC BIỆT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
            Tại sao 75.000+ Phụ huynh & Học viên tin chọn IVS?
          </h2>
          <p className="text-sm sm:text-base text-text-default mt-2">
            Chúng tôi không chỉ dạy ngôn ngữ mà mở ra tư duy toàn cầu với chuẩn mực học thuật quốc tế cao nhất.
          </p>
        </div>

        {/* 6 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col text-left"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center mb-5 shrink-0`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-heading">
                  {pillar.title}
                </h3>
                <p className="text-sm text-text-default mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
