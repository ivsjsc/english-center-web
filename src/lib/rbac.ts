export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CONTENT_EDITOR"
  | "CONSULTANT"
  | "CENTER_MANAGER";

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: [
    "lead.read",
    "lead.write",
    "lead.update",
    "lead.assign",
    "lead.export",
    "course.manage",
    "center.manage",
    "teacher.manage",
    "content.manage",
    "settings.manage",
    "user.read",
  ],
  CENTER_MANAGER: [
    "lead.read",
    "lead.update",
    "lead.assign",
    "center.manage",
    "course.read",
    "teacher.read",
    "content.read",
  ],
  CONSULTANT: [
    "lead.read",
    "lead.update",
    "course.read",
    "center.read",
  ],
  CONTENT_EDITOR: [
    "course.manage",
    "teacher.manage",
    "content.manage",
    "center.read",
  ],
};

export function hasPermission(role: string, requiredPermission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role as Role];
  if (!permissions) return false;
  if (permissions.includes("*")) return true;
  return permissions.includes(requiredPermission);
}

export function hasAnyRole(currentRole: string, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(currentRole as Role);
}
