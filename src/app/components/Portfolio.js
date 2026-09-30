"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiArrowDown, FiPlus, FiMenu, FiX, FiCopy, FiCheck } from "react-icons/fi";
import { PreferenceControls, usePreferences } from "./Preferences";
import { projects, experiences } from "../lib/professional-work";
import HeroSculpture from "./HeroSculpture";
import PersonalProjects from "./PersonalProjects";
import ScrollStory from "./ScrollStory";
import VisitorPanel from "./VisitorPanel";
import ContactForm from "./ContactForm";
import DownloadCV from "./DownloadCV";
import WorkVisual from "./WorkVisual";
import ProjectTypeTags from "./ProjectTypeTags";

export default function Portfolio() {
  const { language, t } = usePreferences();
  const fr = language === "fr";
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const menuButton = useRef(null);
  const timer = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
    return () => { observer.disconnect(); clearTimeout(timer.current); };
  }, []);
  useEffect(() => {
    const media = matchMedia("(min-width: 1025px)");
    const close = () => { if (media.matches) setMenuOpen(false); };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("waelfezari@gmail.com");
      setCopied(true); setCopyError(false);
      clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 2500);
    } catch { setCopyError(true); }
  }
  const navigation = [["work", t("Selected work")], ["personal-projects", t("Personal projects")], ["about", t("Skills & approach")], ["experience", t("Experience")]];
  return <div className="portfolio">
    <a className="skip-link" href="#main">{t("Skip to content")}</a>
    <header className="site-header" onKeyDown={event => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <a className="wordmark" href="#home" aria-label={t("Wael Fezari, home")}><span className="logo-mark">W<span>F</span></span><span className="wordmark-name">Wael Fezari</span></a>
      <nav id="navigation" className={menuOpen ? "open" : ""} aria-label={t("Main navigation")}>
        {navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>{t("Contact")}</a>
        <div className="mobile-preferences"><PreferenceControls /></div>
      </nav>
      <div className="header-preferences"><PreferenceControls /></div>
      <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}<span>{menuOpen ? (fr ? "Fermer" : "Close") : "Menu"}</span></button>
    </header>

    <main id="main" tabIndex={-1}>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <p className="hero-introduction">{fr ? "Développeur full-stack & IA" : "Full-stack & AI developer"}<span>Marseille, FR</span></p>
          <h1><span>Interfaces</span><span className="outline-word">Intelligence</span><span className="accent-word">{fr ? "Intégrations" : "Integrations"}</span></h1>
          <p className="hero-description">{fr ? "Je suis Wael Fezari. Je construis des applications métier, connecte les systèmes et transforme la connaissance en outils d’IA utiles." : "I’m Wael Fezari. I build business applications, connect systems, and turn knowledge into useful AI tools."}</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">{fr ? "Découvrir mon travail" : "Explore my work"}<FiArrowDown aria-hidden="true" /></a><DownloadCV /></div>
          <p className="availability"><span className="status-dot" />{fr ? "Disponible en CDI et freelance" : "Available for permanent roles & freelance"}</p>
        </div>
        <HeroSculpture />
        <div className="hero-bottom"><span>{fr ? "Du besoin à l’interface. De l’API à l’IA." : "From brief to interface. From API to AI."}</span><a href="#work">{fr ? "Explorer" : "Scroll to explore"}<FiArrowDown aria-hidden="true" /></a></div>
      </section>

      <div className="stack-strip"><div className="section-wrap"><span>{fr ? "Outils de travail" : "Built with"}</span><ul>{["Python", "TypeScript", "React", "Next.js", "Azure OpenAI", "FastAPI"].map(tool => <li key={tool}>{tool}</li>)}</ul></div></div>

      <section id="work" className="section-wrap work-section">
        <div className="section-heading"><h2>{fr ? "Des outils pour" : "Software for"}<br /><span className="accent-word">{fr ? "le terrain" : "real work"}</span></h2><p>{fr ? "Trois projets clients et professionnels. Des besoins concrets, de l’interface aux intégrations." : "Three client and professional projects. Real business needs, from the interface to the integrations."}</p></div>
        <div className="projects">{projects.map(project => <article className="project-row" key={project.id}>
          <div className="project-identity"><p>{t(project.category)}</p><WorkVisual type={project.type} /></div>
          <div className="project-content"><ProjectTypeTags types={project.types} french={fr} /><h3>{t(project.name)}</h3><p>{t(project.description)}</p><ul className="tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
          <details className="project-details"><summary>{fr ? "Voir les contributions" : "What I built"}<FiPlus aria-hidden="true" /></summary><ul>{project.details.map(detail => <li key={detail}>{t(detail)}</li>)}</ul></details>
        </article>)}</div>
      </section>

      <PersonalProjects />

      <section className="about-section" id="about"><div className="section-wrap about-grid">
        <div className="about-copy"><h2>{fr ? "Connecter" : "Connect"}<br /><span className="outline-word">{fr ? "les pièces" : "the pieces"}</span></h2><p className="about-intro">{fr ? "Une bonne interface. Des services fiables. Une IA qui résout le bon problème." : "A thoughtful interface. Reliable services. AI that solves the right problem."}</p><p>{t("I work across the full stack, from the details of an interface to the APIs and intelligence behind it. My background in software development and AI helps me connect the pieces into useful products.")}</p><p>{t("After two years at ROKI and independent client work, I’m looking for a team where I can keep building ambitious software and practical AI.")}</p></div>
        <div className="capabilities">{[
          ["Product development", "React, Next.js, TypeScript and vanilla JavaScript. Interfaces designed around the people using them."],
          ["Applied intelligence", "Python, FastAPI, Azure OpenAI and Azure AI Search. Connecting language models to company knowledge."],
          ["Connected systems", "Node.js, SQL, Docker and REST APIs. Microsoft SAML SSO, Lucca integrations and Bubble extensions."],
        ].map(([title, copy], index) => <div key={title}><span className="capability-node" aria-hidden="true"><i />{index === 0 ? "UI" : index === 1 ? "AI" : "API"}</span><div><h3>{t(title)}</h3><p>{t(copy)}</p></div></div>)}</div>
      </div></section>

      <section className="section-wrap experience-section" id="experience">
        <div className="section-heading"><h2>{fr ? "Le parcours" : "The experience"}</h2><a className="text-link" href="https://www.linkedin.com/in/wael-fezari/" target="_blank" rel="noopener noreferrer">LinkedIn<FiArrowUpRight aria-hidden="true" /></a></div>
        <div className="experience-list">{experiences.map(item => <article className="experience-row" key={item.date}><div className="experience-date">{t(item.date)}<span>{t(item.company)}</span></div><div><h3>{t(item.role)}</h3><p>{t(item.text)}</p><p className="experience-tags">{item.tags}</p></div></article>)}</div>
        <div className="education"><h3>{fr ? "Formation" : "Education"}</h3><div><h4>{t("MSc Pro · Software Development & AI")}</h4><p>{t("Epitech, Marseille · 2022–2024 · Graduated")}</p></div><div><h4>{t("Master · Information Systems & Decisions")}</h4><p>{t("Badji Mokhtar University, Annaba · 2019–2021")}</p></div></div>
      </section>

      <ScrollStory />
      <VisitorPanel />

      <section id="contact" className="contact-section"><div className="section-wrap">
        <div className="contact-heading"><h2>{fr ? "Construisons" : "Let’s build"}<br /><span className="accent-word">{fr ? "la suite" : "what’s next"}</span></h2><p className="availability"><span className="status-dot" />{fr ? "CDI, freelance, remote ou mobilité" : "Permanent roles, freelance, remote or relocation"}</p></div>
        <ContactForm />
        <div className="contact-bottom"><div><a className="email-link" href="mailto:waelfezari@gmail.com">waelfezari@gmail.com</a><button className="copy-button" aria-label={fr ? "Copier l’adresse email" : "Copy email address"} onClick={copyEmail}>{copied ? <FiCheck /> : <FiCopy />}<span>{copied ? (fr ? "Copié" : "Copied") : (fr ? "Copier" : "Copy")}</span></button><p role="status" className="copy-status">{copyError ? t("Please use the email link or copy the address manually.") : copied ? t("Email address copied to clipboard.") : ""}</p></div><p>{fr ? "Basé à Marseille, France" : "Based in Marseille, France"}<br />{fr ? "Disponible immédiatement" : "Available immediately"}</p></div>
      </div></section>
    </main>
    <footer className="section-wrap"><a className="wordmark" href="#home" aria-label={t("Wael Fezari, home")}><span className="logo-mark">W<span>F</span></span></a><p>Wael Fezari · {fr ? "Développement full-stack & IA" : "Full-stack development & AI"}</p><div><a href="https://github.com/wauul" target="_blank" rel="noopener noreferrer">GitHub<FiArrowUpRight aria-hidden="true" /></a><a href="https://www.linkedin.com/in/wael-fezari/" target="_blank" rel="noopener noreferrer">LinkedIn<FiArrowUpRight aria-hidden="true" /></a><a href="#home">{fr ? "En haut" : "Back to top"}</a></div></footer>
  </div>;
}
