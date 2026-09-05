"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";

interface CourseOption {
  id: string;
  name: string;
}

interface CenterOption {
  id: string;
  name: string;
  province: string;
}

interface LeadFormProps {
  initialCourseId?: string;
  initialCenterId?: string;
  onSuccess?: () => void;
  variant?: "card" | "plain" | "banner";
  title?: string;
  subtitle?: string;
}

export function LeadForm({
  initialCourseId,
  initialCenterId,
  onSuccess,
  variant = "card",
  title = "Đăng Ký Nhận Tư Vấn & Ưu Đãi Tuyển Sinh",
  subtitle = "Để lại thông tin, chuyên viên IVS sẽ liên hệ tư vấn lộ trình và gửi thông tin lớp học phù hợp.",
}: LeadFormProps) {
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [centers, setCenters] = useState<CenterOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    studentAge: "",
    courseId: initialCourseId || "",
    centerId: initialCenterId || "",
    message: "",
    honeypot: "",
    consent: true,
  });

  const [utmParams, setUtmParams] = useState({
    UTMSource: "",
    UTMMedium: "",
    UTMCampaign: "",
    UTMContent: "",
    UTMTerm: "",
  });

  // Fetch courses and centers on mount
  useEffect(() => {
    async function loadOptions() {
      try {
        const res = await fetch("/api/public-options");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses || []);
          setCenters(data.centers || []);
        }
      } catch {
        // graceful fallback if network fails
      }
    }
    loadOptions();

    // Extract UTM from URL query
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setUtmParams({
        UTMSource: searchParams.get("utm_source") || "website_direct",
        UTMMedium: searchParams.get("utm_medium") || "",
        UTMCampaign: searchParams.get("utm_campaign") || "",
        UTMContent: searchParams.get("utm_content") || "",
        UTMTerm: searchParams.get("utm_term") || "",
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const payload = {
        ...formData,
        studentAge: formData.studentAge ? parseInt(formData.studentAge, 10) : undefined,
        ...utmParams,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.");
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Đăng Ký Thành Công!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Cảm ơn quý phụ huynh & học viên đã liên hệ với IVS Academy. Bộ phận tư vấn sẽ liên hệ qua số điện thoại <strong>{formData.phone}</strong> trong thời gian sớm nhất.
        </p>
        <div className="pt-3">
          <Link href="/placement-test">
            <Button variant="primary" size="sm">
              Đăng Ký Làm Bài Thi Thử Xếp Lớp Ngay &rarr;
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const containerClasses = {
    card: "bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100",
    plain: "p-0",
    banner: "bg-brand-navy text-white p-6 sm:p-8 rounded-3xl",
  };

  return (
    <div className={containerClasses[variant]}>
      {title && (
        <div className="mb-6 text-left">
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${variant === "banner" ? "text-white" : "text-brand-navy"}`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-xs sm:text-sm mt-1.5 ${variant === "banner" ? "text-slate-300" : "text-slate-500"}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Anti-spam honeypot field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="hp_comment">Do not fill this</label>
          <input
            id="hp_comment"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Họ và tên phụ huynh / học viên"
            placeholder="Ví dụ: Nguyễn Văn A"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <Input
            label="Số điện thoại liên hệ"
            placeholder="0912 345 678"
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Địa chỉ Email (Tùy chọn)"
            placeholder="email@example.com"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Độ tuổi học viên"
            placeholder="Ví dụ: 8 (tuổi)"
            type="number"
            min={3}
            max={80}
            value={formData.studentAge}
            onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Khóa học quan tâm"
            placeholder="-- Chọn khóa học mong muốn --"
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
            options={courses.map((c) => ({ value: c.id, label: c.name }))}
          />

          <Select
            label="Cơ sở thuận tiện nhất"
            placeholder="-- Chọn trung tâm gần bạn --"
            value={formData.centerId}
            onChange={(e) => setFormData({ ...formData, centerId: e.target.value })}
            options={centers.map((c) => ({ value: c.id, label: `${c.name} (${c.province})` }))}
          />
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-500 select-none">
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
            />
            <span>
              Tôi đồng ý để IVS liên hệ tư vấn và xác nhận đã đọc{" "}
              <Link href="/personal-data-policy" target="_blank" className="text-brand-600 underline font-semibold">
                Chính sách bảo vệ dữ liệu cá nhân
              </Link>{" "}
              theo Nghị định 13/2023/NĐ-CP.
            </span>
          </label>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant={variant === "banner" ? "accent" : "primary"}
            size="lg"
            className="w-full font-bold text-base tracking-wide"
            isLoading={isLoading}
          >
            ĐĂNG KÝ TƯ VẤN LỘ TRÌNH HỌC
          </Button>
        </div>
      </form>
    </div>
  );
}
