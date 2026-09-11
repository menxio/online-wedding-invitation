import { describe, expect, it } from "vitest";
import { sectionsConfig, themeConfig, weddingConfig } from "@/config";
import {
  sectionsConfigSchema,
  themeConfigSchema,
  weddingConfigSchema,
} from "@/config/schema";
import { NEEDS_COUPLE_APPROVAL } from "@/config/content-status";

describe("template configuration", () => {
  it("validates the placeholder wedding configuration", () => {
    expect(weddingConfigSchema.parse(weddingConfig)).toEqual(weddingConfig);
  });

  it("validates the theme configuration", () => {
    expect(themeConfigSchema.parse(themeConfig)).toEqual(themeConfig);
  });

  it("allows optional sections to be disabled", () => {
    const result = sectionsConfigSchema.parse({
      ...sectionsConfig,
      enabled: { ...sectionsConfig.enabled, gallery: false, music: false },
    });

    expect(result.enabled.gallery).toBe(false);
    expect(result.enabled.music).toBe(false);
  });

  it("rejects duplicate section entries", () => {
    expect(() => sectionsConfigSchema.parse({
      ...sectionsConfig,
      order: ["hero", "hero"],
    })).toThrow("Section order cannot contain duplicates");
  });

  it("records the unresolved wedding date without publishing either source as final", () => {
    expect(weddingConfig.dateTime).toBe(NEEDS_COUPLE_APPROVAL);
    expect(weddingConfig.dateTimeConflict.status).toBe("needsApproval");
    expect(weddingConfig.dateTimeConflict.sources).toHaveLength(2);
    expect(weddingConfig.events.every((event) => event.dateTime === NEEDS_COUPLE_APPROVAL)).toBe(true);
    expect(sectionsConfig.enabled.countdown).toBe(false);
  });

  it("preserves the approved venues and entourage groups", () => {
    expect(weddingConfig.events.map((event) => event.venue)).toEqual([
      "San Agustin Parish Church",
      "Jocel's Garden",
    ]);
    expect(weddingConfig.entourage.find((group) => group.role === "Principal Sponsors — Ninong")?.names).toHaveLength(20);
    expect(weddingConfig.entourage.find((group) => group.role === "Principal Sponsors — Ninang")?.names).toHaveLength(21);
    expect(sectionsConfig.enabled.entourage).toBe(true);
    expect(sectionsConfig.enabled.story).toBe(false);
  });

  it("captures the approved private RSVP rules without claiming a backend exists", () => {
    expect(weddingConfig.rsvp).toMatchObject({
      deadline: "October 5, 2026",
      privateInvitations: true,
      householdBased: true,
      plusOnesAllowed: false,
      childrenPolicy: "explicitEntourageInviteesOnly",
      implementationStatus: "notImplemented",
    });
  });
});
