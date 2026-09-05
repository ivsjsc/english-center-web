import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminCoursesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  if (!hasPermission(session.role, "course.manage")) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold">
        Bạn không có quyền quản lý khóa học.
      </div>
    );
  }

  const courses = await prisma.course.findMany({
    include: {
      category: true,
      _count: { select: { leads: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 sm:p-10 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            Quản Lý Khóa Học & Lộ Trình (Course CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Danh sách toàn bộ các chương trình đào tạo đang công bố trên hệ thống.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          <span>Thêm Khóa Học Mới</span>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Tên khóa học</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Độ tuổi & Trình độ</th>
                <th className="py-3.5 px-4">Thời lượng</th>
                <th className="py-3.5 px-4">Số Lead quan tâm</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-[220px]">
                    <div className="line-clamp-1">{course.name}</div>
                    <div className="font-mono text-[10px] text-slate-400">/{course.slug}</div>
                  </td>
                  <td className="py-3.5 px-4">{course.category.name.split("(")[0]}</td>
                  <td className="py-3.5 px-4">
                    {course.minimumAge} - {course.maximumAge} tuổi ({course.level})
                  </td>
                  <td className="py-3.5 px-4">{course.duration}</td>
                  <td className="py-3.5 px-4 font-black text-brand-navy">
                    {course._count.leads}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        course.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/courses/${course.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50"
                        title="Xem trang công khai"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
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
