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

export const metadata: Metadata = {
  title: `${weddingConfig.couple.partnerA} & ${weddingConfig.couple.partnerB} | Wedding Invitation`,
  description: `The wedding invitation of ${weddingConfig.couple.fullNameA} and ${weddingConfig.couple.fullNameB}.`,
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
