export function isRsvpOpen(now: Date, deadlineIso: string) {
  return now.getTime() <= new Date(deadlineIso).getTime();
}
