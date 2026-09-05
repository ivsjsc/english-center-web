import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminCentersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  if (!hasPermission(session.role, "center.manage")) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold">
        Bạn không có quyền quản lý cơ sở.
      </div>
    );
  }

  const centers = await prisma.center.findMany({
    include: {
      _count: { select: { leads: true } },
    },
    orderBy: { province: "asc" },
  });

  return (
    <div className="p-6 sm:p-10 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            Quản Lý Hệ Thống Cơ Sở & Chi Nhánh (Center CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quản lý địa chỉ, hotline, giờ hoạt động và vị trí định vị Google Maps.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          <span>Thêm Cơ Sở Mới</span>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Tên cơ sở</th>
                <th className="py-3.5 px-4">Tỉnh / Thành</th>
                <th className="py-3.5 px-4">Địa chỉ chi tiết</th>
                <th className="py-3.5 px-4">Hotline</th>
                <th className="py-3.5 px-4">Số Lead tiếp nhận</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {centers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{c.name}</div>
                    <div className="font-mono text-[10px] text-slate-400">/{c.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{c.province}</td>
                  <td className="py-3.5 px-4 max-w-[260px] truncate">{c.address}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-navy">{c.phone}</td>
                  <td className="py-3.5 px-4 font-black text-brand-navy">
                    {c._count.leads}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {c.active ? "Hoạt động" : "Tạm ngưng"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      href={`/centers/${c.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50"
                      title="Xem trang công khai"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
