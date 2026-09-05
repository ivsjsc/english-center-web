import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import {
  Users,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Globe,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Calculate dates
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    leadsToday,
    leadsThisMonth,
    totalEnrolled,
    totalLeads,
    recentLeads,
    allLeads,
  ] = await Promise.all([
    prisma.lead.count({
      where: { createdAt: { gte: startOfToday } },
    }),
    prisma.lead.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.lead.count({
      where: { status: "ENROLLED" },
    }),
    prisma.lead.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        course: { select: { name: true } },
        center: { select: { name: true, district: true } },
        assignedUser: { select: { fullName: true } },
      },
    }),
    prisma.lead.findMany({
      select: {
        status: true,
        source: true,
        courseId: true,
        centerId: true,
      },
    }),
  ]);

  // Conversion rate
  const conversionRate =
    totalLeads > 0 ? ((totalEnrolled / totalLeads) * 100).toFixed(1) : "0.0";

  // Status distribution
  const statusCounts: Record<string, number> = {
    NEW: 0,
    CONTACTED: 0,
    APPOINTMENT: 0,
    PLACEMENT_TEST: 0,
    ENROLLED: 0,
    LOST: 0,
  };
  allLeads.forEach((l) => {
    if (statusCounts[l.status] !== undefined) statusCounts[l.status]++;
  });

  // Source distribution
  const sourceCounts: Record<string, number> = {};
  allLeads.forEach((l) => {
    const src = l.source || "WEBSITE";
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            Tổng Quan Hoạt Động & Hiệu Suất CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chào mừng trở lại, <strong>{session.fullName}</strong> ({session.role})
          </p>
        </div>

        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-sapphire transition-colors shadow-sm"
        >
          <span>Quản lý danh sách Lead</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Top KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Lead Mới Hôm Nay</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-navy">{leadsToday}</div>
          <div className="text-[11px] text-emerald-600 font-medium">
            ↑ Đang tiếp nhận liên tục
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Lead Trong Tháng</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-navy">{leadsThisMonth}</div>
          <div className="text-[11px] text-slate-500">
            Tổng tích lũy: {totalLeads} lead
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Học Viên Nhập Học (Enrolled)</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">{totalEnrolled}</div>
          <div className="text-[11px] text-emerald-600 font-medium">
            Đã hoàn tất thủ tục
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Tỷ Lệ Chuyển Đổi (Conversion)</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">{conversionRate}%</div>
          <div className="text-[11px] text-slate-500">
            Mục tiêu tháng: &gt; 18%
          </div>
        </div>
      </div>

      {/* Middle Row: Status Pipeline & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Status Distribution */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-brand-navy">
            Phân Bổ Trạng Thái Phễu Tuyển Sinh (Pipeline)
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <div className="text-xs font-bold text-blue-700">Mới Nhận (NEW)</div>
              <div className="text-2xl font-black text-blue-900">{statusCounts.NEW}</div>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-center space-y-1">
              <div className="text-xs font-bold text-indigo-700">Đã Liên Hệ</div>
              <div className="text-2xl font-black text-indigo-900">{statusCounts.CONTACTED}</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-center space-y-1">
              <div className="text-xs font-bold text-amber-700">Hẹn Gặp</div>
              <div className="text-2xl font-black text-amber-900">{statusCounts.APPOINTMENT}</div>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-center space-y-1">
              <div className="text-xs font-bold text-sky-700">Thi Xếp Lớp</div>
              <div className="text-2xl font-black text-sky-900">{statusCounts.PLACEMENT_TEST}</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
              <div className="text-xs font-bold text-emerald-700">Đã Nhập Học</div>
              <div className="text-2xl font-black text-emerald-900">{statusCounts.ENROLLED}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-1">
              <div className="text-xs font-bold text-slate-600">Thất Bại (LOST)</div>
              <div className="text-2xl font-black text-slate-800">{statusCounts.LOST}</div>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500">
            * Mỗi cập nhật trạng thái được ghi lại nhật ký `LeadActivity` minh bạch phục vụ đánh giá KPI tư vấn viên.
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-600" />
            <span>Nguồn Khách Hàng (UTM)</span>
          </h2>

          <div className="space-y-3">
            {Object.entries(sourceCounts).map(([src, count]) => {
              const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
              return (
                <div key={src} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{src}</span>
                    <span>{count} lead ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-navy">
            Lead Mới Tiếp Nhận Gần Đây
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            Xem toàn bộ danh sách &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">Họ và tên</th>
                <th className="py-3 px-4">Điện thoại</th>
                <th className="py-3 px-4">Khóa học</th>
                <th className="py-3 px-4">Cơ sở</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Tư vấn viên</th>
                <th className="py-3 px-4">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {lead.fullName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-brand-navy">
                    {lead.phone}
                  </td>
                  <td className="py-3.5 px-4">{lead.course?.name || "—"}</td>
                  <td className="py-3.5 px-4">
                    {lead.center?.district || "—"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lead.status === "NEW"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "CONTACTED"
                          ? "bg-indigo-100 text-indigo-800"
                          : lead.status === "APPOINTMENT"
                          ? "bg-amber-100 text-amber-800"
                          : lead.status === "PLACEMENT_TEST"
                          ? "bg-sky-100 text-sky-800"
                          : lead.status === "ENROLLED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    {lead.assignedUser?.fullName || "Chưa phân công"}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
