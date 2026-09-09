import { describe, expect, it } from "vitest";
import { getCountdown } from "@/lib/countdown";

describe("getCountdown", () => {
  it("preserves an explicit unknown wedding date", () => {
    expect(getCountdown("WEDDING_DATE")).toEqual({ status: "placeholder" });
  });

  it("returns countdown parts", () => {
    expect(getCountdown("2027-01-03T01:02:03.000Z", new Date("2027-01-01T00:00:00.000Z"))).toEqual({
      status: "upcoming", days: 2, hours: 1, minutes: 2, seconds: 3,
    });
  });

  it("does not return negative values after the event", () => {
    expect(getCountdown("2027-01-01T00:00:00.000Z", new Date("2027-01-02T00:00:00.000Z"))).toEqual({
      status: "complete", days: 0, hours: 0, minutes: 0, seconds: 0,
    });
  });
});
