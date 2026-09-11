import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";

export function RsvpSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="relative overflow-hidden bg-[#260a13] py-[var(--wedding-spacing-section)] text-center text-white">
      <div className="pointer-events-none absolute inset-6 border border-[#d7b66e]/20 sm:inset-10" aria-hidden="true" />
      <Container className="relative max-w-3xl">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.3em] text-[#d7b66e] uppercase">Private household RSVP</p>
        <h2 id="rsvp-title" className="mt-5 font-serif text-[clamp(4rem,13vw,8rem)] leading-[0.82] tracking-[-0.05em]">RSVP</h2>
        <div className="mx-auto mt-10 max-w-lg border border-white/15 bg-white/5 p-6 sm:p-8">
          <p className="font-serif text-xl leading-8 text-white/75">Secure invitation access is not available yet.</p>
          <button type="button" disabled className="mt-6 min-h-13 w-full border border-[#d7b66e] bg-[#d7b66e] px-6 font-sans text-xs font-semibold tracking-[0.18em] text-[#260a13] uppercase disabled:cursor-not-allowed disabled:opacity-70">
            RSVP setup pending
          </button>
        </div>
        <p className="mt-6 font-sans text-[0.65rem] tracking-[0.16em] text-white/50 uppercase">Respond by {wedding.rsvp.deadline}</p>
      </Container>
    </section>
  );
}
