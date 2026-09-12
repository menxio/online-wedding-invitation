import Link from "next/link";
import type { ReactNode } from "react";
import { Monogram } from "@/components/brand/monogram";
import { weddingConfig } from "@/config";

export function RsvpShell({ children, eyebrow = "Michael & Marris · October 17, 2026" }: { children: ReactNode; eyebrow?: string }) {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#260a13] px-4 py-5 text-[#fff9ef] sm:px-8 sm:py-8">
      <div className="mx-auto min-h-[calc(100svh-2.5rem)] min-w-0 max-w-5xl border border-[#d7b66e]/35 px-5 py-8 sm:min-h-[calc(100svh-4rem)] sm:px-10 sm:py-10">
        <header className="flex min-w-0 items-center justify-between gap-3 sm:gap-5">
          <Link href="/" aria-label="Return to the wedding invitation" className="shrink-0"><Monogram initials={weddingConfig.couple.initials} compact className="w-20" /></Link>
          <p className="min-w-0 max-w-36 text-right font-sans text-[0.52rem] leading-4 font-semibold tracking-[0.14em] text-[#d7b66e] uppercase sm:max-w-none sm:text-[0.58rem] sm:tracking-[0.24em]">{eyebrow}</p>
        </header>
        {children}
      </div>
    </main>
  );
}
