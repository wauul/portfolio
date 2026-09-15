"use client";

import Image from "next/image";
import { FiDatabase, FiBookOpen, FiTrendingDown, FiHeadphones, FiRadio, FiCode, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { usePreferences } from "./Preferences";
import { personalProjects } from "../lib/personal-projects";
import { journeyFrame } from "../lib/journey.mjs";
import styles from "./PersonalProjects.module.css";

const icons = { "rag-bench": FiDatabase, "study-room": FiBookOpen, watchtower: FiTrendingDown, "are-we-vibing": FiHeadphones, "recipe-buddy": FiBookOpen, "hooka-relay": FiRadio };
function Demo({ project, french, active }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const Icon = icons[project.id];
  return (
    <div className={styles.demo}>
      <div className={styles.demoBar}><span>{french ? "Démonstration" : "Project demo"}</span></div>
      <div className={styles.screen}>
        {project.demo && playing && active && !failed ? (
          <Image src={project.demo} alt={`${french ? "Démonstration de" : "Demo of"} ${project.name}`} fill unoptimized sizes="(max-width: 760px) 90vw, 55vw" onError={() => setFailed(true)} />
        ) : (
          <div className={styles.placeholder}>
            <Icon className={styles.symbol} aria-hidden="true" />
            <span className={styles.pending}>{failed ? (french ? "Démo indisponible" : "Demo unavailable") : project.demo ? (french ? "Démo du projet" : "Project demo") : (french ? "Démo à venir" : "Demo coming soon")}</span>
          </div>
        )}
      </div>
      {project.demo && !failed && <button type="button" aria-pressed={playing && active} className={styles.play} onClick={() => setPlaying(!playing)}>{playing ? (french ? "Arrêter la démo" : "Stop demo") : (french ? "Lire la démo" : "Play demo")}</button>}
    </div>
  );
}

export default function PersonalProjects() {
  const { language } = usePreferences();
  const french = language === "fr";
  const locale = french ? 1 : 0;
  const track = useRef(null);
  const stage = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const pinnedRef = useRef(false);
  const activeRef = useRef(0);
  useEffect(() => {
    const root = track.current;
    const cards = Array.from(root.querySelectorAll("article"));
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      const top = (document.querySelector(".site-header")?.offsetHeight || 94) + 16;
      root.style.setProperty("--pin-top", `${top}px`);
      const required = Math.max(...cards.map(card => card.offsetHeight)) + 144;
      const canPin = !media.matches && required <= window.innerHeight - top - 16;
      if (pinnedRef.current !== canPin) { pinnedRef.current = canPin; setPinned(canPin); }
      const distance = Math.max(1, root.offsetHeight - stage.current.offsetHeight);
      const progress = canPin ? Math.max(0, Math.min(1, (top - root.getBoundingClientRect().top) / distance)) : 0;
      // Use the journey's exact chapter timing; travel horizontally instead of fading.
      const { index: chapter, blend, active: current } = journeyFrame(progress, cards.length);
      const position = chapter + blend;
      if (activeRef.current !== current) { activeRef.current = current; setActive(current); }
      root.style.setProperty("--progress", String(progress));
      cards.forEach((card, index) => {
        const delta = index - position;
        card.style.setProperty("--slide-x", canPin ? `${delta * 108}%` : "0%");
        card.style.setProperty("--visual-depth", canPin ? `${-delta * 6}%` : "0%");
        card.style.visibility = !canPin || Math.abs(delta) <= 1 ? "visible" : "hidden";
        card.inert = canPin && index !== current;
        if (canPin && index !== current) card.setAttribute("aria-hidden", "true");
        else card.removeAttribute("aria-hidden");
      });
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    cards.forEach(card => observer.observe(card));
    observer.observe(root);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  function jumpTo(index) {
    const root = track.current;
    const start = window.scrollY + root.getBoundingClientRect().top - parseFloat(root.style.getPropertyValue("--pin-top"));
    window.scrollTo({ top: start + (root.offsetHeight - stage.current.offsetHeight) * (index + 0.15) / personalProjects.length, behavior: "instant" });
  }
  return (
    <section id="personal-projects" className={`section-wrap ${styles.section}`} aria-labelledby="personal-projects-title">
      <div className={styles.heading}>
        <div><p className="eyebrow">{french ? "02 / PROJETS PERSONNELS" : "02 / PERSONAL PROJECTS"}</p><h2 id="personal-projects-title">{french ? "Projets" : "Personal"}<br /><em>{french ? "personnels." : "projects."}</em></h2></div>
        <p>{french ? "Six idées devenues des applications. Explorez les projets, leurs technologies et leur code." : "Six ideas built into working applications. Explore the projects, their technologies and their code."}</p>
      </div>
        <div ref={track} className={`${styles.track} ${pinned ? styles.pinned : ""}`} data-pinned={pinned}>
          <div ref={stage} className={styles.stage}>
            <div className={styles.stageHeader}><span>{french ? "Le laboratoire personnel" : "The personal lab"}</span><span>{pinned ? (french ? "Défilez pour explorer" : "Scroll to explore") : (french ? "Six projets à découvrir" : "Six projects to explore")}</span></div>
            <div className={styles.scenes}>
          {personalProjects.map((project, index) => (
            <article key={project.id} id={`project-${project.id}`} className={styles.card} aria-labelledby={`title-${project.id}`}>
              <Demo project={project} french={french} active={!pinned || active === index} />
              <div className={styles.content}>
                <div className={styles.category}><span>{project.category[locale]}</span><span>{String(index + 1).padStart(2, "0")} / 06</span></div>
                <h3 id={`title-${project.id}`}>{project.name}</h3><p className={styles.description}>{project.description[locale]}</p>
                <p className={styles.skillsLabel}>{french ? "Compétences utilisées" : "Skills used"}</p>
                <ul className={styles.skills}>{project.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.github} aria-label={`${french ? "Voir le code sur GitHub" : "View code on GitHub"} — ${project.name} (${french ? "nouvel onglet" : "new tab"})`}><FiCode aria-hidden="true" />{french ? "Voir le code sur GitHub" : "View code on GitHub"}<FiArrowUpRight aria-hidden="true" /></a>
              </div>
            </article>
          ))}
            </div>
            {pinned && <div className={styles.footer}>
              <div className={styles.chapters} aria-label={french ? "Choisir un projet" : "Choose a project"}>
                {personalProjects.map((project, index) => <button type="button" key={project.id} aria-label={project.name} aria-current={active === index ? "step" : undefined} onClick={() => jumpTo(index)}><span>{String(index + 1).padStart(2, "0")}</span><span className={styles.chapterName}>{project.name}</span></button>)}
              </div>
              <div className={styles.progress} aria-hidden="true"><span /></div>
            </div>}
          </div>
        </div>
    </section>
  );
}
