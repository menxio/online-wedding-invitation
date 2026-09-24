import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { sectionsConfig, themeConfig, weddingConfig } from "@/config";
import { VenueSection } from "@/components/sections/venue-section";
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
    expect(weddingConfig.entourage.find((group) => group.role === "Principal Sponsors — Ninong")?.names).toHaveLength(21);
    expect(weddingConfig.entourage.find((group) => group.role === "Principal Sponsors — Ninang")?.names).toHaveLength(21);
    expect(sectionsConfig.enabled.entourage).toBe(true);
    expect(sectionsConfig.enabled.story).toBe(true);
    expect(weddingConfig.story).toMatchObject({
      heading: "A Story Worth Telling",
      image: null,
    });
    expect(weddingConfig.story?.paragraphs).toHaveLength(7);
    expect(weddingConfig.story?.images).toHaveLength(9);
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

  it("publishes the approved guest guidance and supplied gift and music assets", () => {
    expect(weddingConfig.motif.name).toBe("Shades of pink");
    expect(weddingConfig.dressCode?.title).toBe("What to wear");
    expect(weddingConfig.dressCode?.colors).toHaveLength(5);
    expect(weddingConfig.dressCode?.colors[0]).toMatchObject({
      name: "Rose Pink",
      value: "#de6e9b",
      featured: true,
    });
    expect(weddingConfig.motif.paletteStatus).toBe("approved");
    expect(weddingConfig.dressCode?.reminder.message).toContain("don’t wear white");
    expect(weddingConfig.dressCode?.guidance).toHaveLength(4);
    expect(weddingConfig.dressCode?.guidance.map((item) => item.image.src)).toEqual([
      "/wedding/attire/guest-ladies.png",
      "/wedding/attire/guest-gentlemen.png",
      "/wedding/attire/sponsor-ninang.png",
      "/wedding/attire/sponsor-ninong.png",
    ]);
    expect(weddingConfig.details.items).toHaveLength(5);
    expect(weddingConfig.faq.length).toBeGreaterThanOrEqual(6);
    expect(weddingConfig.faq[0]).toMatchObject({
      question: "What time should I arrive?",
      answer: expect.stringContaining("1:00 PM"),
    });
    expect(weddingConfig.giftGuide.accounts).toEqual([
      expect.objectContaining({
        label: "BPI · Michael",
        image: expect.objectContaining({ src: "/wedding/gifts/bpi-michael-qr.jpg" }),
      }),
    ]);
    expect(weddingConfig.music).toMatchObject({
      title: "Born For You",
      artist: "Wedding recording",
      src: "/music/born-for-you.mp3",
      spotifyUrl: null,
      sourceStatus: "approved",
    });
    expect(sectionsConfig.enabled.giftGuide).toBe(true);
    expect(sectionsConfig.enabled.faq).toBe(true);
  });

  it("publishes directions and keeps venue maps collapsed until requested", () => {
    render(createElement(VenueSection, { wedding: weddingConfig }));
    expect(screen.queryByText(/map link pending/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /get directions/i })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /view map/i })).toHaveLength(2);
    expect(screen.queryByTitle(/map showing/i)).not.toBeInTheDocument();
  });
});
