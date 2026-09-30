"use client";

import { useEffect, useRef } from "react";
import { usePreferences } from "./Preferences";

import { journeyArtwork as forms, artworkSteps as steps } from "../lib/journey-artwork";

export default function JourneySculpture({ frameRef }) {
  const canvas = useRef(null);
  const { theme, reducedMotion } = usePreferences();
  useEffect(() => {
    const surface = canvas.current;
    if (!surface || reducedMotion) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const currentFrame = frameRef.current;
    let width = 0, height = 0, visible = false, previousFrame = "";
    const colors = theme === "dark" ? ["255,120,91", "230,234,242", "154,165,186"] : ["187,53,29", "46,57,76", "103,115,135"];
    function draw() {
      const { index = 0, blend = 0, progress = 0 } = currentFrame;
      const from = forms[index], to = forms[Math.min(index + 1, 4)];
      const mix = blend;
      const signature = `${index}:${mix.toFixed(4)}:${progress.toFixed(4)}:${width}:${height}`;
      if (signature === previousFrame) return;
      previousFrame = signature;
      surface.dataset.chapter = String(index);
      surface.dataset.blend = mix.toFixed(3);
      const yaw = .24 + progress * .6, pitch = -.25 + Math.sin(progress * Math.PI) * .35;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const scale = Math.min(width, height) / 425;
      const points = from.map((point, i) => {
        const curl = Math.sin(mix * Math.PI) * Math.sin(i / steps * Math.PI * 3) * 16;
        const x = point[0] + (to[i][0] - point[0]) * mix;
        const y = point[1] + (to[i][1] - point[1]) * mix + curl;
        const z = point[2] + (to[i][2] - point[2]) * mix;
        const rx = x * cy + z * sy, rz = -x * sy + z * cy;
        const ry = y * cp - rz * sp, depth = y * sp + rz * cp;
        const perspective = 680 / (680 - depth);
        return [width / 2 + rx * scale * perspective, height / 2 + ry * scale * perspective, depth];
      });
      const segments = [];
      for (let i = 1; i < points.length; i++) {
        if (i % (steps + 1) === 0) continue;
        segments.push({ a:points[i - 1], b:points[i], strand:Math.floor(i / ((steps + 1) * 7)), depth:(points[i - 1][2] + points[i][2]) / 2, dot:i % 13 === 0 });
      }
      segments.sort((a, b) => a.depth - b.depth);
      ctx.clearRect(0, 0, width, height);
      for (const segment of segments) {
        const alpha = Math.max(.12, Math.min(.9, .43 + segment.depth / 500));
        ctx.strokeStyle = `rgba(${colors[segment.strand]},${alpha})`;
        ctx.lineWidth = Math.max(.6, scale * (segment.strand === 0 ? 1.3 : .8));
        ctx.beginPath(); ctx.moveTo(segment.a[0], segment.a[1]); ctx.lineTo(segment.b[0], segment.b[1]); ctx.stroke();
        if (segment.dot) { ctx.fillStyle = `rgba(${colors[segment.strand]},${alpha})`; ctx.beginPath(); ctx.arc(segment.b[0], segment.b[1], Math.max(1.2, scale * 2.2), 0, Math.PI * 2); ctx.fill(); }
      }
    }
    // ScrollStory supplies the single animation clock for text and artwork.
    function sync() { if (visible && !document.hidden) draw(); }
    function resize() {
      width = surface.clientWidth; height = surface.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      surface.width = Math.round(width * ratio); surface.height = Math.round(height * ratio);
      previousFrame = "";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw();
    }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(surface); resizeObserver.observe(surface);
    document.addEventListener("visibilitychange", sync);
    currentFrame.redraw = sync;
    resize();
    return () => { observer.disconnect(); resizeObserver.disconnect(); document.removeEventListener("visibilitychange", sync); delete currentFrame.redraw; };
  }, [frameRef, theme, reducedMotion]);
  return <canvas ref={canvas} aria-hidden="true" />;
}
