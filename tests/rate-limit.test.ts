import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../src/lib/rate-limit";

describe("Sliding Window Rate Limiter", () => {
  it("should allow requests up to the configured limit", () => {
    const id = `test_user_${Date.now()}`;
    const options = { limit: 3, windowMs: 1000 };

    expect(checkRateLimit(id, options).success).toBe(true);
    expect(checkRateLimit(id, options).success).toBe(true);
    expect(checkRateLimit(id, options).success).toBe(true);

    // 4th request exceeds limit of 3
    const fourth = checkRateLimit(id, options);
    expect(fourth.success).toBe(false);
    expect(fourth.remaining).toBe(0);
  });
});
