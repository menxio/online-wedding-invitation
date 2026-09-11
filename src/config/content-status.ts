export const NEEDS_COUPLE_APPROVAL = "NEEDS COUPLE APPROVAL" as const;

export function isPendingApproval(value: string | null | undefined) {
  return value === NEEDS_COUPLE_APPROVAL;
}
