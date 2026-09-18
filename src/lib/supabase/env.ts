import "server-only";

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}

export function getSupabasePublicEnv() {
  return {
    url: required("NEXT_PUBLIC_SUPABASE_URL"),
    publishableKey: required("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  };
}

export function getSupabaseServiceEnv() {
  return {
    ...getSupabasePublicEnv(),
    secretKey: required("SUPABASE_SECRET_KEY"),
  };
}

export function getRsvpSecrets() {
  return {
    rateLimitPepper: required("RSVP_RATE_LIMIT_PEPPER"),
  };
}

export function getTurnstileSecretKey() {
  const value = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return "1x0000000000000000000000000000000AA";
  throw new Error("Missing required server environment variable: TURNSTILE_SECRET_KEY");
}
