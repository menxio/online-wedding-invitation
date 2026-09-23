import Image from "next/image";
import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function GiftGuideSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section
      id="giftGuide"
      aria-labelledby="gift-guide-title"
      className="bg-[linear-gradient(135deg,#fffaf4_0%,#f4e3e9_58%,#efcdd8_140%)] py-[var(--wedding-spacing-section)]"
    >
      <Container>
        <div className="mx-auto max-w-5xl border border-border bg-surface px-6 py-14 shadow-[var(--wedding-shadow-soft)] sm:px-12 lg:px-20 lg:py-20">
          <SectionHeading
            id="gift-guide-title"
            eyebrow={wedding.giftGuide.eyebrow}
            title={wedding.giftGuide.title}
            description={wedding.giftGuide.message}
            align="center"
            titleStyle="script"
          />

          {wedding.giftGuide.accounts.length > 0 ? (
            <ul
              className={`mx-auto mt-12 grid gap-8 ${
                wedding.giftGuide.accounts.length === 1
                  ? "max-w-md"
                  : "max-w-3xl sm:grid-cols-2"
              }`}
            >
              {wedding.giftGuide.accounts.map((account) => (
                <li
                  key={account.label}
                  className="relative border border-[#c99b52]/45 bg-[#fffaf4] p-3 text-center shadow-[0_22px_55px_rgba(47,10,22,0.10)] sm:p-5"
                >
                  <div className="border border-border/70 bg-white p-2 sm:p-3">
                    <Image
                      src={account.image.src}
                      alt={account.image.alt}
                      width={account.image.width}
                      height={account.image.height}
                      sizes="(max-width: 639px) calc(100vw - 5rem), 24rem"
                      className="mx-auto h-auto w-full object-contain"
                    />
                  </div>
                  <div className="px-4 pb-3 pt-6">
                    <p className="font-sans text-[0.68rem] font-semibold tracking-[0.24em] text-accent uppercase">
                      Bank transfer
                    </p>
                    <p className="mt-2 font-serif text-2xl text-primary">{account.label}</p>
                    <p className="mt-3 font-sans text-sm leading-6 text-muted-foreground">
                      Scan using your preferred banking or payment app.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
