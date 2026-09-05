"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white mb-3 shadow-sm transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-slate-900 hover:text-brand-600 transition-colors focus:outline-none"
      >
        <span className="text-base sm:text-lg">{title}</span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-4",
            isOpen && "transform rotate-180 text-brand-600"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base border-t border-slate-100 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="w-full space-y-1">{children}</div>;
}
