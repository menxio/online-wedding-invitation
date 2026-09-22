import { describe, expect, it } from "vitest";
import { RSVP_NAME_MAX_LENGTH } from "@/lib/rsvp/constants";
import { parseJsonWithLimit, readJsonWithLimit, rsvpSubmissionSchema } from "@/lib/rsvp/schemas";

const valid = { guestName: "Michael Guest", guestRole: "guest", attendance: "attending", company: "", turnstileToken: "test-token" };

describe("shared-link RSVP validation", () => {
  it.each(["attending", "declining"])("accepts a valid %s response", (attendance) => {
    expect(rsvpSubmissionSchema.parse({ ...valid, attendance })).toEqual({ ...valid, attendance });
  });

  it.each(["guest", "principal_sponsor", "secondary_sponsor", "entourage"])("accepts the supported %s role", (guestRole) => {
    expect(rsvpSubmissionSchema.safeParse({ ...valid, guestRole }).success).toBe(true);
  });

  it("trims and collapses whitespace in a guest name", () => {
    expect(rsvpSubmissionSchema.parse({ ...valid, guestName: "  Ana   Maria  " }).guestName).toBe("Ana Maria");
  });

  it.each(["", " ", "x" ])("rejects an invalid blank or short name", (guestName) => {
    expect(rsvpSubmissionSchema.safeParse({ ...valid, guestName }).success).toBe(false);
  });

  it("rejects excessively long names and invalid attendance", () => {
    expect(rsvpSubmissionSchema.safeParse({ ...valid, guestName: "x".repeat(RSVP_NAME_MAX_LENGTH + 1) }).success).toBe(false);
    expect(rsvpSubmissionSchema.safeParse({ ...valid, attendance: "maybe" }).success).toBe(false);
  });

  it("rejects missing and unsupported wedding roles", () => {
    const withoutRole: Record<string, unknown> = { ...valid };
    delete withoutRole.guestRole;
    expect(rsvpSubmissionSchema.safeParse(withoutRole).success).toBe(false);
    expect(rsvpSubmissionSchema.safeParse({ ...valid, guestRole: "bridesmaid" }).success).toBe(false);
  });

  it.each([
    ["plusOne", true], ["plusOnes", 1], ["guestCount", 2], ["additionalGuests", ["Person"]],
    ["children", ["Child"]], ["childCount", 1], ["householdId", "id"], ["inviteeId", "id"],
    ["invitationCode", "code"], ["invitationToken", "token"], ["sessionId", "session"],
  ])("rejects unsupported field %s", (field, value) => {
    expect(rsvpSubmissionSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
  });

  it("rejects a populated honeypot", () => {
    expect(rsvpSubmissionSchema.safeParse({ ...valid, company: "spam" }).success).toBe(false);
  });

  it("rejects malformed JSON and oversized text", () => {
    expect(() => parseJsonWithLimit("{", 20)).toThrow();
    expect(() => parseJsonWithLimit(JSON.stringify({ value: "x".repeat(100) }), 20)).toThrow("REQUEST_TOO_LARGE");
  });

  it("stops streamed request bodies at the byte limit", async () => {
    const request = new Request("https://example.test/api/rsvp", { method: "POST", body: JSON.stringify({ value: "x".repeat(100) }) });
    await expect(readJsonWithLimit(request, 20)).rejects.toThrow("REQUEST_TOO_LARGE");
  });
});
