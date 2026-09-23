"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/countdown";

export function CountdownSection({ target }: { target: string }) {
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>({
    status: "placeholder",
  });

  useEffect(() => {
    if (target === "WEDDING_DATE" || target === "NEEDS COUPLE APPROVAL") return;

    const updateCountdown = () => setCountdown(getCountdown(target));
    const initialTick = window.setTimeout(updateCountdown, 0);
    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(timer);
    };
  }, [target]);

  const values = countdown.status === "placeholder"
    ? ["--", "--", "--", "--"]
    : [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="border-y border-[#efcdd8] bg-[linear-gradient(90deg,#fffaf4_0%,#f4e3e9_50%,#fffaf4_100%)] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-sans text-[0.68rem] font-semibold tracking-[0.3em] text-[#b54870] uppercase">Save the date</p>
        <div aria-hidden="true" className="mx-auto mt-4 flex items-center justify-center gap-3 text-accent">
          <span className="h-px w-14 bg-current/55" />
          <span className="text-sm leading-none">&hearts;</span>
          <span className="h-px w-14 bg-current/55" />
        </div>
        <h2 id="countdown-title" className="mt-4 font-script text-[clamp(3.25rem,8vw,6rem)] leading-[1.05] font-normal text-accent">
          Counting Down to Our Special Day
        </h2>
        <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-8" aria-live="polite">
          {values.map((value, index) => (
            <div key={["days", "hours", "minutes", "seconds"][index]} className="border-l border-[#efcdd8] first:border-l-0">
              <span className="block font-serif text-[clamp(2.1rem,8vw,4.75rem)] leading-none text-primary tabular-nums">{value}</span>
              <span className="mt-2 block font-sans text-[0.55rem] tracking-[0.16em] text-[#b54870] uppercase sm:text-[0.65rem]">
                {["Days", "Hours", "Minutes", "Seconds"][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
