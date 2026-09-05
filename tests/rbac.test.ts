import { describe, it, expect } from "vitest";
import { hasPermission, hasAnyRole } from "../src/lib/rbac";

describe("RBAC Authorization Matrix", () => {
  it("SUPER_ADMIN should have wildcard permission (*)", () => {
    expect(hasPermission("SUPER_ADMIN", "lead.read")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "anything.custom")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "user.manage")).toBe(true);
  });

  it("CONSULTANT should have lead.read and lead.update, but not course.manage", () => {
    expect(hasPermission("CONSULTANT", "lead.read")).toBe(true);
    expect(hasPermission("CONSULTANT", "lead.update")).toBe(true);
    expect(hasPermission("CONSULTANT", "course.manage")).toBe(false);
    expect(hasPermission("CONSULTANT", "user.manage")).toBe(false);
  });

  it("CONTENT_EDITOR should manage courses, teachers and content, but not update leads", () => {
    expect(hasPermission("CONTENT_EDITOR", "course.manage")).toBe(true);
    expect(hasPermission("CONTENT_EDITOR", "teacher.manage")).toBe(true);
    expect(hasPermission("CONTENT_EDITOR", "content.manage")).toBe(true);
    expect(hasPermission("CONTENT_EDITOR", "lead.update")).toBe(false);
  });

  it("should verify hasAnyRole correctly", () => {
    expect(hasAnyRole("ADMIN", ["SUPER_ADMIN", "ADMIN"])).toBe(true);
    expect(hasAnyRole("CONSULTANT", ["SUPER_ADMIN", "ADMIN"])).toBe(false);
  });
});
