import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { leadStatusUpdateSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "lead.read")) {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const centerId = searchParams.get("centerId") || "";
    const courseId = searchParams.get("courseId") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (centerId && centerId !== "ALL") {
      where.centerId = centerId;
    }

    if (courseId && courseId !== "ALL") {
      where.courseId = courseId;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [total, leads, consultants, centers, courses] = await Promise.all([
      prisma.lead.count({ where }),
      prisma.lead.findMany({
        where,
        include: {
          course: { select: { id: true, name: true } },
          center: { select: { id: true, name: true, district: true, province: true } },
          assignedUser: { select: { id: true, fullName: true, email: true } },
          activities: {
            orderBy: { createdAt: "desc" },
            include: { user: { select: { fullName: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.findMany({
        where: { active: true },
        select: { id: true, fullName: true, role: true },
        orderBy: { fullName: "asc" },
      }),
      prisma.center.findMany({
        where: { active: true },
        select: { id: true, name: true, province: true },
        orderBy: { province: "asc" },
      }),
      prisma.course.findMany({
        where: { status: "PUBLISHED" },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      consultants,
      centers,
      courses,
    });
  } catch (error) {
    console.error("Admin leads GET error:", error);
    return NextResponse.json({ error: "Lỗi tải danh sách lead." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "lead.update")) {
      return NextResponse.json({ error: "Không có quyền cập nhật lead." }, { status: 403 });
    }

    const body = await req.json();
    const validation = leadStatusUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0]?.message || "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const { leadId, status, note, assignedUserId } = validation.data;

    const currentLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!currentLead) {
      return NextResponse.json({ error: "Lead không tồn tại." }, { status: 404 });
    }

    const previousStatus = currentLead.status;
    const isStatusChanged = previousStatus !== status;
    const isAssigneeChanged = assignedUserId !== undefined && assignedUserId !== currentLead.assignedUserId;

    if (isAssigneeChanged && !hasPermission(session.role, "lead.assign")) {
      return NextResponse.json({ error: "Bạn không có quyền phân công tư vấn viên." }, { status: 403 });
    }

    // Update lead record
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status,
        ...(assignedUserId !== undefined ? { assignedUserId } : {}),
      },
      include: {
        course: true,
        center: true,
        assignedUser: true,
        activities: {
          orderBy: { createdAt: "desc" },
          include: { user: { select: { fullName: true } } },
        },
      },
    });

    // Create activity log
    let actionDesc = "NOTE_ADDED";
    if (isStatusChanged && isAssigneeChanged) {
      actionDesc = "STATUS_AND_ASSIGNEE_UPDATE";
    } else if (isStatusChanged) {
      actionDesc = "STATUS_CHANGE";
    } else if (isAssigneeChanged) {
      actionDesc = "CONSULTANT_ASSIGNED";
    }

    await prisma.leadActivity.create({
      data: {
        leadId,
        userId: session.userId,
        action: actionDesc,
        previousStatus: isStatusChanged ? previousStatus : null,
        newStatus: status,
        note: note || `Cập nhật trạng thái thành ${status}`,
      },
    });

    // Log to system AuditLog
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "LEAD_UPDATE",
        entity: "Lead",
        entityId: leadId,
        details: `Cập nhật lead ${currentLead.fullName}: Trạng thái [${previousStatus} -> ${status}]`,
      },
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      message: "Cập nhật thông tin lead thành công.",
    });
  } catch (error) {
    console.error("Admin leads PATCH error:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống khi cập nhật lead." },
      { status: 500 }
    );
  }
}
