import Image from "next/image";
import { isPendingApproval, type WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { VenueMap } from "@/components/sections/venue-map";

export function VenueSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="venue" aria-labelledby="venue-title" className="bg-[linear-gradient(180deg,#f4e3e9_0%,#fffaf4_100%)] py-[var(--wedding-spacing-section)]">
      <Container>
        <SectionHeading id="venue-title" eyebrow="Wedding locations" title="Where We Celebrate" align="center" titleStyle="script" />
        <div className="mx-auto mt-14 grid max-w-6xl items-start gap-6 md:grid-cols-2 lg:gap-8">
          {wedding.events.map((event) => (
            <article key={event.id} className="overflow-hidden border border-[#cdbca8] bg-[#f8f0e6] shadow-[0_1.5rem_4rem_rgba(74,41,38,0.08)]">
              {event.image ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-[#d8c8b5]">
                  <Image
                    src={event.image.src}
                    alt={event.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                    style={{ objectPosition: event.image.focalPosition }}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(38,10,19,0.34)_100%)]" />
                  <p className="absolute right-6 bottom-5 left-6 font-sans text-[0.62rem] font-semibold tracking-[0.24em] text-white uppercase drop-shadow-md">
                    {event.title}
                  </p>
                </div>
              ) : null}

              <div className="px-7 py-9 text-center sm:px-10 sm:py-11">
                {!event.image ? <p className="font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-accent uppercase">{event.title}</p> : null}
                <h3 className={`${event.image ? "" : "mt-5"} font-serif text-4xl leading-tight text-primary`}>{event.venue}</h3>
                {!isPendingApproval(event.location) ? <p className="mx-auto mt-4 font-sans text-xs font-semibold tracking-[0.12em] text-accent uppercase">{event.location}</p> : null}
                {!isPendingApproval(event.address) ? <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-7 text-muted">{event.address}</p> : null}
                {event.notes && !isPendingApproval(event.notes) ? <p className="mx-auto mt-3 font-serif text-base text-muted italic">{event.notes}</p> : null}
                {event.directionsUrl ? (
                  <a
                    href={event.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex min-h-12 items-center justify-center border border-primary bg-primary px-7 font-sans text-[0.66rem] font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:bg-transparent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    Get directions <span aria-hidden="true" className="ml-3 text-accent">↗</span>
                  </a>
                ) : null}
              </div>

              {event.mapEmbedUrl ? <VenueMap id={event.id} title={event.venue} embedUrl={event.mapEmbedUrl} /> : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
