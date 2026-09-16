"use client";
import { useEffect, useRef } from "react";
import { usePreferences } from "./Preferences";
export default function HeroSculpture() {
  const ref = useRef(null);
  const { language } = usePreferences();
  const fr = language === "fr";
  useEffect(() => {
    const el = ref.current;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const move = (e) => {
      if (media.matches || e.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty(
          "--tilt-x",
          `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`,
        );
        el.style.setProperty(
          "--tilt-y",
          `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`,
        );
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    media.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      media.removeEventListener("change", reset);
    };
  }, []);
  return (
    <div ref={ref} className="hero-sculpture" aria-hidden="true">
      <div className="sculpture-grid" />
      <div className="sculpture-aura" />
      <div className="sculpture-object" data-depth="0.1">
        <div className="sculpture-orbit orbit-front" />
        <div className="sculpture-orbit orbit-back" />
        <div className="sculpture-medallion">
          <div>
            <span>W</span>
            <i>F</i>
          </div>
          <small>CODE / CRAFT / INTELLIGENCE</small>
        </div>
        <div className="sculpture-axis axis-one" />
        <div className="sculpture-axis axis-two" />
      </div>
      <span className="sculpture-coordinate coordinate-top">
        43°17′ N / 5°22′ E
      </span>
      <span className="sculpture-coordinate coordinate-bottom">
        WF — {fr ? "ATELIER NUMÉRIQUE" : "DIGITAL ATELIER"}
      </span>
      <div className="sculpture-caption">
        <span>✳</span>
        <p>
          {fr ? "L’ingénierie a aussi" : "Engineering has"}
          <br />
          <em>{fr ? "sa signature." : "a signature, too."}</em>
        </p>
      </div>
      <div className="sculpture-tag" data-depth="-0.08">
        <i />
        {fr
          ? "INTERFACES × IA × INTÉGRATIONS"
          : "INTERFACES × AI × INTEGRATIONS"}
      </div>
    </div>
  );
}
