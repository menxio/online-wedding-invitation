import { describe, expect, it } from "vitest";
import { toAdminCsv } from "@/lib/rsvp/csv";
import { filterResponses } from "@/lib/rsvp/filter";
import { isRsvpAdmin } from "@/lib/rsvp/admin-role";
import type { RsvpResponse } from "@/lib/rsvp/types";

const responses: RsvpResponse[] = [
  { id: "one", guestName: "=Unsafe Formula", attendance: "attending", submittedAt: "2026-09-12T04:00:00Z" },
  { id: "two", guestName: "Maria Santos", attendance: "declining", submittedAt: "2026-09-13T04:00:00Z" },
];

describe("RSVP administration", () => {
  it("authorizes only users carrying the protected app-metadata role", () => {
    expect(isRsvpAdmin({ app_metadata: { role: "rsvp_admin" } })).toBe(true);
    expect(isRsvpAdmin({ app_metadata: { role: "guest" } })).toBe(false);
    expect(isRsvpAdmin(null)).toBe(false);
  });

  it("searches names and filters attendance", () => {
    expect(filterResponses(responses, "maria", "all")).toEqual([responses[1]]);
    expect(filterResponses(responses, "", "attending")).toEqual([responses[0]]);
    expect(filterResponses(responses, "maria", "attending")).toEqual([]);
  });

  it("exports only practical columns and neutralizes spreadsheet formulas", () => {
    const csv = toAdminCsv(responses);
    expect(csv.split("\r\n")[0]).toBe('"Guest Name","Attendance","Submitted At"');
    expect(csv).toContain("'=Unsafe Formula");
    expect(csv).not.toContain("one");
    expect(csv).not.toMatch(/fingerprint|digest|credential|internal/i);
  });
});
