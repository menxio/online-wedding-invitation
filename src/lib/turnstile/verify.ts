import "server-only";
import { z } from "zod";
import { getTurnstileSecretKey } from "@/lib/supabase/env";

const endpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const testSecretKey = "1x0000000000000000000000000000000AA";

const verificationSchema = z.object({
  success: z.boolean(),
  action: z.string().optional(),
});

export async function verifyTurnstileToken(token: string, remoteIp: string) {
  try {
    const secret = getTurnstileSecretKey();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: remoteIp }),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) return false;
    const parsed = verificationSchema.safeParse(await response.json());
    if (!parsed.success || !parsed.data.success) return false;

    // Cloudflare's official test response uses the action "test". Real production
    // tokens must be scoped to this form so they cannot be reused across actions.
    return secret === testSecretKey || parsed.data.action === "rsvp_submit";
  } catch {
    return false;
  }
}
