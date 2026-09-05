import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { constructMetadata, generateLocalBusinessSchema } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/public/LeadForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Building2,
  CheckCircle2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const center = await prisma.center.findUnique({
    where: { slug },
  });

  if (!center) return constructMetadata({ title: "Cơ sở không tồn tại" });

  return constructMetadata({
    title: center.seoTitle || center.name,
    description: center.seoDescription || center.description,
    canonicalPath: `/centers/${center.slug}`,
  });
}

export default async function CenterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const center = await prisma.center.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { orderIndex: "asc" } },
    },
  });

  if (!center) notFound();

  const businessSchema = generateLocalBusinessSchema({
    name: center.name,
    address: center.address,
    phone: center.phone,
    latitude: center.latitude,
    longitude: center.longitude,
    slug: center.slug,
  });

  return (
    <div className="bg-surface-50 text-left min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link href="/centers" className="hover:text-white">Cơ sở</Link>
            <span>/</span>
            <span className="text-accent-amber font-semibold">{center.name}</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/10 text-white">
                {center.province}
              </Badge>
              <Badge variant="success">Chuẩn Kiểm Định NEAS</Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {center.name}
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              {center.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-amber" />
                <span>{center.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-amber" />
                <a href={`tel:${center.phone.replace(/\s+/g, "")}`} className="hover:text-white font-bold">
                  {center.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-amber" />
                <span>{center.openingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Lead Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Campus Info */}
          <div className="lg:col-span-8 space-y-10">
            {/* Image Gallery */}
            {center.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {center.images.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-card bg-slate-200"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.caption || center.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {img.caption && (
                      <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs p-2 rounded-xl">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Facilities */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-brand-navy">
                Tiện Ích & Trang Thiết Bị Tại Cơ Sở
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {center.facilities.split(",").map((fac, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">
                      {fac.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Directions */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2">
                <MapPin className="w-6 h-6 text-brand-600" />
                <span>Bản Đồ & Chỉ Đường</span>
              </h2>
              <p className="text-sm text-slate-600">
                Địa chỉ: <strong>{center.address}</strong>
              </p>
              <div className="pt-2">
                <a
                  href={center.GoogleMapsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white text-sm font-bold hover:bg-brand-sapphire transition-colors shadow-md"
                >
                  <ExternalLink className="w-4 h-4 text-accent-amber" />
                  <span>Mở Google Maps chỉ đường trực tiếp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Lead Registration Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <LeadForm
                variant="card"
                initialCenterId={center.id}
                title={`Đăng Ký Học Tại Cơ Sở ${center.district}`}
                subtitle="Chuyên viên tư vấn cơ sở sẽ liên hệ xếp lịch kiểm tra trình độ ngay hôm nay."
              />

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs text-slate-600">
                <div className="font-bold text-slate-800 text-sm">
                  Thông tin liên hệ trực tiếp:
                </div>
                <div>• Điện thoại: <strong>{center.phone}</strong></div>
                <div>• Email: <strong>{center.email}</strong></div>
                <div>• Giờ làm việc: <strong>{center.openingHours}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
