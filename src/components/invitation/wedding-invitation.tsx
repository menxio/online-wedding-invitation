import type { ReactNode } from "react";
import type { SectionId, SectionsConfig, WeddingConfig } from "@/config";
import { ClosingSection } from "@/components/sections/closing-section";
import { CountdownSection } from "@/components/sections/countdown-section";
import { DetailsSection } from "@/components/sections/details-section";
import { EventsSection } from "@/components/sections/events-section";
import { FormalInvitationSection } from "@/components/sections/formal-invitation-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { GiftGuideSection } from "@/components/sections/gift-guide-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MusicControl } from "@/components/sections/music-control";
import { OpeningSection } from "@/components/sections/opening-section";
import { DressCodeSection, EntourageSection, FaqSection, StorySection } from "@/components/sections/optional-sections";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { VenueSection } from "@/components/sections/venue-section";
import { SiteNavigation } from "./site-navigation";

type WeddingInvitationProps = {
  wedding: WeddingConfig;
  sections: SectionsConfig;
};

export function WeddingInvitation({ wedding, sections }: WeddingInvitationProps) {
  const renderedSections: Record<SectionId, ReactNode> = {
    opening: <OpeningSection wedding={wedding} />,
    hero: <HeroSection wedding={wedding} />,
    countdown: <CountdownSection target={wedding.dateTime} />,
    invitation: <FormalInvitationSection wedding={wedding} />,
    story: <StorySection wedding={wedding} />,
    events: <EventsSection wedding={wedding} />,
    venue: <VenueSection wedding={wedding} />,
    details: <DetailsSection wedding={wedding} />,
    dressCode: <DressCodeSection wedding={wedding} />,
    entourage: <EntourageSection wedding={wedding} />,
    gallery: <GallerySection wedding={wedding} />,
    giftGuide: <GiftGuideSection wedding={wedding} />,
    rsvp: <RsvpSection wedding={wedding} />,
    faq: <FaqSection wedding={wedding} />,
    closing: <ClosingSection wedding={wedding} />,
    music: <MusicControl music={wedding.music} />,
  };

  return (
    <>
      <SiteNavigation wedding={wedding} sections={sections} />
      <main>
        {sections.order.map((id) => sections.enabled[id] ? <div key={id}>{renderedSections[id]}</div> : null)}
      </main>
    </>
  );
}
