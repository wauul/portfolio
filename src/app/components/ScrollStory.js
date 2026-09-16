"use client";
import { useEffect, useRef } from "react";
import { usePreferences } from "./Preferences";
import { journeyFrame, journeyMorph } from "../lib/journey.mjs";
import styles from "./ScrollStory.module.css";

const chapters = [
  {
    id: "play",
    label: ["L’enfance / La découverte", "Childhood / Discovery"],
    title: ["Avant le code,", "Before the code,"],
    accent: ["il y avait le jeu.", "there was play."],
    text: [
      "Petit, j’étais obsédé par les ordinateurs et les jeux vidéo. L’écran était une porte vers d’autres mondes. Puis une question a pris le dessus : comment tout cela fonctionne ?",
      "As a kid, I was obsessed with computers and video games. The screen opened up other worlds. Then one question took over: how does all of this work?",
    ],
    note: [
      "La curiosité comme point de départ",
      "It all started with curiosity",
    ],
    skill: "PLAY → EXPLORE",
  },
  {
    id: "code",
    label: [
      "L’adolescence / Les premières lignes",
      "Teenage years / First lines",
    ],
    title: ["Passer de joueur", "From playing"],
    accent: ["à créateur.", "to creating."],
    text: [
      "À l’adolescence, j’explorais BackTrack R3 et j’écrivais mes premières lignes de code. J’apprenais en essayant, en cassant, en recommençant. Comprendre devenait aussi passionnant que jouer.",
      "As a teenager, I explored BackTrack R3 and wrote my first lines of code. I learned by trying, breaking things and trying again. Understanding became as exciting as playing.",
    ],
    note: [
      "Expérimenter. Comprendre. Recommencer.",
      "Experiment. Understand. Repeat.",
    ],
    skill: "EXPLORE → BUILD",
  },
  {
    id: "learn",
    label: ["Université / Annaba", "University / Annaba"],
    title: ["Des projets", "Projects with"],
    accent: ["et des neurones.", "a learning curve."],
    text: [
      "À l’université d’Annaba, les projets étaient mon terrain d’expression. J’aimais y exceller, aller au-delà de la théorie et construire. C’est aussi là que j’ai commencé à apprendre l’intelligence artificielle, depuis les bases.",
      "At university in Annaba, projects were where I found my stride. I loved excelling at them, going beyond theory and building. That is also where I began learning artificial intelligence from the ground up.",
    ],
    note: [
      "Université Badji Mokhtar · Annaba",
      "Badji Mokhtar University · Annaba",
    ],
    skill: "BUILD → UNDERSTAND",
  },
  {
    id: "team",
    label: [
      "Epitech & alternance / Le collectif",
      "Epitech & apprenticeship / Teamwork",
    ],
    title: ["Aller plus loin,", "Going further,"],
    accent: ["ensemble.", "together."],
    text: [
      "À Epitech, j’ai appris à construire avec mes amis : partager les idées, confronter les approches et avancer ensemble. Mon alternance chez ROKI a prolongé cet apprentissage au contact d’une équipe et de vrais besoins métier.",
      "At Epitech, I learned to build with my friends: share ideas, challenge approaches and move forward together. My apprenticeship at ROKI brought that learning into a team working on real business needs.",
    ],
    note: ["Epitech & ROKI · Marseille", "Epitech & ROKI · Marseille"],
    skill: "UNDERSTAND → COLLABORATE",
  },
  {
    id: "client",
    label: ["Aujourd’hui / Freelance", "Today / Freelance"],
    title: ["Écouter d’abord.", "Listen first."],
    accent: ["Construire juste.", "Build with purpose."],
    text: [
      "Aujourd’hui, le freelance m’apprend autant sur les gens que sur la technique. Échanger avec les clients, comprendre leur quotidien, clarifier les besoins : le code prend tout son sens quand il résout le bon problème.",
      "Today, freelancing teaches me as much about people as technology. Talking with clients, understanding their day-to-day work and clarifying their needs: code matters most when it solves the right problem.",
    ],
    note: [
      "Interfaces, IA & applications métier",
      "Interfaces, AI & business applications",
    ],
    skill: "COLLABORATE → DELIVER",
  },
];

