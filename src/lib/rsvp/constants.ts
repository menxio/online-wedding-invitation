export const RSVP_DEADLINE_ISO = "2026-10-05T23:59:59+08:00";
export const WEDDING_DATE_ISO = "2026-10-17T13:30:00+08:00";
export const RSVP_REQUEST_MAX_BYTES = 2_048;
export const RSVP_NAME_MAX_LENGTH = 160;

export const RSVP_MESSAGES = {
  rateLimited: "Please wait a little while before trying again.",
  invalidResponse: "Please enter your full name and choose a response.",
  deadlinePassed: "The RSVP deadline has passed, so responses can no longer be submitted.",
  unavailable: "RSVP is temporarily unavailable. Please try again later.",
} as const;
