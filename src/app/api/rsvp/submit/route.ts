import { NextResponse, type NextRequest } from "next/server";
import { RSVP_DEADLINE_ISO, RSVP_MESSAGES, RSVP_REQUEST_MAX_BYTES } from "@/lib/rsvp/constants";
import { isRsvpOpen } from "@/lib/rsvp/deadline";
import { PRIVATE_RESPONSE_HEADERS, isSameOrigin, rateLimitKey } from "@/lib/rsvp/request";
import { consumeRateLimit } from "@/lib/rsvp/rate-limit";
import { readJsonWithLimit, rsvpSubmissionSchema } from "@/lib/rsvp/schemas";
import { createServiceClient } from "@/lib/supabase/service";

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

    const limiterKey = rateLimitKey(request, "rsvp-submit");
    const [shortWindowAllowed, dailyAllowed] = await Promise.all([
      consumeRateLimit(limiterKey, "rsvp_submit_short", 5, 600),
      consumeRateLimit(limiterKey, "rsvp_submit_daily", 20, 86_400),
    ]);
    if (!shortWindowAllowed || !dailyAllowed) {
      return respond({ error: RSVP_MESSAGES.rateLimited }, 429);
    }

    if (!isRsvpOpen(new Date(), RSVP_DEADLINE_ISO)) {
      return respond({ error: RSVP_MESSAGES.deadlinePassed }, 403);
    }

    const { error } = await createServiceClient().rpc("submit_rsvp", {
      p_guest_name: parsed.data.guestName,
      p_attendance: parsed.data.attendance,
    });
    if (error) {
      if (error.message.includes("RSVP_DEADLINE_PASSED")) {
        return respond({ error: RSVP_MESSAGES.deadlinePassed }, 403);
      }
      throw error;
    }

    return respond({ ok: true }, 201);
  } catch (error) {
    console.error("RSVP submission failed", error);
    return respond({ error: RSVP_MESSAGES.unavailable }, 503);
  }
}