const featuredChapters = chapters.filter(({ id }) =>
  ["play", "team", "client"].includes(id),
);

function Illustration({ kind, fr }) {
  const id = `journey-${kind}`;
  const nodes = [
    [155, 160],
    [155, 245],
    [155, 330],
    [280, 135],
    [280, 220],
    [280, 305],
    [280, 390],
    [410, 195],
    [410, 280],
    [410, 365],
    [515, 280],
  ];
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 640 520"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-metal`}
          x1="100"
          y1="80"
          x2="500"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f2dcc0" />
          <stop offset=".42" stopColor="#acbba4" />
          <stop offset="1" stopColor="#344b43" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#9dcdb4" stopOpacity=".23" />
          <stop offset="1" stopColor="#9dcdb4" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${id}-grid`}
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path d="M32 0H0V32" stroke="#afc6b6" strokeOpacity=".09" />
        </pattern>
      </defs>
      <circle cx="320" cy="260" r="245" fill={`url(#${id}-glow)`} />
      <rect
        x="32"
        y="32"
        width="576"
        height="456"
        rx="20"
        fill={`url(#${id}-grid)`}
      />
      <g stroke="#b7cbb7" strokeOpacity=".22">
        <path d="M40 72V40h32m496 0h32v32M40 448v32h32m496 0h32v-32" />
        <circle cx="320" cy="260" r="218" strokeDasharray="2 10" />
      </g>
      <g data-scene-art>
      {kind === "play" && (
        <>
          <path d="M257 346h126l14 44H243z" fill={`url(#${id}-metal)`} />
          <rect x="216" y="384" width="208" height="14" rx="7" fill="#acb5a0" />
          <rect
            x="101"
            y="88"
            width="438"
            height="264"
            rx="28"
            fill={`url(#${id}-metal)`}
          />
          <rect
            x="119"
            y="105"
            width="402"
            height="222"
            rx="19"
            fill="#101e1b"
          />
          <path
            d="M134 283h372M134 259h372M134 235h372m-330 69 102-88m-15 88 45-88m70 88-45-88m130 88-102-88"
            stroke="#577366"
            strokeWidth="1"
          />
          <circle cx="321" cy="188" r="42" fill="#cfa37e" />
          <path
            d="M274 181h94m-94 10h94m-94 10h94m-94 10h94"
            stroke="#101e1b"
            strokeWidth="4"
          />
          <path
            d="m141 225 60-54 44 42 37-29 52 45 52-28 32 17 40-37 50 44"
            stroke="#b7cba8"
            strokeWidth="2"
          />
          <text
            x="144"
            y="140"
            fill="#d4e4c5"
            fontSize="11"
            fontFamily="monospace"
          >
            PLAYER 01
          </text>
          <text
            x="433"
            y="140"
            fill="#d4e4c5"
            fontSize="11"
            fontFamily="monospace"
          >
            ♥ ♥ ♥
          </text>
          <g transform="translate(213 408)">
            <path
              d="M30 0h151c18 0 29 15 34 33l8 32c4 19-17 27-29 14l-26-24H44L17 80C3 94-16 82-10 62l10-33C5 12 14 0 30 0Z"
              fill="#344a40"
              stroke="#a6b398"
            />
            <path d="M36 16v28M22 30h28" stroke="#d9d8b9" strokeWidth="7" />
            <circle cx="164" cy="24" r="6" fill="#d5a07c" />
            <circle cx="185" cy="37" r="6" fill="#b9c89d" />
          </g>
        </>
      )}
      {kind === "code" && (
        <>
          <rect
            x="78"
            y="107"
            width="484"
            height="309"
            rx="18"
            fill="#0c1916"
            stroke={`url(#${id}-metal)`}
            strokeWidth="2"
          />
          <path d="M79 151h482" stroke="#486053" />
          <circle cx="102" cy="130" r="5" fill="#d2a17d" />
          <circle cx="121" cy="130" r="5" fill="#b9c599" />
          <circle cx="140" cy="130" r="5" fill="#6f9b83" />
          <text
            x="320"
            y="134"
            textAnchor="middle"
            fill="#b1c5b9"
            fontSize="12"
            fontFamily="monospace"
          >
            BACKTRACK R3 / FIRST EXPLORATIONS
          </text>
          <g fontFamily="monospace" fontSize="17">
            <text x="109" y="192" fill="#779a87">
              #{" "}
              {fr
                ? "tout commence par une question"
                : "everything starts with a question"}
            </text>
            <text x="109" y="236" fill="#cbdcb2">
              $ hello_world
            </text>
            <text x="109" y="277" fill="#e6c6a2">
              Hello, world.
            </text>
            <text x="109" y="330" fill="#91bca0">
              $ learn → try → repeat
            </text>
          </g>
          <rect x="109" y="355" width="12" height="21" fill="#c7d7ad" />
          <rect
            x="374"
            y="374"
            width="186"
            height="72"
            rx="12"
            fill="#263e32"
            stroke="#657d63"
          />
          <text
            x="467"
            y="421"
            textAnchor="middle"
            fill="#e3c5a1"
            fontSize="30"
            fontFamily="monospace"
          >
            &lt; / &gt;
          </text>
        </>
      )}
      {kind === "learn" && (
        <>
          <path
            d="m107 399 95-58 96 29 119-48 121 69"
            stroke="#8aab93"
            strokeOpacity=".5"
          />
          {nodes
            .slice(0, 3)
            .flatMap(([x, y], i) =>
              nodes
                .slice(3, 7)
                .map(([a, b], j) => (
                  <path
                    key={`a${i}${j}`}
                    d={`M${x} ${y}L${a} ${b}`}
                    stroke="#789d86"
                    strokeOpacity=".4"
                  />
                )),
            )}
          {nodes
            .slice(3, 7)
            .flatMap(([x, y], i) =>
              nodes
                .slice(7, 10)
                .map(([a, b], j) => (
                  <path
                    key={`b${i}${j}`}
                    d={`M${x} ${y}L${a} ${b}`}
                    stroke="#b9ba8d"
                    strokeOpacity=".45"
                  />
                )),
            )}
          {nodes.slice(7, 10).map(([x, y], i) => (
            <path
              key={i}
              d={`M${x} ${y}L515 280`}
              stroke="#d7ad84"
              strokeOpacity=".6"
            />
          ))}
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={i === 10 ? 26 : 16}
                fill="#162a21"
                stroke={i > 6 ? "#d3b58c" : "#a3bea2"}
                strokeWidth="2"
              />
              <circle
                cx={x}
                cy={y}
                r={i === 10 ? 9 : 5}
                fill={i > 6 ? "#d3b58c" : "#a3bea2"}
              />
            </g>
          ))}
          <text
            x="100"
            y="90"
            fill="#c9d3b7"
            fontSize="12"
            fontFamily="monospace"
          >
            ANNABA / LEARNING FROM ZERO
          </text>
          <g transform="translate(90 419)">
            <path
              d="M0 12 78 0l78 12v58l-78-12L0 70Z"
              fill="#354e40"
              stroke="#aab79a"
            />
            <path
              d="M78 0v58M14 27l48-8m-48 22 48-8m30-14 48 8m-48 6 48 8"
              stroke="#c4c6a5"
            />
          </g>
          <text
            x="338"
            y="444"
            fill="#d5c5a6"
            fontSize="15"
            fontFamily="monospace"
          >
            data → model → learn
          </text>
        </>
      )}
      {kind === "team" && (
        <>
          <path
            d="M120 366c0-140 120-25 200-170s200 5 200 163M120 366h400"
            stroke="#789b83"
            strokeWidth="2"
            strokeDasharray="5 7"
          />
          <rect
            x="171"
            y="152"
            width="302"
            height="217"
            rx="16"
            fill="#14251e"
            stroke="#a4b698"
          />
          <path d="M171 193h302m-201 0v176m99-176v176" stroke="#47604b" />
          <g fill="#a8b99c" fontFamily="monospace" fontSize="11">
            <text x="189" y="178">
              IDEAS
            </text>
            <text x="288" y="178">
              BUILD
            </text>
            <text x="388" y="178">
              REVIEW
            </text>
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={186 + i * 100}
                y={210 + i * 17}
                width="70"
                height="64"
                rx="7"
                fill={["#456b52", "#a48765", "#74825a"][i]}
              />
              <path
                d={`M${198 + i * 100} ${229 + i * 17}h42m-42 12h28`}
                stroke="#eef0d6"
              />
              <circle cx={221 + i * 100} cy="326" r="12" fill="#344c3c" />
              <path d={`m${216 + i * 100} 326 4 4 7-8`} stroke="#d4d8b8" />
            </g>
          ))}
          {[
            [119, 359, "WF"],
            [320, 102, "01"],
            [521, 359, "02"],
          ].map(([x, y, t]) => (
            <g key={t}>
              <circle
                cx={x}
                cy={y}
                r="35"
                fill="#21392d"
                stroke="#c8b78e"
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                fill="#e5d5b8"
                fontSize="17"
                fontFamily="monospace"
              >
                {t}
              </text>
            </g>
          ))}
          <text
            x="320"
            y="437"
            textAnchor="middle"
            fill="#c4d1b5"
            fontSize="13"
            fontFamily="monospace"
          >
            EPITECH × ROKI / BETTER TOGETHER
          </text>
        </>
      )}
      {kind === "client" && (
        <>
          <rect
            x="196"
            y="143"
            width="365"
            height="269"
            rx="17"
            fill="#14251e"
            stroke="#8ca58f"
          />
          <path d="M196 182h365" stroke="#516952" />
          <text
            x="219"
            y="168"
            fill="#bdd0b3"
            fontSize="11"
            fontFamily="monospace"
          >
            WF / PROJECT STUDIO
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path d={`M218 ${230 + i * 60}h320`} stroke="#425845" />
              <rect
                x={246 + i * 57}
                y={211 + i * 60}
                width={147 - i * 24}
                height="32"
                rx="6"
                fill={["#d4ae83", "#8fae8c", "#657f66"][i]}
              />
            </g>
          ))}
          <path
            d="M81 92h213a16 16 0 0 1 16 16v92a16 16 0 0 1-16 16H147l-40 28v-28H81a16 16 0 0 1-16-16v-92a16 16 0 0 1 16-16Z"
            fill="#d6c8aa"
          />
          <g stroke="#475e4f" strokeWidth="3" strokeLinecap="round">
            <path d="M91 125h189M91 146h151M91 167h170" />
          </g>
          <circle
            cx="477"
            cy="399"
            r="47"
            fill="#b8c49c"
            stroke="#0d2118"
            strokeWidth="8"
          />
          <path
            d="m455 398 15 15 27-30"
            stroke="#314d39"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="94"
            y="459"
            fill="#cdd4b9"
            fontSize="13"
            fontFamily="monospace"
          >
            {fr ? "ÉCOUTER → CONCEVOIR → LIVRER" : "LISTEN → DESIGN → DELIVER"}
          </text>
        </>
      )}
      </g>
      <g data-morph-group opacity="0" aria-hidden="true">
        <path data-morph-path fill="#193528" fillOpacity=".85" stroke="#d8bc92" strokeWidth="2" strokeLinejoin="round" />
        {Array.from({length:12},(_,i)=><circle key={i} data-morph-dot r={i%3===0?7:4} fill={i%3===0?"#e8c29b":"#b8d2a4"} />)}
      </g>
    </svg>
  );
}

