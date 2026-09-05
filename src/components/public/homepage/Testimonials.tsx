import React from "react";
import { Star } from "lucide-react";

interface TestimonialsProps {
  testimonials?: any[];
}

export function Testimonials({ testimonials = [] }: TestimonialsProps) {
  const defaultTestimonials = [
    {
      name: "Chị Nguyễn Thu Thủy",
      role: "Phụ huynh bé Tuấn Kiệt (5 tuổi)",
      initials: "NT",
      initialsBg: "bg-primary-light text-primary",
      rating: 5,
      content:
        "Bé nhà mình trước đây rất nhút nhát và sợ nói tiếng Anh. Sau 6 tháng học khóa SmartKids tại IVS, bé tự tin giao tiếp, phát âm chuẩn tự nhiên và đặc biệt rất hào hứng mỗi khi đến giờ đến lớp.",
    },
    {
      name: "Anh Hoàng Tuấn Anh",
      role: "Học viên IELTS Master 8.0",
      initials: "HA",
      initialsBg: "bg-blue-100 text-primary-vibrant",
      rating: 5,
      content:
        "Phương pháp chấm chữa bài chi tiết 1-1 tại IVS đã cứu vãn điểm Writing của tôi. Thầy cô không chỉ sửa lỗi ngữ pháp mà còn định hình lại toàn bộ tư duy lập luận logic chuẩn đề thi quốc tế.",
    },
    {
      name: "Anh Đặng Văn Long",
      role: "Phụ huynh bé Khánh An (Lớp 7, TP.HCM)",
      initials: "DL",
      initialsBg: "bg-emerald-100 text-growth-dark",
      rating: 5,
      content:
        "Là phụ huynh bận rộn, tôi cực kỳ thích ứng dụng CenterCare của trung tâm. Điểm danh, nhận xét của giáo viên, bài tập về nhà của con đều được cập nhật tức thì trên điện thoại rất minh bạch.",
    },
  ];

  const displayTestimonials = testimonials.length >= 3
    ? testimonials.slice(0, 3).map((t, idx) => ({
        name: t.authorName || defaultTestimonials[idx].name,
        role: t.authorRole || defaultTestimonials[idx].role,
        initials: (t.authorName || defaultTestimonials[idx].name).split(" ").map((n: string) => n[0]).slice(-2).join(""),
        initialsBg: defaultTestimonials[idx].initialsBg,
        rating: t.rating || 5,
        content: t.content || defaultTestimonials[idx].content,
      }))
    : defaultTestimonials;

  return (
    <section className="w-full py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
            LẮNG NGHE CHIA SẺ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
            Phụ huynh & Học viên nói gì về chúng tôi?
          </h2>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {displayTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-accent-amber mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-amber" />
                  ))}
                </div>

                <p className="text-sm text-text-default leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${item.initialsBg} flex items-center justify-center font-bold text-sm shrink-0`}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-heading">
                    {item.name}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
