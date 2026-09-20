import { sectionsConfigSchema } from "./schema";

export const sectionsConfig = sectionsConfigSchema.parse({
  order: [
    "opening", "hero", "countdown", "invitation", "story", "events", "venue",
    "details", "dressCode", "entourage", "gallery", "giftGuide", "rsvp", "faq",
    "closing", "music",
  ],
  enabled: {
    opening: true, hero: true, countdown: true, invitation: false, story: true,
    events: true, venue: true, details: true, dressCode: true, entourage: true,
    gallery: true, giftGuide: true, rsvp: true, faq: true, closing: false,
    music: true,
  },
});
