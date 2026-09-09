import { z } from "zod";

export const sectionIds = [
  "opening", "hero", "countdown", "invitation", "story", "events", "venue",
  "dressCode", "entourage", "gallery", "rsvp", "faq", "closing", "music",
] as const;

export const sectionIdSchema = z.enum(sectionIds);
const requiredText = z.string().trim().min(1);
const optionalImageSchema = z.object({
  src: requiredText,
  alt: requiredText,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  focalPosition: requiredText.default("center"),
}).nullable();

const weddingDateSchema = requiredText.refine(
  (value) => value === "WEDDING_DATE" || !Number.isNaN(Date.parse(value)),
  "Use WEDDING_DATE or a valid ISO 8601 date and time.",
);

export const weddingConfigSchema = z.object({
  couple: z.object({ partnerA: requiredText, partnerB: requiredText, initials: requiredText }),
  dateTime: weddingDateSchema,
  timezone: requiredText,
  invitation: z.object({ eyebrow: requiredText, message: requiredText }),
  hero: z.object({ image: optionalImageSchema, announcement: requiredText }),
  story: z.object({
    heading: requiredText,
    paragraphs: z.array(requiredText).min(1),
    image: optionalImageSchema,
  }).nullable(),
  events: z.array(z.object({
    id: requiredText,
    title: requiredText,
    dateTime: weddingDateSchema,
    venue: requiredText,
    address: requiredText,
    directionsUrl: z.url().nullable(),
    notes: requiredText.nullable(),
  })),
  dressCode: z.object({
    title: requiredText,
    description: requiredText,
    colors: z.array(z.object({
      name: requiredText,
      value: z.string().regex(/^#[0-9a-f]{6}$/i),
    })),
  }).nullable(),
  entourage: z.array(z.object({ role: requiredText, names: z.array(requiredText).min(1) })),
  gallery: z.array(optionalImageSchema.unwrap()),
  faq: z.array(z.object({ question: requiredText, answer: requiredText })),
  closing: z.object({ message: requiredText, contact: requiredText }),
  music: z.object({ title: requiredText, artist: requiredText, src: requiredText }).nullable(),
  rsvp: z.object({ deadline: requiredText, privateInvitations: z.boolean() }),
});

const colorSchema = z.string().regex(/^#[0-9a-f]{6}$/i);

export const themeConfigSchema = z.object({
  colors: z.object({
    background: colorSchema, surface: colorSchema, text: colorSchema,
    muted: colorSchema, primary: colorSchema, accent: colorSchema, border: colorSchema,
  }),
  typography: z.object({
    display: requiredText, heading: requiredText, body: requiredText,
    label: requiredText, script: requiredText,
  }),
  spacing: z.object({ section: requiredText, content: requiredText }),
  borders: z.object({ width: requiredText, style: requiredText }),
  radius: z.object({ small: requiredText, medium: requiredText, large: requiredText }),
  shadows: z.object({ soft: requiredText }),
  motion: z.object({ fast: requiredText, base: requiredText, slow: requiredText }),
  photography: z.object({ radius: requiredText, overlay: requiredText }),
});

export const sectionsConfigSchema = z.object({
  order: z.array(sectionIdSchema),
  enabled: z.record(sectionIdSchema, z.boolean()),
}).superRefine(({ order }, context) => {
  if (new Set(order).size !== order.length) {
    context.addIssue({
      code: "custom",
      message: "Section order cannot contain duplicates.",
      path: ["order"],
    });
  }
});

export type WeddingConfig = z.infer<typeof weddingConfigSchema>;
export type WeddingThemeConfig = z.infer<typeof themeConfigSchema>;
export type SectionsConfig = z.infer<typeof sectionsConfigSchema>;
export type SectionId = z.infer<typeof sectionIdSchema>;
