import { sectionsConfigSchema } from "./schema";

export const sectionsConfig = sectionsConfigSchema.parse({
  order: [
    "opening", "hero", "countdown", "invitation", "story", "events", "venue",
    "dressCode", "entourage", "gallery", "rsvp", "faq", "closing", "music",
  ],
  enabled: {
    opening: true, hero: true, countdown: false, invitation: false, story: false,
    events: true, venue: true, dressCode: false, entourage: true, gallery: true,
    rsvp: true, faq: false, closing: false, music: false,
  },
});
