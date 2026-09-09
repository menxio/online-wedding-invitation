import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function VenueSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="venue" aria-labelledby="venue-title" className="bg-[#e9ddce] py-[var(--wedding-spacing-section)]">
      <Container>
        <SectionHeading id="venue-title" eyebrow="Find your way" title="Places of joy" description="VENUE_INTRODUCTION" align="center" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden bg-[#cdbca8] md:grid-cols-2">
          {wedding.events.map((event) => (
            <article key={event.id} className="bg-[#f8f0e6] p-8 text-center sm:p-12">
              <p className="font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-accent uppercase">{event.title}</p>
              <h3 className="mt-5 font-serif text-4xl leading-tight text-primary">{event.venue}</h3>
              <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-7 text-muted">{event.address}</p>
              {event.directionsUrl ? (
                <a href={event.directionsUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center border-b border-primary px-2 font-sans text-xs font-semibold tracking-[0.18em] text-primary uppercase">Get directions</a>
              ) : (
                <span className="mt-8 inline-flex min-h-12 items-center border-b border-muted/40 px-2 font-sans text-xs tracking-[0.18em] text-muted uppercase">Map link pending</span>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
