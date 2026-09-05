import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [courses, centers] = await Promise.all([
      prisma.course.findMany({
        where: { status: "PUBLISHED" },
        select: { id: true, name: true, slug: true },
        orderBy: { name: "asc" },
      }),
      prisma.center.findMany({
        where: { active: true },
        select: { id: true, name: true, province: true, district: true, slug: true },
        orderBy: { province: "asc" },
      }),
    ]);

    return NextResponse.json({ courses, centers });
  } catch (error) {
    console.error("Error fetching public options:", error);
    return NextResponse.json(
      { error: "Failed to fetch options" },
      { status: 500 }
    );
  }
}
