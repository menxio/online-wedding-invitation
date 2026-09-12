import type { Metadata } from "next";
import { AdminResponseTable } from "@/components/admin/admin-response-table";
import { getAdminResponses } from "@/lib/rsvp/data";
import { requireRsvpAdmin } from "@/lib/rsvp/admin";
import { logoutAdmin } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "RSVP Dashboard", robots: { index: false, follow: false, nocache: true } };

export default async function AdminPage() {
  await requireRsvpAdmin();
  const responses = await getAdminResponses();
  const accepting = responses.filter((response) => response.attendance === "attending").length;
  const declining = responses.filter((response) => response.attendance === "declining").length;
  const cards = [["Total responses", responses.length], ["Accepting", accepting], ["Declining", declining]] as const;

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f7f0e7] px-5 py-8 text-[#24171a] sm:px-8">
      <div className="mx-auto min-w-0 max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <div><p className="text-xs font-bold tracking-[0.18em] text-[#b78a3b] uppercase">Michael & Marris</p><h1 className="mt-2 font-serif text-4xl sm:text-5xl">RSVP dashboard</h1></div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <a href="/api/admin/export" className="inline-flex min-h-11 flex-1 items-center justify-center border border-[#681c2f] px-4 text-xs font-bold tracking-[0.1em] text-[#681c2f] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#681c2f] sm:flex-none">Export CSV</a>
            <form action={logoutAdmin} className="flex-1 sm:flex-none"><button className="min-h-11 w-full bg-[#681c2f] px-4 text-xs font-bold tracking-[0.1em] text-white uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#681c2f]">Sign out</button></form>
          </div>
        </header>
        <section aria-label="RSVP summary" className="mt-10 grid gap-3 sm:grid-cols-3">
          {cards.map(([label, value]) => <article key={label} className="border border-[#d9c8ba] bg-[#fffaf4] p-5"><p className="text-xs font-bold tracking-[0.12em] text-[#745f62] uppercase">{label}</p><p className="mt-3 font-serif text-5xl">{value}</p></article>)}
        </section>
        <AdminResponseTable responses={responses} />
      </div>
    </main>
  );
}
