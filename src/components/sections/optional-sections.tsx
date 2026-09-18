import Image from "next/image";
import type { WeddingConfig } from "@/config";
import { FallingPetals } from "@/components/effects/falling-petals";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function StorySection({ wedding }: { wedding: WeddingConfig }) {
  if (!wedding.story) return null;
  return (
    <section id="story" aria-labelledby="story-title" className="bg-background py-[var(--wedding-spacing-section)]">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id="story-title" eyebrow="How it began" title={wedding.story.heading} />
          <div className="mt-8 space-y-5 font-serif text-xl leading-9 text-muted">
            {wedding.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        {wedding.story.image ? <Image src={wedding.story.image.src} alt={wedding.story.image.alt} width={wedding.story.image.width} height={wedding.story.image.height} sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto w-full" /> : null}
      </Container>
    </section>
  );
}

export function DressCodeSection({ wedding }: { wedding: WeddingConfig }) {
  if (!wedding.dressCode) return null;

  return (
    <section
      id="dressCode"
      aria-labelledby="dress-code-title"
      className="relative isolate overflow-hidden bg-[#fbf4ec] py-[var(--wedding-spacing-section)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(214,159,162,0.22),transparent_68%)]"
      />
      <div aria-hidden="true" className="absolute top-16 -left-24 -z-10 size-64 rounded-full border border-[#d69fa2]/20" />
      <div aria-hidden="true" className="absolute -right-32 bottom-10 -z-10 size-80 rounded-full border border-[#b78a3b]/15" />

      <Container className="max-w-7xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="font-sans text-[0.68rem] font-semibold tracking-[0.36em] text-primary uppercase">
            Wedding attire
          </p>
          <h2
            id="dress-code-title"
            className="mt-5 font-serif text-[clamp(4rem,10vw,8.5rem)] leading-[0.82] font-medium tracking-[-0.055em] text-[#2b1117] uppercase"
          >
            {wedding.dressCode.title}
          </h2>
          <p className="mt-8 max-w-2xl font-serif text-lg leading-8 text-muted sm:text-xl">
            {wedding.dressCode.description}
          </p>
          <div aria-hidden="true" className="mt-10 flex items-center gap-3 text-accent">
            <span className="h-px w-16 bg-current/45" />
            <span className="size-2 rotate-45 border border-current" />
            <span className="h-px w-16 bg-current/45" />
          </div>
        </div>

        <ul className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-center gap-x-7 gap-y-12 sm:gap-x-10 lg:gap-x-12">
          {wedding.dressCode.colors.map((color) => (
            <li key={color.value} className="group w-32 text-center sm:w-36">
              <div className={`relative mx-auto grid size-28 place-items-center rounded-full border p-1.5 shadow-[0_1rem_2.5rem_rgba(73,34,42,0.10)] transition-transform duration-300 group-hover:-translate-y-1 sm:size-32 ${color.featured ? "border-accent" : "border-[#7c4c55]/20"}`}>
                <span
                  className="block size-full rounded-full border border-white/60"
                  style={{ backgroundColor: color.value }}
                  aria-hidden="true"
                />
                {color.featured ? (
                  <span className="absolute -top-3 bg-[#fbf4ec] px-2 font-sans text-[0.55rem] font-semibold tracking-[0.18em] text-accent uppercase">
                    Primary
                  </span>
                ) : null}
              </div>
              <span className="mt-5 block font-serif text-xl text-[#2b1117]">{color.name}</span>
              <span className="mt-1 block font-sans text-[0.62rem] tracking-[0.16em] text-muted uppercase">
                {color.value}
              </span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-20 grid max-w-5xl border-y border-border md:grid-cols-2">
          {wedding.dressCode.guidance.map((item, index) => (
            <div key={item.title} className={`px-6 py-10 text-center sm:px-12 ${index > 0 ? "border-t border-border md:border-t-0 md:border-l" : ""}`}>
              <h3 className="font-serif text-3xl text-primary">{item.title}</h3>
              <p className="mx-auto mt-4 max-w-md font-serif text-lg leading-8 text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-9 text-center font-sans text-[0.62rem] font-semibold tracking-[0.28em] text-primary uppercase">
          Formal attire <span aria-hidden="true" className="px-2 text-accent">•</span> {wedding.motif.name}
        </p>
      </Container>
    </section>
  );
}

export function EntourageSection({ wedding }: { wedding: WeddingConfig }) {
  if (wedding.entourage.length === 0) return null;

  return (
    <section
      id="entourage"
      aria-labelledby="entourage-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(170,115,125,0.20),transparent_30%),radial-gradient(circle_at_88%_92%,rgba(183,138,59,0.10),transparent_32%),linear-gradient(145deg,#151215_0%,#2b0c17_48%,#171316_100%)] py-[var(--wedding-spacing-section)] text-white"
    >
      <div aria-hidden="true" className="absolute inset-5 -z-10 border border-[#d7b66e]/15 sm:inset-8" />
      <FallingPetals density="sparse" className="opacity-45" />

      <Container className="relative z-30">
        <div className="max-w-5xl">
          <SectionHeading id="entourage-title" eyebrow="Family & friends" title="Wedding entourage" inverse />
          <p className="mt-8 max-w-2xl font-serif text-xl leading-8 text-white/60">
            With love and gratitude, we celebrate alongside the family and friends who have guided and supported us.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
          {wedding.entourage.map((group) => {
            const isLargeGroup = group.names.length > 8;

            return (
              <div key={group.role} className={`bg-[#171316]/82 p-7 backdrop-blur-[2px] sm:p-10 ${isLargeGroup ? "sm:col-span-2" : ""}`}>
                <div aria-hidden="true" className="mb-6 h-px w-10 bg-[#d7b66e]/70" />
                <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.22em] text-[#d7b66e] uppercase">{group.role}</h3>
                <ul className={`mt-6 grid gap-x-10 gap-y-2.5 font-serif text-xl leading-8 text-white/78 sm:text-2xl ${isLargeGroup ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
                  {group.names.map((name) => <li key={name}>{name}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function FaqSection({ wedding }: { wedding: WeddingConfig }) {
  if (wedding.faq.length === 0) return null;
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-background py-[var(--wedding-spacing-section)]">
      <Container className="max-w-4xl">
        <SectionHeading id="faq-title" eyebrow="Good to know" title="Frequently asked" align="center" />
        <div className="mt-12 border-t border-border">{wedding.faq.map((item) => <details key={item.question} className="group border-b border-border py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><span>{item.question}</span><span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span></summary><p className="pb-3 pr-10 font-sans text-sm leading-7 text-muted">{item.answer}</p></details>)}</div>
      </Container>
    </section>
  );
}
