import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminNav } from "./AdminNav";
import { Shield, LogOut, ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If in login route, let it render without wrapper
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-slate-100 text-left">
      {session ? (
        <>
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
            <div>
              {/* Brand Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    A
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">AURA CRM</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      v1.0 • {session.role}
                    </div>
                  </div>
                </Link>
              </div>

              {/* Navigation Items */}
              <AdminNav userRole={session.role} />
            </div>

            {/* Bottom User Info & Logout */}
            <div className="p-4 border-t border-slate-800 space-y-3">
              <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-white line-clamp-1">
                  {session.fullName}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">
                  {session.email}
                </div>
              </div>

              <div className="flex items-center justify-between px-2 pt-1 text-xs">
                <Link
                  href="/"
                  target="_blank"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Trang chủ</span>
                </Link>

                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* Main Workspace View */}
          <div className="flex-1 bg-surface-50 text-slate-900 overflow-y-auto min-h-screen">
            {children}
          </div>
        </>
      ) : (
        // When session is null (e.g. login page)
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
}
