import React from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { isSampleDeployment } from "@/lib/deployment";

export interface CenterCardProps {
  name: string;
  address: string;
  phone?: string;
  openingHours?: string;
  statusText?: string;
  roomCountText?: string;
  mapUrl?: string;
  isSample?: boolean;
}

export function CenterCard({
  name,
  address,
  phone = "1900 xxxx",
  openingHours = "08:00 - 21:30 (Thứ 2 - Chủ Nhật)",
  statusText = "Đang mở cửa",
  roomCountText = "Cơ sở tiêu chuẩn quốc tế",
  mapUrl,
  isSample: isSampleProp,
}: CenterCardProps) {
  const isSample = isSampleProp ?? isSampleDeployment();
  const googleMapSearchUrl =
    mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + address)}`;

  return (
    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-base font-bold text-primary group-hover:text-primary-vibrant transition-colors line-clamp-1">
            {name}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-growth-dark text-xs font-semibold border border-emerald-200 shrink-0">
            {statusText}
          </span>
        </div>

        <div className="space-y-2 text-sm text-text-default">
          <p className="flex items-start gap-2.5 leading-relaxed">
            <MapPin className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
            <span className="line-clamp-2">{address}</span>
          </p>

          <p className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-text-muted shrink-0" />
            {isSample ? (
              <span className="text-text-muted text-xs">{phone}</span>
            ) : (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="text-text-default hover:text-primary font-medium transition-colors"
              >
                {phone}
              </a>
            )}
          </p>

          <p className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-text-muted shrink-0" />
            <span className="text-xs text-text-muted">{openingHours}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted truncate">
          {roomCountText}
        </span>
        {/* In sample mode: do NOT render Google Maps directions to invented addresses */}
        {!isSample && (
          <a
            href={googleMapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-vibrant hover:underline shrink-0"
          >
            <span>Chỉ đường</span>
            <Navigation className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
