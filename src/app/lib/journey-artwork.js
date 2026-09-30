// Every chapter uses the same 21 strands and point order, so its artwork can morph
// directly into the next chapter rather than swapping illustrations.
export const artworkSteps = 96;
const tau = Math.PI * 2;
const rectangle = (cx, cy, width, height, t) => [
  cx + Math.sign(Math.cos(t)) * Math.abs(Math.cos(t)) ** .2 * width / 2,
  cy + Math.sign(Math.sin(t)) * Math.abs(Math.sin(t)) ** .2 * height / 2,
];
const circle = (cx, cy, radius, t) => [cx + Math.cos(t) * radius, cy + Math.sin(t) * radius];
function path(vertices, progress) {
  const lengths = vertices.slice(1).map((point, i) => Math.hypot(point[0] - vertices[i][0], point[1] - vertices[i][1]));
  let distance = lengths.reduce((sum, length) => sum + length, 0) * progress;
  for (let i = 0; i < lengths.length; i++) {
    if (distance <= lengths[i] || i === lengths.length - 1) {
      const mix = lengths[i] ? distance / lengths[i] : 0;
      return [vertices[i][0] + (vertices[i + 1][0] - vertices[i][0]) * mix, vertices[i][1] + (vertices[i + 1][1] - vertices[i][1]) * mix];
    }
    distance -= lengths[i];
  }
  return vertices[0];
}

function artworkPoint(chapter, strand, band, step) {
  const progress = step / artworkSteps, t = progress * tau;
  const layer = (band - 3) * 3;
  let xy, z = layer;
  if (chapter === 0) {
    // The computer that opened other worlds, with a recognisable game controller.
    if (strand === 0) xy = rectangle(0, -43, 302 - band * 2, 184 - band * 2, t);
    else if (strand === 1) {
      xy = path([[-99,132],[-91,110],[-65,99],[-30,109],[30,109],[65,99],[91,110],[99,132],[91,165],[75,172],[48,148],[-48,148],[-75,172],[-91,165],[-99,132]], progress);
      z = 28 + layer;
    } else {
      if (band === 0) xy = rectangle(0, 66, 30, 40, t);
      else if (band === 1) xy = rectangle(0, 86, 98, 10, t);
      else if (band === 2) xy = rectangle(0, -43, 278, 160, t);
      else if (band === 3) xy = path([[-72,119],[-72,141],[-72,130],[-83,130],[-61,130]], progress);
      else if (band === 4) xy = circle(68, 122, 5, t);
      else if (band === 5) xy = circle(80, 137, 5, t);
      else xy = path([[-100,-69],[-55,-69],[-55,-13],[0,-13],[0,-43],[56,-43],[56,-82],[101,-82]], progress);
      z = band >= 3 && band <= 5 ? 42 : 12;
    }
  } else if (chapter === 1) {
    // A terminal with explicit code brackets and a command prompt.
    if (strand === 0) xy = rectangle(0, 0, 306 - band * 2, 224 - band * 2, t);
    else if (strand === 1) {
      const paths = [
        [[-51,-43],[-91,0],[-51,43]], [[51,-43],[91,0],[51,43]], [[21,-51],[-21,51]],
        [[-123,77],[-111,87],[-123,97]], [[-102,97],[-56,97]], [[-140,-72],[140,-72]], [[-43,86],[89,86]],
      ];
      xy = path(paths[band], progress); z = 20;
    } else { xy = circle(-121 + band % 3 * 20, -91, 5, t); z = 12 + Math.floor(band / 3) * 2; }
  } else if (chapter === 2) {
    // Two folded hemispheres, their neural connections and the brain stem.
    if (strand < 2) {
      if (band === 6) {
        const outline = [[0,-125],[-35,-141],[-57,-125],[-90,-128],[-109,-97],[-131,-75],[-136,-36],[-141,-11],[-124,22],[-130,52],[-109,78],[-90,105],[-56,110],[-40,94],[-17,100],[0,82],[0,-125]];
        const edge = path(outline, progress);
        return [strand === 0 ? edge[0] : -edge[0], edge[1], 52];
      }
      const latitude = (band / 6 - .5) * Math.PI * .88;
      const ripple = 1 + Math.sin(t * 6 + band * .7) * .09;
      const x = (strand === 0 ? -59 : 59) + Math.cos(latitude) * Math.cos(t) * 78 * ripple;
      const y = -20 + Math.sin(latitude) * 119 + Math.sin(t * 3) * 7;
      z = Math.cos(latitude) * Math.sin(t) * 92;
      return [x, y, z];
    }
    if (band === 0) xy = path([[0,-136],[7,-91],[-6,-48],[6,0],[-4,52],[0,94]], progress);
    else if (band === 1) xy = rectangle(8, 122, 27, 63, t);
    else xy = path([[-111,(band-4)*27],[-62,(band-4)*35],[0,(band-4)*24],[62,(band-4)*35],[111,(band-4)*27]], progress);
    z = band < 2 ? 18 : Math.sin(t * 2) * 62;
  } else if (chapter === 3) {
    // Three people and a shared network, rather than three anonymous orbit rings.
    const cx = (strand - 1) * 105, cy = strand === 1 ? -35 : 25;
    if (band < 3) { xy = circle(cx, cy - 58, 27 + band * 1.5, t); z = layer; }
    else if (band < 5) {
      const inset = (band - 3) * 4;
      xy = path([[cx-49+inset,cy+61],[cx-48+inset,cy+9],[cx-34,cy-13],[cx-15,cy-23],[cx+15,cy-23],[cx+34,cy-13],[cx+48-inset,cy+9],[cx+49-inset,cy+61],[cx-49+inset,cy+61]], progress);
      z = layer;
    } else {
      xy = path([[cx,cy+67],[cx,145],[0,145],[0,102],[0,145],[cx,145],[cx,cy+67]], progress);
      z = (band - 5) * 9 - 10;
    }
  } else {
    // A delivered application with content panels and a client conversation.
    if (strand === 0) { xy = rectangle(-5, -26, 306 - band * 2, 218 - band * 2, t); z = -24 + layer; }
    else if (strand === 1) {
      if (band === 0) xy = path([[-145,-98],[135,-98]], progress);
      else if (band === 1) xy = rectangle(-5, -58, 246, 42, t);
      else if (band < 5) xy = rectangle(-83 + (band - 2) * 79, 12, 67, 62, t);
      else xy = path([[-127,58],[70 - (band - 5) * 66,58]], progress);
      z = -8;
    } else {
      if (band < 2) xy = path([[55,110],[155,110],[155,166],[102,166],[78,185],[78,166],[55,166],[55,110]], progress);
      else if (band === 2) xy = circle(-104, 113, 19, t);
      else if (band === 3) xy = path([[-140,172],[-140,151],[-129,138],[-79,138],[-68,151],[-68,172]], progress);
      else if (band === 4) xy = path([[88,141],[100,153],[127,128]], progress);
      else xy = path([[-81,114],[-41,114],[-41,80],[20,80],[20,138],[53,138]], progress);
      z = 20 + layer;
    }
  }
  return [xy[0], xy[1], z];
}

export const journeyArtwork = Array.from({length:5}, (_, chapter) => {
  const points = [];
  for (let strand = 0; strand < 3; strand++) for (let band = 0; band < 7; band++) for (let step = 0; step <= artworkSteps; step++) points.push(artworkPoint(chapter, strand, band, step));
  return points;
});
