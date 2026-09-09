import type { SectionsConfig, WeddingConfig } from "@/config";

const navigationLabels = {
  invitation: "Invitation",
  events: "Details",
  venue: "Venue",
  gallery: "Gallery",
  rsvp: "RSVP",
  story: "Story",
  dressCode: "Attire",
  entourage: "Entourage",
  faq: "FAQ",
} as const;

type SiteNavigationProps = {
  wedding: WeddingConfig;
  sections: SectionsConfig;
};

export function SiteNavigation({ wedding, sections }: SiteNavigationProps) {
  const links = sections.order.filter(
    (id): id is keyof typeof navigationLabels => id in navigationLabels && sections.enabled[id],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#260a13]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#hero" className="max-w-[65vw] truncate font-serif text-xl tracking-[0.08em] text-white sm:text-2xl" aria-label="Return to invitation top">
          {wedding.couple.initials}
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Wedding invitation">
          {links.map((id) => (
            <a key={id} href={`#${id}`} className="font-sans text-[0.68rem] font-semibold tracking-[0.18em] text-white/75 uppercase transition-colors hover:text-white">
              {navigationLabels[id]}
            </a>
          ))}
        </nav>
        <details className="group relative md:hidden">
          <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center font-sans text-xs tracking-[0.16em] uppercase">
            Menu
          </summary>
          <nav className="absolute top-12 right-0 min-w-52 border border-white/10 bg-[#260a13] p-3 shadow-2xl" aria-label="Mobile wedding invitation">
            {links.map((id) => (
              <a key={id} href={`#${id}`} className="block px-4 py-3 font-sans text-xs tracking-[0.16em] text-white/80 uppercase hover:bg-white/5 hover:text-white">
                {navigationLabels[id]}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
