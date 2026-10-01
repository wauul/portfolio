"use client";
import Image from 'next/image';

import ProjectArtwork from './ProjectArtwork';
import SignatureLogo from './SignatureLogo';
import HeroContext from './HeroContext';
import { heroProjectCopy } from '../lib/project-artwork.mjs';
import { useEffect, useRef, useState } from 'react';
import { FiArrowDown, FiArrowUpRight, FiPause, FiPlay } from 'react-icons/fi';
import { usePreferences } from './Preferences';
import DownloadCV from './DownloadCV';
import { clamp, heroFrame, heroProgress, heroScrollProgress, ideaFrame, phase } from '../lib/hero-world.mjs';
import { chapters as journey } from '../lib/story';
import { personalProjects } from '../lib/personal-projects';
import styles from './HeroWorld.module.css';

export default function HeroWorld() {
  const { language, reducedMotion, theme } = usePreferences();
  const fr=language==='fr', locale=fr?0:1, projectLocale=fr?1:0;
  const track=useRef(null), surface=useRef(null), world=useRef(null), progress=useRef(0), jump=useRef(false);
  const [state,setState]=useState(()=>heroFrame(0));
  const [paused,setPaused]=useState(false), [unsupported,setUnsupported]=useState(false);
  const staticMode=reducedMotion||unsupported;
  const labels=fr?['Une identité','Mon parcours','Le portail','Mes projets','Votre idée']:['An identity','My journey','The portal','My projects','Your idea'];
  const project=personalProjects[state.projectActive];

  useEffect(()=>{
    const root=track.current,stage=root.querySelector('[data-hero-stage]');
    const panels=[...root.querySelectorAll('[data-hero-panel]')];
    let frame=0,firstUpdate=true;
    function update(){
      frame=0;
      const header=document.querySelector('.site-header').offsetHeight;
      root.style.setProperty('--hero-top',`${header}px`);
      const target=staticMode?0:heroProgress(clamp((header-root.getBoundingClientRect().top)/Math.max(1,root.offsetHeight-stage.offsetHeight)));
      progress.current=firstUpdate||jump.current||staticMode?target:progress.current+(target-progress.current)*.15;
      firstUpdate=false;
      jump.current=false;
      if(Math.abs(target-progress.current)<.0002)progress.current=target;
      const next=heroFrame(progress.current,personalProjects.length);
      setState(previous=>previous.chapter===next.chapter&&previous.journeyActive===next.journeyActive&&previous.projectIndex===next.projectIndex&&previous.projectActive===next.projectActive?previous:next);
      panels.forEach((panel,index)=>{const visible=index===next.chapter&&(index!==4||progress.current>=.993);panel.inert=!visible;panel.setAttribute('aria-hidden',String(!visible));panel.style.visibility=visible?'visible':'hidden';});
      panels[0].style.setProperty('--text-alpha',String(1-phase(progress.current,.035,.078)));
      panels[2].style.setProperty('--text-alpha',String(phase(progress.current,.395,.423)*(1-phase(progress.current,.455,.495))));
      root.querySelectorAll('[data-journey-copy]').forEach((entry,index)=>{
        const alpha=(index===next.journeyIndex?1-phase(next.journeyBlend,0,.5):index===next.journeyIndex+1?phase(next.journeyBlend,.5,1):0)*phase(progress.current,.076,.094)*(1-phase(progress.current,.378,.4));
        entry.style.setProperty('--text-alpha',String(alpha));entry.style.setProperty('--text-shift',`${(1-alpha)*(index===next.journeyIndex?-12:12)}px`);
        entry.style.visibility=alpha>0?'visible':'hidden';entry.setAttribute('aria-hidden',String(next.chapter!==1||index!==next.journeyActive));
      });
      const enter=phase(next.projectPhase,0,.2),leave=phase(next.projectPhase,.8,1);
      root.style.setProperty('--card-x',`${(1-enter)*65-leave*65}px`);
      root.style.setProperty('--card-y',`${(1-enter+leave)*28}px`);
      root.style.setProperty('--card-rotate',`${(1-enter)*7-leave*7}deg`);
      root.style.setProperty('--card-scale',`${.93+enter*.07-leave*.07}`);
      root.style.setProperty('--card-alpha',`${.5+enter*.5-leave*.5}`);
      root.querySelectorAll('[data-ad-card]').forEach((card,index)=>{
        const outgoing=index===next.projectIndex, incoming=index===next.projectIndex+1;
        const alpha=outgoing?(1-phase(next.projectPhase,.30,.45))*(next.projectIndex===0?phase(progress.current,.5,.506):1):incoming?phase(next.projectPhase,.86,1):0;
        const last=next.projectIndex===personalProjects.length-1;
        const visibleAlpha=last&&outgoing?1-phase(progress.current,.918,.93):alpha;
        card.style.setProperty('--ad-scale','1');
        card.style.setProperty('--copy-alpha',String(phase(visibleAlpha,.15,.9)));
        card.style.setProperty('--copy-shift',`${(1-visibleAlpha)*(outgoing?-12:12)}px`);
        card.style.opacity=String(Math.min(1,visibleAlpha*3));
        const artwork=card.querySelector(`.${styles.adArt}`);
        if(visibleAlpha>.995)artwork.style.maskImage='';
        else{
          const dots=Array.from({length:16},(_,i)=>`<circle cx="${(i%4)*12+6}" cy="${Math.floor(i/4)*12+6}" r="${visibleAlpha*(9+(i%3))}" fill="white"/>`).join('');
          artwork.style.maskImage=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">${dots}</svg>`)}")`;
        }
        artwork.style.maskSize=visibleAlpha>.995?'':'48px 48px';
        card.style.visibility=next.chapter===3&&visibleAlpha>0?'visible':'hidden';
        card.inert=next.chapter!==3||index!==next.projectActive;
        card.setAttribute('aria-hidden',String(next.chapter!==3||index!==next.projectActive));
      });
      root.style.setProperty('--context-alpha',String(1-phase(progress.current,0,.045)));
      root.style.setProperty('--portal-travel',String(phase(progress.current,.455,.5)));
      root.style.setProperty('--portal-arrival',String(phase(progress.current,.4,.445)));
      root.style.setProperty('--idea-alpha',String(staticMode?1:ideaFrame(progress.current).reveal));
      root.style.setProperty('--idea-scale','1');
      root.style.setProperty('--hero-progress',progress.current);
      world.current?.redraw();
      if(progress.current!==target)schedule();
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(update);}
    const resize=new ResizeObserver(schedule);resize.observe(root);resize.observe(stage);
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);schedule();
    return()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[staticMode]);

  useEffect(()=>{
    if(unsupported)return;
    let disposed=false,instance;
    track.current.dataset.ready='false';
    import('../lib/render-hero-world').then(({createHeroWorld})=>{
      if(disposed)return;
      try{instance=createHeroWorld(surface.current,{progress,theme,reducedMotion,paused,french:fr});world.current=instance;track.current.dataset.ready='true';}
      catch{setUnsupported(true);}
    }).catch(()=>{if(!disposed)setUnsupported(true);});
    const canvas=surface.current;
    const lost=event=>{event.preventDefault();track.current.dataset.ready='false';setUnsupported(true);};
    canvas.addEventListener('webglcontextlost',lost);
    return()=>{disposed=true;canvas.removeEventListener('webglcontextlost',lost);instance?.dispose();world.current=null;};
  },[theme,reducedMotion,paused,unsupported,fr]);

  function goTo(p){
    const root=track.current,header=document.querySelector('.site-header').offsetHeight;
    jump.current=true;
    window.scrollTo({top:window.scrollY+root.getBoundingClientRect().top-header+heroScrollProgress(p)*(root.offsetHeight-root.querySelector('[data-hero-stage]').offsetHeight),behavior:'instant'});
  }
  function wakeArtwork(event){
    if(paused||staticMode||event.pointerType==='touch')return;
    const card=event.currentTarget,rect=card.getBoundingClientRect();
    card.style.setProperty('--wake-x',`${((event.clientX-rect.left)/rect.width-.5)*-18}px`);
    card.style.setProperty('--wake-y',`${((event.clientY-rect.top)/rect.height-.5)*-12}px`);
    card.style.setProperty('--wake-turn',`${((event.clientX-rect.left)/rect.width-.5)*-3}deg`);
  }
  function sleepArtwork(event){for(const key of ['--wake-x','--wake-y','--wake-turn'])event.currentTarget.style.removeProperty(key);}
  return <section id="home" ref={track} className={styles.track} data-ready="false" data-paused={paused} data-static={staticMode} aria-label={fr?'Wael Fezari, mon parcours et mes projets':'Wael Fezari, my journey and projects'}>
    <div data-hero-stage className={styles.stage}>
      <div className={styles.art} aria-hidden="true"><div className={styles.fallback}><SignatureLogo/></div><canvas ref={surface}/></div>
      <div className={styles.identity}><strong>Wael Fezari</strong><span>{fr?'Développeur full-stack & IA':'Full-stack & AI developer'}</span><span>Marseille, FR</span><Image className={styles.identityPortrait} src="/hero-art/wael-portrait.png" width={120} height={120} alt="Wael Fezari"/></div>
      <p className={styles.note}>{fr?'Des interfaces. De l’intelligence.':'Interfaces. Intelligence.'}<br/>{fr?'Des systèmes qui travaillent ensemble.':'Systems that work together.'}</p>
      <div data-hero-panel className={`${styles.panel} ${styles.intro}`}>
        <h1>{fr?'Connecter':'Connect'}<br/>{fr?'les possibles.':'the possibilities.'}</h1>
        <div className={styles.introBottom}><a href={staticMode?'#work':'#hero-journey'} onClick={event=>{if(!staticMode){event.preventDefault();goTo(.105);}}}>{fr?'Défiler pour découvrir':'Scroll to discover'}<FiArrowDown/></a><DownloadCV/></div>
        {!staticMode&&<p className={styles.hoverHint}>{fr?'Passez la souris sur les particules.':'Move your mouse through the particles.'}</p>}
      </div>
      <HeroContext french={fr} paused={paused} staticMode={staticMode} active={state.chapter===0}/>
      <div id="hero-journey" data-hero-panel className={`${styles.panel} ${styles.journey}`} aria-hidden="true" style={{visibility:'hidden'}}>
        {journey.map(chapter=><div data-journey-copy key={chapter.id} className={styles.journeyEntry} aria-hidden="true" style={{visibility:'hidden'}}><div className={styles.journeyTitle}><h2>{chapter.title[locale]}<br/><span>{chapter.accent[locale]}</span></h2></div><div className={styles.journeyText}><p>{chapter.text[locale]}</p><span>{chapter.note[locale]}</span></div></div>)}
      </div>
      <div data-hero-panel className={`${styles.panel} ${styles.portalPanel}`} aria-hidden="true" style={{visibility:'hidden'}}><h2>{fr?'Chaque étape':'Every step'}<br/>{fr?'ouvre une porte.':'opens a door.'}</h2><p className={styles.portalCopy}>{fr?'Le parcours devient un espace de projets. Continuez à défiler pour entrer.':'The journey becomes a space for projects. Keep scrolling to step inside.'}</p></div>
      <div data-hero-panel className={styles.projectPanel} aria-hidden="true" style={{visibility:'hidden'}}>
        <div className={styles.adDeck}>{personalProjects.map((item,index)=><article data-ad-card data-project={item.id} key={item.id} className={styles.adCard} aria-hidden="true" style={{visibility:'hidden',opacity:0}}>
          <a href={`#project-${item.id}`} onPointerMove={wakeArtwork} onPointerLeave={sleepArtwork} onClick={event=>{event.preventDefault();window.dispatchEvent(new CustomEvent('portfolio-project',{detail:item.id}));history.replaceState(null,'',`#project-${item.id}`);}} aria-label={`${fr?'Découvrir':'Explore'} ${item.name}`}>
            <div className={styles.adArt}><ProjectArtwork id={item.id} name={item.name} french={fr} animated={state.chapter===3&&state.projectActive===index&&!paused&&!staticMode}/></div>
            <div className={styles.adCopy}><h2>{item.name}</h2><p>{heroProjectCopy[index][projectLocale]}</p><span className={styles.adAction}>{fr?'Explorer le projet':'Explore the project'}<FiArrowUpRight/></span></div>
          </a>
        </article>)}</div>
      </div>
      <div data-hero-panel className={styles.ideaPanel} aria-hidden="true" style={{visibility:'hidden'}}>
        <div className={styles.ideaCard}><div className={styles.ideaCopy}><h2>{fr?'Votre idée':'Your idea'}<br/><span>{fr?'prend vie ici.':'comes alive here.'}</span></h2><p>{fr?'Un début. Toutes les possibilités.':'One beginning. Every possibility.'}</p><a href="#contact">{fr?'Construisons-la ensemble':'Let’s build it together'}<FiArrowUpRight/></a></div></div>
      </div>
      <div className={styles.rail}>{!staticMode&&<nav aria-label={fr?'Chapitres du hero':'Hero chapters'}>{labels.map((label,index)=><button key={label} aria-label={label} aria-current={state.chapter===index?'step':undefined} onClick={()=>goTo([0,.105,.445,.509,.995][index])}><span/></button>)}<span className={styles.chapterLabel}>{state.chapter===1?`${state.journeyActive+1}/5 · ${labels[1]}`:state.chapter===3?`${state.projectActive+1}/9 · ${project.name}`:labels[state.chapter]}</span></nav>}<span className={styles.availability}><i/>{fr?'Disponible en CDI et freelance':'Available for permanent roles & freelance'}</span>{!staticMode&&<button className={styles.motion} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<FiPlay/>:<FiPause/>}{fr?(paused?'Reprendre':'Pause'):(paused?'Resume':'Pause')}</button>}</div>
      <div className={styles.progress} aria-hidden="true"/>
    </div>
    {staticMode&&<details className={styles.staticJourney}><summary>{fr?'Découvrir mon parcours':'Explore my journey'}</summary>{journey.map(chapter=><article key={chapter.id}><h2>{chapter.title[locale]} {chapter.accent[locale]}</h2><p>{chapter.text[locale]}</p><span>{chapter.note[locale]}</span></article>)}</details>}
  </section>;
}
