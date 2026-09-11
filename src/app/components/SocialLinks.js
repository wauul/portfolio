"use client";
import { usePreferences } from "./Preferences";
const socials = [
  ["GitHub", "https://github.com/wauul", "github"],
  ["LinkedIn", "https://www.linkedin.com/in/wael-fezari/", "linkedin"],
  ["Instagram", "https://www.instagram.com/wauul/", "instagram"],
  ["Facebook", "https://www.facebook.com/wauul/", "facebook"],
  ["WhatsApp", "https://wa.me/33698367426", "whatsapp"],
];
function Icon({ type }) {
  const paths = {
    github:
      "M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2 3 0 6-1 6-5 0-1-.4-2-1-3 0-1 0-2-.3-3 0 0-1 0-3 1-2-.5-4-.5-6 0-2-1-3-1-3-1-.3 1-.3 2-.3 3-1 1-1.4 2-1.4 3 0 4 3 5 6 5-.5.5-1 1-1 2v4",
    linkedin: "M5 10v10M5 5v.1M10 20V10h4v2c2-3 6-2 6 2v6M14 12v8",
    instagram:
      "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 4h.01M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    facebook: "M14 22V12h4l1-4h-5V6c0-2 1-2 4-2V1h-3c-4 0-5 2-5 5v2H7v4h3v10",
    whatsapp:
      "M4 17a9 9 0 1 1 3 3l-5 2 2-5M8 7c-2 3 6 11 9 7l-3-2-1 1c-2-1-3-2-3-3l1-1-3-2",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[type]} />
    </svg>
  );
}
export default function SocialLinks() {
  const { language } = usePreferences();
  return (
    <nav
      className="social-links"
      aria-label={
        language === "fr" ? "Mes réseaux sociaux" : "My social profiles"
      }
    >
      {socials.map(([name, url, type]) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer">
          <Icon type={type} />
          <span>{name}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}
