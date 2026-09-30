"use client";

import { usePreferences } from "./Preferences";
import { useEffect, useRef } from "react";

function Timeline({ fr }) {
  return <svg viewBox="0 0 420 280" role="img" aria-label={fr ? "Planning des équipes, tâches et congés synchronisés avec Lucca" : "Team planning, tasks and leave synchronised with Lucca"}>
    <path className="visual-grid" d="M105 56V210M163 56V210M221 56V210M279 56V210M337 56V210M395 56V210M25 82H395M25 124H395M25 166H395M25 208H395"/>
    <text x="25" y="29" className="visual-title">{fr ? "ÉQUIPES × TEMPS" : "TEAMS × TIME"}</text>
    {["L", "M", "M", "J", "V"].map((day, i) => <text key={i} x={120 + i * 58} y="61">{fr ? day : ["M", "T", "W", "T", "F"][i]}</text>)}
    <text x="25" y="107">{fr ? "Équipe A" : "Team A"}</text><text x="25" y="149">{fr ? "Équipe B" : "Team B"}</text><text x="25" y="191">{fr ? "Congés" : "Leave"}</text>
    <g className="timeline-tasks"><rect className="visual-fill" x="110" y="89" width="142" height="26" rx="3"/><rect className="visual-soft" x="173" y="131" width="160" height="26" rx="3"/><rect className="visual-outline" x="337" y="173" width="53" height="26" rx="3"/></g>
    <path className="visual-ink" d="M120 102H238M184 144H318M347 181l32 10M347 191l32-10"/>
    <circle className="visual-endpoint" cx="254" cy="102" r="5"/><path className="visual-connector" d="M254 116V234H337"/>
    <rect className="visual-surface" x="265" y="225" width="131" height="32" rx="4"/><text x="279" y="246">Lucca ↔ API</text><text x="25" y="247">{fr ? "Tâches · Temps" : "Tasks · Time"}</text>
  </svg>;
}

function Retrieval({ fr }) {
  return <svg viewBox="0 0 420 280" role="img" aria-label={fr ? "Documents, recherche Azure AI Search et réponse avec Azure OpenAI" : "Documents, Azure AI Search retrieval and an Azure OpenAI answer"}>
    <text x="25" y="29" className="visual-title">{fr ? "LA CONNAISSANCE EN RÉPONSE" : "KNOWLEDGE INTO ANSWERS"}</text>
    <g className="document-stack"><rect className="visual-outline" x="24" y="76" width="66" height="87" rx="3"/><rect className="visual-surface" x="34" y="86" width="66" height="87" rx="3"/><rect className="visual-surface" x="44" y="96" width="66" height="87" rx="3"/><path className="visual-grid" d="M55 111H94M55 124H94M55 137H85M55 163H94"/><path className="visual-accent" d="M55 148H95"/></g>
    <path className="visual-connector" d="M110 138H161M249 138H298"/>
    <g className="retrieval-core"><circle className="visual-outline" cx="205" cy="138" r="43"/><circle className="visual-soft" cx="205" cy="138" r="28"/>{[0,1,2].map(row=>[0,1,2].map(col=><circle key={`${row}-${col}`} className="visual-endpoint" cx={192+col*13} cy={125+row*13} r={row===1&&col===1?4:2}/>))}</g>
    <path className="visual-surface" d="M303 89H391V170H341l-20 17v-17h-18Z"/><path className="visual-grid" d="M316 107H378M316 120H369M316 133H378"/><path className="visual-accent" d="M316 150H358"/>
    <text x="24" y="216">Documents</text><text x="154" y="216">AI Search</text><text x="299" y="216">OpenAI</text>
    <text x="25" y="250">{fr ? "Sources → Recherche → Réponse" : "Sources → Retrieval → Answer"}</text>
  </svg>;
}

function Integration({ fr }) {
  return <svg viewBox="0 0 420 280" role="img" aria-label={fr ? "Microsoft SAML SSO et intégrations Office, application Bubble distincte pour stocks, commandes et livraisons" : "Microsoft SAML SSO and Office integrations, separate Bubble stock, order and delivery application"}>
    <text x="25" y="29" className="visual-title">{fr ? "IDENTITÉ & OPÉRATIONS" : "IDENTITY & OPERATIONS"}</text>
    <path className="visual-grid" d="M214 56V255"/>
    <path className="visual-soft" d="M91 69l31 11v25c0 20-15 35-31 42-16-7-31-22-31-42V80Z"/><path className="visual-accent" d="m77 106 9 9 18-23"/>
    <path className="visual-connector" d="M91 149V179M48 181H160M48 181V195M104 181V195M160 181V195"/>
    {[32,88,144].map((x,i)=><g key={x}><rect className="visual-surface" x={x} y="197" width="32" height="32" rx="3"/><text x={x+12} y="218">{["O","W","X"][i]}</text></g>)}
    <text x="25" y="252">Microsoft / SAML</text>
    <g className="operations-flow">{[0,1,2].map((i)=><g key={i}><rect className={i===1?"visual-soft":"visual-surface"} x="245" y={69+i*57} width="149" height="37" rx="4"/><text x="259" y={92+i*57}>{fr ? ["Stocks","Commandes","Livraisons"][i] : ["Stock","Orders","Deliveries"][i]}</text>{i<2&&<path className="visual-connector" d={`M319 ${108+i*57}V${124+i*57}`}/>}</g>)}</g>
    <text x="245" y="252">Bubble / {fr ? "Métier" : "Operations"}</text>
  </svg>;
}

export default function WorkVisual({ type }) {
  const { language } = usePreferences();
  const fr = language === "fr";
  const figure = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { figure.current.dataset.visible = String(entries[0].isIntersecting); });
    observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);
  return <figure ref={figure} className={`work-visual visual-${type}`}>
    {type === "timeline" ? <Timeline fr={fr}/> : type === "ai" ? <Retrieval fr={fr}/> : <Integration fr={fr}/>}
    <figcaption>{fr ? "Schéma des fonctionnalités" : "Feature schematic"}</figcaption>
  </figure>;
}
