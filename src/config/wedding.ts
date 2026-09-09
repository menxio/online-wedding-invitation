import { weddingConfigSchema } from "./schema";

export const weddingConfig = weddingConfigSchema.parse({
  couple: { partnerA: "Michael", partnerB: "Marris", initials: "M & M" },
  dateTime: "Sunday, October 17, 2026",
  timezone: "WEDDING_TIMEZONE",
  invitation: { eyebrow: "INVITATION_EYEBROW", message: "INVITATION_COPY" },
  hero: {
    image: {
      src: "/wedding/hero/hero.jpg",
      alt: "A couple smiling together during an outdoor picnic portrait",
      width: 6000,
      height: 4000,
      focalPosition: "center 62%",
    },
    announcement: "Together with their families, they joyfully invite you to celebrate their wedding day.",
  },
  story: null,
  events: [
    {
      id: "ceremony", title: "CEREMONY", dateTime: "WEDDING_DATE",
      venue: "CEREMONY_VENUE", address: "CEREMONY_ADDRESS",
      directionsUrl: null, notes: null,
    },
    {
      id: "reception", title: "RECEPTION", dateTime: "WEDDING_DATE",
      venue: "RECEPTION_VENUE", address: "RECEPTION_ADDRESS",
      directionsUrl: null, notes: null,
    },
  ],
  dressCode: null,
  entourage: [],
  gallery: [
    { src: "/wedding/gallery/image1.jpg", alt: "The couple seated together overlooking a lake", width: 4000, height: 6000, focalPosition: "center" },
    { src: "/wedding/gallery/image2.jpg", alt: "The couple seated outside a hillside cabin", width: 6000, height: 4000, focalPosition: "center" },
    { src: "/wedding/gallery/image3.jpg", alt: "The couple posing beside a sunlit wooden wall", width: 4000, height: 6000, focalPosition: "center" },
    { src: "/wedding/gallery/image4.jpg", alt: "The couple holding hands beneath white drapery", width: 3799, height: 5699, focalPosition: "center" },
    { src: "/wedding/gallery/image5.jpg", alt: "A close portrait of the couple beneath white drapery", width: 3795, height: 5693, focalPosition: "center" },
    { src: "/wedding/gallery/image6.jpg", alt: "The couple sharing a playful picnic by the lake", width: 6000, height: 4000, focalPosition: "center" },
    { src: "/wedding/gallery/image7.jpg", alt: "The couple in formal attire standing beside the lake", width: 3516, height: 5274, focalPosition: "center" },
    { src: "/wedding/gallery/image8.jpg", alt: "The couple embracing beside the lake", width: 3627, height: 5441, focalPosition: "center" },
    { src: "/wedding/gallery/image9.jpg", alt: "The couple in formal attire beneath leafy trees", width: 3276, height: 4914, focalPosition: "center" },
    { src: "/wedding/gallery/image10.jpg", alt: "A formal portrait of the couple in a green grove", width: 3357, height: 5035, focalPosition: "center" },
    { src: "/wedding/gallery/image11.jpg", alt: "The couple posing beneath tall trees", width: 3445, height: 5168, focalPosition: "center" },
  ],
  faq: [],
  closing: { message: "CLOSING_MESSAGE", contact: "CONTACT_INFORMATION" },
  music: null,
  rsvp: { deadline: "RSVP_DEADLINE", privateInvitations: true },
});
