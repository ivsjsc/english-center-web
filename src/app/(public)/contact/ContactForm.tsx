"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gửi liên hệ không thành công");

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Đã xảy ra lỗi kết nối.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-brand-navy">
          Gửi Liên Hệ Thành Công!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Cảm ơn bạn đã gửi tin nhắn đến AURA Academy. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
      <h2 className="text-2xl font-black text-brand-navy mb-2">
        Gửi Tin Nhắn Cho Chúng Tôi
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        Điền thông tin vào mẫu dưới đây, bộ phận phụ trách sẽ liên hệ lại ngay khi nhận được.
      </p>

      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Họ và tên của bạn"
            placeholder="Nguyễn Văn A"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <Input
            label="Số điện thoại liên lạc"
            placeholder="0912 345 678"
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Địa chỉ Email"
            placeholder="email@example.com"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Tiêu đề yêu cầu"
            placeholder="Tư vấn khóa học / Hợp tác doanh nghiệp..."
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Nội dung chi tiết <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            required
            placeholder="Xin vui lòng nhập thông tin hoặc câu hỏi cụ thể..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-bold"
            isLoading={isLoading}
          >
            <Send className="w-4 h-4" />
            <span>GỬI YÊU CẦU LIÊN HỆ</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
