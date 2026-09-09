import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventsSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="events" aria-labelledby="events-title" className="bg-[#310b17] py-[var(--wedding-spacing-section)] text-white">
      <Container>
        <SectionHeading id="events-title" eyebrow="The wedding" title="Celebrate with us" description="EVENT_DETAILS_INTRODUCTION" inverse />
        <div className="mt-14 grid border-t border-white/15 md:grid-cols-2">
          {wedding.events.map((event, index) => (
            <article key={event.id} className="relative border-b border-white/15 py-10 md:border-b-0 md:px-10 md:py-14 md:first:pl-0 md:last:border-l md:last:pr-0">
              <span className="font-sans text-[0.62rem] tracking-[0.22em] text-[#d7b66e] uppercase">0{index + 1}</span>
              <h3 className="mt-7 font-serif text-5xl leading-none sm:text-6xl">{event.title}</h3>
              <p className="mt-8 font-sans text-xs tracking-[0.18em] text-[#d7b66e] uppercase">{event.dateTime}</p>
              <p className="mt-6 font-serif text-2xl">{event.venue}</p>
              <p className="mt-2 max-w-md font-sans text-sm leading-7 text-white/60">{event.address}</p>
              {event.notes ? <p className="mt-5 font-serif text-lg text-white/70 italic">{event.notes}</p> : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
