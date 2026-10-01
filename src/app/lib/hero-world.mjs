export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export function phase(progress, start, end) {
  const t = clamp((progress - start) / (end - start));
  return t * t * (3 - 2 * t);
}
export function heroChapter(progress) {
  return progress < .08 ? 0 : progress < .4 ? 1 : progress < .5 ? 2 : progress < .93 ? 3 : 4;
}
// Give the final invitation its own scroll space without shortening the projects.
export function heroProgress(scrollProgress){const p=clamp(scrollProgress);return p<.8?p/.8*.93:.93+(p-.8)/.2*.07;}
export function heroScrollProgress(progress){const p=clamp(progress);return p<.93?p/.93*.8:.8+(p-.93)/.07*.2;}
export function ideaFrame(progress) {
  return {
    gather:phase(progress,.924,.94)*(1-phase(progress,.962,.978)),
    pulse:1-Math.sin(phase(progress,.94,.95)*Math.PI)*.22,
    burst:phase(progress,.946,.958)*(1-phase(progress,.96,.98)),
    orbit:phase(progress,.974,.980),
    focus:phase(progress,.984,.991),
    passage:phase(progress,.989,.996),
    reveal:phase(progress,.993,.999),
  };
}
export function heroFrame(progress, projectCount = 9) {
  const p = clamp(progress);
  const journeyPosition = clamp((p - .08) / .32) * 5;
  const journeyIndex = Math.min(4, Math.floor(journeyPosition));
  const journeyBlend = journeyIndex === 4 ? 0 : phase(journeyPosition - journeyIndex, .55, 1);
  const projectPosition = clamp((p - .5) / .43) * projectCount;
  const projectIndex = Math.min(projectCount - 1, Math.floor(projectPosition));
  const projectBlend=projectIndex===projectCount-1?0:phase(projectPosition-projectIndex,.58,.76);
  return { chapter: heroChapter(p), journeyIndex, journeyBlend, journeyActive: Math.min(4, journeyIndex + (journeyBlend >= .5 ? 1 : 0)), projectIndex, projectActive:Math.min(projectCount-1,projectIndex+(projectBlend>=.5?1:0)), projectBlend, projectPhase: projectPosition - projectIndex };
}

export const signatureCurves=[
  [[-3.2,.8],[-3.6,1.8],[-2.65,1.85],[-2.85,.9]],
  [[-2.85,.9],[-3.1,-1.9],[-2.8,-1.8],[-1.65,1.15]],
  [[-1.65,1.15],[-1.45,1.65],[-2.05,-1.85],[-1.3,-1.3]],
  [[-1.3,-1.3],[-.85,-.8],[-.25,.85],[.2,1.35]],
  [[.2,1.35],[.75,2.05],[3.6,1.85],[2.85,1.15]],
  [[2.85,1.15],[2.15,.7],[1.35,1.65],[1.15,1.2]],
  [[1.15,1.2],[.95,.2],[.35,-1.75],[.6,-1.55]],
  [[.65,.15],[1.15,.38],[1.85,.4],[2.45,.28]],
  [[.6,-1.55],[1.1,-2.05],[-1.6,-2.15],[-2.9,-1.9]],
];
export function particleIdentity(count) {
  const curves=signatureCurves;
  const strokes=curves.map(([a,b,c,d])=>Array.from({length:101},(_,i)=>{
    const t=i/100,u=1-t;return [0,1].map(axis=>u*u*u*a[axis]+3*u*u*t*b[axis]+3*u*t*t*c[axis]+t*t*t*d[axis]);
  }));
  const segments=strokes.flatMap(stroke=>stroke.slice(1).map((end,index)=>({start:stroke[index],end,length:Math.hypot(end[0]-stroke[index][0],end[1]-stroke[index][1])})));
  const total=segments.reduce((sum,segment)=>sum+segment.length,0);
  return Array.from({length:count},(_,i)=>{
    let distance=(i+.5)/count*total;
    const segment=segments.find(item=>{if(distance<=item.length)return true;distance-=item.length;return false;})||segments.at(-1);
    const t=clamp(distance/segment.length);
    const random=Math.sin(i*12.9898)*43758.5453;
    const radius=(.045+.045*Math.abs(Math.sin(i/count*Math.PI*7)))*Math.sqrt(random-Math.floor(random));
    const angle=i*2.399963;
    const nx=-(segment.end[1]-segment.start[1])/segment.length,ny=(segment.end[0]-segment.start[0])/segment.length;
    return [segment.start[0]+(segment.end[0]-segment.start[0])*t+nx*radius*Math.cos(angle),segment.start[1]+(segment.end[1]-segment.start[1])*t+ny*radius*Math.cos(angle),radius*Math.sin(angle)];
  });
}

// Kept as a compact coordinate seed for existing identity geometry checks.
export function identityPixels() {
  const rows = [
    "100010011111", "100010010000", "100010010000",
    "101010011110", "101010010000", "110110010000", "100010010000",
  ];
  return rows.flatMap((row, y) => [...row].flatMap((cell, x) => {
    if (cell !== "1") return [];
    return Array.from({ length: 9 }, (_, sub) => ({
      x: (x - 5.5) * .49 + (sub % 3 - 1) * .15,
      y: (3 - y) * .49 + (1 - Math.floor(sub / 3)) * .15,
      z: 0,
    }));
  }));
}
