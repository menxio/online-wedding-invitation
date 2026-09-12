import type { User } from "@supabase/supabase-js";

export function isRsvpAdmin(user: Pick<User, "app_metadata"> | null | undefined) {
  return user?.app_metadata?.role === "rsvp_admin";
}
