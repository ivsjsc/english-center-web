import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { LeadsManagerClient } from "./LeadsManagerClient";

export default async function AdminLeadsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  if (!hasPermission(session.role, "lead.read")) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold">
        Bạn không có quyền truy cập hệ thống Quản lý Lead.
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
          Hệ Thống Quản Lý Lead & Tuyển Sinh (Lead CRM)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Theo dõi hành trình học viên từ lúc đăng ký đến khi hoàn tất thủ tục nhập học.
        </p>
      </div>

      <LeadsManagerClient currentUserId={session.userId} userRole={session.role} />
    </div>
  );
}
