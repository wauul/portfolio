"use client";
import { useEffect, useRef, useState } from "react";
import { usePreferences } from "./Preferences";
import { journeyFrame } from "../lib/journey.mjs";
import { chapters } from "../lib/story";
import { FiMonitor, FiTerminal, FiCpu, FiUsers, FiLayers } from "react-icons/fi";
import styles from "./ScrollStory.module.css";
import JourneySculpture from "./JourneySculpture";

const icons = [FiMonitor, FiTerminal, FiCpu, FiUsers, FiLayers];
function SignalMap({ index, french }) {
  const Icon = icons[index];
  return <div className={styles.signalMap}>
    <svg viewBox="0 0 500 500" fill="none" aria-hidden="true"><circle cx="250" cy="250" r="195" className={styles.outerRing} /><circle cx="250" cy="250" r="150" className={styles.innerRing} />
      {Array.from({length:18},(_,i)=>{ const angle=i/18*Math.PI*2; const x=(250+Math.cos(angle)*195).toFixed(3),y=(250+Math.sin(angle)*195).toFixed(3); const r=i % (index+2) === 0 ? 7 : 3; return <g key={i}><path d={`M${x},${y}Q250,250 ${(250+Math.cos(angle+1+index*.3)*150).toFixed(3)},${(250+Math.sin(angle+1+index*.3)*150).toFixed(3)}`} className={styles.connection} /><circle cx={x} cy={y} r={r} className={styles.node}/></g>;})}
    </svg><span className={styles.mapIcon}><Icon aria-hidden="true" /></span><span className={styles.mapLabel}>{french ? ["JOUER → EXPLORER", "EXPLORER → CRÉER", "CRÉER → COMPRENDRE", "COMPRENDRE → COLLABORER", "COLLABORER → LIVRER"][index] : chapters[index].skill}</span>
  </div>;
}
export default function ScrollStory() {
  const { language, reducedMotion } = usePreferences();
  const fr = language === "fr", locale = fr ? 0 : 1;
  const track = useRef(null);
  const sculptureFrame = useRef({ index:0, blend:0, progress:0 });
  const snap = useRef(false);
  const [active, setActive] = useState(0);
  const current = useRef(0);
  useEffect(() => {
    const root = track.current;
    const stage = root.querySelector("[data-stage]");
    const panels = Array.from(root.querySelectorAll("[data-scene]"));
    let frame = 0, visualProgress = null;
    function update() {
      frame = 0;
      const travel = Math.max(1,root.offsetHeight-stage.offsetHeight);
      const top = (document.querySelector(".site-header")?.offsetHeight || 88) + 16;
      root.style.setProperty("--pin-top",`${top}px`);
      const target = Math.max(0,Math.min(1,(top-root.getBoundingClientRect().top)/travel));
      if (visualProgress === null || reducedMotion || snap.current) { visualProgress = target; snap.current = false; }
      else visualProgress += (target - visualProgress) * .18;
      if (Math.abs(target - visualProgress) < .0002) visualProgress = target;
      const progress = visualProgress;
      const {index,blend,active:next} = journeyFrame(progress,panels.length);
      Object.assign(sculptureFrame.current, { index, blend, progress });
      sculptureFrame.current.redraw?.();
      if (current.current !== next) { current.current=next; setActive(next); }
      panels.forEach((panel,i)=>{
        panel.inert = !reducedMotion && i !== next;
        panel.setAttribute("aria-hidden",String(!reducedMotion && i !== next));
        panel.style.visibility = reducedMotion || i === next ? "visible" : "hidden";
        const phase = reducedMotion ? 0 : i === index ? -blend : 1-blend;
        panel.style.setProperty("--scene-y",`${phase * 75}px`);
        panel.style.setProperty("--scene-opacity",String(reducedMotion ? 1 : .35 + Math.abs(1 - blend * 2) * .65));
        panel.style.setProperty("--scene-scale",String(reducedMotion ? 1 : 1 - Math.abs(phase) * .045));
        panel.style.setProperty("--scene-blur",`${reducedMotion ? 0 : Math.abs(phase) * 2}px`);
        panel.style.setProperty("--map-turn",`${reducedMotion ? 0 : (progress*60 + i*20)}deg`);
      });
      root.style.setProperty("--progress",String(progress));
      if (visualProgress !== target) schedule();
    }
    const schedule = () => { if (!frame) frame=requestAnimationFrame(update); };
    addEventListener("scroll",schedule,{passive:true}); addEventListener("resize",schedule);
    const observer=new ResizeObserver(schedule); observer.observe(stage);
    update();
    return ()=>{ removeEventListener("scroll",schedule);removeEventListener("resize",schedule);observer.disconnect();cancelAnimationFrame(frame); };
  },[reducedMotion]);
  function jump(index) {
    snap.current = true;
    const root=track.current;
    const top=parseFloat(root.style.getPropertyValue("--pin-top"));
    window.scrollTo({top:scrollY+root.getBoundingClientRect().top-top+(root.offsetHeight-root.querySelector("[data-stage]").offsetHeight)*(index+.1)/chapters.length,behavior:"instant"});
  }
  return <section className={`${styles.journey} ${reducedMotion ? styles.reduced : ""}`} aria-labelledby="journey-title">
    <div className={`section-wrap ${styles.intro}`}><h2 id="journey-title">{fr ? "Tout commence" : "It starts with"}<br/><span className="accent-word">{fr ? "par la curiosité" : "curiosity"}</span></h2><p>{fr ? "Des jeux vidéo aux applications métier. Les étapes qui ont changé ma façon de construire." : "From video games to business applications. The experiences that shaped how I build."}</p></div>
    <div className={`section-wrap ${styles.track}`} ref={track}><div data-stage className={styles.stage}>
      <div className={styles.scenes}>
        {!reducedMotion && <div className={styles.morphVisual} aria-hidden="true"><JourneySculpture frameRef={sculptureFrame}/><div className={styles.morphCaption}><span>{String(active + 1).padStart(2,"0")} / 05</span><span>{fr ? ["Curiosité", "Construction", "Intelligence", "Connexions", "Applications"][active] : ["Curiosity", "Construction", "Intelligence", "Connections", "Applications"][active]}</span></div></div>}
        {chapters.map((chapter,index)=><article key={chapter.id} data-scene className={styles.scene} aria-hidden={!reducedMotion && index!==0} style={{visibility:reducedMotion || index===0 ? "visible" : "hidden"}}>{reducedMotion && <SignalMap index={index} french={fr}/>}<div className={styles.copy}><p className={styles.label}>{chapter.label[locale]}</p><h3>{chapter.title[locale].replace(/\.$/,"")}<br/><span className="accent-word">{chapter.accent[locale].replace(/\.$/,"")}</span></h3><p className={styles.description}>{chapter.text[locale]}</p><p className={styles.note}>{chapter.note[locale]}</p></div></article>)}</div>
      {!reducedMotion && <div className={styles.controls}><div className={styles.chapters} aria-label={fr ? "Choisir une étape du parcours" : "Choose a story chapter"}>{chapters.map((chapter,index)=><button type="button" key={chapter.id} onClick={()=>jump(index)} aria-label={chapter.label[locale]} aria-current={index===active ? "step" : undefined}>{String(index+1).padStart(2,"0")}</button>)}</div><span>{fr ? "Défilez pour continuer" : "Scroll to continue"}</span><div className={styles.progress}><i/></div></div>}
    </div></div>
  </section>;
}
