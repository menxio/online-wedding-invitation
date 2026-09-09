import { sectionsConfigSchema } from "./schema";

export const sectionsConfig = sectionsConfigSchema.parse({
  order: [
    "opening", "hero", "countdown", "invitation", "story", "events", "venue",
    "dressCode", "entourage", "gallery", "rsvp", "faq", "closing", "music",
  ],
  enabled: {
    opening: true, hero: true, countdown: true, invitation: true, story: false,
    events: true, venue: true, dressCode: false, entourage: false, gallery: true,
    rsvp: true, faq: false, closing: true, music: false,
  },
});
