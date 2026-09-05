import React from "react";

export function TrustMetrics() {
  const metrics = [
    {
      value: "75.000+",
      label: "Học viên tin chọn",
      subtext: "Đã & đang theo học",
      valueColor: "text-primary-deep",
    },
    {
      value: "100%",
      label: "Chuẩn Quốc Tế",
      subtext: "TESOL / CELTA",
      valueColor: "text-primary-vibrant",
    },
    {
      value: "35+",
      label: "Cơ sở hiện đại",
      subtext: "Tại các TP trọng điểm",
      valueColor: "text-primary-deep",
    },
    {
      value: "15+",
      label: "Năm uy tín",
      subtext: "Kinh nghiệm đào tạo",
      valueColor: "text-primary-vibrant",
    },
    {
      value: "98.6%",
      label: "Đạt cam kết đầu ra",
      subtext: "IELTS 6.5+ & Cambridge",
      valueColor: "text-growth-dark",
      colSpan: "col-span-2 md:col-span-1",
    },
  ];

  return (
    <section className="w-full bg-surface py-8 sm:py-12 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white p-4 sm:p-5 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all flex flex-col items-center text-center ${
                item.colSpan || ""
              }`}
            >
              <span className={`text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-tight ${item.valueColor}`}>
                {item.value}
              </span>
              <span className="text-sm font-bold text-text-heading mt-1.5">
                {item.label}
              </span>
              <span className="text-xs text-text-muted mt-0.5">
                {item.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
