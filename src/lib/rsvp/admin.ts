import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isRsvpAdmin } from "./admin-role";

export { isRsvpAdmin } from "./admin-role";

export async function requireRsvpAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !isRsvpAdmin(data.user)) redirect("/admin/login");
  return data.user;
}
