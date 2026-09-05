import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { Settings, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  if (!hasPermission(session.role, "settings.manage")) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold">
        Bạn không có quyền thay đổi cài đặt hệ thống.
      </div>
    );
  }

  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div className="p-6 sm:p-10 space-y-6 text-left max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
          Cài Đặt Hệ Thống & Nhận Diện (Site Settings)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Cấu hình các tham số toàn cục như hotline tuyển sinh, thông báo đầu trang và kênh chat.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {settings.map((s) => (
          <div key={s.id} className="space-y-1.5 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <label className="font-bold text-xs text-slate-700 uppercase tracking-wide">
                {s.key}
              </label>
              <span className="text-[11px] text-slate-400">{s.description}</span>
            </div>
            <input
              type="text"
              defaultValue={s.value}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        ))}

        <div className="pt-4 flex justify-end">
          <Button variant="primary" size="md">
            <Save className="w-4 h-4" />
            <span>Lưu Thay Đổi Cài Đặt</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
