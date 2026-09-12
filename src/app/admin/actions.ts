"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isRsvpAdmin } from "@/lib/rsvp/admin-role";

export type LoginState = { error: string } | null;

export async function loginAdmin(_: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = z.object({ email: z.email().max(254), password: z.string().min(8).max(200) }).safeParse({
    email: formData.get("email"), password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter a valid email address and password." };
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !isRsvpAdmin(data.user)) {
    if (data.user) await supabase.auth.signOut();
    return { error: "We could not sign you in with those credentials." };
  }
  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
