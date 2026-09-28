import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Manrope,
} from "next/font/google";
import { weddingConfig } from "@/config";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const scriptFont = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://michael-and-marris.vercel.app";
const title = `${weddingConfig.couple.partnerA} & ${weddingConfig.couple.partnerB} | Wedding Invitation`;
const description = `The wedding invitation of ${weddingConfig.couple.fullNameA} and ${weddingConfig.couple.fullNameB}.`;
const socialImagePath = "/wedding/hero/social-preview.jpg";
const socialImage = {
  url: socialImagePath,
  width: 1200,
  height: 630,
  alt: `${weddingConfig.couple.partnerA} and ${weddingConfig.couple.partnerB}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: `${weddingConfig.couple.partnerA} & ${weddingConfig.couple.partnerB}`,
    images: [socialImage],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImagePath],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
