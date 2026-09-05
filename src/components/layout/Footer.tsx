import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ExternalLink } from "lucide-react";
import { isSampleDeployment } from "@/lib/deployment";

export function Footer() {
  const isSample = isSampleDeployment();
  return (
    <footer className="w-full bg-[#F1F5F9] text-text-default pt-14 pb-8 border-t border-border shadow-[0_-1px_6px_rgba(0,0,0,0.03)] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-primary-deep flex items-center justify-center text-white font-black text-sm">
                <Image
                  src="/images/brand/ivs-academy-icon-reference.png"
                  alt="IVS Academy Icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-primary-deep tracking-tight">
                IVS ACADEMY
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-default leading-relaxed">
              Hệ thống Anh ngữ Quốc tế tiên phong phương pháp giảng dạy tích hợp chuẩn Cambridge. Đào tạo toàn diện tư duy ngôn ngữ và kỹ năng học thuật cho tương lai.
            </p>

            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary border border-primary-highlight text-xs font-semibold">
                Chuẩn khảo thí Cambridge & CEFR
              </span>
            </div>
          </div>

          {/* Col 2: Courses */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider">
              Khóa Học Đào Tạo
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-default">
              <li>
                <Link href="/courses#smartkids-mam-non" className="hover:text-primary transition-colors">
                  Tiếng Anh Mầm non (4 - 6 tuổi)
                </Link>
              </li>
              <li>
                <Link href="/courses#superkids-tieu-hoc" className="hover:text-primary transition-colors">
                  Tiếng Anh Tiểu học (6 - 11 tuổi)
                </Link>
              </li>
              <li>
                <Link href="/courses#young-leaders-thcs" className="hover:text-primary transition-colors">
                  Tiếng Anh THCS (11 - 15 tuổi)
                </Link>
              </li>
              <li>
                <Link href="/courses#thpt-du-bi-du-hoc" className="hover:text-primary transition-colors">
                  Tiếng Anh THPT & Dự bị Du học
                </Link>
              </li>
              <li>
                <Link href="/courses#ielts-master" className="hover:text-primary transition-colors">
                  IELTS Master Chuyên Sâu (6.5 - 8.0+)
                </Link>
              </li>
              <li>
                <Link href="/courses#toeic-dot-pha" className="hover:text-primary transition-colors">
                  TOEIC Đột phá Kỹ năng
                </Link>
              </li>
              <li>
                <Link href="/courses#giao-tiep" className="hover:text-primary transition-colors">
                  Tiếng Anh Giao tiếp Quốc tế
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: About IVS */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider">
              Về IVS Academy
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-default">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Giới thiệu Tổ chức Giáo dục
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-primary transition-colors">
                  Phương pháp đào tạo Active Learning
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-primary transition-colors">
                  Đội ngũ Giảng viên bản ngữ & Quốc tế
                </Link>
              </li>
              <li>
                <Link href="/student-achievements" className="hover:text-primary transition-colors">
                  Thành tích học viên & Bảng vàng
                </Link>
              </li>
              <li>
                <a
                  href="https://ivstech.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>Hệ sinh thái công nghệ IVS Tech</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
              {!isSample && (
                <li>
                  <Link href="/admin/login" className="hover:text-primary transition-colors">
                    Cổng quản trị nội bộ CenterCare
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Centers & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider">
              Hệ Thống Cơ Sở
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm text-text-default">
              <p>
                <strong className="text-text-heading">Hà Nội:</strong> Hệ thống phòng học chuẩn quốc tế
              </p>
              <p>
                <strong className="text-text-heading">TP. Hồ Chí Minh:</strong> Cơ sở hiện đại tại các quận trung tâm
              </p>
              <p>
                <strong className="text-text-heading">Đà Nẵng & Cần Thơ:</strong> Cơ sở vệ tinh khu vực
              </p>
              <p className="pt-1">
                <Link href="/centers" className="text-primary font-semibold hover:underline flex items-center gap-1 text-xs">
                  <span>Khám phá chi tiết cơ sở gần bạn &rarr;</span>
                </Link>
              </p>
              <div className="pt-2 space-y-1 border-t border-slate-200 mt-2">
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <a href="tel:1900xxxx" className="hover:text-primary font-semibold">
                    Hotline: 1900 xxxx (08:00 - 21:30)
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <a href="mailto:admissions@ivs.edu.vn" className="hover:text-primary">
                    admissions@ivs.edu.vn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Policies & Social Links */}
        <div className="pt-6 border-t border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <span>
            © {new Date().getFullYear()} IVS Academy. Tất cả các quyền được bảo lưu.
          </span>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/personal-data-policy" className="hover:text-primary transition-colors">
              Bảo vệ dữ liệu (Nghị định 13)
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>

          <div className="flex items-center gap-4 font-semibold text-primary">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-vibrant">
              Facebook
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-vibrant">
              YouTube
            </a>
            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="hover:text-primary-vibrant">
              Zalo
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-vibrant">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
