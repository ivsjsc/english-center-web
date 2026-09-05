"use client";

import React, { useState } from "react";
import { CenterCard } from "@/components/public/CenterCard";

interface CenterFinderSectionProps {
  centers?: any[];
}

export function CenterFinderSection({ centers = [] }: CenterFinderSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const defaultCenters = [
    {
      name: "Cơ sở Cầu Giấy (Hà Nội)",
      address: "Tòa nhà IVS Tower, 128 Trần Thái Tông, Cầu Giấy, Hà Nội",
      province: "Hà Nội",
      phone: "024 7300 xxxx",
      openingHours: "08:00 - 21:30 (Thứ 2 - Chủ Nhật)",
      roomCountText: "Quy mô 18 phòng học chuẩn",
      statusText: "Đang mở cửa",
    },
    {
      name: "Cơ sở Quận 1 (TP.HCM)",
      address: "86 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
      province: "Hồ Chí Minh",
      phone: "028 7300 xxxx",
      openingHours: "08:00 - 21:30 (Thứ 2 - Chủ Nhật)",
      roomCountText: "Quy mô 22 phòng học chuẩn",
      statusText: "Đang mở cửa",
    },
    {
      name: "Cơ sở Hải Châu (Đà Nẵng)",
      address: "154 Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng",
      province: "Đà Nẵng",
      phone: "0236 7300 xxxx",
      openingHours: "08:00 - 21:30 (Thứ 2 - Chủ Nhật)",
      roomCountText: "Quy mô 15 phòng học chuẩn",
      statusText: "Đang mở cửa",
    },
  ];

  const displayCenters = centers.length >= 3
    ? centers.map((c) => ({
        name: c.name,
        address: c.address,
        province: c.province,
        phone: c.phone || "1900 xxxx",
        openingHours: c.operatingHours || "08:00 - 21:30 (Thứ 2 - Chủ Nhật)",
        roomCountText: "Cơ sở chuẩn quốc tế",
        statusText: "Đang mở cửa",
      }))
    : defaultCenters;

  const filteredCenters = selectedCity === "all"
    ? displayCenters
    : displayCenters.filter((c) =>
        c.province?.toLowerCase().includes(selectedCity.toLowerCase())
      );

  const cityTabs = [
    { id: "all", label: "Tất cả (35+)" },
    { id: "Hà Nội", label: "Hà Nội (12)" },
    { id: "Hồ Chí Minh", label: "TP. Hồ Chí Minh (15)" },
    { id: "Đà Nẵng", label: "Đà Nẵng (4)" },
    { id: "Cần Thơ", label: "Cần Thơ (4)" },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-surface" id="he-thong-co-so">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
            MẠNG LƯỚI TOÀN QUỐC
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
            Hệ thống 35+ Cơ sở chuẩn Cambridge
          </h2>
          <p className="text-sm sm:text-base text-text-default mt-2">
            Dễ dàng lựa chọn cơ sở gần nhất với vị trí của bạn để thuận tiện đưa đón và học tập.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {cityTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCity(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[40px] ${
                selectedCity === tab.id
                  ? "bg-primary-deep text-white shadow-sm"
                  : "bg-surface-subtle text-text-default hover:bg-slate-200/70 border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Campus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredCenters.slice(0, 3).map((center, idx) => (
            <CenterCard
              key={idx}
              name={center.name}
              address={center.address}
              phone={center.phone}
              openingHours={center.openingHours}
              roomCountText={center.roomCountText}
              statusText={center.statusText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
