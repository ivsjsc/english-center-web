import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { ROLE_PERMISSIONS, Role } from "@/lib/rbac";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const permissions = ROLE_PERMISSIONS[session.role as Role] || [];

  return NextResponse.json({
    authenticated: true,
    user: session,
    permissions,
  });
}
