import { NextResponse, type NextRequest } from "next/server";
import { RSVP_MESSAGES, RSVP_RATE_LIMITS, RSVP_REQUEST_MAX_BYTES } from "@/lib/rsvp/constants";
import { PRIVATE_RESPONSE_HEADERS, isSameOrigin, rateLimitKey, requestAddress } from "@/lib/rsvp/request";
import { consumeRateLimit } from "@/lib/rsvp/rate-limit";
import { readJsonWithLimit, rsvpSubmissionSchema } from "@/lib/rsvp/schemas";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const respond = (body: object, status: number) => NextResponse.json(body, {
    status,
    headers: PRIVATE_RESPONSE_HEADERS,
  });

  try {
    if (!isSameOrigin(request)) return respond({ error: RSVP_MESSAGES.invalidResponse }, 403);

    let body: unknown;
    try {
      body = await readJsonWithLimit(request, RSVP_REQUEST_MAX_BYTES);
    } catch {
      return respond({ error: RSVP_MESSAGES.invalidResponse }, 400);
    }

    const parsed = rsvpSubmissionSchema.safeParse(body);
    if (!parsed.success || parsed.data.company) {
      return respond({ error: RSVP_MESSAGES.invalidResponse }, 400);
    }

    const verified = await verifyTurnstileToken(parsed.data.turnstileToken, requestAddress(request));
    if (!verified) return respond({ error: RSVP_MESSAGES.verificationFailed }, 403);

    const limiterKey = rateLimitKey(request, "rsvp-submit");
    const allowed = await Promise.all(RSVP_RATE_LIMITS.map(({ action, maxAttempts, windowSeconds }) => (
      consumeRateLimit(limiterKey, action, maxAttempts, windowSeconds)
    )));
    if (allowed.includes(false)) {
      return respond({ error: RSVP_MESSAGES.rateLimited }, 429);
    }

    const { error } = await createServiceClient().rpc("submit_rsvp", {
      p_guest_name: parsed.data.guestName,
      p_guest_role: parsed.data.guestRole,
      p_attendance: parsed.data.attendance,
    });
    if (error) {
      throw error;
    }

    return respond({ ok: true }, 201);
  } catch (error) {
    console.error("RSVP submission failed", error);
    return respond({ error: RSVP_MESSAGES.unavailable }, 503);
  }
}
