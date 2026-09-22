import type { Attendance, RsvpRole } from "./schemas";
import type { RsvpResponse } from "./types";

export function filterResponses(
  responses: RsvpResponse[],
  query: string,
  attendance: "all" | Attendance,
  role: "all" | RsvpRole = "all",
) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return responses.filter((response) => (
    response.guestName.toLocaleLowerCase().includes(normalizedQuery)
    && (attendance === "all" || response.attendance === attendance)
    && (role === "all" || response.guestRole === role)
  ));
}
