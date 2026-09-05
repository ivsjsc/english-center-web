"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface CenterOption {
  id: string;
  name: string;
  province: string;
  district: string;
}

export function PlacementTestForm({ centers }: { centers: CenterOption[] }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    studentAge: "10",
    centerId: centers[0]?.id || "",
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    preferredTimeSlot: "09:00 - 10:30",
    note: "",
    honeypot: "",
    consent: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/placement-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          studentAge: parseInt(formData.studentAge, 10),
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Đăng ký không thành công");

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
          Đặt Lịch Thi Xếp Lớp Thành Công!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Bộ phận khảo thí của AURA đã ghi nhận lịch hẹn của bạn vào ngày{" "}
          <strong>{formData.preferredDate}</strong> ({formData.preferredTimeSlot}). Chúng tôi sẽ gửi tin nhắn SMS xác nhận và địa điểm chi tiết.
        </p>
        <div className="pt-2">
          <Link href="/courses">
            <Button variant="primary">Khám Phá Các Khóa Học</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-brand-navy">
          Đặt Lịch Kiểm Tra Trực Tiếp
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Vui lòng điền thông tin để phòng Khảo thí chuẩn bị đề thi phù hợp với lứa tuổi.
        </p>
      </div>

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
            label="Họ và tên thí sinh / học viên"
            placeholder="Ví dụ: Lê Minh Hoàng"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <Input
            label="Số điện thoại phụ huynh"
            placeholder="0912 345 678"
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email nhận kết quả"
            placeholder="email@example.com"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Tuổi thí sinh"
            type="number"
            min={4}
            max={75}
            required
            value={formData.studentAge}
            onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
          />
        </div>

        <Select
          label="Chọn cơ sở kiểm tra"
          required
          value={formData.centerId}
          onChange={(e) => setFormData({ ...formData, centerId: e.target.value })}
          options={centers.map((c) => ({
            value: c.id,
            label: `${c.name} (${c.district}, ${c.province})`,
          }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Ngày muốn thi"
            type="date"
            required
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          />

          <Select
            label="Khung giờ thi"
            required
            value={formData.preferredTimeSlot}
            onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
            options={[
              { value: "08:30 - 10:00", label: "Buổi sáng: 08:30 - 10:00" },
              { value: "10:00 - 11:30", label: "Buổi sáng: 10:00 - 11:30" },
              { value: "14:00 - 15:30", label: "Buổi chiều: 14:00 - 15:30" },
              { value: "15:30 - 17:00", label: "Buổi chiều: 15:30 - 17:00" },
              { value: "18:00 - 19:30", label: "Buổi tối: 18:00 - 19:30" },
            ]}
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-500">
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
            />
            <span>
              Tôi đồng ý cho AURA xử lý thông tin để xếp lịch và nhận kết quả thi theo{" "}
              <Link href="/personal-data-policy" className="text-brand-600 underline font-semibold">
                Nghị định 13/2023/NĐ-CP
              </Link>.
            </span>
          </label>
        </div>

        <div className="pt-3">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full font-bold"
            isLoading={isLoading}
          >
            XÁC NHẬN ĐĂNG KÝ THI XẾP LỚP MIỄN PHÍ
          </Button>
        </div>
      </form>
    </div>
  );
}
