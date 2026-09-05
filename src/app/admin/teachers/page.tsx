import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { Plus, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminTeachersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  if (!hasPermission(session.role, "teacher.manage")) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold">
        Bạn không có quyền quản lý hồ sơ giảng viên.
      </div>
    );
  }

  const teachers = await prisma.teacher.findMany({
    include: {
      qualifications: true,
    },
    orderBy: { yearsExperience: "desc" },
  });

  return (
    <div className="p-6 sm:p-10 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            Quản Lý Hồ Sơ Giảng Viên (Teacher CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quản lý lý lịch giảng viên, bằng cấp quốc tế CELTA, DELTA và các chứng chỉ sư phạm.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          <span>Thêm Giảng Viên Mới</span>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Giảng viên</th>
                <th className="py-3.5 px-4">Chức danh học thuật</th>
                <th className="py-3.5 px-4">Kinh nghiệm</th>
                <th className="py-3.5 px-4">Bằng cấp & Chứng chỉ</th>
                <th className="py-3.5 px-4">Tiêu biểu</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <div>{t.name}</div>
                        <div className="font-mono text-[10px] text-slate-400">/{t.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{t.title}</td>
                  <td className="py-3.5 px-4 font-bold">{t.yearsExperience} năm</td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {t.qualifications.map((q) => (
                        <div key={q.id} className="line-clamp-1 text-slate-600">
                          • {q.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {t.featured ? (
                      <span className="text-amber-600 font-bold">★ Nổi bật</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      href={`/teachers/${t.slug}`}
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
