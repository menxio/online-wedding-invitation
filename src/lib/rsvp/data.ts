import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RsvpRole } from "./schemas";
import type { RsvpResponse } from "./types";

type ResponseRow = {
  id: string;
  guest_name: string;
  guest_role: RsvpRole;
  attendance: "attending" | "declining";
  submitted_at: string;
};

export async function getAdminResponses(): Promise<RsvpResponse[]> {
  const { data, error } = await (await createSupabaseServerClient())
    .from("rsvp_responses")
    .select("id, guest_name, guest_role, attendance, submitted_at")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as ResponseRow[]).map((response) => ({
    id: response.id,
    guestName: response.guest_name,
    guestRole: response.guest_role,
    attendance: response.attendance,
    submittedAt: response.submitted_at,
  }));
}
