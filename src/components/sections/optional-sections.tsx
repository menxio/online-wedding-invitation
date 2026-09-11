import Image from "next/image";
import type { WeddingConfig } from "@/config";
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
    <section id="dressCode" aria-labelledby="dress-code-title" className="bg-[#f4eadf] py-[var(--wedding-spacing-section)]">
      <Container>
        <SectionHeading id="dress-code-title" eyebrow="Wedding attire" title={wedding.dressCode.title} description={wedding.dressCode.description} align="center" />
        <ul className="mt-12 flex flex-wrap justify-center gap-8">
          {wedding.dressCode.colors.map((color) => <li key={color.value} className="text-center"><span className="mx-auto block size-20 rounded-full border border-black/10" style={{ backgroundColor: color.value }} /><span className="mt-3 block font-serif text-lg">{color.name}</span></li>)}
        </ul>
      </Container>
    </section>
  );
}

export function EntourageSection({ wedding }: { wedding: WeddingConfig }) {
  if (wedding.entourage.length === 0) return null;
  return (
    <section id="entourage" aria-labelledby="entourage-title" className="bg-[#191719] py-[var(--wedding-spacing-section)] text-white">
      <Container>
        <SectionHeading id="entourage-title" eyebrow="Family & friends" title="Wedding entourage" inverse />
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {wedding.entourage.map((group) => {
            const isLargeGroup = group.names.length > 8;

            return (
              <div key={group.role} className={`border-t border-white/15 pt-6 ${isLargeGroup ? "sm:col-span-2" : ""}`}>
                <h3 className="font-sans text-xs tracking-[0.18em] text-accent uppercase">{group.role}</h3>
                <ul className={`mt-5 grid gap-x-10 gap-y-2 font-serif text-xl leading-8 text-white/80 sm:text-2xl ${isLargeGroup ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
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
        <div className="mt-12 border-t border-border">{wedding.faq.map((item) => <details key={item.question} className="group border-b border-border py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl"><span>{item.question}</span><span aria-hidden="true" className="text-accent group-open:rotate-45">+</span></summary><p className="pb-3 pr-10 font-sans text-sm leading-7 text-muted">{item.answer}</p></details>)}</div>
      </Container>
    </section>
  );
}
