import Link from "next/link";
import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";

export function RsvpSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="relative overflow-hidden bg-[#260a13] py-[var(--wedding-spacing-section)] text-center text-white">
      <div className="pointer-events-none absolute inset-6 border border-[#d7b66e]/20 sm:inset-10" aria-hidden="true" />
      <Container className="relative max-w-3xl">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.3em] text-[#d7b66e] uppercase">Kindly respond</p>
        <h2 id="rsvp-title" className="mt-5 font-serif text-[clamp(4rem,13vw,8rem)] leading-[0.82] tracking-[-0.05em]">RSVP</h2>
        <div className="mx-auto mt-10 max-w-lg border border-white/15 bg-white/5 p-6 sm:p-8">
          <p className="font-serif text-xl leading-8 text-white/75">{wedding.rsvp.copy.seatNotice}</p>
          <Link href="/rsvp" className="mt-6 inline-flex min-h-13 w-full items-center justify-center border border-[#d7b66e] bg-[#d7b66e] px-6 font-sans text-xs font-semibold tracking-[0.18em] text-[#260a13] uppercase transition hover:bg-[#ead197]">
            Open RSVP
          </Link>
        </div>
        <p className="mt-6 font-sans text-[0.65rem] tracking-[0.16em] text-white/50 uppercase">Respond by {wedding.rsvp.deadline}</p>
      </Container>
    </section>
  );
}
