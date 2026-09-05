import React from "react";
import { Users, GraduationCap, Building2, Trophy } from "lucide-react";

export function TrustMetrics() {
  const metrics = [
    {
      icon: Users,
      value: "50,000+",
      label: "Học Viên Đã Tốt Nghiệp",
      desc: "Tự tin sử dụng tiếng Anh toàn cầu",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Trophy,
      value: "5,200+",
      label: "IELTS 7.0 - 8.5+",
      desc: "Và hàng ngàn chứng chỉ Cambridge tuyệt đối",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: GraduationCap,
      value: "100%",
      label: "Giảng Viên Đạt Chuẩn",
      desc: "Bằng cấp quốc tế TESOL, CELTA, DELTA",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Building2,
      value: "4+ Cơ Sở",
      label: "Quy Mô Chuẩn Quốc Tế",
      desc: "Tại các vị trí trung tâm TP.HCM, Hà Nội, Đà Nẵng",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50/80 transition-colors text-left"
            >
              <div className={`p-3.5 rounded-2xl ${m.bg} ${m.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
                  {m.value}
                </div>
                <div className="font-bold text-sm text-slate-800 mt-0.5">
                  {m.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                  {m.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
