"use client";
import SignatureLogo from './SignatureLogo';

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiPlus, FiMenu, FiX } from "react-icons/fi";
import { PreferenceControls, usePreferences } from "./Preferences";
import { projects, experiences } from "../lib/professional-work";
import HeroWorld from "./HeroWorld";
import PersonalProjects from "./PersonalProjects";
import ContactForm from "./ContactForm";
import WorkVisual from "./WorkVisual";
import ProjectTypeTags from "./ProjectTypeTags";

const stackRail = [
  { en: "Applied AI", fr: "IA appliquée", tools: ["Azure OpenAI", "Groq", "RAG", { en: "AI agents", fr: "agents IA" }, "Local AI"] },
  { en: "Retrieval & evaluation", fr: "Recherche & évaluation", tools: ["pgvector", "Embeddings", "Ragas"] },
  { en: "Fullstack", fr: "Fullstack", tools: ["Python", "FastAPI", "Flask", "Node.js", "TypeScript", "Next.js", "React"] },
  { en: "Cloud & data", fr: "Cloud et données", tools: ["AWS", "GCP", "MongoDB", "PostgreSQL", "Firebase"] },
  { en: "DevOps", fr: "DevOps", tools: ["Docker", "Git", "GitHub", "GitLab"] },
  { en: "Mobile", fr: "Mobile", tools: ["Flutter", "Kotlin"] },
];
const chipLabel = (chip, fr) => (typeof chip === "string" ? chip : fr ? chip.fr : chip.en);
const chipKey = (chip) => (typeof chip === "string" ? chip : chip.en);

export default function Portfolio() {
  const { language, t } = usePreferences();
  const fr = language === "fr";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const railRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = matchMedia("(min-width: 1025px)");
    const close = () => { if (media.matches) setMenuOpen(false); };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    const node = railRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    node.classList.add("rail-armed");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { node.classList.remove("rail-armed"); observer.disconnect(); } });
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const navigation = [["work", fr ? "Travail & parcours" : "Work & experience"], ["personal-projects", t("Personal projects")]];
  return <div className="portfolio">
    <a className="skip-link" href="#main">{t("Skip to content")}</a>
    <header className="site-header" onKeyDown={event => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <a className="wordmark" href="#home" aria-label={t("Wael Fezari, home")}><SignatureLogo/><span className="wordmark-name">Wael Fezari</span></a>
      <nav id="navigation" className={menuOpen ? "open" : ""} aria-label={t("Main navigation")}>
        {navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>{t("Contact")}</a>
        <div className="mobile-preferences"><PreferenceControls /></div>
      </nav>
      <div className="header-preferences"><PreferenceControls /></div>
      <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}<span>{menuOpen ? (fr ? "Fermer" : "Close") : "Menu"}</span></button>
    </header>

    <main id="main" tabIndex={-1}>
      <HeroWorld />

      <div className="stack-strip" ref={railRef}><div className="section-wrap"><span className="strip-label">{fr ? "Outils de travail" : "Built with"}</span><ul className="stack-rail">{stackRail.map((group, groupIndex) => {
        const offset = stackRail.slice(0, groupIndex).reduce((sum, g) => sum + g.tools.length, 0);
        return (
          <li key={group.en} className="stack-seg">
            <div className="stack-seg-head"><span className="stack-seg-tick" aria-hidden="true"></span><span className="stack-seg-label">{fr ? group.fr : group.en}</span></div>
            <ul className="stack-seg-chips">{group.tools.map((tool, toolIndex) => <li key={chipKey(tool)} className="stack-chip" style={{ "--i": offset + toolIndex }}>{chipLabel(tool, fr)}</li>)}</ul>
          </li>
        );
      })}</ul></div></div>

      <section id="work" className="section-wrap work-section">
        <div className="section-heading"><h2>{fr ? "Le travail." : "The work."}<br /><span className="accent-word">{fr ? "Le parcours." : "The experience."}</span></h2><div><p>{fr ? "Des applications concrètes, et le parcours qui leur donne forme. De l’interface à l’intelligence et aux intégrations." : "Real applications, and the experience behind them. From interfaces to intelligence and integrations."}</p><a className="text-link" href="https://www.linkedin.com/in/wael-fezari/" target="_blank" rel="noopener noreferrer">LinkedIn<FiArrowUpRight aria-hidden="true" /></a></div></div>
        <div id="experience" className="work-history">{experiences.map((item,index)=><div className="work-chapter" key={item.date}>
          <article className="experience-row"><div className="experience-date">{t(item.date)}<span>{t(item.company)}</span></div><div><h3>{t(item.role)}</h3><p>{t(item.text)}</p><p className="experience-tags">{item.tags}</p></div></article>
          <div className="projects">{projects.filter(project=>index===0?project.id!=='02':index===1?project.id==='02':false).map(project=><article className="project-row" key={project.id}>
            <div className="project-identity"><p>{t(project.category)}</p><WorkVisual type={project.type}/></div>
            <div className="project-content"><ProjectTypeTags types={project.types} french={fr}/><h3>{t(project.name)}</h3><p>{t(project.description)}</p><ul className="tags">{project.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div>
            <details className="project-details"><summary>{fr ? "Voir les contributions" : "What I built"}<FiPlus aria-hidden="true"/></summary><ul>{project.details.map(detail=><li key={detail}>{t(detail)}</li>)}</ul></details>
          </article>)}</div>
        </div>)}</div>
        <div className="education"><h3>{fr ? "Formation" : "Education"}</h3><div><h4>{t("MSc Pro · Software Development & AI")}</h4><p>{t("Epitech, Marseille · 2022–2024 · Graduated")}</p></div><div><h4>{t("Master · Information Systems & Decisions")}</h4><p>{t("Badji Mokhtar University, Annaba · 2019–2021")}</p></div></div>
      </section>

      <PersonalProjects />

      <section id="contact" className="contact-section"><div className="section-wrap">
        <div className="contact-heading"><h2>{fr ? "Construisons" : "Let’s build"}<br /><span className="accent-word">{fr ? "la suite" : "what’s next"}</span></h2><p className="availability"><span className="status-dot" />{fr ? "CDI, freelance, remote ou mobilité" : "Permanent roles, freelance, remote or relocation"}</p></div>
        <ContactForm />
        <div className="contact-bottom"><p>{fr ? "Basé à Marseille, France" : "Based in Marseille, France"}<br />{fr ? "Disponible immédiatement" : "Available immediately"}</p></div>
      </div></section>
    </main>
    <footer className="section-wrap"><a className="wordmark" href="#home" aria-label={t("Wael Fezari, home")}><SignatureLogo/></a><p>Wael Fezari · {fr ? "Développement full-stack & IA" : "Full-stack development & AI"}</p><div><a href="https://github.com/wauul" target="_blank" rel="noopener noreferrer">GitHub<FiArrowUpRight aria-hidden="true" /></a><a href="https://www.linkedin.com/in/wael-fezari/" target="_blank" rel="noopener noreferrer">LinkedIn<FiArrowUpRight aria-hidden="true" /></a><a href="#home">{fr ? "En haut" : "Back to top"}</a></div></footer>
  </div>;
}
