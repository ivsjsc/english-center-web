"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, ExternalLink, Copy, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CenterItem {
  id: string;
  slug: string;
  name: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  GoogleMapsURL: string;
  openingHours: string;
}

interface CenterFinderSectionProps {
  centers: CenterItem[];
}

export function CenterFinderSection({ centers }: CenterFinderSectionProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const provinces = Array.from(new Set(centers.map((c) => c.province)));

  const filteredCenters =
    selectedProvince === "all"
      ? centers
      : centers.filter((c) => c.province === selectedProvince);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-20 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
              Mạng Lưới Toàn Quốc
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-3">
              Tìm Cơ Sở AURA Gần Bạn Nhất
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Hệ thống các cơ sở hiện đại tọa lạc tại các vị trí đắc địa, thuận tiện giao thông và đưa đón học sinh.
            </p>
          </div>

          {/* Province Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedProvince("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                selectedProvince === "all"
                  ? "bg-brand-navy text-white"
                  : "bg-surface-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Tất cả tỉnh thành
            </button>
            {provinces.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProvince(p)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                  selectedProvince === p
                    ? "bg-brand-navy text-white"
                    : "bg-surface-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Center Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="bg-surface-50 rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-600">
                  <MapPin className="w-4 h-4 text-accent-amber" />
                  <span>
                    {center.district}, {center.province}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-brand-navy leading-snug">
                  <Link href={`/centers/${center.slug}`}>{center.name}</Link>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {center.address}
                </p>

                <div className="text-[11px] text-slate-500 pt-1">
                  Giờ mở cửa: {center.openingHours}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${center.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>Gọi điện</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyAddress(center.id, center.address)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    {copiedId === center.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={center.GoogleMapsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-sapphire transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-accent-amber" />
                  <span>Chỉ đường trên Google Maps</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/centers">
            <Button variant="outline" size="sm">
              <span>Xem Bản Đồ & Toàn Bộ Hệ Thống Cơ Sở</span>
              &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
