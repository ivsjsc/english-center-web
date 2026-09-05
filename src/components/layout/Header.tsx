"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Menu, X, ChevronDown, GraduationCap, Sparkles, ExternalLink, Award } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* 1. Slim Utility Ecosystem Bar */}
      <div className="bg-primary-deep text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-accent-amber text-slate-900 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
              IVS Academy
            </span>
            <span className="text-slate-200">
              Hệ thống Anh ngữ Quốc tế — Tiêu chuẩn khảo thí Cambridge & IELTS
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-300">
            <Link
              href="/centers"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-accent-amber" />
              <span>Hệ thống Cơ sở</span>
            </Link>
            <a
              href="tel:1900xxxx"
              className="flex items-center gap-1.5 font-semibold text-accent-amber hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: 1900 xxxx</span>
            </a>
            <a
              href="https://ivstech.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors pl-2 border-l border-white/20"
              title="Hệ sinh thái công nghệ IVS Tech"
            >
              <span>IVS Tech</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition-colors pl-2 border-l border-white/20"
            >
              Cổng Nội Bộ
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-primary-deep flex items-center justify-center text-white font-black text-xl shadow-sm">
              <Image
                src="/images/brand/ivs-academy-icon-reference.png"
                alt="IVS Academy Icon"
                width={40}
                height={40}
                className="object-contain"
                onError={(e) => {
                  // Fallback if image load fails
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
              <span className="sr-only">IVS Academy</span>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-xl tracking-tight text-primary-deep group-hover:text-primary transition-colors leading-tight">
                IVS <span className="text-primary-vibrant font-bold">ACADEMY</span>
              </div>
              <div className="text-[10px] font-semibold tracking-wider text-text-muted uppercase flex items-center gap-1">
                <span>International Education</span>
              </div>
            </div>
          </Link>

          {/* Learner-First Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-text-default">
            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <Link
                href="/courses"
                className={`flex items-center gap-1 py-2 transition-colors ${
                  courseDropdownOpen ? "text-primary font-bold" : "hover:text-primary"
                }`}
              >
                <span>Khóa học</span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </Link>

              {courseDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-border p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/courses"
                    className="p-3 rounded-xl bg-primary-light hover:bg-blue-100 transition-colors flex items-start gap-3 text-left"
                  >
                    <div className="p-2 rounded-lg bg-primary text-white">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-text-heading font-bold text-sm">Tất Cả Khóa Học</div>
                      <div className="text-text-muted text-xs mt-0.5">Lộ trình đào tạo toàn diện 4-18+</div>
                    </div>
                  </Link>

                  <Link
                    href="/courses#smartkids-mam-non"
                    className="p-2.5 rounded-xl hover:bg-surface-subtle transition-colors text-left"
                  >
                    <div className="text-text-heading font-semibold text-sm">SmartKids Mầm Non (4-6T)</div>
                    <div className="text-text-muted text-xs">Phản xạ ngữ âm Phonics tự nhiên</div>
                  </Link>

                  <Link
                    href="/courses#superkids-tieu-hoc"
                    className="p-2.5 rounded-xl hover:bg-surface-subtle transition-colors text-left"
                  >
                    <div className="text-text-heading font-semibold text-sm">SuperKids Tiểu Học (6-11T)</div>
                    <div className="text-text-muted text-xs">Chinh phục Cambridge Starters, Flyers</div>
                  </Link>

                  <Link
                    href="/courses#young-leaders-thcs"
                    className="p-2.5 rounded-xl hover:bg-surface-subtle transition-colors text-left"
                  >
                    <div className="text-text-heading font-semibold text-sm">Young Leaders THCS (11-15T)</div>
                    <div className="text-text-muted text-xs">Tư duy phản biện & Pre-IELTS</div>
                  </Link>

                  <Link
                    href="/courses#ielts-master"
                    className="p-2.5 rounded-xl hover:bg-surface-subtle transition-colors text-left"
                  >
                    <div className="text-text-heading font-semibold text-sm">IELTS Master Chuyên Sâu</div>
                    <div className="text-text-muted text-xs">Cam kết mục tiêu đầu ra 6.5 - 8.0+</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/methodology" className="hover:text-primary transition-colors">
              Phương pháp học
            </Link>
            <Link href="/teachers" className="hover:text-primary transition-colors">
              Đội ngũ giáo viên
            </Link>
            <Link href="/student-achievements" className="hover:text-primary transition-colors">
              Thành tích học viên
            </Link>
            <Link href="/centers" className="hover:text-primary transition-colors">
              Hệ thống cơ sở
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Tin tức & Blog
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              Giới thiệu
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link href="/placement-test">
              <Button variant="outline" size="sm">
                Kiểm tra trình độ
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenConsultation}
            >
              Đăng ký tư vấn
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-text-heading hover:bg-slate-100 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[80px] bottom-0 bg-white z-50 overflow-y-auto p-6 flex flex-col justify-between border-t border-border animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            {/* Mobile Courses Accordion */}
            <div className="pb-4 border-b border-border">
              <button
                type="button"
                onClick={() => setMobileCourseOpen(!mobileCourseOpen)}
                className="w-full flex items-center justify-between text-base font-bold text-text-heading py-2"
              >
                <span>Chương trình đào tạo</span>
                <ChevronDown
                  className={`w-5 h-5 text-text-muted transition-transform ${
                    mobileCourseOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {mobileCourseOpen && (
                <div className="mt-2 pl-3 space-y-2 text-sm text-text-default border-l-2 border-primary-light">
                  <Link
                    href="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-bold text-primary py-1"
                  >
                    Tất Cả Khóa Học
                  </Link>
                  <Link
                    href="/courses#smartkids-mam-non"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    • Tiếng Anh Mầm Non (4-6T)
                  </Link>
                  <Link
                    href="/courses#superkids-tieu-hoc"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    • Tiếng Anh Tiểu Học (6-11T)
                  </Link>
                  <Link
                    href="/courses#young-leaders-thcs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    • Tiếng Anh THCS (11-15T)
                  </Link>
                  <Link
                    href="/courses#ielts-master"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    • Luyện Thi IELTS Chuyên Sâu
                  </Link>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            <div className="grid gap-2 text-base font-semibold text-text-heading">
              <Link
                href="/methodology"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-primary"
              >
                Phương pháp học
              </Link>
              <Link
                href="/teachers"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-primary"
              >
                Đội ngũ giáo viên
              </Link>
              <Link
                href="/student-achievements"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-primary"
              >
                Thành tích học viên
              </Link>
              <Link
                href="/centers"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-primary"
              >
                Hệ thống cơ sở
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-primary"
              >
                Tin tức & Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-primary"
              >
                Giới thiệu
              </Link>
            </div>

            {/* Ecosystem Bridge */}
            <div className="pt-4 border-t border-border">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
                Hệ Sinh Thái IVS JSC
              </span>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <a
                  href="https://ivstech.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center gap-1"
                >
                  <span>IVS Tech</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-primary"
                >
                  Cổng Nội Bộ
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Action Buttons */}
          <div className="pt-6 border-t border-border space-y-3">
            <Link
              href="/placement-test"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block"
            >
              <Button variant="outline" className="w-full">
                Kiểm tra trình độ miễn phí
              </Button>
            </Link>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) onOpenConsultation();
              }}
            >
              Đăng ký tư vấn ngay
            </Button>
            <div className="text-center pt-1">
              <a
                href="tel:1900xxxx"
                className="text-sm font-bold text-primary-deep flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent-amber" />
                <span>Hotline: 1900 xxxx (08:00 - 21:30)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
