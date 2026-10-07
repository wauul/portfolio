"use client";

import { usePreferences } from "./Preferences";
import { skillGroups } from "../lib/skills";

export default function Skills() {
  const { language } = usePreferences();
  const locale = language === "fr" ? 1 : 0;
  return <section id="skills" className="section-wrap skills-section" aria-labelledby="skills-heading">
    <div className="section-heading">
      <h2 id="skills-heading">{locale ? "Compétences" : "Skills"}<br /><span className="accent-word">{locale ? "& outils." : "& tools."}</span></h2>
      <p>{locale ? "Mes principaux outils, avec les projets où je les utilise." : "My core tools, with the projects where I use them."}</p>
    </div>
    <div className="skills-groups">{skillGroups.map(group => <article className="skill-row" key={group.id}>
      <div><h3>{group.title[locale]}</h3>{group.description && <p>{group.description[locale]}</p>}</div>
      <div><ul className="skill-tools">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>{group.evidence && <p className="skill-evidence"><span>{locale ? "Projets" : "Projects"}</span> {group.evidence[locale]}</p>}</div>
    </article>)}</div>
  </section>;
}
