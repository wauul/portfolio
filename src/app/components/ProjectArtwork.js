"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { loadProjectLayers, paintProjectAction } from '../lib/animate-project-art';
import styles from './HeroWorld.module.css';
export default function ProjectArtwork({ id, name, french, animated=false }) {
  const host=useRef(null), image=useRef(null), canvas=useRef(null);
  useEffect(()=>{
    if(!animated)return;
    const root=host.current,link=root.closest('a');
    let frame=0,start=0,layers,disposed=false,hover=false;
    const resize=()=>{const rect=root.getBoundingClientRect();canvas.current.width=Math.min(1000,Math.round(rect.width));canvas.current.height=Math.round(canvas.current.width*rect.height/rect.width);};
    loadProjectLayers(id,image.current.currentSrc||image.current.src).then(result=>{if(!disposed){layers=result;if(hover||root.matches(':hover'))wake();}});
    function draw(now){
      if(disposed||!hover||document.hidden){frame=0;return;}
      if(!start)start=now;
      const view=canvas.current;paintProjectAction(view.getContext('2d'),layers,id,view.width,view.height,(now-start)/1000);
      frame=requestAnimationFrame(draw);
    }
    function wake(){hover=true;if(frame||!layers?.base||document.hidden)return;resize();root.dataset.awake='true';start=0;frame=requestAnimationFrame(draw);}
    function sleep(){hover=false;cancelAnimationFrame(frame);frame=0;root.dataset.awake='false';}
    root.addEventListener('pointerenter',wake);root.addEventListener('pointerleave',sleep);link?.addEventListener('focus',wake);link?.addEventListener('blur',sleep);document.addEventListener('visibilitychange',sleep);
    return()=>{disposed=true;sleep();root.removeEventListener('pointerenter',wake);root.removeEventListener('pointerleave',sleep);link?.removeEventListener('focus',wake);link?.removeEventListener('blur',sleep);document.removeEventListener('visibilitychange',sleep);};
  },[animated,id]);
  return <div ref={host} className={styles.artworkPixels}><Image ref={image} src={`/hero-art/${id}.png`} alt={`${name} — ${french?'une création visuelle originale inspirée du projet':'original artwork inspired by the project'}`} fill sizes="(max-width:760px) 95vw, 85vw" quality={85} loading="eager" draggable={false}/>{animated&&<canvas ref={canvas} className={styles.livingArtwork} aria-hidden="true"/>}</div>;
}
