"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("superadmin@ivs.edu.vn");
  const [password, setPassword] = useState("Admin@2026!");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Đăng nhập thất bại");

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Đã xảy ra lỗi kết nối.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Glow decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-amber/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-100 text-left">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-brand-navy text-accent-amber rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-md">
            IVS
          </div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">
            IVS Academy Portal
          </h1>
          <p className="text-xs text-slate-500">
            Hệ thống Quản Trị & Quản Lý Tuyển Sinh Đào Tạo
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Demo Credentials Helper Box */}
        <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] text-blue-900 space-y-1">
          <div className="font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Tài khoản Demo hệ thống:</span>
          </div>
          <div>• Super Admin: <code>superadmin@ivs.edu.vn</code> / <code>Admin@2026!</code></div>
          <div>• Tư vấn viên: <code>tuvan.minhchau@ivs.edu.vn</code> / <code>Admin@2026!</code></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email công vụ"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Mật khẩu"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full font-bold"
              isLoading={isLoading}
            >
              <Lock className="w-4 h-4" />
              <span>ĐĂNG NHẬP HỆ THỐNG</span>
            </Button>
          </div>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
          >
            &larr; Quay lại trang chủ website
          </Link>
        </div>
      </div>
    </div>
  );
}
