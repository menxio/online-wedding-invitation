import type { NextRequest } from "next/server";
import { createHmac } from "node:crypto";
import { getRsvpSecrets } from "@/lib/supabase/env";

export function requestAddress(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")?.trim()
    ?? "unknown";
}

export function rateLimitKey(request: NextRequest, scope: string) {
  return createHmac("sha256", getRsvpSecrets().rateLimitPepper)
    .update(`${scope}:${requestAddress(request)}`)
    .digest("hex");
}

export function isSameOrigin(request: NextRequest) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) return false;

  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

export const PRIVATE_RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  Expires: "0",
  Pragma: "no-cache",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};
