import React from "react";
import Image from "next/image";

interface StudentAchievementsProps {
  achievements?: any[];
}

export function StudentAchievements({ achievements = [] }: StudentAchievementsProps) {
  const defaultAchievements = [
    {
      name: "Nguyễn Hoàng Minh",
      school: "Học sinh THPT Chuyên Hà Nội - Amsterdam",
      examType: "IELTS OVERALL",
      score: "8.5",
      scoreColor: "text-primary-deep",
      quote: "Khóa học IELTS Master đã giúp em tối ưu hóa từ vựng và bứt phá Writing từ 6.5 lên 8.0 chỉ sau 4 tháng!",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Lê Bảo Trâm",
      school: "Lớp 4, Tiểu học Lê Quý Đôn (TP.HCM)",
      examType: "CAMBRIDGE FLYERS",
      score: "15/15 Khiên",
      scoreColor: "text-growth-dark",
      quote: "Con rất thích giờ học của thầy Liam, lớp vui lắm nên con không còn sợ nói tiếng Anh nữa ạ!",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Trần Đình Khang",
      school: "Sinh viên ĐH Ngoại Thương",
      examType: "TOEIC LISTENING/READING",
      score: "965/990",
      scoreColor: "text-primary-deep",
      quote: "Bộ đề thi thử trên ứng dụng CenterCare sát với đề thi thật tới 95%, giúp em hoàn toàn làm chủ phòng thi.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Phạm Gia Huy",
      school: "Lớp 9, THCS Giảng Võ (Hà Nội)",
      examType: "IELTS JUNIOR",
      score: "8.0 Overall",
      scoreColor: "text-primary-vibrant",
      quote: "Đạt 8.0 từ năm 14 tuổi đã giúp em giành được học bổng du học toàn phần tại Singapore.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    },
  ];

  const displayAchievements = achievements.length >= 4
    ? achievements.slice(0, 4).map((a, idx) => ({
        name: a.studentName || defaultAchievements[idx].name,
        school: a.school || defaultAchievements[idx].school,
        examType: a.examType || defaultAchievements[idx].examType,
        score: a.score || defaultAchievements[idx].score,
        scoreColor: defaultAchievements[idx].scoreColor,
        quote: a.testimonial || defaultAchievements[idx].quote,
        avatarUrl: a.studentAvatar || defaultAchievements[idx].avatarUrl,
      }))
    : defaultAchievements;

  return (
    <section className="w-full py-16 lg:py-24 bg-surface-subtle border-y border-border/50" id="thanh-tich-hoc-vien">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
            BẢNG VÀNG DANH DỰ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
            Thành tích vượt trội của học viên IVS Academy
          </h2>
          <p className="text-sm sm:text-base text-text-default mt-2">
            Mỗi điểm số ấn tượng là một câu chuyện nỗ lực, niềm tự hào của học viên và sự đồng hành bền bỉ từ thầy cô.
          </p>
        </div>

        {/* 4 Honor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {displayAchievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Student Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={item.avatarUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-heading line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-1">
                      {item.school}
                    </p>
                  </div>
                </div>

                {/* Score Banner Pill */}
                <div className="bg-surface-subtle border border-slate-100 p-3 rounded-xl mb-3 flex items-center justify-between">
                  <span className="text-xs text-text-default uppercase font-bold tracking-wider">
                    {item.examType}
                  </span>
                  <span className={`text-xl font-black ${item.scoreColor}`}>
                    {item.score}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-text-default italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
