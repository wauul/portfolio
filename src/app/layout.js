import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const site = "https://wael-fezari.vercel.app";
export const metadata = {
  metadataBase: new URL(site),
  title: "WF · Wael Fezari — Développeur full-stack & IA",
  description:
    "Développeur full-stack à Marseille : interfaces, systèmes connectés et IA appliquée. Python, TypeScript, React et Azure OpenAI. Disponible en CDI et freelance.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "WF · Wael Fezari — L’idée. Le code. Le possible.",
    description:
      "Développement full-stack et IA appliquée. Découvrez mes projets, mon parcours et les possibilités de collaboration.",
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
    jobTitle: "Full-stack & AI Developer",
    sameAs: [
      "https://github.com/wauul",
      "https://www.linkedin.com/in/wael-fezari/",
    ],
    knowsAbout: ["Python", "TypeScript", "React", "Azure OpenAI", "RAG"],
  };
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { var theme = localStorage.getItem('portfolio-theme'); document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark'; } catch {}`,
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
