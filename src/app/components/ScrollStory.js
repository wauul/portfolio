"use client";
import { useEffect, useRef } from "react";
import { usePreferences } from "./Preferences";
export default function ScrollStory() {
  const section = useRef(null);
  const { language } = usePreferences();
  const fr = language === "fr";
  useEffect(() => {
    const el = section.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - innerHeight;
      const p = reduced.matches
        ? 0
        : Math.max(0, Math.min(1, -rect.top / Math.max(1, travel)));
      el.style.setProperty("--journey", p);
      el.style.setProperty("--bloom-scale", 0.85 + p * 0.8);
      el.style.setProperty("--bloom-rotate", `${p * 115}deg`);
      el.style.setProperty("--bloom-radius", `${50 - p * 27}%`);
      el.style.setProperty("--orbit-tilt", `${20 + p * 45}deg`);
      el.style.setProperty("--horizon-shift", `${(p - 0.5) * 100}px`);
      const scene = Math.min(2, Math.floor(p * 3));
      el.dataset.scene = scene;
      el.querySelectorAll("[data-story-panel]").forEach((panel, i) => {
        const local = p * 3 - i;
        const opacity =
          scene === i
            ? Math.min(
                1,
                i === 0 ? 1 : local / 0.15,
                i === 2 ? 1 : (1 - local) / 0.15,
              )
            : 0;
        panel.style.setProperty(
          "--panel-opacity",
          reduced.matches ? 1 : Math.max(0, opacity),
        );
        panel.style.setProperty(
          "--panel-y",
          `${reduced.matches ? 0 : (0.5 - local) * 34}px`,
        );
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  const scenes = fr
    ? [
        [
          "01 / IMAGINER",
          "Tout commence",
          "par un usage.",
          "Des interfaces qui donnent envie. Des interactions qui font sens.",
        ],
        [
          "02 / RELIER",
          "Les idées",
          "se connectent.",
          "Données, API et intelligence artificielle : assembler les bonnes pièces.",
        ],
        [
          "03 / CONSTRUIRE",
          "La complexité",
          "devient fluide.",
          "Transformer un besoin métier en un produit que l’on aime utiliser.",
        ],
      ]
    : [
        [
          "01 / IMAGINE",
          "It starts with",
          "a human need.",
          "Interfaces that invite. Interactions that make sense.",
        ],
        [
          "02 / CONNECT",
          "Ideas find",
          "their connections.",
          "Data, APIs and artificial intelligence: bringing the right pieces together.",
        ],
        [
          "03 / BUILD",
          "Complexity",
          "becomes flow.",
          "Turning a business need into a product people enjoy using.",
        ],
      ];
  return (
    <section
      ref={section}
      className="scroll-story"
      aria-label={fr ? "De l’idée au produit" : "From idea to product"}
    >
      <div className="story-sticky">
        <div className="story-coordinates" aria-hidden="true">
          <span>WF / DIGITAL ATELIER</span>
          <span>
            {fr
              ? "UNE IDÉE. PLUSIEURS DIMENSIONS."
              : "ONE IDEA. MANY DIMENSIONS."}
          </span>
        </div>
        <div className="story-atmosphere" aria-hidden="true">
          <div className="story-horizon" />
          <div className="story-starfield" />
        </div>
        <div className="bloom" aria-hidden="true">
          <div className="bloom-ring ring-a" />
          <div className="bloom-ring ring-b" />
          <div className="bloom-ring ring-c" />
          <div className="bloom-core" />
          <div className="bloom-satellite satellite-a" />
          <div className="bloom-satellite satellite-b" />
        </div>
        <div className="story-panels">
          {scenes.map((s, i) => (
            <div className="story-panel" data-story-panel key={i}>
              <p className="eyebrow">{s[0]}</p>
              <h2>
                {s[1]}
                <br />
                <em>{s[2]}</em>
              </h2>
              <p>{s[3]}</p>
            </div>
          ))}
        </div>
        <div className="story-progress" aria-hidden="true">
          <span>{fr ? "DÉFILER POUR EXPLORER" : "SCROLL TO EXPLORE"}</span>
          <div>
            <i />
          </div>
          <span>01 — 03</span>
        </div>
      </div>
    </section>
  );
}
