"use client";

import { useState } from "react";

type VenueMapProps = {
  id: string;
  title: string;
  embedUrl: string;
};

export function VenueMap({ id, title, embedUrl }: VenueMapProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `venue-map-${id}`;

  return (
    <div className="border-t border-[#cdbca8]/65">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-14 w-full items-center justify-between gap-4 px-7 font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-primary uppercase transition-colors hover:bg-[#eadfce] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary sm:px-9"
      >
        <span>{isOpen ? "Hide map" : "View map"}</span>
        <span aria-hidden="true" className="font-serif text-xl font-normal text-accent">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen ? (
        <div id={panelId} role="region" aria-label={`${title} map`} className="aspect-[4/3] border-t border-[#cdbca8]/65 bg-[#e9ddce]">
          <iframe
            src={embedUrl}
            title={`Map showing ${title}`}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0 grayscale-[18%] sepia-[8%]"
          />
        </div>
      ) : null}
    </div>
  );
}
