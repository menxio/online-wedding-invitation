import type { RsvpResponse } from "./types";
import { RSVP_ROLE_LABELS } from "./schemas";

function cell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function toAdminCsv(responses: RsvpResponse[]) {
  const rows = [["Guest Name", "Role", "Attendance", "Submitted At"]];
  for (const response of responses) {
    rows.push([response.guestName, RSVP_ROLE_LABELS[response.guestRole], response.attendance, response.submittedAt]);
  }
  return rows.map((row) => row.map(cell).join(",")).join("\r\n");
}
