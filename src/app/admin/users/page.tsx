import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  if (!hasPermission(session.role, "user.read")) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold">
        Bạn không có quyền quản lý người dùng & phân quyền.
      </div>
    );
  }

  const users = await prisma.user.findMany({
    include: {
      _count: { select: { leads: true, activities: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  const roleLabels: Record<string, { label: string; color: string }> = {
    SUPER_ADMIN: { label: "Super Admin", color: "bg-purple-100 text-purple-800" },
    ADMIN: { label: "Vận hành (Admin)", color: "bg-blue-100 text-blue-800" },
    CONTENT_EDITOR: { label: "Biên tập viên", color: "bg-emerald-100 text-emerald-800" },
    CONSULTANT: { label: "Chuyên viên tư vấn", color: "bg-amber-100 text-amber-800" },
    CENTER_MANAGER: { label: "Giám đốc cơ sở", color: "bg-sky-100 text-sky-800" },
  };

  return (
    <div className="p-6 sm:p-10 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            Quản Lý Nhân Sự & Phân Quyền (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Danh sách cán bộ quản lý, ban chuyên môn và chuyên viên tư vấn tuyển sinh.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <UserPlus className="w-4 h-4" />
          <span>Thêm Nhân Sự Mới</span>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Họ và tên</th>
                <th className="py-3.5 px-4">Email công vụ</th>
                <th className="py-3.5 px-4">Điện thoại</th>
                <th className="py-3.5 px-4">Vai trò (Role)</th>
                <th className="py-3.5 px-4">Lead phụ trách</th>
                <th className="py-3.5 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const r = roleLabels[u.role] || { label: u.role, color: "bg-slate-100 text-slate-700" };
                return (
                  <tr key={u.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{u.fullName}</td>
                    <td className="py-3.5 px-4 font-mono">{u.email}</td>
                    <td className="py-3.5 px-4 font-mono">{u.phone || "—"}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${r.color}`}>
                        {r.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-brand-navy">
                      {u._count.leads}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          u.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {u.active ? "Đang hoạt động" : "Khóa"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
