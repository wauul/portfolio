// Shared geometry: the printed artwork and the particles follow the same contours.
const curve = (fn, count = 160) => Array.from({length:count}, (_, i) => fn(i/(count-1)));
const ring = (x,y,r,stretch=1) => curve(t=>[x+Math.cos(t*Math.PI*2)*r,y+Math.sin(t*Math.PI*2)*r*stretch]);
export const heroProjectCopy = [
  ['Keep the work moving. Even when things break.', 'Le travail avance. Même quand tout ne suit pas.'],
  ['Every event deserves to arrive.', 'Chaque événement mérite d’arriver.'],
  ['Find the current slowing your queries.', 'Retrouvez ce qui ralentit vos requêtes.'],
  ['Small repairs. Verified before they ship.', 'Des correctifs ciblés. Vérifiés avant livraison.'],
  ['Turn what you read into what you understand.', 'Transformez vos lectures en compréhension.'],
  ['Better answers begin with better retrieval.', 'De meilleures réponses commencent à la source.'],
  ['A watchful eye on the things you want.', 'Un œil attentif sur ce qui vous intéresse.'],
  ['Two tastes. One shared wavelength.', 'Deux univers. Une même longueur d’onde.'],
  ['From a little inspiration to dinner.', 'Un peu d’inspiration. Et le dîner prend forme.'],
];
export const artworkPalettes = [
  ['#182631','#ff8966'], ['#201d3c','#b4a2ff'], ['#103b3a','#8ce3c5'],
  ['#30213c','#dbadff'], ['#29354a','#ffcf8b'], ['#173344','#8acff1'],
  ['#353219','#d8e78b'], ['#3b1731','#ff98c9'], ['#243c27','#c2e1a1'],
];
export function projectArtwork(index) {
  switch(index) {
    case 0: return [0,1,2].flatMap(j=>[
      curve(t=>{const a=t*Math.PI*2,r=1.12+(.14*Math.cos(a*14));return [Math.cos(a)*r+(j-1)*1.8,Math.sin(a)*r+(j===1?.35:-.35)];}),
      ring((j-1)*1.8,j===1?.35:-.35,.43),
    ]);
    case 1: return Array.from({length:9},(_,j)=>curve(t=>[t*7-3.5,Math.sin(t*Math.PI*3+j*.24)*(.7+j*.08)+(j-4)*.08]));
    case 2: return [0,1,2].flatMap(j=>[ring((j-1)*2,0,.85,.3),ring((j-1)*2,-.8,.85,.3),ring((j-1)*2,.8,.85,.3),curve(t=>[(j-1)*2+.85,t*1.6-.8]),curve(t=>[(j-1)*2-.85,t*1.6-.8])]).concat([curve(t=>[t*7-3.5,Math.sin(t*9)*.3+1.6])]);
    case 3: return Array.from({length:8},(_,j)=>curve(t=>[t*6-3,(j-3.5)*.32+Math.sin(t*5+j*.15)*.35])).concat(Array.from({length:10},(_,j)=>curve(t=>[(j-4.5)*.45+.2*Math.sin(t*6),t*1.8-.9])));
    case 4: return Array.from({length:8},(_,j)=>curve(t=>{const a=(j-3.5)*.13;const x=t<.5?-1.8+3.6*t:1.8-3.6*(t-.5),y=t<.5?-1.1:1.1;return [x*Math.cos(a)-y*Math.sin(a)+(j-3.5)*.28,y*Math.cos(a)+x*Math.sin(a)];}));
    case 5: return Array.from({length:7},(_,j)=>curve(t=>{const corners=[[-2,-1],[0,-1.8],[2,-1],[0,.1],[-2,-1]];const s=Math.min(3,Math.floor(t*4)),f=t*4-s;return [corners[s][0]+(corners[s+1][0]-corners[s][0])*f,corners[s][1]+(corners[s+1][1]-corners[s][1])*f+j*.42];}));
    case 6: return [ring(0,0,2),ring(0,0,1.5),ring(0,0,1),ring(0,0,.5),curve(t=>[-2.6+t*5.2,0]),curve(t=>[0,-2.4+t*4.8]),curve(t=>[Math.cos(.6)*t*2,Math.sin(.6)*t*2])];
    case 7: return Array.from({length:12},(_,j)=>curve(t=>[t*7-3.5,Math.sin(t*Math.PI*2+(j<6?0:Math.PI))*(.5+(j%6)*.18)+(j<6?-.2:.2)]));
    default: return [curve(t=>[Math.cos(Math.PI*t)*2,Math.sin(Math.PI*t)*1.3+.4]),curve(t=>[-2+t*4,.4]),...Array.from({length:5},(_,j)=>curve(t=>[(j-2)*.65+Math.sin(t*5+j)*.2,-.3-t*1.6]))];
  }
}
export function sampleProjectArtwork(index, count) {
  const strokes=projectArtwork(index),segments=strokes.flatMap(points=>points.slice(1).map((b,i)=>({a:points[i],b,length:Math.hypot(b[0]-points[i][0],b[1]-points[i][1])})));
  const total=segments.reduce((sum,s)=>sum+s.length,0);
  let segment=0,passed=0;
  return Array.from({length:count},(_,i)=>{
    const d=i/(count-1)*total;
    while(segment<segments.length-1&&passed+segments[segment].length<d){passed+=segments[segment++].length;}
    const {a,b,length}=segments[segment],t=length?(d-passed)/length:0;
    return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,Math.sin(i*2.399963)*.08];
  });
}
