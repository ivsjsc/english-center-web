import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminBlogPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  if (!hasPermission(session.role, "content.manage")) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold">
        Bạn không có quyền quản lý nội dung bài viết.
      </div>
    );
  }

  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="p-6 sm:p-10 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            Quản Lý Bài Viết & Cẩm Nang (Blog CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tổng hợp bài viết chia sẻ phương pháp học, luyện thi IELTS và tin tức tuyển sinh.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          <span>Viết Bài Mới</span>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Tiêu đề bài viết</th>
                <th className="py-3.5 px-4">Chuyên mục</th>
                <th className="py-3.5 px-4">Tác giả</th>
                <th className="py-3.5 px-4">Ngày đăng</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-[280px]">
                    <div className="line-clamp-1">{p.title}</div>
                    <div className="font-mono text-[10px] text-slate-400">/{p.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{p.category.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.authorName}</td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {new Date(p.publishedAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {p.published ? "Xuất bản" : "Bản nháp"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      href={`/blog/${p.slug}`}
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
