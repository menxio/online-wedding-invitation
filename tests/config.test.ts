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
});
