"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  ExternalLink,
  Copy,
  Check,
  Search,
  Building2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CenterImage {
  id: string;
  imageUrl: string;
  caption: string | null;
}

interface CenterItem {
  id: string;
  slug: string;
  name: string;
  province: string;
  district: string;
  ward: string | null;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  description: string;
  facilities: string;
  GoogleMapsURL: string;
  latitude: number | null;
  longitude: number | null;
  images: CenterImage[];
}

export function CentersClientView({
  initialCenters,
}: {
  initialCenters: CenterItem[];
}) {
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCenterId, setActiveCenterId] = useState<string>(
    initialCenters[0]?.id || ""
  );

  // Available provinces
  const provinces = useMemo(() => {
    return Array.from(new Set(initialCenters.map((c) => c.province)));
  }, [initialCenters]);

  // Available districts for chosen province
  const districts = useMemo(() => {
    const pool =
      selectedProvince === "all"
        ? initialCenters
        : initialCenters.filter((c) => c.province === selectedProvince);
    return Array.from(new Set(pool.map((c) => c.district)));
  }, [initialCenters, selectedProvince]);

  // Filtered centers
  const filteredCenters = useMemo(() => {
    return initialCenters.filter((c) => {
      const matchProv =
        selectedProvince === "all" || c.province === selectedProvince;
      const matchDist =
        selectedDistrict === "all" || c.district === selectedDistrict;
      const matchSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchProv && matchDist && matchSearch;
    });
  }, [initialCenters, selectedProvince, selectedDistrict, searchQuery]);

  const activeCenter =
    filteredCenters.find((c) => c.id === activeCenterId) ||
    filteredCenters[0] ||
    initialCenters[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Tìm kiếm cơ sở
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Nhập tên đường, quận, tên cơ sở..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        {/* Province Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Tỉnh / Thành phố
          </label>
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict("all");
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
          >
            <option value="all">Tất cả tỉnh thành</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Quận / Huyện
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none min-h-[44px]"
          >
            <option value="all">Tất cả quận huyện</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Responsive Layout: Split on desktop, list on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Centers List (Mobile & Desktop) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Tìm thấy {filteredCenters.length} cơ sở</span>
            <span>Chạm để xem chi tiết bản đồ</span>
          </div>

          {filteredCenters.map((center) => {
            const isSelected = activeCenter?.id === center.id;
            return (
              <div
                key={center.id}
                onClick={() => setActiveCenterId(center.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? "bg-brand-50/50 border-brand-500 shadow-md ring-2 ring-brand-500/20"
                    : "bg-white border-slate-200/80 hover:border-brand-200 shadow-sm"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wide flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {center.district}, {center.province}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-extrabold bg-brand-600 text-white px-2 py-0.5 rounded-full">
                        Đang chọn
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-brand-navy">
                    {center.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {center.address}
                  </p>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{center.openingHours}</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${center.phone.replace(/\s+/g, "")}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-brand-100 hover:text-brand-700 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-600" />
                      <span>{center.phone}</span>
                    </a>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(center.id, center.address);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      {copiedId === center.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép địa chỉ</span>
                        </>
                      )}
                    </button>

                    <a
                      href={center.GoogleMapsURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-sapphire transition-colors ml-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-accent-amber" />
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Map Preview & Campus Details (Sticky Desktop) */}
        {activeCenter && (
          <div className="lg:col-span-6 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card text-left space-y-6">
              {/* Cover Photo */}
              {activeCenter.images && activeCenter.images.length > 0 && (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={activeCenter.images[0].imageUrl}
                    alt={activeCenter.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute top-3 left-3 bg-brand-navy/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {activeCenter.name}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-brand-600 uppercase">
                  {activeCenter.province}
                </span>
                <h2 className="text-2xl font-black text-brand-navy mt-1">
                  {activeCenter.name}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {activeCenter.description}
                </p>
              </div>

              {/* Facilities / Amenities */}
              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-2">
                  Tiện ích & Cơ sở vật chất nổi bật:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCenter.facilities.split(",").map((fac, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      ✓ {fac.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map Direction CTA Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Chỉ đường trực tiếp tới cơ sở</span>
                </div>
                <div className="text-xs text-amber-800">
                  {activeCenter.address}
                </div>
                <div className="pt-2">
                  <a
                    href={activeCenter.GoogleMapsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-navy bg-white px-4 py-2 rounded-xl border border-amber-200 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-accent-amber" />
                    <span>Mở ứng dụng Google Maps chỉ đường</span>
                  </a>
                </div>
              </div>

              {/* Direct Details Link */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <Link
                  href={`/centers/${activeCenter.slug}`}
                  className="text-sm font-bold text-brand-600 hover:underline"
                >
                  Xem trang chi tiết cơ sở &rarr;
                </Link>

                <a href={`tel:${activeCenter.phone.replace(/\s+/g, "")}`}>
                  <Button variant="accent" size="sm">
                    Gọi hotline cơ sở
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
