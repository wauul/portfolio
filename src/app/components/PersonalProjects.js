"use client";

import Image from "next/image";
import { FiDatabase, FiBookOpen, FiTrendingDown, FiHeadphones, FiRadio, FiCode, FiArrowUpRight, FiPlay, FiPause } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { usePreferences } from "./Preferences";
import { personalProjects } from "../lib/personal-projects";
import { journeyFrame } from "../lib/journey.mjs";
import ProjectTypeTags from "./ProjectTypeTags";
import styles from "./PersonalProjects.module.css";

const icons = {"hooka-relay": FiRadio , "rag-bench": FiDatabase, "study-room": FiBookOpen, watchtower: FiTrendingDown, "are-we-vibing": FiHeadphones, "recipe-buddy": FiBookOpen};
function Demo({ project, french, active }) {
  const [failed, setFailed] = useState(false);
  const [play, setPlay] = useState(null);
  const [visible, setVisible] = useState(false);
  const frame = useRef(null);
  const { reducedMotion } = usePreferences();
  const moving = Boolean(project.demo) && active && visible && (play === true || (play !== false && !reducedMotion));
  const locale = french ? 1 : 0;
  const image = project.image || (project.demo ? (moving ? project.demo : `/demos/stills/${project.id}.webp`) : null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting));
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { setPlay(null); }, [reducedMotion, active]);
  const Icon = icons[project.id] || FiCode;
  return (
    <div ref={frame} className={styles.demo}>
      <div className={styles.demoBar}><span>{project.name} / {project.previewLabel?.[locale] || (project.demo ? (french ? "Démonstration" : "Demo") : (french ? "Aperçu de l’interface" : "Interface preview"))}</span>{project.demo && <button type="button" onClick={() => setPlay(!moving)} aria-label={moving ? (french ? "Mettre la démo en pause" : "Pause demo") : (french ? "Lire la démo" : "Play demo")} aria-pressed={moving}>{moving ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}</button>}</div>
      <div className={styles.screen}>
        {image && !failed ? (
          <Image src={image} alt={project.imageAlt?.[locale] || `${french ? "Démonstration de" : "Demo of"} ${project.name}`} fill unoptimized sizes="(max-width: 760px) 90vw, 55vw" onError={() => setFailed(true)} />
        ) : (
          <div className={styles.placeholder}>
            <Icon className={styles.symbol} aria-hidden="true" />
            <span className={styles.pending}>{french ? "Aperçu indisponible" : "Preview unavailable"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PersonalProjects() {
  const { language, reducedMotion } = usePreferences();
  const french = language === "fr";
  const locale = french ? 1 : 0;
  const track = useRef(null);
  const stage = useRef(null);
  const scenes = useRef(null);
  const chapters = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const pinnedRef = useRef(false);
  const activeRef = useRef(0);
  const settleHandle = useRef(0);
  const jumpingUntil = useRef(0);
  useEffect(() => {
    const rail = chapters.current;
    const button = rail.children[active];
    const left = button.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
    if (left < rail.scrollLeft) rail.scrollTo({ left });
    else if (left + button.offsetWidth > rail.scrollLeft + rail.clientWidth) rail.scrollTo({ left: left + button.offsetWidth - rail.clientWidth });
  }, [active]);
  useEffect(() => {
    const root = track.current;
    const scroller = scenes.current;
    const cards = Array.from(scroller.querySelectorAll("article"));
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    let frame = 0, visualProgress = null;
    let settleTimer = 0;
    let touching = false;
    function settle() {
      if (touching || mobile.matches || media.matches || performance.now() < jumpingUntil.current) return;
      const top = parseFloat(root.style.getPropertyValue("--pin-top"));
      const distance = root.offsetHeight - stage.current.offsetHeight;
      const offset = top - root.getBoundingClientRect().top;
      // Never pull the visitor back after they leave this section.
      if (distance <= 0 || offset <= 0 || offset >= distance) return;
      const { index, blend, active: nearest } = journeyFrame(offset / distance, cards.length);
      if (blend === 0 || blend === 1) return;
      // Finish only the partial transition, preserving the reading intervals.
      const chapterPosition = nearest === index ? index + 0.44 : index + 1.01;
      const destination = window.scrollY - offset + distance * chapterPosition / cards.length;
      window.scrollTo({ top: destination, behavior: media.matches ? "instant" : "smooth" });
    }
    function queueSettle() {
      clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 180);
      settleHandle.current = settleTimer;
    }
    function onScroll() { schedule(); queueSettle(); }
    function onTouchStart() { touching = true; clearTimeout(settleTimer); }
    function onTouchEnd() { touching = false; queueSettle(); }
    function update() {
      frame = 0;
      const top = (document.querySelector(".site-header")?.offsetHeight || 94) + 16;
      root.style.setProperty("--pin-top", `${top}px`);
      // The carousel must remain a carousel in short browser panels too.
      // Its viewport adapts in CSS; long copy can scroll inside its own panel.
      const canPin = !mobile.matches && !media.matches;
      if (pinnedRef.current !== canPin) { pinnedRef.current = canPin; setPinned(canPin); }
      const distance = Math.max(1, root.offsetHeight - stage.current.offsetHeight);
      const target = canPin ? Math.max(0, Math.min(1, (top - root.getBoundingClientRect().top) / distance)) : 0;
      if (visualProgress === null || !canPin || performance.now() < jumpingUntil.current) visualProgress = target;
      else visualProgress += (target - visualProgress) * .18;
      if (Math.abs(target - visualProgress) < .0002) visualProgress = target;
      const progress = visualProgress;
      // Use the journey's exact chapter timing; travel horizontally instead of fading.
      const mobileIndex = cards.reduce((nearest, card, index) => {
        const offset = card.offsetLeft - scroller.offsetLeft;
        const nearestOffset = cards[nearest].offsetLeft - scroller.offsetLeft;
        return Math.abs(offset - scroller.scrollLeft) < Math.abs(nearestOffset - scroller.scrollLeft) ? index : nearest;
      }, 0);
      const { index: chapter, blend, active: journeyActive } = journeyFrame(progress, cards.length);
      const current = canPin ? journeyActive : mobileIndex;
      const position = media.matches ? current : chapter + blend;
      if (activeRef.current !== current) { activeRef.current = current; setActive(current); }
      root.style.setProperty("--progress", String(progress));
      cards.forEach((card, index) => {
        const delta = index - position;
        card.style.setProperty("--slide-x", canPin ? `${delta * 108}%` : "0%");
        card.style.setProperty("--visual-depth", canPin ? `${-delta * 6}%` : "0%");
        const curve = canPin ? Math.max(-1, Math.min(1, delta)) : 0;
        card.style.setProperty("--slide-y", `${Math.sin(curve * Math.PI / 2) * 30}px`);
        card.style.setProperty("--slide-depth", `${Math.abs(curve) * -120}px`);
        card.style.setProperty("--slide-turn", `${curve * -12}deg`);
        card.style.setProperty("--slide-bank", `${curve * 1.6}deg`);
        card.style.setProperty("--slide-scale", String(1 - Math.abs(curve) * .06));
        card.style.visibility = !canPin || Math.abs(delta) <= 1 ? "visible" : "hidden";
        card.inert = canPin && index !== current;
        if (canPin && index !== current) card.setAttribute("aria-hidden", "true");
        else card.removeAttribute("aria-hidden");
      });
      if (visualProgress !== target) schedule();
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("resize", schedule);
    scroller.addEventListener("scroll", schedule, { passive: true });
    media.addEventListener("change", schedule);
    mobile.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    cards.forEach(card => observer.observe(card));
    observer.observe(root);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", schedule);
      scroller.removeEventListener("scroll", schedule);
      media.removeEventListener("change", schedule);
      mobile.removeEventListener("change", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
    };
  }, [reducedMotion]);
  function jumpTo(index) {
    clearTimeout(settleHandle.current);
    jumpingUntil.current = performance.now() + 800;
    if (reducedMotion && !window.matchMedia("(max-width: 760px)").matches) {
      document.getElementById(`project-${personalProjects[index].id}`)?.scrollIntoView({ block: "center" });
      return;
    }
    if (window.matchMedia("(max-width: 760px)").matches) {
      const scroller = scenes.current;
      const card = scroller.children[index];
      scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
      return;
    }
    const root = track.current;
    const start = window.scrollY + root.getBoundingClientRect().top - parseFloat(root.style.getPropertyValue("--pin-top"));
    window.scrollTo({ top: start + (root.offsetHeight - stage.current.offsetHeight) * (index + 0.15) / personalProjects.length, behavior: "instant" });
  }
  return (
    <section id="personal-projects" className={`section-wrap ${styles.section}`} aria-labelledby="personal-projects-title">
      <div className={styles.heading}>
        <div><h2 id="personal-projects-title">{french ? "Le laboratoire" : "The personal"}<br /><em>{french ? "personnel" : "lab"}</em></h2></div>
        <p>{french ? "Neuf idées devenues des applications. De l’IA aux outils du quotidien : explorez les interfaces, les technologies et le code public." : "Nine ideas built into working applications. From AI to everyday tools: explore the interfaces, technologies and public code."}</p>
      </div>
        <div ref={track} className={`${styles.track} ${pinned ? styles.pinned : ""}`} data-pinned={pinned} style={{ "--project-count": personalProjects.length }}>
          <div ref={stage} className={styles.stage}>
            <div className={styles.stageHeader}><span>{String(active + 1).padStart(2, "0")} / {String(personalProjects.length).padStart(2, "0")}</span><span>{pinned ? (french ? "Défilez pour explorer" : "Scroll to explore") : (french ? "Choisissez un projet" : "Choose a project")}</span></div>
            <div ref={scenes} className={styles.scenes}>
          {personalProjects.map((project, index) => (
            <article key={project.id} id={`project-${project.id}`} className={styles.card} aria-labelledby={`title-${project.id}`}>
              <Demo project={project} french={french} active={!pinned || index === active} />
              <div className={styles.content}>
                <div className={styles.category}><span>{project.category[locale]}</span><span>{String(index + 1).padStart(2, "0")} / {String(personalProjects.length).padStart(2, "0")}</span></div>
                <ProjectTypeTags types={project.types} french={french} />
                <h3 id={`title-${project.id}`}>{project.name}</h3><p className={styles.description}>{project.description[locale]}</p>
                <p className={styles.skillsLabel}>{french ? "Compétences utilisées" : "Skills used"}</p>
                <ul className={styles.skills}>{project.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                <div className={styles.actions}>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.live} aria-label={`${project.liveLabel?.[locale] || (french ? "Ouvrir l’application" : "Open live app")} — ${project.name} (${french ? "nouvel onglet" : "new tab"})`}>{project.liveLabel?.[locale] || (french ? "Ouvrir l’application" : "Open live app")}<FiArrowUpRight aria-hidden="true" /></a>
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.github} aria-label={`${french ? "Voir le code sur GitHub" : "View code on GitHub"} — ${project.name} (${french ? "nouvel onglet" : "new tab"})`}><FiCode aria-hidden="true" />{french ? "Voir le code sur GitHub" : "View code on GitHub"}<FiArrowUpRight aria-hidden="true" /></a>}
                </div>
                {project.accessNote && <p className={styles.accessNote}>{project.accessNote[locale]}</p>}
              </div>
            </article>
          ))}
            </div>
            <div className={styles.footer}>
              <div ref={chapters} className={styles.chapters} aria-label={french ? "Choisir un projet" : "Choose a project"}>
                {personalProjects.map((project, index) => <button type="button" key={project.id} aria-label={project.name} aria-current={active === index ? "step" : undefined} onClick={() => jumpTo(index)}><span>{String(index + 1).padStart(2, "0")}</span><span className={styles.chapterName}>{project.name}</span></button>)}
              </div>
              <div className={styles.progress} aria-hidden="true"><span /></div>
            </div>
          </div>
        </div>
    </section>
  );
}
