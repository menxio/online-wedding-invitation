import type { RsvpResponse } from "./types";

function cell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function toAdminCsv(responses: RsvpResponse[]) {
  const rows = [["Guest Name", "Attendance", "Submitted At"]];
  for (const response of responses) {
    rows.push([response.guestName, response.attendance, response.submittedAt]);
  }
  return rows.map((row) => row.map(cell).join(",")).join("\r\n");
}
