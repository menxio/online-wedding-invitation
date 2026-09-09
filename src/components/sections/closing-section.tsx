import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";

export function ClosingSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <footer id="closing" className="bg-[#f4eadf] py-20 text-center sm:py-28">
      <Container className="max-w-4xl">
        <p className="font-script text-5xl text-accent sm:text-7xl">Thank you</p>
        <p className="mx-auto mt-7 max-w-xl font-serif text-2xl leading-10 text-primary">{wedding.closing.message}</p>
        <p className="mt-10 font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-muted uppercase">{wedding.closing.contact}</p>
        <div className="mx-auto mt-12 h-px max-w-24 bg-accent/60" />
        <p className="mt-8 font-serif text-3xl text-primary">{wedding.couple.initials}</p>
      </Container>
    </footer>
  );
}
