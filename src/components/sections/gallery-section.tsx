import Image from "next/image";
import type { WeddingConfig } from "@/config";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function GallerySection({ wedding }: { wedding: WeddingConfig }) {
  if (wedding.gallery.length === 0) return null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#f4e3e9_100%)] py-[var(--wedding-spacing-section)]">
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow="Engagement photographs"
          title="Captured Moments of Love"
          description="A glimpse of our journey, frame by frame."
          align="center"
          titleStyle="script"
        />
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {wedding.gallery.map((image, index) => (
            <figure key={image.src} className="group relative mb-4 break-inside-avoid overflow-hidden bg-[#ded2c4]">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                priority={index < 2}
              />
              <figcaption className="sr-only">Photograph {index + 1} of {wedding.gallery.length}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
