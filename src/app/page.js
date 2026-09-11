"use client";

import { useEffect, useRef, useState } from "react";
import {
  PreferencesProvider,
  PreferenceControls,
  usePreferences,
} from "./components/Preferences";
import VisitorPanel from "./components/VisitorPanel";
import ScrollStory from "./components/ScrollStory";
import HeroSculpture from "./components/HeroSculpture";
import DownloadCV from "./components/DownloadCV";
import ContactForm from "./components/ContactForm";
const projects = [
  {
    id: "01",
    category: "Product engineering",
    title: "A clearer picture of teamwork.",
    name: "Architecture team planner",
    description:
      "An interactive planning tool that brings teams, tasks and time into one timeline. Built in vanilla JavaScript as a custom Bubble plugin.",
    tags: ["JavaScript", "Bubble plugin", "Lucca API"],
    type: "timeline",
    details: [
      "Drag, drop and resize tasks; manage phases and key dates across teams.",
      "Respect weekends, public holidays and leave imported from Lucca.",
      "Send declared time to Lucca when a task is marked done, with PDF export for planning reviews.",
    ],
  },
  {
    id: "02",
    category: "Applied AI",
    title: "From documents to answers.",
    name: "Enterprise knowledge assistant",
    description:
      "A conversational assistant connecting company knowledge to natural-language questions through retrieval-augmented generation.",
    tags: ["Azure OpenAI", "Azure AI Search", "RAG", "Docker"],
    type: "ai",
    details: [
      "Built an enterprise chatbot at ROKI using OpenAI on Azure and Bubble.",
      "Used Azure AI Search to retrieve relevant company-document passages for the RAG workflow.",
      "Connected the AI experience to the application through service integrations.",
    ],
  },
  {
    id: "03",
    category: "Systems integration",
    title: "One connected workspace.",
    name: "Microsoft & business workflows",
    description:
      "SSO and Microsoft tool integrations, alongside a Bubble application for the everyday flow of stock, orders and deliveries.",
    tags: ["SAML SSO", "Microsoft", "API integration", "Bubble"],
    type: "integration",
    details: [
      "Implemented Microsoft SSO using SAML and integrations with Outlook, Word, Excel and PowerPoint.",
      "Integrated AI capabilities through Microsoft OpenAI services.",
      "Built a separate Bubble application to manage inventory, orders and deliveries.",
    ],
  },
];
const experiences = [
  {
    date: "2024 — Present",
    company: "Independent",
    role: "Freelance full-stack & AI developer",
    text: "Building business applications from interface to integration: architecture team planning, Lucca synchronisation, Microsoft SAML SSO, AI features and stock-management workflows.",
    tags: "JavaScript · TypeScript · APIs · Microsoft · Bubble",
  },
  {
    date: "2022 — 2024",
    company: "ROKI · Marseille",
    role: "Full-stack & AI developer · Apprenticeship",
    text: "Developed an Azure RAG chatbot, a Python/Flask job-distribution module, and business applications using Node.js, PostgreSQL and AWS. Connected advertising and CRM tools including Google, Facebook and HubSpot.",
    tags: "Python · Flask · Azure OpenAI · Azure AI Search · Node.js",
  },
  {
    date: "2016 — 2021",
    company: "Freelance · Alongside studies",
    role: "Web & mobile developer",
    text: "Delivered web and mobile projects through Fiverr while studying, working with React, Angular, Flutter and Java.",
    tags: "React · Angular · Flutter · Java",
  },
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function ProjectVisual({ type }) {
  const { t } = usePreferences();
  if (type === "timeline")
    return (
      <div className="project-visual timeline-visual" aria-hidden="true">
        <div className="mock-header">
          <span>Studio / Planning</span>
          <span>{t("Week 24 \u2197") + " "}</span>
        </div>
        <div className="week">
          <span>{t("MON") + " "}</span>
          <span>{t("TUE") + " "}</span>
          <span>{t("WED") + " "}</span>
          <span>{t("THU") + " "}</span>
          <span>{t("FRI") + " "}</span>
        </div>
        <div className="track">
          <div className="task task-a">
            {t("Concept design") + " "}
            <span>↔</span>
          </div>
        </div>
        <div className="track">
          <div className="task task-b">
            {t("Design review") + " "}
            <span>✓</span>
          </div>
        </div>
        <div className="track">
          <div className="task task-c">
            {t("Technical phase") + " "}
            <span>↔</span>
          </div>
        </div>
        <div className="mock-footer">
          <span>
            <i />
            {t("Team in sync") + " "}
          </span>
          <span>{t("Lucca connected") + " "}</span>
        </div>
      </div>
    );
  if (type === "ai")
    return (
      <div className="project-visual ai-visual" aria-hidden="true">
        <span className="visual-label">
          {t("KNOWLEDGE \u2192 CONTEXT \u2192 ANSWER") + " "}
        </span>
        <div className="doc-stack">
          <span>≡</span>
          <span>≡</span>
          <span>≡</span>
        </div>
        <div className="ai-path">· · · · · · · · ·</div>
        <div className="ai-engine">✳</div>
        <div className="answer-lines">
          <i />
          <i />
          <i />
        </div>
        <span className="visual-bottom">Azure AI Search × Azure OpenAI</span>
      </div>
    );
  return (
    <div className="project-visual integration-visual" aria-hidden="true">
      <span className="visual-label">{t("A CONNECTED ECOSYSTEM") + " "}</span>
      <div className="integration-row">
        <span>Outlook</span>
        <span>Word</span>
      </div>
      <div className="integration-hub">
        SSO <small>SAML</small>
      </div>
      <div className="integration-row">
        <span>Excel</span>
        <span>PowerPoint</span>
      </div>
      <span className="visual-bottom">
        {t("One identity. Connected tools.") + " "}
      </span>
    </div>
  );
}
function Portfolio() {
  const { t } = usePreferences();
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 900px), (pointer: coarse)",
    );
    const elements = root.current.querySelectorAll("[data-depth]");
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, 1100);
      elements.forEach((el) =>
        el.style.setProperty(
          "--parallax",
          `${media.matches ? 0 : y * Number(el.dataset.depth)}px`,
        ),
      );
    };
    const scroll = () => {
      if (!media.matches && !frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, {
      passive: true,
    });
    media.addEventListener("change", update);
    update();
    return () => {
      window.removeEventListener("scroll", scroll);
      media.removeEventListener("change", update);
      cancelAnimationFrame(frame);
      clearTimeout(timer.current);
    };
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("waelfezari@gmail.com");
      setCopied(true);
      setCopyError(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        {t("Skip to content") + " "}
      </a>
      <header
        className="site-header"
        onKeyDown={(e) => {
          if (e.key === "Escape") setMenuOpen(false);
        }}
      >
        <a
          className="wordmark"
          href="#home"
          aria-label={t("Wael Fezari, home")}
        >
          WF<span>.</span>
        </a>
        <PreferenceControls />
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? t("Close \u2212") : t("Menu +")}
        </button>
        <nav
          id="navigation"
          className={menuOpen ? "open" : ""}
          aria-label={t("Main navigation")}
        >
          {[
            ["work", t("Selected work")],
            ["about", t("About")],
            ["experience", t("Experience")],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {t(label)}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            {t("Let\u2019s talk") + " "}
            <Arrow />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              {t("AVAILABLE FOR CDI & FREELANCE") + " "}
            </div>
            <h1>
              {t("Turning") + " "}
              <br />
              {t("complexity") + " "}
              <br />
              {t("into") + " "}
              <em>{t("possibility.") + " "}</em>
            </h1>
            <p className="hero-description">
              {t(
                "I\u2019m Wael Fezari. A full-stack developer bringing thoughtful interfaces, connected systems and applied AI together.",
              ) + " "}
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                {t("Explore my work") + " "}
                <span>↓</span>
              </a>
              <DownloadCV />
            </div>
            <div className="hero-meta">
              <span>{t("BASED IN MARSEILLE, FRANCE") + " "}</span>
              <span>{t("OPEN TO REMOTE & RELOCATION \u2197") + " "}</span>
            </div>
          </div>
          <HeroSculpture />
          <div className="hero-bottom">
            <span>{t("FULL-STACK DEVELOPMENT & APPLIED AI") + " "}</span>
            <span>{t("SCROLL TO DISCOVER \u2193") + " "}</span>
          </div>
        </section>
        <div className="stack-strip">
          <span>{t("THE TOOLS BEHIND THE IDEAS") + " "}</span>
          <div>
            Python <i>/</i> TypeScript <i>/</i> React <i>/</i> Next.js <i>/</i>{" "}
            Azure OpenAI <i>/</i> FastAPI
          </div>
        </div>
        <ScrollStory />
        <VisitorPanel />
        <section id="work" className="section-wrap work-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("01 / SELECTED WORK") + " "}</p>
              <h2>
                {t("Built for the") + " "}
                <br />
                <em>{t("real world.") + " "}</em>
              </h2>
            </div>
            <p>
              {t("A selection of client and professional projects.") + " "}
              <br />
              {t("Real workflows. Thoughtful engineering.") + " "}
            </p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <ProjectVisual type={project.type} />
                <div className="project-content">
                  <div className="project-index">
                    <span>{t(project.category)}</span>
                    <span>{t(project.id)}</span>
                  </div>
                  <h3>{t(project.title)}</h3>
                  <p className="project-name">{t(project.name)}</p>
                  <p>{t(project.description)}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{t(tag)}</span>
                    ))}
                  </div>
                  <details>
                    <summary>
                      {t("Explore the project") + " "}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <ul>
                      {project.details.map((detail) => (
                        <li key={t(detail)}>{t(detail)}</li>
                      ))}
                    </ul>
                    <small>
                      {t(
                        "Illustration above is a conceptual workflow, not a client screenshot.",
                      ) + " "}
                    </small>
                  </details>
                </div>
              </article>
            ))}
          </div>
          <a
            className="text-link github-link"
            href="https://github.com/wauul"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("More code & experiments on GitHub") + " "}
            <Arrow />
          </a>
        </section>
        <section className="about-section" id="about">
          <div className="section-wrap about-grid">
            <div>
              <p className="eyebrow">{t("02 / HOW I THINK") + " "}</p>
              <h2>
                {t("Curious by nature.") + " "}
                <br />
                <em>{t("Builder by choice.") + " "}</em>
              </h2>
              <p className="about-intro">
                {t(
                  "The best technology makes complicated things feel simple.",
                ) + " "}
              </p>
              <p>
                {t(
                  "I work across the full stack, from the details of an interface to the APIs and intelligence behind it. My background in software development and AI helps me connect the pieces into useful products.",
                ) + " "}
              </p>
              <p>
                {t(
                  "After two years at ROKI and independent client work, I\u2019m looking for a team where I can keep building ambitious software and practical AI.",
                ) + " "}
              </p>
              <DownloadCV compact />
            </div>
            <div className="capabilities">
              <div>
                <span>01</span>
                <h3>{t("Product development") + " "}</h3>
                <p>
                  {t(
                    "React, Next.js, TypeScript and vanilla JavaScript. Interfaces designed around the people using them.",
                  ) + " "}
                </p>
              </div>
              <div>
                <span>02</span>
                <h3>{t("Applied intelligence") + " "}</h3>
                <p>
                  {t(
                    "Python, FastAPI, Azure OpenAI and Azure AI Search. Connecting language models to company knowledge.",
                  ) + " "}
                </p>
              </div>
              <div>
                <span>03</span>
                <h3>{t("Connected systems") + " "}</h3>
                <p>
                  {t(
                    "Node.js, SQL, Docker and REST APIs. Microsoft SAML SSO, Lucca integrations and Bubble extensions.",
                  ) + " "}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section-wrap experience-section" id="experience">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("03 / THE JOURNEY") + " "}</p>
              <h2>
                {t("Always building.") + " "}
                <br />
                <em>{t("Always learning.") + " "}</em>
              </h2>
            </div>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/wael-fezari/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Find me on LinkedIn") + " "}
              <Arrow />
            </a>
          </div>
          <div className="experience-list">
            {experiences.map((item) => (
              <article className="experience-row" key={item.date}>
                <div className="experience-date">
                  {t(item.date)}
                  <span>{t(item.company)}</span>
                </div>
                <div>
                  <h3>{t(item.role)}</h3>
                  <p>{t(item.text)}</p>
                  <span className="experience-tags">{t(item.tags)}</span>
                </div>
                <span className="experience-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
          <div className="education">
            <p className="eyebrow">{t("EDUCATION") + " "}</p>
            <div>
              <h3>{t("MSc Pro \xB7 Software Development & AI") + " "}</h3>
              <p>
                {t("Epitech, Marseille \xB7 2022\u20132024 \xB7 Graduated") +
                  " "}
              </p>
            </div>
            <div>
              <h3>{t("Master \xB7 Information Systems & Decisions") + " "}</h3>
              <p>
                {t("Badji Mokhtar University, Annaba \xB7 2019\u20132021") +
                  " "}
              </p>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="section-wrap">
            <div className="eyebrow">
              <span className="status-dot" />
              {t("AVAILABLE FOR MY NEXT CHAPTER") + " "}
            </div>
            <h2>
              {t("Have something") + " "}
              <br />
              <em>{t("in mind?") + " "}</em>
              <a
                href="mailto:waelfezari@gmail.com"
                aria-label={t("Email Wael Fezari")}
                className="contact-arrow"
              >
                ↗
              </a>
            </h2>
            <ContactForm />
            <div className="contact-bottom">
              <div>
                <a className="email-link" href="mailto:waelfezari@gmail.com">
                  waelfezari@gmail.com
                </a>
                <button className="copy-button" onClick={copyEmail}>
                  {copied ? t("Copied \u2713") : t("Copy email")}
                </button>
                <p role="status" className="copy-status">
                  {copyError
                    ? t(
                        "Please use the email link or copy the address manually.",
                      )
                    : copied
                      ? t("Email address copied to clipboard.")
                      : ""}
                </p>
              </div>
              <p>
                {t("Available immediately.") + " "}
                <br />
                {t("France \xB7 Remote \xB7 Open to relocation.") + " "}
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="section-wrap">
        <a className="wordmark" href="#home">
          WF<span>.</span>
        </a>
        <p>{t("Thoughtfully built. Always evolving.") + " "}</p>
        <div>
          <a
            href="https://github.com/wauul"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/wael-fezari/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href="#home">{t("Back to top \u2191") + " "}</a>
        </div>
      </footer>
    </div>
  );
}
export default function PortfolioApp() {
  return (
    <PreferencesProvider>
      <Portfolio />
    </PreferencesProvider>
  );
}
