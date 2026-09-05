import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { placementTestBookingSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`placement_${ip}`, {
      limit: 10,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Bạn thao tác quá nhanh. Vui lòng thử lại sau ${rateLimit.reset} giây.` },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "OK" }, { status: 200 });
    }

    const validation = placementTestBookingSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || "Dữ liệu không hợp lệ";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { fullName, phone, email, studentAge, centerId, preferredDate, preferredTimeSlot, note } =
      validation.data;

    const booking = await prisma.placementTestBooking.create({
      data: {
        fullName,
        phone,
        email: email || null,
        studentAge,
        centerId,
        preferredDate: new Date(preferredDate),
        preferredTimeSlot,
        note: note || null,
        status: "PENDING",
      },
    });

    // Also register as a lead in CRM with status PLACEMENT_TEST
    const lead = await prisma.lead.create({
      data: {
        fullName,
        phone,
        email: email || null,
        studentAge,
        centerId,
        message: `Đăng ký thi xếp lớp ngày ${preferredDate} ca ${preferredTimeSlot}. Ghi chú: ${note || "Không"}`,
        status: "PLACEMENT_TEST",
        source: "PLACEMENT_TEST_PAGE",
      },
    });

    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        action: "LEAD_CREATED",
        newStatus: "PLACEMENT_TEST",
        note: `Học viên đăng ký lịch thi xếp lớp trực tiếp qua website.`,
      },
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: "Đăng ký thi xếp lớp thành công!",
    });
  } catch (error) {
    console.error("Placement test booking error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu xếp lớp." },
      { status: 500 }
    );
  }
}
