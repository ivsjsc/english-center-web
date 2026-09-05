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
    <div className="border border-border rounded-2xl overflow-hidden bg-white mb-3 shadow-sm transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-text-heading hover:text-primary-vibrant transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-vibrant"
      >
        <span className="text-base sm:text-lg">{title}</span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-text-muted transition-transform duration-200 shrink-0 ml-4",
            isOpen && "transform rotate-180 text-primary-vibrant"
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
