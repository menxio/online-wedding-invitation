import { z } from "zod";
import { RSVP_NAME_MAX_LENGTH, TURNSTILE_TOKEN_MAX_LENGTH } from "./constants";

const honeypot = z.string().max(0).optional().default("");

export const attendanceSchema = z.enum(["attending", "declining"]);

export const rsvpRoleValues = [
  "guest",
  "principal_sponsor",
  "secondary_sponsor",
  "entourage",
] as const;

export const rsvpRoleSchema = z.enum(rsvpRoleValues);

export const RSVP_ROLE_LABELS = {
  guest: "Guest",
  principal_sponsor: "Principal Sponsor (Ninong/Ninang)",
  secondary_sponsor: "Secondary Sponsor",
  entourage: "Wedding Entourage",
} as const satisfies Record<(typeof rsvpRoleValues)[number], string>;

export const rsvpSubmissionSchema = z.object({
  guestName: z.string().trim().min(2).max(RSVP_NAME_MAX_LENGTH).transform((value) => value.replace(/\s+/g, " ")),
  guestRole: rsvpRoleSchema,
  attendance: attendanceSchema,
  company: honeypot,
  turnstileToken: z.string().min(1).max(TURNSTILE_TOKEN_MAX_LENGTH),
}).strict();

export type RsvpSubmission = z.infer<typeof rsvpSubmissionSchema>;
export type Attendance = z.infer<typeof attendanceSchema>;
export type RsvpRole = z.infer<typeof rsvpRoleSchema>;

export function parseJsonWithLimit(text: string, maxBytes = 16_384): unknown {
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new Error("REQUEST_TOO_LARGE");
  }
  return JSON.parse(text);
}

export async function readJsonWithLimit(request: Request, maxBytes = 16_384) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) throw new Error("REQUEST_TOO_LARGE");
  if (!request.body) throw new Error("INVALID_JSON");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new Error("REQUEST_TOO_LARGE");
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(body));
}
