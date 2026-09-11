import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font rather than a <link> to fonts.googleapis.com.
// A render-blocking third-party stylesheet is the slowest thing on an otherwise
// static page, and next/font removes both the extra connection and the FOUT.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Netlify sets URL to the site's primary address during a build, so canonical
// and Open Graph tags resolve to the deployed origin without hardcoding it.
// The localhost fallback keeps `npm run dev` and `npm run build` working
// offline.
const siteUrl = process.env.URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "flu-harness | Ship a Flutter app to both stores in 20 days",
  description:
    "Not another boilerplate. flu-harness is the whole assembly line, spec to store listing, with quality gates that run the same way in PowerShell, cmd and Git Bash on Windows.",
  keywords: [
    "flutter",
    "dart",
    "claude code",
    "quality gates",
    "windows",
    "powershell",
    "git bash",
    "app store",
    "play store",
  ],
  openGraph: {
    url: "/",
    siteName: "flu-harness",
    title: "flu-harness | Ship a Flutter app to both stores in 20 days",
    description:
      "A Flutter development harness: project wizard, 26-check doctor, and one gate plan that PowerShell, cmd and Git Bash all agree on.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
