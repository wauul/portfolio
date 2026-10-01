"use client";
import { useEffect, useState } from 'react';
import { getVisitorInfo, weatherLabel } from '../lib/visitor.mjs';
import styles from './HeroWorld.module.css';
export default function HeroContext({ french, paused, staticMode, active }) {
  const [now,setNow]=useState(null),[info,setInfo]=useState(null),[loading,setLoading]=useState(true);
  useEffect(()=>{
    setNow(new Date());const timer=setInterval(()=>setNow(new Date()),1000);
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    let active=true;
    getVisitorInfo(fetch,controller.signal).then(value=>{if(active)setInfo(value);}).catch(()=>{if(active)setInfo({});}).finally(()=>{clearTimeout(timeout);if(active)setLoading(false);});
    return()=>{active=false;clearInterval(timer);clearTimeout(timeout);controller.abort();};
  },[]);
  const unavailable=loading?(french?'Connexion…':'Connecting…'):(french?'Indisponible':'Unavailable');
  const items=[
    [french?'Heure locale':'Local time',now?now.toLocaleTimeString(french?'fr-FR':'en-GB',{hour:'2-digit',minute:'2-digit'}):'—:—'],
    [french?'Localisation IP estimée':'Approximate IP location',info?.location||unavailable],
    [french?'Météo locale':'Local weather',info?.weather?`${Math.round(info.weather.temperature)}° · ${weatherLabel(info.weather.code,french?'fr':'en')}`:unavailable],
    ['IP',info?.ip||unavailable],
  ];
  return <div className={styles.contextOrbit} hidden={!active} data-still={paused||staticMode} aria-label={french?'Le contexte de votre visite':'Your visit context'}>{items.map(([label,value],index)=><div key={label} className={styles.contextItem} style={{'--orbit-delay':`${index*-12}s`}}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}
