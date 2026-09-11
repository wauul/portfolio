export function journeyFrame(progress, count = 5, reduced = false) {
  const position = Math.max(0, Math.min(1, progress)) * count;
  const index = Math.min(count - 1, Math.floor(position));
  const x = Math.max(0, Math.min(1, (position - index - 0.45) / 0.55));
  const blend = index === count - 1 ? 0 : x * x * (3 - 2 * x);
  const active = blend < 0.5 ? index : index + 1;
  const weights = Array(count).fill(0);
  if (reduced) weights[active] = 1;
  else { weights[index] = 1 - blend; if (index + 1 < count) weights[index + 1] = blend; }
  return { weights, active, index, blend };
}

const silhouettes = [
 [[108,102],[214,102],[426,102],[532,102],[532,230],[532,348],[380,348],[400,395],[240,395],[260,348],[108,348],[108,230]],
 [[78,108],[225,108],[414,108],[562,108],[562,230],[562,416],[410,416],[365,416],[275,416],[230,416],[78,416],[78,230]],
 [[320,85],[420,135],[510,200],[550,280],[470,360],[390,420],[320,460],[245,420],[165,360],[90,280],[130,200],[220,135]],
 [[172,153],[272,153],[372,153],[473,153],[473,255],[473,370],[373,370],[340,405],[300,405],[272,370],[172,370],[172,255]],
 [[80,100],[220,100],[380,100],[550,100],[550,240],[550,380],[390,380],[285,450],[285,380],[190,380],[80,380],[80,240]],
];
export function journeyMorph(index, blend) {
 const a=silhouettes[index],b=silhouettes[Math.min(index+1,4)];
 const points=a.map(([x,y],i)=>[x+(b[i][0]-x)*blend,y+(b[i][1]-y)*blend]);
 return {points,path:points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')+' Z'};
}
