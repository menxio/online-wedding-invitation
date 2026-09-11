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
    <section id="countdown" aria-labelledby="countdown-title" className="border-y border-[#eadfce] bg-[#fffaf4] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] text-primary uppercase">Until we say I do</p>
        <h2 id="countdown-title" className="sr-only">Wedding countdown</h2>
        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-8" aria-live="polite">
          {values.map((value, index) => (
            <div key={["days", "hours", "minutes", "seconds"][index]} className="border-l border-[#d8c5af] first:border-l-0">
              <span className="block font-serif text-[clamp(2.1rem,8vw,4.75rem)] leading-none text-primary tabular-nums">{value}</span>
              <span className="mt-2 block font-sans text-[0.55rem] tracking-[0.16em] text-muted uppercase sm:text-[0.65rem]">
                {["Days", "Hours", "Minutes", "Seconds"][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
