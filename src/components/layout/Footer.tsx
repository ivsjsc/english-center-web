import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles, Award, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="p-3 bg-brand-600/30 text-accent-amber rounded-xl shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Chương Trình Chuẩn Khung CEFR</div>
              <div className="text-xs text-slate-300">Lộ trình đào tạo đồng bộ theo chuẩn khảo thí quốc tế</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="p-3 bg-brand-600/30 text-emerald-400 rounded-xl shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Đội Ngũ Giảng Viên Chuyên Môn Cao</div>
              <div className="text-xs text-slate-300">Có chứng chỉ sư phạm và kinh nghiệm giảng dạy thực tế</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="p-3 bg-brand-600/30 text-blue-400 rounded-xl shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Môi Trường Học Tập Sáng Tạo</div>
              <div className="text-xs text-slate-300">Phòng lab công nghệ và không gian thực hành phản xạ</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-amber flex items-center justify-center text-white font-black text-xl">
                IVS
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                IVS <span className="text-brand-400 font-medium">ACADEMY</span>
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Hệ thống trung tâm Ngoại ngữ và Đào tạo Kỹ năng IVS Academy. Đồng hành cùng học viên Việt Nam xây dựng nền tảng tư duy và khả năng hội nhập toàn cầu.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div>[Thông tin cấp phép & hoạt động đang cập nhật theo hồ sơ thẩm định của trung tâm]</div>
              <div>Đơn vị chủ quản: <strong>IVS Educational Group</strong></div>
            </div>
          </div>

          {/* Courses Col */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Khóa Học
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/courses?category=smartkids-mam-non" className="hover:text-white transition-colors">
                  Tiếng Anh Mầm Non (4-6T)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=superkids-tieu-hoc" className="hover:text-white transition-colors">
                  Tiếng Anh Tiểu Học (6-11T)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=young-leaders-thieu-nien" className="hover:text-white transition-colors">
                  Tiếng Anh Thiếu Niên (11-15T)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=ielts-chuyen-sau" className="hover:text-white transition-colors">
                  Luyện Thi IELTS Chuyên Sâu
                </Link>
              </li>
              <li>
                <Link href="/courses?category=tieng-anh-giao-tiep" className="hover:text-white transition-colors">
                  Tiếng Anh Giao Tiếp iTalk
                </Link>
              </li>
              <li>
                <Link href="/courses?category=toefl-sat-du-hoc" className="hover:text-white transition-colors">
                  Digital SAT Săn Học Bổng
                </Link>
              </li>
            </ul>
          </div>

          {/* Centers Col */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Hệ Thống Cơ Sở
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/centers/ivs-nguyen-thi-minh-khai-q1" className="hover:text-white transition-colors">
                  Cơ sở Quận 1 (TP.HCM)
                </Link>
              </li>
              <li>
                <Link href="/centers/ivs-cong-hoa-tan-binh" className="hover:text-white transition-colors">
                  Cơ sở Tân Bình (Cộng Hòa)
                </Link>
              </li>
              <li>
                <Link href="/centers/ivs-cau-giay-ha-noi" className="hover:text-white transition-colors">
                  Cơ sở Cầu Giấy (Hà Nội)
                </Link>
              </li>
              <li>
                <Link href="/centers/ivs-hai-chau-da-nang" className="hover:text-white transition-colors">
                  Cơ sở Hải Châu (Đà Nẵng)
                </Link>
              </li>
              <li>
                <Link href="/centers" className="text-accent-amber font-semibold hover:underline">
                  Xem tất cả các cơ sở &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Contact Col */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Liên Hệ & Hỗ Trợ
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-accent-amber mt-1 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Tổng đài tư vấn:</div>
                  <a href="tel:19006886" className="font-bold text-white text-base hover:text-accent-amber">
                    1900 6886
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-accent-amber mt-1 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Hộp thư hỗ trợ:</div>
                  <a href="mailto:contact@ivs.edu.vn" className="text-white hover:underline">
                    contact@ivs.edu.vn
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-amber mt-1 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Trụ sở chính:</div>
                  <span className="text-slate-300 text-xs">
                    189 Nguyễn Thị Minh Khai, P. Đa Kao, Quận 1, TP.HCM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Compliance */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} IVS Academy. Toàn bộ bản quyền được bảo hộ.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Chính Sách Bảo Mật
            </Link>
            <Link href="/personal-data-policy" className="hover:text-white transition-colors">
              Bảo Vệ Dữ Liệu Cá Nhân (Nghị định 13)
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Điều Khoản Sử Dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
