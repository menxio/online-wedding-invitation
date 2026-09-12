import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isRsvpAdmin } from "@/lib/rsvp/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "RSVP Coordinator Sign In", robots: { index: false, follow: false, nocache: true } };

export default async function AdminLoginPage() {
  const { data } = await (await createSupabaseServerClient()).auth.getUser();
  if (isRsvpAdmin(data.user)) redirect("/admin");
  return <main className="grid min-h-svh place-items-center bg-[#f7f0e7] px-5 py-12"><section className="w-full max-w-md border border-[#d9c8ba] bg-[#fffaf4] p-7 shadow-[0_1.5rem_4rem_rgb(61_32_38_/_10%)] sm:p-10"><p className="text-xs font-bold tracking-[0.2em] text-[#b78a3b] uppercase">Private administration</p><h1 className="mt-4 font-serif text-5xl leading-none">RSVP coordinator</h1><p className="mt-5 text-sm leading-6 text-[#745f62]">Authorized coordinators only. Guest access is available from the invitation’s RSVP page.</p><AdminLoginForm /></section></main>;
}
