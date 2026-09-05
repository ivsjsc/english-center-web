"use client";

import React from "react";
import { Phone, MessageCircle, Send } from "lucide-react";

interface StickyLeadBarProps {
  onOpenConsultation: () => void;
}

export function StickyLeadBar({ onOpenConsultation }: StickyLeadBarProps) {
  return (
    <aside
      aria-label="Thanh tư vấn nhanh"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2"
    >
      <a
        href="tel:19006886"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs min-h-[44px] active:bg-slate-200"
        aria-label="Gọi ngay tổng đài 1900 6886"
      >
        <Phone className="w-4 h-4 text-brand-600" />
        <span>Gọi 1900 6886</span>
      </a>

      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs min-h-[44px] border border-blue-200/60 active:bg-blue-100"
        aria-label="Chat qua Zalo"
      >
        <MessageCircle className="w-4 h-4 text-blue-600" />
        <span>Chat Zalo</span>
      </a>

      <button
        type="button"
        onClick={onOpenConsultation}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-accent-amber text-brand-navy font-bold text-xs min-h-[44px] shadow-sm active:bg-accent-gold"
        aria-label="Đăng ký nhận tư vấn"
      >
        <Send className="w-4 h-4" />
        <span>Nhận Ưu Đãi</span>
      </button>
    </aside>
  );
}
