import Image from "next/image";
import type { WeddingConfig } from "@/config";
import { FallingPetals } from "@/components/effects/falling-petals";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function StorySection({ wedding }: { wedding: WeddingConfig }) {
  if (!wedding.story) return null;

  const closingParagraph = wedding.story.paragraphs.at(-1);
  const narrativeParagraphs = wedding.story.paragraphs.slice(0, -1);
  const openingParagraphs = narrativeParagraphs.slice(0, 3);
  const remainingParagraphs = narrativeParagraphs.slice(3);
  const storyImages = wedding.story.images.length > 0
    ? wedding.story.images
    : wedding.story.image
      ? [wedding.story.image]
      : [];

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative isolate overflow-hidden bg-[#fbf4ec] py-[var(--wedding-spacing-section)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(214,159,162,0.24),transparent_68%)]"
      />
      <div aria-hidden="true" className="absolute top-24 -left-28 -z-10 size-72 rounded-full border border-[#d69fa2]/20" />
      <div aria-hidden="true" className="absolute -right-36 bottom-20 -z-10 size-96 rounded-full border border-[#b78a3b]/15" />
      <FallingPetals density="sparse" className="opacity-20" />

      <Container className="relative z-30 max-w-6xl">
        <article className="mx-auto max-w-5xl">
          <div className="text-center">
            <SectionHeading id="story-title" eyebrow="How it began" title={wedding.story.heading} align="center" />
            <div aria-hidden="true" className="mx-auto mt-8 flex items-center justify-center gap-3 text-accent">
              <span className="h-px w-14 bg-current/45" />
              <span className="size-2 rotate-45 border border-current" />
              <span className="h-px w-14 bg-current/45" />
            </div>
          </div>

          <div className="mt-12 border-y border-border bg-white/45 px-6 py-10 shadow-[0_24px_70px_rgba(73,34,42,0.06)] sm:px-10 sm:py-12 lg:px-14">
            <div className="space-y-6 font-serif text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              {openingParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            {storyImages.length > 0 ? (
              <figure className="my-12 sm:my-14">
                <figcaption className="mb-6 flex items-center gap-4 font-sans text-[0.65rem] font-semibold tracking-[0.28em] text-accent uppercase">
                  <span className="h-px flex-1 bg-border" />
                  Through the years
                  <span className="h-px flex-1 bg-border" />
                </figcaption>
                <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4">
                  {storyImages.map((image, index) => (
                    <li
                      key={image.src}
                      className={`group relative aspect-[4/3] overflow-hidden border-[5px] border-white bg-[#ead8c6] shadow-[0_10px_28px_rgba(73,34,42,0.12)] ${
                        storyImages.length % 2 === 1 && index === storyImages.length - 1
                          ? "max-sm:col-span-2 max-sm:mx-auto max-sm:w-1/2"
                          : ""
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 639px) 42vw, 27vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        style={{ objectPosition: image.focalPosition }}
                      />
                    </li>
                  ))}
                </ul>
              </figure>
            ) : null}

            {remainingParagraphs.length > 0 ? (
              <div className="space-y-6 font-serif text-lg leading-8 text-muted sm:text-xl sm:leading-9">
                {remainingParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : null}

            {closingParagraph ? (
              <p className="mt-10 border-l-2 border-accent pl-6 font-serif text-2xl leading-9 text-primary italic sm:text-3xl sm:leading-10">
                {closingParagraph}
              </p>
            ) : null}
          </div>
        </article>
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
        className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(222,110,155,0.20),transparent_68%)]"
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

        <aside className="mx-auto mt-16 max-w-4xl border-y border-[#de6e9b]/35 bg-white/50 px-6 py-9 text-center shadow-[0_18px_45px_rgba(222,110,155,0.08)] sm:px-12 sm:py-11">
          <div aria-hidden="true" className="mx-auto flex items-center justify-center gap-3 text-accent">
            <span className="h-px w-14 bg-current/45" />
            <span className="text-base leading-none">&hearts;</span>
            <span className="h-px w-14 bg-current/45" />
          </div>
          <p className="mt-5 font-sans text-[0.65rem] font-semibold tracking-[0.3em] text-[#c84f7c] uppercase">
            {wedding.dressCode.reminder.title}
          </p>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-xl leading-8 text-primary italic sm:text-2xl sm:leading-9">
            {wedding.dressCode.reminder.message}
          </p>
        </aside>

        <ul className="mx-auto mt-20 grid max-w-6xl gap-5 sm:grid-cols-2 lg:gap-7">
          {wedding.dressCode.guidance.map((item) => (
            <li
              key={`${item.audience}-${item.title}`}
              className="group overflow-hidden border border-border bg-white/55 shadow-[0_20px_55px_rgba(73,34,42,0.08)]"
            >
              <div className="relative isolate flex h-80 items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(222,110,155,0.18),transparent_58%),linear-gradient(180deg,#fffaf4_0%,#f6e8ee_100%)] px-5 pt-7 sm:h-[25rem]">
                <div aria-hidden="true" className="absolute inset-4 -z-10 border border-[#b78a3b]/15" />
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(max-width: 639px) 86vw, (max-width: 1023px) 44vw, 34rem"
                  className="h-full w-full object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="border-t border-border px-7 py-7 text-center sm:px-10 sm:py-9">
                <p className="font-sans text-[0.62rem] font-semibold tracking-[0.24em] text-accent uppercase">
                  {item.audience}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-primary sm:text-4xl">{item.title}</h3>
                <p className="mx-auto mt-4 max-w-md font-serif text-lg leading-8 text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

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
