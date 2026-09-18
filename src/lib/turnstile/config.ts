export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export function getTurnstileSiteKey() {
  const value = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return TURNSTILE_TEST_SITE_KEY;
  throw new Error("Missing required public environment variable: NEXT_PUBLIC_TURNSTILE_SITE_KEY");
}
