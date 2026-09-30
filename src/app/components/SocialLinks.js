"use client";
import { FiGithub, FiLinkedin, FiInstagram, FiFacebook, FiMessageCircle, FiArrowUpRight } from "react-icons/fi";
import { usePreferences } from "./Preferences";
const socials = [
  ["GitHub","https://github.com/wauul",FiGithub],
  ["LinkedIn","https://www.linkedin.com/in/wael-fezari/",FiLinkedin],
  ["Instagram","https://www.instagram.com/wauul/",FiInstagram],
  ["Facebook","https://www.facebook.com/wauul/",FiFacebook],
  ["WhatsApp","https://wa.me/33698367426",FiMessageCircle],
];
export default function SocialLinks() {
  const {language}=usePreferences();
  return <nav className="social-links" aria-label={language === "fr" ? "Mes réseaux sociaux" : "My social profiles"}>{socials.map(([name,url,Icon])=><a key={name} href={url} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true"/><span>{name}</span><FiArrowUpRight aria-hidden="true"/></a>)}</nav>;
}
