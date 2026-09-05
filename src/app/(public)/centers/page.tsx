import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata } from "@/lib/seo";
import { CentersClientView } from "./CentersClientView";

export const metadata: Metadata = constructMetadata({
  title: "Hệ Thống Cơ Sở Đào Tạo Toàn Quốc",
  description: "Khám phá danh sách các cơ sở trung tâm Anh ngữ AURA Academy tại TP.HCM, Hà Nội, Đà Nẵng với cơ sở vật chất hiện đại đạt chuẩn NEAS.",
  canonicalPath: "/centers",
});

export default async function CentersPage() {
  const centers = await prisma.center.findMany({
    where: { active: true },
    include: {
      images: { orderBy: { orderIndex: "asc" } },
    },
    orderBy: { province: "asc" },
  });

  return (
    <div className="py-12 bg-surface-50 text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Hệ thống cơ sở</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Hệ Thống Cơ Sở AURA Academy Toàn Quốc
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl">
            Các cơ sở được xây dựng đồng bộ theo tiêu chuẩn kiểm định NEAS Australia với không gian học tập hiện đại, phòng lab máy tính, phòng thi IELTS và sân chơi sáng tạo.
          </p>
        </div>

        <CentersClientView initialCenters={centers} />
      </div>
    </div>
  );
}
