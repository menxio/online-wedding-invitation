"use client";

import Image from "next/image";
import { Monogram } from "@/components/brand/monogram";
import { FallingPetals } from "@/components/effects/falling-petals";
import { isPendingApproval, type WeddingConfig } from "@/config";

export function OpeningSection({ wedding }: { wedding: WeddingConfig }) {
  function openInvitation() {
    window.dispatchEvent(new Event("wedding:open-invitation"));
  }

  return (
    <section id="opening" className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-[#260a13] px-5 py-16 text-center text-white">
      {wedding.opening.image ? (
        <Image
          src={wedding.opening.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover scale-[1.02]"
          style={{ objectPosition: wedding.opening.image.focalPosition }}
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(31,6,14,.88)_0%,rgba(38,7,17,.68)_48%,rgba(31,6,14,.9)_100%)]" />
      <FallingPetals />
      <div className="pointer-events-none absolute inset-5 z-30 border border-[#d7b66e]/35 sm:inset-8" aria-hidden="true" />
      <div className="relative z-30 flex w-full max-w-xl flex-col items-center animate-[invitation-enter_900ms_ease-out_both]">
        <p className="font-sans text-[0.62rem] font-semibold tracking-[0.34em] text-[#f0d698] uppercase">Wedding invitation</p>
        <Monogram initials={wedding.couple.initials} className="mt-4 w-[min(76vw,25rem)] text-[#d7b66e] drop-shadow-[0_1rem_2.5rem_rgba(20,0,7,.45)]" />
        {!isPendingApproval(wedding.hero.announcement) ? (
          <p className="-mt-3 max-w-sm font-serif text-lg leading-8 text-white/75 italic sm:text-xl">{wedding.hero.announcement}</p>
        ) : null}
        <a href="#hero" onClick={openInvitation} className="mt-8 inline-flex min-h-12 items-center justify-center border border-[#d7b66e] bg-[#260a13]/25 px-8 font-sans text-[0.68rem] font-semibold tracking-[0.24em] text-[#fff9f1] uppercase backdrop-blur-sm transition-colors hover:bg-[#d7b66e] hover:text-[#260a13]">
          Open invitation
        </a>
      </div>
    </section>
  );
}
