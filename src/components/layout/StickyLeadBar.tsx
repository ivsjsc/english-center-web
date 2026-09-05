"use client";

import React from "react";
import { Phone, MessageCircle, Sparkles } from "lucide-react";

interface StickyLeadBarProps {
  onOpenConsultation: () => void;
}

export function StickyLeadBar({ onOpenConsultation }: StickyLeadBarProps) {
  return (
    <aside
      aria-label="Thanh tương tác nhanh di động"
      className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-border p-2.5 shadow-2xl flex items-center gap-2"
    >
      <a
        href="tel:1900xxxx"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 text-text-heading font-bold text-xs min-h-[44px] active:bg-slate-200 transition-colors"
        aria-label="Gọi tổng đài tư vấn"
      >
        <Phone className="w-4 h-4 text-primary shrink-0" />
        <span>Gọi ngay</span>
      </a>

      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-blue-50 text-primary-vibrant font-bold text-xs min-h-[44px] border border-blue-200/60 active:bg-blue-100 transition-colors"
        aria-label="Nhắn tin qua Zalo"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>Chat Zalo</span>
      </a>

      <button
        type="button"
        onClick={onOpenConsultation}
        className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary-deep text-white font-bold text-xs min-h-[44px] shadow-sm active:bg-primary transition-colors"
        aria-label="Đăng ký tư vấn lộ trình"
      >
        <Sparkles className="w-4 h-4 text-accent-amber shrink-0" />
        <span>Đăng ký tư vấn</span>
      </button>
    </aside>
  );
}
