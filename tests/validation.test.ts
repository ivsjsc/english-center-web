import { describe, it, expect } from "vitest";
import { leadRegistrationSchema, VN_PHONE_REGEX } from "../src/lib/validation";

describe("Validation & Anti-Spam Suite", () => {
  it("should validate legitimate Vietnamese mobile phone numbers", () => {
    const validPhones = [
      "0908123456",
      "0912345678",
      "0987654321",
      "0389123456",
      "0771234567",
      "0561234567",
    ];

    for (const phone of validPhones) {
      expect(VN_PHONE_REGEX.test(phone)).toBe(true);
    }
  });

  it("should reject invalid phone numbers", () => {
    const invalidPhones = [
      "0123456789", // deprecated prefix
      "09123", // too short
      "abcdefghij",
      "090812345678", // too long
    ];

    for (const phone of invalidPhones) {
      expect(VN_PHONE_REGEX.test(phone)).toBe(false);
    }
  });

  it("should pass valid lead submission input", () => {
    const validInput = {
      fullName: "Nguyễn Văn An",
      phone: "0912345678",
      email: "an.nguyen@example.com",
      studentAge: 8,
      courseId: "course-123",
      centerId: "center-456",
      consent: true,
      honeypot: "",
    };

    const result = leadRegistrationSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should reject submission without privacy consent", () => {
    const inputWithoutConsent = {
      fullName: "Nguyễn Văn An",
      phone: "0912345678",
      studentAge: 8,
      consent: false,
    };

    const result = leadRegistrationSchema.safeParse(inputWithoutConsent);
    expect(result.success).toBe(false);
  });

  it("should fail when honeypot has content (bot trap)", () => {
    const botInput = {
      fullName: "Spam Bot",
      phone: "0912345678",
      consent: true,
      honeypot: "I am a bot filling all fields",
    };

    const result = leadRegistrationSchema.safeParse(botInput);
    expect(result.success).toBe(false);
  });
});
