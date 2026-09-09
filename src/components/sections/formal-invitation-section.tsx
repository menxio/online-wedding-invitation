import type { WeddingConfig } from "@/config";
import { SectionShell } from "@/components/layout/section-shell";

export function FormalInvitationSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <SectionShell id="invitation" labelledBy="invitation-title" className="relative overflow-hidden bg-background text-center">
      <div className="pointer-events-none absolute top-16 left-[8%] font-script text-8xl text-primary/5" aria-hidden="true">Love</div>
      <p className="font-sans text-[0.65rem] font-semibold tracking-[0.3em] text-primary uppercase">{wedding.invitation.eyebrow}</p>
      <h2 id="invitation-title" className="mx-auto mt-7 max-w-4xl font-serif text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.82] font-medium tracking-[-0.05em] text-primary">
        You are invited
      </h2>
      <div className="mx-auto my-9 flex max-w-xs items-center gap-4 text-accent" aria-hidden="true">
        <span className="h-px flex-1 bg-current/50" /><span className="font-serif text-2xl">✦</span><span className="h-px flex-1 bg-current/50" />
      </div>
      <p className="mx-auto max-w-2xl font-serif text-xl leading-9 text-muted sm:text-2xl sm:leading-10">{wedding.invitation.message}</p>
      <p className="mt-10 font-script text-4xl text-accent">With love</p>
    </SectionShell>
  );
}
