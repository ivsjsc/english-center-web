import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSubmissionSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`contact_${ip}`, {
      limit: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Bạn gửi tin nhắn quá nhanh. Vui lòng thử lại sau ${rateLimit.reset} giây.` },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "OK" }, { status: 200 });
    }

    const validation = contactSubmissionSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.errors[0]?.message || "Dữ liệu không hợp lệ";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { fullName, phone, email, subject, message } = validation.data;

    await prisma.contactSubmission.create({
      data: {
        fullName,
        phone,
        email: email || null,
        subject,
        message,
        status: "UNREAD",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Gửi phản hồi thành công! IVS Academy sẽ liên hệ với bạn trong thời gian sớm nhất.",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi máy chủ trong quá trình gửi thông tin liên hệ." },
      { status: 500 }
    );
  }
}
