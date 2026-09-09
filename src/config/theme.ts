import { themeConfigSchema } from "./schema";

export const themeConfig = themeConfigSchema.parse({
  colors: {
    background: "#f7f0e7", surface: "#fffaf4", text: "#24171a",
    muted: "#745f62", primary: "#681c2f", accent: "#b78a3b", border: "#d9c8ba",
  },
  typography: {
    display: "var(--font-display)", heading: "var(--font-display)",
    body: "var(--font-body)", label: "var(--font-body)", script: "var(--font-script)",
  },
  spacing: { section: "clamp(5rem, 12vw, 10rem)", content: "clamp(1rem, 4vw, 2rem)" },
  borders: { width: "1px", style: "solid" },
  radius: { small: "0.25rem", medium: "0.75rem", large: "1.5rem" },
  shadows: { soft: "0 1.5rem 4rem rgb(61 32 38 / 10%)" },
  motion: { fast: "160ms", base: "320ms", slow: "700ms" },
  photography: { radius: "0", overlay: "rgb(32 12 18 / 48%)" },
});
