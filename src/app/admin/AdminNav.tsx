"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  UserCheck,
  FileText,
  Settings,
  ShieldAlert,
} from "lucide-react";
import { hasPermission } from "@/lib/rbac";

export function AdminNav({ userRole }: { userRole: string }) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Báo Cáo Tổng Quan",
      href: "/admin",
      icon: LayoutDashboard,
      permission: "lead.read",
    },
    {
      label: "Quản Lý Lead & CRM",
      href: "/admin/leads",
      icon: Users,
      permission: "lead.read",
    },
    {
      label: "Quản Lý Khóa Học",
      href: "/admin/courses",
      icon: GraduationCap,
      permission: "course.manage",
    },
    {
      label: "Hệ Thống Cơ Sở",
      href: "/admin/centers",
      icon: Building2,
      permission: "center.manage",
    },
    {
      label: "Đội Ngũ Giảng Viên",
      href: "/admin/teachers",
      icon: UserCheck,
      permission: "teacher.manage",
    },
    {
      label: "Cẩm Nang & Bài Viết",
      href: "/admin/blog",
      icon: FileText,
      permission: "content.manage",
    },
    {
      label: "Người Dùng & Phân Quyền",
      href: "/admin/users",
      icon: ShieldAlert,
      permission: "user.read",
    },
    {
      label: "Cài Đặt Hệ Thống",
      href: "/admin/settings",
      icon: Settings,
      permission: "settings.manage",
    },
  ];

  return (
    <nav className="p-4 space-y-1.5 text-left">
      {navItems.map((item) => {
        // RBAC check
        if (!hasPermission(userRole, item.permission)) return null;

        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              isActive
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
