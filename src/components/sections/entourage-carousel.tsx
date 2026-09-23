"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { WeddingConfig } from "@/config";

type EntourageGroup = WeddingConfig["entourage"][number];

type EntouragePanel = {
  id: "principal" | "secondary" | "entourage";
  label: string;
  groups: EntourageGroup[];
};

const secondarySponsorRoles = new Set(["Candle Sponsors", "Veil Sponsors", "Cord Sponsors"]);

function createPanels(groups: WeddingConfig["entourage"]): EntouragePanel[] {
  const isPrincipal = ({ role }: EntourageGroup) => role.startsWith("Parents of") || role.startsWith("Principal Sponsors");
  const isSecondary = ({ role }: EntourageGroup) => secondarySponsorRoles.has(role);

  return [
    { id: "principal", label: "Principal Sponsors", groups: groups.filter(isPrincipal) },
    { id: "secondary", label: "Secondary Sponsors", groups: groups.filter(isSecondary) },
    { id: "entourage", label: "Entourage", groups: groups.filter((group) => !isPrincipal(group) && !isSecondary(group)) },
  ];
}

export function EntourageCarousel({ groups }: { groups: WeddingConfig["entourage"] }) {
  const panels = useMemo(() => createPanels(groups), [groups]);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef<number | null>(null);
  const activePanel = panels[activeIndex];

  function selectPanel(index: number) {
    setActiveIndex(Math.min(Math.max(index, 0), panels.length - 1));
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowLeft") {
      nextIndex = Math.max(activeIndex - 1, 0);
    } else if (event.key === "ArrowRight") {
      nextIndex = Math.min(activeIndex + 1, panels.length - 1);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = panels.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    selectPanel(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 45) return;
    selectPanel(distance < 0 ? activeIndex + 1 : activeIndex - 1);
  }

  return (
    <div
      className="mx-auto mt-14 max-w-6xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Wedding entourage"
    >
      <div
        role="tablist"
        aria-label="Entourage categories"
        onKeyDown={handleTabKeyDown}
        className="mx-auto grid max-w-3xl grid-cols-3 overflow-hidden border border-[#efcdd8] bg-white/55"
      >
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`entourage-tab-${panel.id}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`entourage-panel-${panel.id}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => selectPanel(index)}
            className="min-h-14 border-l border-[#efcdd8] px-2 py-3 font-sans text-[0.58rem] font-semibold tracking-[0.13em] text-[#95405f] uppercase transition-colors first:border-l-0 hover:bg-[#f4e3e9]/65 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#b78a3b] aria-selected:bg-[#de6e9b] aria-selected:text-white sm:px-5 sm:text-[0.68rem] sm:tracking-[0.2em]"
          >
            {panel.label}
          </button>
        ))}
      </div>

      <div className="relative mt-7 sm:px-16 lg:px-20">
        <button
          type="button"
          onClick={() => selectPanel(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Show previous entourage category"
          className="absolute top-1/2 left-0 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7afc2] bg-white/75 text-3xl leading-none text-primary shadow-[0_8px_24px_rgba(116,63,79,0.10)] backdrop-blur-sm transition hover:border-[#de6e9b] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b78a3b] disabled:cursor-not-allowed disabled:opacity-25 sm:flex"
        >
          <span aria-hidden="true">&#8249;</span>
        </button>

        <div
          className="touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {panels.map((panel, panelIndex) => (
            <article
              key={panel.id}
              id={`entourage-panel-${panel.id}`}
              role="tabpanel"
              aria-labelledby={`entourage-tab-${panel.id}`}
              aria-roledescription="slide"
              aria-label={`${panelIndex + 1} of ${panels.length}`}
              hidden={activeIndex !== panelIndex}
              className="min-h-[31rem] border border-[#efcdd8] bg-[#fffaf4]/90 px-5 py-10 shadow-[0_24px_70px_rgba(116,63,79,0.13)] backdrop-blur-[3px] sm:px-9 sm:py-12 lg:px-14"
            >
              <p className="text-center font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-[0.08em] text-[#de6e9b] uppercase">
                {panel.label}
              </p>
              <div aria-hidden="true" className="mx-auto mt-5 flex items-center justify-center gap-3 text-accent">
                <span className="h-px w-12 bg-current/50" />
                <span className="text-xs leading-none">&hearts;</span>
                <span className="h-px w-12 bg-current/50" />
              </div>

              <div className={`mt-10 grid gap-x-10 gap-y-10 ${panel.id === "secondary" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {panel.groups.map((group) => (
                  <section key={group.role} className="text-center">
                    <h3 className="font-script text-3xl leading-tight text-[#c6537f] sm:text-4xl">{group.role}</h3>
                    <ul className="mt-3 space-y-1 font-sans text-sm leading-6 text-[#734455] sm:text-base sm:leading-7">
                      {group.names.map((name) => <li key={name}>{name}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => selectPanel(activeIndex + 1)}
          disabled={activeIndex === panels.length - 1}
          aria-label="Show next entourage category"
          className="absolute top-1/2 right-0 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e7afc2] bg-white/75 text-3xl leading-none text-primary shadow-[0_8px_24px_rgba(116,63,79,0.10)] backdrop-blur-sm transition hover:border-[#de6e9b] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b78a3b] disabled:cursor-not-allowed disabled:opacity-25 sm:flex"
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => selectPanel(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Show previous entourage category"
          className="grid size-11 place-items-center rounded-full border border-[#e7afc2] bg-white/65 text-2xl text-primary disabled:opacity-25 sm:hidden"
        >
          <span aria-hidden="true">&#8249;</span>
        </button>

        <div className="flex items-center gap-3" aria-label={`Slide ${activeIndex + 1} of ${panels.length}`}>
          {panels.map((panel, index) => (
            <button
              key={panel.id}
              type="button"
              onClick={() => selectPanel(index)}
              aria-label={`Show ${panel.label}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className="grid size-8 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b78a3b]"
            >
              <span className={`block rounded-full transition-all ${activeIndex === index ? "size-2.5 bg-[#de6e9b]" : "size-2 border border-[#95405f] bg-transparent"}`} />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => selectPanel(activeIndex + 1)}
          disabled={activeIndex === panels.length - 1}
          aria-label="Show next entourage category"
          className="grid size-11 place-items-center rounded-full border border-[#e7afc2] bg-white/65 text-2xl text-primary disabled:opacity-25 sm:hidden"
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>

      <p className="mt-1 text-center font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-[#95405f] uppercase" aria-live="polite">
        {activeIndex + 1} of {panels.length} · {activePanel.label}
      </p>
    </div>
  );
}
