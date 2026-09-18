import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";

const originalSecret = process.env.TURNSTILE_SECRET_KEY;

afterEach(() => {
  vi.unstubAllGlobals();
  if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
  else process.env.TURNSTILE_SECRET_KEY = originalSecret;
});

function mockVerification(body: unknown, status = 200) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status })));
}

describe("Turnstile server verification", () => {
  it("accepts a successful token scoped to RSVP submission", async () => {
    process.env.TURNSTILE_SECRET_KEY = "production-test-secret";
    mockVerification({ success: true, action: "rsvp_submit" });
    await expect(verifyTurnstileToken("token", "203.0.113.10")).resolves.toBe(true);
  });

  it.each([
    [{ success: false }, 200],
    [{ success: true, action: "another_action" }, 200],
    [{ success: true, action: "rsvp_submit" }, 500],
  ])("rejects failed, wrong-action, and non-success responses", async (body, status) => {
    process.env.TURNSTILE_SECRET_KEY = "production-test-secret";
    mockVerification(body, status);
    await expect(verifyTurnstileToken("token", "203.0.113.10")).resolves.toBe(false);
  });

  it("rejects malformed and unavailable verification responses without throwing", async () => {
    process.env.TURNSTILE_SECRET_KEY = "production-test-secret";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("unavailable")));
    await expect(verifyTurnstileToken("token", "203.0.113.10")).resolves.toBe(false);
  });
});
