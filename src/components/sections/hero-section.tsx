import Image from "next/image";
import type { WeddingConfig } from "@/config";

export function HeroSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="hero" className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#2a1118] text-white">
      {wedding.hero.image ? (
        <Image
          src={wedding.hero.image.src}
          alt={wedding.hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: wedding.hero.image.focalPosition }}
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,9,16,.82)_0%,rgba(34,9,16,.28)_45%,rgba(34,9,16,.78)_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-[90rem] flex-col items-center justify-between px-5 py-10 text-center sm:px-8 sm:py-14">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.3em] text-[#f0d698] uppercase">Save the date</p>
        <div className="w-full max-w-6xl">
          <p className="font-script text-[clamp(2.25rem,7vw,5rem)] leading-none text-[#f0d698]">Together, always</p>
          <h1 className="mt-2 font-serif text-[clamp(3.4rem,11vw,9rem)] leading-[0.78] font-medium tracking-[-0.055em] text-balance [overflow-wrap:anywhere]">
            <span className="block">{wedding.couple.partnerA}</span>
            <span className="my-2 block font-script text-[0.48em] font-normal tracking-normal text-[#f0d698]">and</span>
            <span className="block">{wedding.couple.partnerB}</span>
          </h1>
        </div>
        <div className="flex flex-col items-center gap-5">
          <p className="font-sans text-xs font-semibold tracking-[0.24em] uppercase">{wedding.dateTime}</p>
          <a href="#invitation" className="inline-flex min-h-12 items-center justify-center border-b border-[#f0d698] px-2 font-sans text-[0.68rem] font-semibold tracking-[0.2em] uppercase">
            Discover our day
          </a>
        </div>
      </div>
    </section>
  );
}
