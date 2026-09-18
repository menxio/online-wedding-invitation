export const RSVP_DEADLINE_ISO = "2026-10-05T23:59:59+08:00";
export const WEDDING_DATE_ISO = "2026-10-17T13:30:00+08:00";
export const RSVP_REQUEST_MAX_BYTES = 4_096;
export const RSVP_NAME_MAX_LENGTH = 160;
export const TURNSTILE_TOKEN_MAX_LENGTH = 2_048;

export const RSVP_RATE_LIMITS = [
  { action: "rsvp_submit_minute", maxAttempts: 10, windowSeconds: 60 },
  { action: "rsvp_submit_ten_minutes", maxAttempts: 30, windowSeconds: 600 },
  { action: "rsvp_submit_daily", maxAttempts: 100, windowSeconds: 86_400 },
] as const;

export const RSVP_MESSAGES = {
  rateLimited: "Please wait a little while before trying again.",
  invalidResponse: "Please enter your full name and choose a response.",
  verificationRequired: "Please complete the security check before submitting.",
  verificationFailed: "We could not verify this response. Please refresh the security check and try again.",
  deadlinePassed: "The RSVP deadline has passed, so responses can no longer be submitted.",
  unavailable: "RSVP is temporarily unavailable. Please try again later.",
} as const;
