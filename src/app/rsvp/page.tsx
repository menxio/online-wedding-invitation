import type { Metadata } from "next";
import { RsvpForm } from "@/components/rsvp/rsvp-form";
import { RsvpShell } from "@/components/rsvp/rsvp-shell";
import { weddingConfig } from "@/config";
import { getTurnstileSiteKey } from "@/lib/turnstile/config";

export const metadata: Metadata = { title: "RSVP", robots: { index: false, follow: false, nocache: true } };
export const dynamic = "force-dynamic";

export default function RsvpPage() {
  return (
    <RsvpShell>
      <section className="mx-auto min-w-0 max-w-2xl py-14 text-center sm:py-20">
        <p className="font-script text-4xl text-[#d7b66e] sm:text-5xl">Kindly respond</p>
        <h1 className="mt-4 font-serif text-[clamp(3.2rem,13vw,6.5rem)] leading-[0.9] tracking-[-0.04em] text-balance">Your RSVP</h1>
        <p className="mx-auto mt-7 max-w-lg border-y border-white/15 py-5 font-serif text-xl leading-8 text-white/78">{weddingConfig.rsvp.copy.seatNotice}</p>
        <RsvpForm
          confirmationCopy={weddingConfig.rsvp.copy.confirmation}
          turnstileSiteKey={getTurnstileSiteKey()}
        />
      </section>
    </RsvpShell>
  );
}
