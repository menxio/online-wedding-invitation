import type { WeddingConfig } from "@/config";

export function OpeningSection({ wedding }: { wedding: WeddingConfig }) {
  const hasPlaceholderInitials = wedding.couple.initials === "COUPLE_INITIALS";

  return (
    <section id="opening" className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-[#260a13] px-5 py-20 text-center text-white">
      <div className="pointer-events-none absolute inset-5 border border-[#c49a4b]/30 sm:inset-8" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[34rem] max-h-[80vw] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c49a4b]/15" aria-hidden="true" />
      <div className="relative animate-[invitation-enter_900ms_ease-out_both]">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.34em] text-[#d7b66e] uppercase">
          A celebration of love
        </p>
        <p
          className={`mx-auto mt-8 max-w-[88vw] font-serif leading-[0.82] tracking-[-0.05em] text-[#fff9f1] [overflow-wrap:anywhere] ${hasPlaceholderInitials ? "text-[clamp(2.8rem,12vw,10rem)]" : "text-[clamp(6rem,24vw,11rem)]"}`}
          aria-label={`${wedding.couple.initials} monogram`}
        >
          {wedding.couple.initials}
        </p>
        <p className="mx-auto mt-5 max-w-sm font-serif text-xl leading-8 text-white/65 italic">
          {wedding.hero.announcement}
        </p>
        <a href="#hero" className="mt-10 inline-flex min-h-12 items-center justify-center border border-[#d7b66e] px-8 font-sans text-[0.68rem] font-semibold tracking-[0.24em] text-[#fff9f1] uppercase transition-colors hover:bg-[#d7b66e] hover:text-[#260a13]">
          Open invitation
        </a>
      </div>
    </section>
  );
}
