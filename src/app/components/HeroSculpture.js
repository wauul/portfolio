"use client";
import { useEffect, useRef } from "react";
import { usePreferences } from "./Preferences";

export default function HeroSculpture() {
  const ref = useRef(null);
  const canvas = useRef(null);
  const { language, reducedMotion, theme } = usePreferences();
  const fr = language === "fr";
  useEffect(() => {
    const host = ref.current;
    const surface = canvas.current;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const still = reducedMotion;
    let width = 0, height = 0, frame = 0, last = 0, clock = 0, visible = false;
    let aimX = 0, aimY = 0, tiltX = 0, tiltY = 0;
    const colors = theme === "dark" ? ["255,120,91", "220,225,235", "145,156,177"] : ["187,53,29", "57,66,85", "114,123,142"];
    function draw() {
      if (!width) return;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) / 460;
      const hero = host.closest("section").getBoundingClientRect();
      const travel = still ? 0 : Math.min(1, Math.max(0, -hero.top / (hero.height * .7)));
      const spin = clock * .00009 + tiltX + travel * .9;
      const pitch = .5 + tiltY + travel * .22;
      const cy = Math.cos(spin), sy = Math.sin(spin), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const segments = [];
      const transform = (x, y, z) => {
        const rx = x * cy + z * sy, rz = -x * sy + z * cy;
        const ry = y * cp - rz * sp, depth = y * sp + rz * cp;
        const perspective = 620 / (620 - depth);
        return [width / 2 + rx * scale * perspective, height / 2 + ry * scale * perspective, depth];
      };
      for (let strand = 0; strand < 3; strand++) {
        for (let band = 0; band < 9; band++) {
          let previous;
          for (let step = 0; step <= 96; step++) {
            const t = step / 96 * Math.PI * 2;
            const phase = strand * Math.PI * 2 / 3;
            const radius = 124 + 37 * Math.cos(3 * t + phase) + band * 1.6;
            const unfold = travel * travel * (3 - 2 * travel);
            const knotX = radius * Math.cos(2 * t + phase), knotY = radius * Math.sin(2 * t + phase);
            const knotZ = (37 + band * 1.6) * Math.sin(3 * t + phase);
            const x = knotX + ((step / 96 - .5) * 370 - knotX) * unfold;
            const y = knotY + ((strand - 1) * 60 + Math.sin(t * 2 + phase) * 32 + band * 2 - knotY) * unfold;
            const z = knotZ * (1 - unfold) + (strand - 1) * unfold * 45;
            const p = transform(x, y, z);
            if (previous) segments.push({ a: previous, b: p, strand, dot: band === 4 && step % 8 === 0, depth: (p[2] + previous[2]) / 2 });
            previous = p;
          }
        }
      }
      segments.sort((a, b) => a.depth - b.depth);
      for (const segment of segments) {
        const alpha = Math.max(.07, Math.min(.72, .27 + segment.depth / 440));
        ctx.strokeStyle = `rgba(${colors[segment.strand]},${alpha})`;
        ctx.lineWidth = (segment.strand === 0 ? 1.05 : .65) * scale;
        ctx.beginPath(); ctx.moveTo(segment.a[0], segment.a[1]); ctx.lineTo(segment.b[0], segment.b[1]); ctx.stroke();
        if (segment.dot) {
          ctx.fillStyle = `rgba(${colors[segment.strand]},${Math.min(1, alpha + .25)})`;
          ctx.beginPath(); ctx.arc(segment.b[0], segment.b[1], Math.max(1, 2.2 * scale), 0, Math.PI * 2); ctx.fill();
        }
      }
      host.dataset.ready = "true";
      host.style.setProperty("--signal-shift", `${travel * -28}px`);
    }
    function tick(now) {
      if (now - last > 32) {
        clock += Math.min(now - last, 50); last = now;
        tiltX += (aimX - tiltX) * .065; tiltY += (aimY - tiltY) * .065;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      draw();
      if (visible && !document.hidden && !still) { last = performance.now(); frame = requestAnimationFrame(tick); }
    }
    function resize() {
      width = host.clientWidth; height = host.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      surface.width = Math.round(width * ratio); surface.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw();
    }
    function move(event) {
      if (still || event.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      aimX = (event.clientX - rect.left - rect.width / 2) / rect.width * .65;
      aimY = (event.clientY - rect.top - rect.height / 2) / rect.height * .5;
    }
    function reset() { aimX = 0; aimY = 0; }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(host);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host);
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", sync);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", reset); document.removeEventListener("visibilitychange", sync); };
  }, [reducedMotion, theme]);
  return <div className="hero-sculpture" ref={ref} aria-hidden="true">
    <div className="signal-fallback"><i /><i /><i /></div>
    <canvas ref={canvas} />
    <div className="signal-center">WF<span>{fr ? "SYSTÈMES CONNECTÉS" : "CONNECTED SYSTEMS"}</span></div>
    <span className="signal-label signal-label-a">01 / {fr ? "Interfaces" : "Interfaces"}</span>
    <span className="signal-label signal-label-b">02 / {fr ? "Intelligence" : "Intelligence"}</span>
    <span className="signal-label signal-label-c">03 / {fr ? "Intégrations" : "Integrations"}</span>
    <div className="signal-coordinate"><span>43°17′ N / 5°22′ E</span><span>{fr ? "Trois disciplines, un système" : "Three disciplines, one system"}</span></div>
  </div>;
}
