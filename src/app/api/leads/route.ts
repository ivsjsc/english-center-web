import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadRegistrationSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`lead_submit_${ip}`, {
      limit: 10,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${rateLimit.reset} giây.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse & validate request payload
    const body = await req.json();

    // Honeypot check
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Fake success for bots to prevent them from adapting
      return NextResponse.json({ success: true, message: "OK" }, { status: 200 });
    }

    const validation = leadRegistrationSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || "Dữ liệu không hợp lệ";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const {
      fullName,
      phone,
      email,
      studentAge,
      courseId,
      centerId,
      message,
      source,
      UTMSource,
      UTMMedium,
      UTMCampaign,
      UTMContent,
      UTMTerm,
    } = validation.data;

    // 3. Create Lead in Database
    const newLead = await prisma.lead.create({
      data: {
        fullName,
        phone,
        email: email || null,
        studentAge: studentAge || null,
        courseId: courseId || null,
        centerId: centerId || null,
        message: message || null,
        source: source || "WEBSITE",
        UTMSource: UTMSource || null,
        UTMMedium: UTMMedium || null,
        UTMCampaign: UTMCampaign || null,
        UTMContent: UTMContent || null,
        UTMTerm: UTMTerm || null,
        status: "NEW",
      },
    });

    // 4. Record Lead Activity
    await prisma.leadActivity.create({
      data: {
        leadId: newLead.id,
        action: "LEAD_CREATED",
        newStatus: "NEW",
        note: `Khách hàng đăng ký tư vấn qua website từ nguồn: ${UTMSource || "Direct"}. IP: ${ip}`,
      },
    });

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      message: "Đăng ký tư vấn thành công!",
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi máy chủ trong quá trình tiếp nhận thông tin." },
      { status: 500 }
    );
  }
}
