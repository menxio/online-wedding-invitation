import "server-only";
import { createServiceClient } from "@/lib/supabase/service";

export async function consumeRateLimit(
  keyDigest: string,
  action: string,
  maxAttempts: number,
  windowSeconds: number,
) {
  const { data, error } = await createServiceClient().rpc("consume_rsvp_rate_limit", {
    p_key_digest: keyDigest,
    p_action: action,
    p_window_seconds: windowSeconds,
    p_max_attempts: maxAttempts,
  });
  if (error) throw error;
  return data === true;
}