export default function ScrollStory() {
  const { language } = usePreferences();
  const track = useRef(null);
  const fr = language === "fr", l = fr ? 0 : 1;
  useEffect(() => {
    const el = track.current;
    const stage = el.querySelector("[data-stage]");
    const panels = Array.from(el.querySelectorAll("[data-scene]"));

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = Math.max(1, el.offsetHeight - stage.offsetHeight);
      const progress = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / travel));
      const { weights, active, index, blend } = journeyFrame(progress, panels.length, reduced.matches);
      const morph = journeyMorph(index, blend);
      const morphAmount = reduced.matches ? 0 : Math.sin(Math.PI * blend);
      panels.forEach((panel, i) => {
        panel.style.opacity = weights[i];
        panel.style.visibility = weights[i] > 0 ? "visible" : "hidden";
        panel.setAttribute("aria-hidden", String(i !== active));
        if (weights[i] === 0) return;
        const copy = panel.querySelector("[data-copy]");
        copy.style.visibility = i === active ? "visible" : "hidden";
        const textFade = reduced.matches ? 1 : Math.abs(1 - blend * 2);
        copy.style.opacity = textFade;
        copy.style.transform = `translateY(${reduced.matches ? 0 : (i === index ? -1 : 1) * (1 - textFade) * 36}px)`;
        panel.querySelector("[data-scene-art]").style.opacity = 1 - morphAmount;
        panel.querySelector("[data-morph-group]").style.opacity = morphAmount;
        panel.querySelector("[data-morph-path]").setAttribute("d", morph.path);
        panel.querySelectorAll("[data-morph-dot]").forEach((dot,j) => { dot.setAttribute("cx",morph.points[j][0]); dot.setAttribute("cy",morph.points[j][1]); });
        panel.style.setProperty("--shape-scale", 1 + morphAmount * .08);
        panel.style.setProperty("--depth", `${reduced.matches ? 0 : Math.sin(progress * Math.PI * 2) * -16}px`);
      });

      el.style.setProperty("--progress", progress);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(stage);
    update();
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); resize.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <section className={styles.journey} aria-labelledby="journey-title">
    <div className={styles.intro}>
      <p className={styles.kicker}>WF / {fr ? "UNE HISTOIRE DE CURIOSITÉ" : "A STORY OF CURIOSITY"}</p>
      <h2 id="journey-title">{fr ? "Derrière le code," : "Behind the code,"}<br/><em>{fr ? "il y a un parcours." : "there is a journey."}</em></h2>
      <p>{fr ? "Faites défiler. L’histoire se transforme." : "Keep scrolling. Watch the story unfold."}</p>
    </div>
    <div ref={track} className={styles.track}>
      <div data-stage className={styles.stage}>
        <div className={styles.card}>
          <div className={styles.topline}><span>WF / {fr ? "MON PARCOURS" : "MY JOURNEY"}</span><span>{fr ? "DÉFILER POUR EXPLORER ↓" : "SCROLL TO EXPLORE ↓"}</span></div>
          <div className={styles.scenes}>
            {featuredChapters.map((chapter, i) => <article key={chapter.id} data-scene className={styles.scene} aria-hidden={i !== 0} style={{opacity:i===0?1:0, visibility:i===0?"visible":"hidden"}}>
              <div className={styles.art}><Illustration kind={chapter.id} fr={fr}/></div>
              <div data-copy className={styles.copy}>
                <p className={styles.kicker}>0{i+1} / {chapter.label[l]}</p>
                <h3>{chapter.title[l]}<br/><em>{chapter.accent[l]}</em></h3>
                <p className={styles.description}>{chapter.text[l]}</p>
                <p className={styles.note}>↗ {chapter.note[l]}</p>
              </div>
            </article>)}
          </div>
          <div className={styles.progress} aria-hidden="true"><i/></div>
        </div>
      </div>
    </div>
  </section>;
}
