const imageCache=new Map();
const details=new WeakMap();
function inspectAlpha(image,split=false){
  const surface=document.createElement('canvas');surface.width=image.naturalWidth;surface.height=image.naturalHeight;
  const ctx=surface.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
  const {width:w,height:h}=surface,data=ctx.getImageData(0,0,w,h).data,parts=[];
  if(!split){let x0=w,y0=h,x1=0,y1=0;for(let n=0;n<w*h;n++)if(data[n*4+3]>=50){const x=n%w,y=Math.floor(n/w);x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}details.set(image,{surface,parts:[],bounds:{x:x0,y:y0,w:x1-x0+1,h:y1-y0+1}});return;}
  const seen=new Uint8Array(w*h),queue=new Int32Array(w*h);
  for(let n=0;n<w*h;n++){
    if(seen[n]||data[n*4+3]<50)continue;
    let head=0,tail=1,minX=w,minY=h,maxX=0,maxY=0;queue[0]=n;seen[n]=1;
    while(head<tail){const p=queue[head++],x=p%w,y=Math.floor(p/w);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
      const visit=(next)=>{if(!seen[next]&&data[next*4+3]>=50){seen[next]=1;queue[tail++]=next;}};
      if(x>0)visit(p-1);if(x<w-1)visit(p+1);if(y>0)visit(p-w);if(y<h-1)visit(p+w);}
    if(tail>150){const pw=maxX-minX+1,ph=maxY-minY+1,isolated=document.createElement('canvas');isolated.width=pw;isolated.height=ph;const pixels=new ImageData(pw,ph);for(let i=0;i<tail;i++){const q=queue[i],dst=((Math.floor(q/w)-minY)*pw+q%w-minX)*4;pixels.data.set(data.subarray(q*4,q*4+4),dst);}isolated.getContext('2d').putImageData(pixels,0,0);parts.push({x:minX,y:minY,w:pw,h:ph,area:tail,surface:isolated});}
  }
  parts.sort((a,b)=>b.area-a.area);
  const bounds=parts.length?{x:Math.min(...parts.map(p=>p.x)),y:Math.min(...parts.map(p=>p.y)),w:0,h:0}: {x:0,y:0,w,h};
  if(parts.length){bounds.w=Math.max(...parts.map(p=>p.x+p.w))-bounds.x;bounds.h=Math.max(...parts.map(p=>p.y+p.h))-bounds.y;}
  details.set(image,{surface,parts,bounds});
}
export async function loadProjectLayers(id, source) {
  const paths={base:source},sets={
    'query-otter':{setting:'setting',body:'body-v2',tool:'tool'},
    'patch-goblin':{setting:'setting',body:'body-v2',tool:'tool'},
    getratchet:{setting:'rig-setting',cargo:'cargo',gear:'gear',hub:'hub'},
    'hooka-relay':{setting:'rig-setting',message:'message'},
    'study-room':{setting:'setting',papers:'papers'},
    'rag-bench':{setting:'rig-setting',document:'document'},
    'are-we-vibing':{setting:'rig-setting',record:'record',fluid:'rig-fluid'},
    'recipe-buddy':{setting:'rig-setting',open:'open',wink:'wink',food:'food',tomato:'tomato'},
    watchtower:{setting:'rig-setting'},
  };
  for(const [key,file] of Object.entries(sets[id]||{}))paths[key]=`/hero-art/layers/${id}-${file}.png`;
  return Object.fromEntries(await Promise.all(Object.entries(paths).map(async([key,path])=>{
    if(!imageCache.has(path))imageCache.set(path,new Promise(resolve=>{const image=new window.Image();image.onload=()=>{if(['cargo','papers','document','food','wink','fluid','gear','record','message','hub','open','tomato'].includes(key))inspectAlpha(image,['papers','food'].includes(key));resolve(image);};image.onerror=()=>resolve(null);image.src=path;}));
    return [key,await imageCache.get(path)];
  })));
}
export function paintProjectAction(ctx, layers, id, width, height, time) {
  const W=1672,H=941,scale=Math.max(width/W,height/H),sx=(W-width/scale)*(width<height?.68:.5),sy=(H-height/scale)*(width<height?.25:.5);
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,width,height);ctx.setTransform(scale,0,0,scale,-sx*scale,-sy*scale);
  const picture=(image)=>image&&ctx.drawImage(image,0,0,W,H);
  const composite=layers.setting&&layers.body&&layers.tool;
  picture(layers.setting||layers.base);
  const layer=(image,origin,target,size,angle=0)=>{ctx.save();ctx.translate(...target);ctx.rotate(angle);ctx.scale(size,size);ctx.translate(-origin[0],-origin[1]);picture(image);ctx.restore();};
  const sprite=(image,rect,x,y,w,angle=0,squash=1)=>{if(!image||!rect)return;const h=w*rect.h/rect.w;ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(squash,1);ctx.drawImage(rect.surface||image,rect.surface?0:rect.x,rect.surface?0:rect.y,rect.w,rect.h,-w/2,-h/2,w,h);ctx.restore();};
  const glow=(x,y,r,color)=>{const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);};
  const motes=(x,y,color,spread=65)=>{ctx.fillStyle=color;for(let i=0;i<24;i++){const age=(time*.6+i*.137)%1,a=i*2.399963;ctx.globalAlpha=(1-age)*.8;ctx.beginPath();ctx.arc(x+Math.cos(a)*spread*age,y+Math.sin(a)*spread*age-age*40,1+2*(1-age),0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;};
  const curve=(points,t)=>{const [a,b,c,d]=points,u=1-t;return [0,1].map(k=>u*u*u*a[k]+3*u*u*t*b[k]+3*u*t*t*c[k]+t*t*t*d[k]);};
  if(id==='query-otter'&&composite){
    layer(layers.body,[870,600],[870,600+Math.sin(time*1.5)*2],1);
    layer(layers.tool,[595,520],[875,520],.55,Math.sin(time*1.2)*.085);
    glow(1220,445,90,'rgba(136,246,230,.13)');motes(1260,470,'#a4f9e5',40);
  }else if(id==='patch-goblin'&&composite){
    layer(layers.body,[1150,400],[1120,310+Math.sin(time*2)*2],.8,Math.sin(time*.8)*.012);
    layer(layers.tool,[800,590],[675,460],.62,.085+Math.sin(time*3.2)*.055);
    glow(1020,585,45,`rgba(255,210,126,${.3+.15*Math.sin(time*13)})`);motes(1020,585,'#ffdfa7',95);
  }else if(id==='watchtower'){
    ctx.save();ctx.translate(1114,158);ctx.rotate(Math.sin(time*.55)*.26);ctx.filter='blur(12px)';ctx.globalCompositeOperation='screen';
    const light=ctx.createLinearGradient(0,0,-800,520);light.addColorStop(0,'rgba(255,231,151,.32)');light.addColorStop(.6,'rgba(255,222,130,.12)');light.addColorStop(1,'rgba(255,222,130,0)');ctx.fillStyle=light;
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-900,400);ctx.lineTo(-650,600);ctx.closePath();ctx.fill();ctx.restore();glow(1114,158,45,'rgba(255,222,125,.2)');
  }else if(id==='getratchet'){
    const gear=details.get(layers.gear)?.bounds;
    if(gear){ctx.save();ctx.translate(1080,455);ctx.scale(.65,1);sprite(layers.gear,gear,0,0,800,time*.17);ctx.restore();}
    ctx.save();ctx.beginPath();[[430,515],[710,600],[1090,748],[1090,800],[710,656],[420,562]].forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();picture(layers.setting);ctx.restore();
    sprite(layers.hub,details.get(layers.hub)?.bounds,958,442,215);
    const cargo=details.get(layers.cargo)?.bounds;
    if(cargo)for(let i=0;i<7;i++){const t=(time*.055+i/7)%1;const [x,y]=curve([[430,517],[650,570],[820,663],[1070,746]],t);ctx.globalAlpha=Math.min(1,t*14,(1-t)*14);sprite(layers.cargo,cargo,x,y-18,35+t*58,.08);ctx.globalAlpha=1;}
  }else if(id==='hooka-relay'){
    const envelope=details.get(layers.message)?.bounds,cycle=(time%6)/6;
    if(envelope){
      const info=details.get(layers.message),surface=info.surface,f=surface.getContext('2d');f.clearRect(0,0,surface.width,surface.height);f.drawImage(layers.message,0,0);f.globalCompositeOperation='source-atop';f.fillStyle=cycle<.5?'rgba(255,85,105,.55)':'rgba(102,255,176,.55)';f.fillRect(0,0,surface.width,surface.height);f.globalCompositeOperation='source-over';
      const message=(x,y,w,angle=0)=>sprite(surface,envelope,x,y,w,angle);
      message(1290,399+Math.sin(time*.9)*5,285,Math.sin(time*.5)*.025);
      for(let i=0;i<3;i++){const t=(time*.08+i/3)%1;const path=t<.8?[[320,946],[760,867],[1340,833],[1582,616]]:[[1582,616],[1650,535],[1565,468],[1492,454]],u=t<.8?t/.8:(t-.8)/.2,[x,y]=curve(path,u),[nx,ny]=curve(path,Math.min(1,u+.01));ctx.globalAlpha=Math.min(.8,t*8,(1-t)*8);message(x,y,110,Math.atan2(ny-y,nx-x));ctx.globalAlpha=1;}
    }
    [[865,880,70,110],[1415,728,65,92],[1525,420,52,56],[1645,575,57,72]].forEach(([x,y,rx,ry])=>{ctx.save();ctx.beginPath();ctx.ellipse(x,y,rx,ry,-.3,0,Math.PI*2);ctx.ellipse(x,y,rx*.8,ry*.84,-.3,0,Math.PI*2);ctx.clip('evenodd');picture(layers.setting);ctx.restore();});
    const tube=[[858,309],[910,359],[1010,390],[1109,400]];
    for(let i=0;i<4;i++){const t=(time*.12+i/4)%1,[x,y]=curve(tube,t);glow(x,y,9,'rgba(230,192,255,.45)');}
  }else if(id==='study-room'){

    const parts=details.get(layers.papers)?.parts||[];
    const page=parts[0];
    parts.slice(1,6).forEach((part,i)=>{const angle=time*.35+i*1.8,x=part.x+part.w/2+Math.sin(angle)*45,y=part.y+part.h/2+Math.cos(angle*.8)*35;sprite(layers.papers,part,x,y,part.w,Math.sin(angle)*.18);});
    if(page){const angle=(.5-.5*Math.cos(time*.8))*Math.PI;ctx.save();ctx.translate(1150,675);ctx.transform(Math.cos(angle),Math.sin(angle)*-.23,0,1,0,0);ctx.drawImage(page.surface||layers.papers,page.surface?0:page.x,page.surface?0:page.y,page.w,page.h,0,-245,360,245);ctx.restore();}
    glow(1220,500,240,`rgba(255,210,137,${.045+.025*Math.sin(time*1.3)})`);
  }else if(id==='rag-bench'){
    const doc=details.get(layers.document)?.bounds,lenses=[[799,134,45,72],[775,300,38,72],[768,465,38,66],[840,584,34,62]];
    if(doc)lenses.forEach(([lx,ly],band)=>{for(let i=0;i<4;i++){
      const t=(time*.075+i/4+band*.1)%1,u=t<.55?t/.55:(t-.55)/.45;
      const path=t<.55?[[360,ly-45],[540,ly-20],[670,ly],[lx,ly]]:[[lx,ly],[910,ly+20],[1020,410],[1110,450]], [x,y]=curve(path,u);
      ctx.globalAlpha=Math.min(1,t*12,(1-t)*6);sprite(layers.document,doc,x,y,105-t*35,t<.55?.13:.2);ctx.globalAlpha=1;
    }});
    lenses.forEach(([x,y,rx,ry])=>{ctx.save();ctx.beginPath();ctx.ellipse(x,y,rx,ry,.2,0,Math.PI*2);ctx.ellipse(x,y,rx*.8,ry*.85,.2,0,Math.PI*2);ctx.clip('evenodd');picture(layers.setting);ctx.restore();});
    glow(1470,450,190, 'rgba(255,235,177,'+(.08+.04*Math.sin(time*1.3))+')');glow(1120,420,100,'rgba(151,219,255,.08)');
  }else if(id==='are-we-vibing'){
    const record=details.get(layers.record)?.bounds;
    const disk=(x,y,rx,ry,speed,tint)=>{if(!record)return;ctx.save();ctx.translate(x,y);ctx.scale(rx/ry,1);sprite(layers.record,record,0,0,ry*2,time*speed);if(tint){ctx.globalCompositeOperation='source-atop';ctx.fillStyle='rgba(142,89,210,.23)';ctx.beginPath();ctx.arc(0,0,ry*.36,0,Math.PI*2);ctx.fill();}ctx.restore();};
    disk(1218,400,150,208,-.22,true);disk(1014,382,174,210,.25,false);
    if(layers.fluid){const info=details.get(layers.fluid),surface=info.surface,f=surface.getContext('2d');f.clearRect(0,0,surface.width,surface.height);f.drawImage(layers.fluid,0,0);f.globalCompositeOperation='source-atop';
      const x=info.bounds.x+((time*.09)%1)*info.bounds.w,g=f.createLinearGradient(x-150,0,x+150,0);g.addColorStop(0,'transparent');g.addColorStop(.5,'rgba(255,239,255,.3)');g.addColorStop(1,'transparent');f.fillStyle=g;f.fillRect(0,0,surface.width,surface.height);f.globalCompositeOperation='source-over';sprite(surface,info.bounds,1115,426,865,Math.sin(time*.7)*.008);}
    for(let i=0;i<4;i++){const t=(time*.1+i/4)%1,x=920+i*115+Math.sin(time*.5+i)*8,y=310-t*140;ctx.save();ctx.translate(x,y);ctx.globalAlpha=Math.sin(t*Math.PI)*.4;ctx.fillStyle=i%2?'#d5baff':'#ffbfd6';ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,5,3,-.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(4,0);ctx.lineTo(4,-19);ctx.lineTo(12,-15);ctx.stroke();ctx.restore();}
  }else if(id==='recipe-buddy'){

    const beat=time%5,closed=beat>2.7&&beat<3.1,spoon=closed?layers.wink:layers.open;
    sprite(spoon,details.get(spoon)?.bounds,1355,570,170);
    const leaves=(details.get(layers.food)?.parts||[]).filter(p=>p.area<30000).slice(0,3);const tomato=details.get(layers.tomato)?.bounds;const pieces=[...leaves.map(part=>({image:layers.food,part})),...Array.from({length:3},()=>({image:layers.tomato,part:tomato}))].filter(p=>p.part);
    pieces.forEach(({image,part},i)=>{const t=(time*.12+i/pieces.length)%1,x=970+Math.sin(i*2.4)*(80+220*t),y=470-150*Math.sin(t*Math.PI)+310*t*t;ctx.globalAlpha=Math.min(1,t*8,(1-t)*6);sprite(image,part,x,y,image===layers.tomato?48:40,t*(i%2?3:-3));ctx.globalAlpha=1;});
  }
  ctx.setTransform(1,0,0,1,0,0);
}
