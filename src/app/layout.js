import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
const space = localFont({ src: "./fonts/SpaceGrotesk.ttf", variable: "--font-space", display: "swap", weight: "300 700" });
const mono = localFont({ src: "./fonts/IBMPlexMono.ttf", variable: "--font-mono", display: "swap", weight: "400", preload: false });
const site = "https://wael-fezari.vercel.app";
export const metadata = {
  metadataBase: new URL(site),
  title: "WF · Wael Fezari — Développeur full-stack & ingénieur IA",
  description:
    "Développeur full-stack et ingénieur IA à Marseille. Python, TypeScript, React, Next.js et FastAPI. Agents LangGraph, RAG, évaluation Ragas et observabilité. Disponible en CDI et freelance.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wael Fezari · Développement full-stack & ingénierie IA",
    description:
      "Agents, RAG, évaluation et observabilité : découvrez mes projets d’ingénierie IA et mon parcours en développement full-stack.",
    url: site,
    siteName: "Wael Fezari",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wael Fezari",
    url: site,
    jobTitle: "Full-stack Developer & AI Engineer",
    sameAs: [
      "https://github.com/wauul",
      "https://www.linkedin.com/in/wael-fezari/",
    ],
    knowsAbout: ["Python", "TypeScript", "React", "FastAPI", "Azure OpenAI", "LangChain", "LangGraph", "RAG", "pgvector", "Ragas", "Langfuse", "Sentry", "OpenTelemetry"],
  };
  return (
    <html lang="fr" data-theme="dark" className={`${space.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `var theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; try { var saved = localStorage.getItem('portfolio-theme'); if (saved === 'light' || saved === 'dark') theme = saved; } catch {} document.documentElement.dataset.theme = theme;`,
          }}
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
