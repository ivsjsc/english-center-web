"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MapPin, Menu, X, ChevronDown, GraduationCap, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Banner Notice & Hotline */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-accent-amber text-brand-navy font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
              Thông Báo Mới
            </span>
            <span className="text-slate-200">
              Ưu đãi năm học mới: Nhận ngay học bổng 25% + Bộ quà nhập học độc quyền!
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-300">
            <Link
              href="/centers"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-accent-amber" />
              <span>Hệ thống 4+ Cơ sở</span>
            </Link>
            <a
              href="tel:19006886"
              className="flex items-center gap-1.5 font-semibold text-accent-amber hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: 1900 6886</span>
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

      {/* Main Navbar */}
      <div className="glass-header border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-navy to-brand-600 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-brand-navy group-hover:text-brand-600 transition-colors">
                AURA <span className="text-brand-600 font-medium">ACADEMY</span>
              </div>
              <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Chuẩn Kiểm Định NEAS
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <div
              className="relative"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <Link
                href="/courses"
                className="flex items-center gap-1 py-2 hover:text-brand-600 transition-colors"
              >
                <span>Khóa Học</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>

              {courseDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/courses"
                    className="p-3 rounded-xl hover:bg-brand-50 transition-colors flex items-start gap-3 text-left"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-brand-600">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold text-sm">Tất Cả Khóa Học</div>
                      <div className="text-slate-500 text-xs mt-0.5">Khám phá lộ trình từ 4-60 tuổi</div>
                    </div>
                  </Link>
                  <Link
                    href="/courses?category=smartkids-mam-non"
                    className="p-2.5 rounded-xl hover:bg-brand-50 transition-colors text-left"
                  >
                    <div className="text-slate-900 font-semibold text-sm">Tiếng Anh Mầm Non (4-6T)</div>
                    <div className="text-slate-500 text-xs">Phương pháp Phonics chuẩn Cambridge</div>
                  </Link>
                  <Link
                    href="/courses?category=superkids-tieu-hoc"
                    className="p-2.5 rounded-xl hover:bg-brand-50 transition-colors text-left"
                  >
                    <div className="text-slate-900 font-semibold text-sm">Tiếng Anh Tiểu Học (6-11T)</div>
                    <div className="text-slate-500 text-xs">Luyện thi Starters, Movers, Flyers</div>
                  </Link>
                  <Link
                    href="/courses?category=ielts-chuyen-sau"
                    className="p-2.5 rounded-xl hover:bg-brand-50 transition-colors text-left"
                  >
                    <div className="text-slate-900 font-semibold text-sm">Luyện Thi IELTS Chuyên Sâu</div>
                    <div className="text-slate-500 text-xs">Cam kết đầu ra 6.5 - 8.0+ bằng văn bản</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/centers" className="hover:text-brand-600 transition-colors">
              Hệ Thống Cơ Sở
            </Link>
            <Link href="/methodology" className="hover:text-brand-600 transition-colors">
              Phương Pháp
            </Link>
            <Link href="/teachers" className="hover:text-brand-600 transition-colors">
              Đội Ngũ Giảng Viên
            </Link>
            <Link href="/student-achievements" className="hover:text-brand-600 transition-colors">
              Bảng Vàng
            </Link>
            <Link href="/blog" className="hover:text-brand-600 transition-colors">
              Cẩm Nang
            </Link>
            <Link href="/contact" className="hover:text-brand-600 transition-colors">
              Liên Hệ
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/placement-test">
              <Button variant="outline" size="sm">
                Thi Xếp Lớp
              </Button>
            </Link>
            <Button
              variant="accent"
              size="sm"
              onClick={onOpenConsultation}
            >
              Đăng Ký Tư Vấn
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[80px] bottom-0 bg-white z-50 overflow-y-auto p-6 flex flex-col justify-between border-t border-slate-100 animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Khóa học tiêu biểu
              </span>
              <div className="mt-2 grid gap-2">
                <Link
                  href="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-bold text-brand-navy py-2 text-base hover:text-brand-600"
                >
                  Tất Cả Khóa Học & Lộ Trình
                </Link>
                <Link
                  href="/courses?category=smartkids-mam-non"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-600 py-1.5 text-sm"
                >
                  • Tiếng Anh Mầm Non (4-6T)
                </Link>
                <Link
                  href="/courses?category=superkids-tieu-hoc"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-600 py-1.5 text-sm"
                >
                  • Tiếng Anh Tiểu Học Cambridge (6-11T)
                </Link>
                <Link
                  href="/courses?category=ielts-chuyen-sau"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-600 py-1.5 text-sm"
                >
                  • Luyện Thi IELTS Cam Kết 6.5 - 8.0+
                </Link>
              </div>
            </div>

            <div className="grid gap-3 pt-2 text-base font-semibold text-slate-800">
              <Link
                href="/centers"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-brand-600"
              >
                Hệ Thống Cơ Sở & Bản Đồ
              </Link>
              <Link
                href="/methodology"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-brand-600"
              >
                Phương Pháp Giảng Dạy NEAS
              </Link>
              <Link
                href="/teachers"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-brand-600"
              >
                Đội Ngũ Giảng Viên Quốc Tế
              </Link>
              <Link
                href="/student-achievements"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-brand-600"
              >
                Bảng Vàng Thành Tích
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-brand-600"
              >
                Cẩm Nang Học Tiếng Anh
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-brand-600"
              >
                Liên Hệ Trực Tiếp
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <Link
              href="/placement-test"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="outline" className="w-full">
                Đăng Ký Thi Xếp Lớp Miễn Phí
              </Button>
            </Link>
            <Button
              variant="accent"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) onOpenConsultation();
              }}
            >
              Nhận Tư Vấn Lộ Trình & Học Bổng
            </Button>
            <div className="text-center pt-2">
              <a
                href="tel:19006886"
                className="text-sm font-bold text-brand-navy flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent-amber" />
                Tổng đài tư vấn: 1900 6886
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
