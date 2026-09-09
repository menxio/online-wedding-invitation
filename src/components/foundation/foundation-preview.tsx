import { Container } from "@/components/layout/container";
import type { SectionsConfig, WeddingConfig } from "@/config";

type FoundationPreviewProps = {
  wedding: WeddingConfig;
  sections: SectionsConfig;
};

export function FoundationPreview({ wedding, sections }: FoundationPreviewProps) {
  const enabledSections = sections.order.filter((id) => sections.enabled[id]);

  return (
    <main className="flex min-h-screen items-center bg-background py-16 text-foreground">
      <Container className="max-w-4xl">
        <p className="mb-6 font-sans text-xs font-semibold tracking-[0.28em] text-accent uppercase">
          Foundation checkpoint
        </p>
        <h1 className="font-serif text-5xl leading-[0.92] font-medium tracking-[-0.04em] sm:text-7xl lg:text-8xl">
          {wedding.couple.partnerA}
          <span className="mx-[0.18em] font-normal text-accent italic">&amp;</span>
          {wedding.couple.partnerB}
        </h1>
        <p className="mt-8 max-w-2xl font-sans text-base leading-7 text-muted sm:text-lg">
          The project foundation is ready for visual direction. All wedding facts remain explicit placeholders.
        </p>
        <div className="mt-12 border-t border-border pt-6">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase">
            Enabled section plan
          </h2>
          <ol className="mt-5 flex flex-wrap gap-x-6 gap-y-3" aria-label="Enabled invitation sections">
            {enabledSections.map((section, index) => (
              <li key={section} className="font-serif text-xl text-muted">
                <span className="mr-2 font-sans text-xs text-accent" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </main>
  );
}
