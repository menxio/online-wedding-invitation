import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config";

export const alt = `${weddingConfig.couple.partnerA} and ${weddingConfig.couple.partnerB}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const heroImage = await readFile(
  join(process.cwd(), "public", "wedding", "hero", "hero.jpg"),
  "base64",
);
const heroImageSrc = `data:image/jpeg;base64,${heroImage}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4e3e9",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageSrc}
          alt=""
          width={size.width}
          height={size.height}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 62%",
          }}
        />
      </div>
    ),
    size,
  );
}
