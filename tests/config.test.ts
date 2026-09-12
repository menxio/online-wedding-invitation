import { describe, expect, it } from "vitest";
import { sectionsConfig, themeConfig, weddingConfig } from "@/config";
import {
  sectionsConfigSchema,
  themeConfigSchema,
  weddingConfigSchema,
} from "@/config/schema";

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

  it("publishes the confirmed wedding date and timezone", () => {
    expect(weddingConfig.dateTime).toBe("2026-10-17T13:30:00+08:00");
    expect(weddingConfig.timezone).toBe("Asia/Manila");
    expect(weddingConfig.dateTimeConflict).toBeNull();
    expect(sectionsConfig.enabled.countdown).toBe(true);
  });

  it("preserves the approved venues and entourage groups", () => {
    expect(weddingConfig.events.map((event) => event.venue)).toEqual([
      "San Agustin Parish Valencia City",
      "Jocel's Garden",
    ]);
    expect(weddingConfig.entourage.find((group) => group.role === "Principal Sponsors — Ninong")?.names).toHaveLength(20);
    expect(weddingConfig.entourage.find((group) => group.role === "Principal Sponsors — Ninang")?.names).toHaveLength(21);
    expect(sectionsConfig.enabled.entourage).toBe(true);
    expect(sectionsConfig.enabled.story).toBe(false);
  });

  it("captures the implemented shared-link one-seat RSVP rules", () => {
    expect(weddingConfig.rsvp).toMatchObject({
      deadline: "October 5, 2026",
      sharedLink: true,
      seatsPerResponse: 1,
      adultOnly: true,
      childrenPolicy: "entourageOnly",
      implementationStatus: "implemented",
      allowResponseEdits: false,
    });
    expect(weddingConfig.rsvp.copy.seatNotice).toBe("We have reserved 1 seat for you. We request your reply on or before October 5, 2026.");
  });
});
