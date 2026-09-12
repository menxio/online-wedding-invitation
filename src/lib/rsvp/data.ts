import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RsvpResponse } from "./types";

type ResponseRow = {
  id: string;
  guest_name: string;
  attendance: "attending" | "declining";
  submitted_at: string;
};

export async function getAdminResponses(): Promise<RsvpResponse[]> {
  const { data, error } = await (await createSupabaseServerClient())
    .from("rsvp_responses")
    .select("id, guest_name, attendance, submitted_at")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as ResponseRow[]).map((response) => ({
    id: response.id,
    guestName: response.guest_name,
    attendance: response.attendance,
    submittedAt: response.submitted_at,
  }));
}
