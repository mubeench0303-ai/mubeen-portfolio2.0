import type { Metadata } from "next";
import { Anton, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

// GTA-style heavy condensed display font
const displayFont = Anton({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

// techy HUD / body font
const bodyFont = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
