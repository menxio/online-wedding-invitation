import type { Attendance, RsvpRole } from "./schemas";

export type RsvpResponse = {
  id: string;
  guestName: string;
  guestRole: RsvpRole;
  attendance: Attendance;
  submittedAt: string;
};
