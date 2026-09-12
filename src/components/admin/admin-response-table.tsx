"use client";

import { useMemo, useState } from "react";
import type { Attendance } from "@/lib/rsvp/schemas";
import { filterResponses } from "@/lib/rsvp/filter";
import type { RsvpResponse } from "@/lib/rsvp/types";

type ResponseFilter = "all" | Attendance;

function submittedAt(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  }).format(new Date(value));
}

export function AdminResponseTable({ responses }: { responses: RsvpResponse[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ResponseFilter>("all");
  const visible = useMemo(() => filterResponses(responses, query, filter), [filter, query, responses]);

  return (
    <section className="mt-10" aria-labelledby="responses-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-[#b78a3b] uppercase">Guest replies</p>
          <h2 id="responses-heading" className="mt-2 font-serif text-3xl">Responses</h2>
        </div>
        <p className="text-sm text-[#745f62]" aria-live="polite">Showing {visible.length} of {responses.length}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label>
          <span className="mb-2 block text-xs font-bold tracking-[0.1em] text-[#745f62] uppercase">Search by name</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Guest name" className="min-h-12 w-full min-w-0 border border-[#d9c8ba] bg-white px-4 text-sm focus:border-[#681c2f] focus:outline-none" />
        </label>
        <label>
          <span className="mb-2 block text-xs font-bold tracking-[0.1em] text-[#745f62] uppercase">Attendance</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value as ResponseFilter)} className="min-h-12 w-full border border-[#d9c8ba] bg-white px-4 text-sm focus:border-[#681c2f] focus:outline-none sm:w-48">
            <option value="all">All responses</option>
            <option value="attending">Accepting</option>
            <option value="declining">Declining</option>
          </select>
        </label>
      </div>

      <div className="mt-4 space-y-3 sm:hidden">
        {visible.map((response) => (
          <article key={response.id} className="border border-[#d9c8ba] bg-white p-4">
            <h3 className="font-serif text-xl">{response.guestName}</h3>
            <p className="mt-2 text-sm font-semibold text-[#681c2f]">{response.attendance === "attending" ? "Accepting" : "Declining"}</p>
            <p className="mt-1 text-xs text-[#745f62]">{submittedAt(response.submittedAt)}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 hidden overflow-x-auto border border-[#d9c8ba] sm:block">
        <table className="min-w-full border-collapse bg-white text-left text-sm">
          <thead className="bg-[#f1e6da] text-xs tracking-[0.1em] uppercase">
            <tr><th className="px-4 py-3">Guest name</th><th className="px-4 py-3">Attendance</th><th className="px-4 py-3">Submitted at</th></tr>
          </thead>
          <tbody>
            {visible.map((response) => (
              <tr key={response.id} className="border-t border-[#eadfce]">
                <td className="px-4 py-4 font-semibold">{response.guestName}</td>
                <td className="px-4 py-4">{response.attendance === "attending" ? "Accepting" : "Declining"}</td>
                <td className="whitespace-nowrap px-4 py-4">{submittedAt(response.submittedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visible.length === 0 ? <p className="border border-[#d9c8ba] bg-white p-6 text-center text-sm text-[#745f62]">No responses match these filters.</p> : null}
    </section>
  );
}
