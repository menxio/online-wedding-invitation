import type { Attendance } from "./schemas";

export type RsvpResponse = {
  id: string;
  guestName: string;
  attendance: Attendance;
  submittedAt: string;
};
