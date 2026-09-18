import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function DetailsSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section
      id="details"
      aria-labelledby="details-title"
      className="relative overflow-hidden bg-[#260a13] py-[var(--wedding-spacing-section)] text-white"
    >
      <div aria-hidden="true" className="absolute inset-5 border border-[#d7b66e]/20 sm:inset-8" />
      <Container className="relative">
        <SectionHeading
          id="details-title"
          eyebrow={wedding.details.eyebrow}
          title={wedding.details.title}
          description={wedding.details.introduction}
          align="center"
          inverse
        />

        <ol className="mx-auto mt-14 grid max-w-6xl gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-6">
          {wedding.details.items.map((item, index) => (
            <li
              key={item.title}
              className={`min-h-64 bg-[#260a13] p-8 sm:p-10 ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${index === wedding.details.items.length - 1 ? "md:col-span-2 lg:col-span-3" : ""}`}
            >
              <span className="font-sans text-[0.65rem] font-semibold tracking-[0.25em] text-[#d7b66e] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-serif text-3xl leading-tight text-white">{item.title}</h3>
              <p className="mt-5 font-sans text-sm leading-7 text-white/65">{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
