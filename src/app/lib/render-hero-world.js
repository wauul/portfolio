import * as THREE from 'three';
import { particleIdentity, heroFrame, ideaFrame, phase } from './hero-world.mjs';
import { journeyArtwork } from './journey-artwork';
import { sampleProjectArtwork, artworkPalettes } from './project-artwork.mjs';
import { personalProjects } from './personal-projects';

export function createHeroWorld(canvas, { progress, theme, reducedMotion, paused, french=false }) {
  const dark = theme === 'dark';
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, preserveDrawingBuffer:true, powerPreference:'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(dark ? '#111214' : '#f4f5f7');
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 80);
  const count = journeyArtwork[0].length * 3;
  const denseArtwork=journeyArtwork.map(artwork=>{
    const result=[];
    for(let start=0;start<artwork.length;start+=97){
      const points=artwork.slice(start,start+97);
      const lengths=points.slice(1).map((point,index)=>Math.hypot(...point.map((value,axis)=>value-points[index][axis])));
      const total=lengths.reduce((sum,length)=>sum+length,0);
      let segment=0,passed=0;
      for(let i=0;i<291;i++){
        const distance=i/290*total;
        while(segment<95&&passed+lengths[segment]<distance){passed+=lengths[segment];segment++;}
        const t=lengths[segment]?(distance-passed)/lengths[segment]:0;
        result.push(points[segment].map((value,axis)=>value+(points[segment+1][axis]-value)*t));
      }
    }
    return result;
  });
  const identity = particleIdentity(count);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const forms = Array.from({length:17}, () => new Float32Array(count * 3));
  const projectForms=Array.from({length:9},(_,index)=>sampleProjectArtwork(index,count));
  const projectColors=artworkPalettes.map(([,ink])=>new THREE.Color(ink));
  const artworkColors=Array(9).fill(null);
  const artworkImages=personalProjects.map((project,index)=>{
    const image=new Image();image.onload=()=>{
      if(disposed)return;
      const sample=document.createElement('canvas');sample.width=96;sample.height=64;
      const context=sample.getContext('2d',{willReadFrequently:true});context.drawImage(image,0,0,96,64);
      artworkColors[index]=context.getImageData(0,0,96,64).data;
    };
    image.src=`/_next/image?url=${encodeURIComponent(`/hero-art/${project.id}.png`)}&w=640&q=75`;return image;
  });
  const accent = new THREE.Color(dark ? '#ff785b' : '#bb351d');
  const secondary = new THREE.Color(dark ? '#dce3f0' : '#323e51');
  for (let i = 0; i < count; i++) {
    const pixel = identity[i];
    const noise = (axis) => Math.sin(i * (13.31 + axis * 8.17)) * .038;
    forms[0].set([pixel[0], pixel[1] + .8, pixel[2]+Math.sin(pixel[0]*1.6+pixel[1])*.12], i*3);
    for (let chapter = 0; chapter < 5; chapter++) {
      const point=denseArtwork[chapter][i];
      forms[chapter + 1].set([point[0]/62+noise(0),-point[1]/62+.9+noise(1),point[2]/62+noise(2)],i*3);
    }
    const angle = i / count * Math.PI * 2;
    const band = i * 2.399963;
    const radius = 2.9 + .23 * Math.cos(band);
    forms[6].set([Math.cos(angle)*radius, Math.sin(angle)*radius+.65, Math.sin(band)*.35], i*3);
    forms[7].set([pixel[0],pixel[1]+.7,pixel[2]],i*3);
    for(let j=0;j<9;j++){const point=projectForms[j][i];forms[j+8].set([point[0]*1.25,-point[1]*1.25+.7,point[2]+Math.sin(point[0])*.3],i*3);}
    const color = i % 7 < 5 ? accent : secondary;
    colors.set([color.r,color.g,color.b], i*3);
  }
  positions.set(forms[0]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors,3));
  const material = new THREE.ShaderMaterial({
    transparent:true, depthWrite:false, vertexColors:true,
    uniforms:{ pixelRatio:{value:Math.min(devicePixelRatio||1,1.5)}, pointScale:{value:1}, alpha:{value:1} },
    vertexShader:`varying vec3 tint; uniform float pixelRatio; uniform float pointScale; void main(){ tint=color; vec4 view=modelViewMatrix*vec4(position,1.); gl_Position=projectionMatrix*view; gl_PointSize=clamp(36.0*pixelRatio*pointScale / max(1.0,-view.z),1.6,9.0); }`,
    fragmentShader:`varying vec3 tint; uniform float alpha; void main(){float d=length(gl_PointCoord-.5); if(d>.5) discard; float edge=1.-smoothstep(.24,.5,d); gl_FragColor=vec4(tint,edge*alpha);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`,
  });
  const cloud = new THREE.Points(geometry,material); cloud.frustumCulled=false; scene.add(cloud);
  // The portal contains the same project contours as the gallery. The journey
  // remains outside it, orbiting as five recognizable particle sculptures.
  const satellites=[];
  function satellite(points,color,kind,index){
    const shape=new THREE.BufferGeometry();shape.setAttribute('position',new THREE.Float32BufferAttribute(points.flat(),3));
    const ink=new THREE.PointsMaterial({color,size:.036,transparent:true,opacity:0,depthWrite:false});
    const object=new THREE.Points(shape,ink);object.frustumCulled=false;scene.add(object);satellites.push({object,kind,index});
  }
  projectForms.forEach((points,index)=>satellite(points.filter((_,i)=>i%12===0).map(p=>[p[0],-p[1],p[2]]),projectColors[index],'project',index));
  denseArtwork.forEach((points,index)=>satellite(points.filter((_,i)=>i%12===0).map(p=>[p[0]/62,-p[1]/62,p[2]/62]),accent,'journey',index));
  const logoTextures=[];
  const logos=projectForms.map((points,index)=>{
    const tile=document.createElement('canvas');tile.width=256;tile.height=256;const ctx=tile.getContext('2d');
    const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
    const fit=190/Math.max(x1-x0,y1-y0),cx=(x0+x1)/2,cy=(y0+y1)/2;
    ctx.fillStyle=artworkPalettes[index][1];ctx.beginPath();ctx.roundRect(4,4,248,248,42);ctx.fill();
    ctx.fillStyle=artworkPalettes[index][0];points.filter((_,i)=>i%2===0).forEach(p=>{ctx.beginPath();ctx.arc(128+(p[0]-cx)*fit,128+(p[1]-cy)*fit,3.3,0,Math.PI*2);ctx.fill();});
    const texture=new THREE.CanvasTexture(tile);texture.colorSpace=THREE.SRGBColorSpace;logoTextures.push(texture);
    const material=new THREE.SpriteMaterial({map:texture,transparent:true,opacity:0,depthTest:false});const object=new THREE.Sprite(material);scene.add(object);
    if([1,6,7,8].includes(index))new THREE.TextureLoader().load('/project-marks/'+personalProjects[index].id+'.svg',map=>{if(disposed){map.dispose();return;}map.colorSpace=THREE.SRGBColorSpace;logoTextures.push(map);material.map=map;material.needsUpdate=true;requestDraw();});
    return object;
  });
  const invitationTile=document.createElement('canvas');invitationTile.width=512;invitationTile.height=512;
  const invitationInk=invitationTile.getContext('2d');invitationInk.fillStyle=dark?'#111214':'#f4f5f7';invitationInk.beginPath();invitationInk.roundRect(24,24,464,464,56);invitationInk.fill();
  invitationInk.strokeStyle=dark?'#ff9d88':'#bb351d';invitationInk.lineWidth=14;invitationInk.stroke();
  invitationInk.fillStyle=dark?'#fff1e9':'#bb351d';for(let i=0;i<80;i++){const a=i/80*Math.PI*2,x=256+Math.cos(a)*224,y=256+Math.sin(a)*224;invitationInk.beginPath();invitationInk.arc(x,y,4,0,Math.PI*2);invitationInk.fill();}
  invitationInk.font=`600 90px ${getComputedStyle(canvas).fontFamily}`;invitationInk.textAlign='center';invitationInk.textBaseline='middle';invitationInk.fillText(french?'Votre':'Your',256,220);invitationInk.fillText(french?'idée':'idea',256,315);
  const invitationTexture=new THREE.CanvasTexture(invitationTile);invitationTexture.colorSpace=THREE.SRGBColorSpace;logoTextures.push(invitationTexture);
  const invitationMaterial=new THREE.SpriteMaterial({map:invitationTexture,transparent:true,opacity:0,depthTest:false});
  const invitation=new THREE.Sprite(invitationMaterial);invitation.renderOrder=5;scene.add(invitation);
  const starsGeometry = new THREE.BufferGeometry();
  const stars = new Float32Array(280*3);
  for(let i=0;i<280;i++) stars.set([Math.sin(i*13.3)*13,Math.cos(i*9.7)*7,-4-(i%25)],i*3);
  starsGeometry.setAttribute('position',new THREE.BufferAttribute(stars,3));
  const starsMaterial = new THREE.PointsMaterial({color:dark ? '#8997b2':'#707c90',size:.018,transparent:true,opacity:.3});
  const dust = new THREE.Points(starsGeometry,starsMaterial); scene.add(dust);
  const grid = new THREE.GridHelper(50,50,dark ? '#3c414b':'#b9bec8',dark ? '#24272d':'#e0e3e9');
  grid.position.set(0,-3.2,-12); grid.material.transparent=true; scene.add(grid);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(0,0);
  const mouse = new THREE.Vector3(100,100,0);
  const plane = new THREE.Plane(new THREE.Vector3(0,0,1),0);
  let frame=0,visible=false,disposed=false,width=0,height=0,clock=0,last=0;
  let pointerActive=false,tiltX=0;
  const still = reducedMotion || paused;
  function draw(now=0) {
    frame=0;
    if(disposed || !width) return;
    const dt=Math.min(40,Math.max(0,now-last)); last=now;
    if(!still) clock+=dt*.001;
    const p=reducedMotion ? 0 : progress.current;
    const state=heroFrame(p);
    const mobile=width<760;
    let from=0,to=1,mix=phase(p,.025,.08);
    if(p>=.08 && p<.4){from=state.journeyIndex+1;to=Math.min(5,from+1);mix=state.journeyBlend;}
    else if(p>=.4 && p<.475){from=5;to=6;mix=phase(p,.4,.438);}
    else if(p>=.475 && p<.5){from=6;to=8;mix=phase(p,.475,.489);}
    else if(p>=.5 && p<.93){from=state.projectIndex+8;to=Math.min(16,from+1);mix=state.projectBlend;}
    else if(p>=.93){from=7;to=7;mix=0;}
    if(p>=.924&&p<.94){from=16;to=7;mix=phase(p,.924,.94);}
    const entering=phase(p,.46,.483), emerging=phase(p,.483,.498);
    const exit=phase(p,.90,.95);
    const tunnel=entering*(1-emerging);
    const gallery=phase(p,.5,.58)*(1-exit);
    const targetYaw=p<.08 ? .025 : p<.4 ? .1 + Math.sin(p*8)*.18 : p>.93 ? .025 : .12;
    if(!still)tiltX+=(pointer.x-tiltX)*.04;
    cloud.rotation.set((p>.93 ? -.1 : .02)+Math.sin(clock*.4)*.035, targetYaw + Math.sin(clock*.22)*.08 + (pointerActive&&!still ? tiltX*.09:0),Math.sin(clock*.31)*.025);
    const finale=ideaFrame(p);
    cloud.position.set(gallery*(mobile?0:1.2)+finale.reveal*(mobile?0:2.25),finale.reveal*(mobile?1.7:.35),-tunnel*3);
    const travel=p<.4?Math.sin(mix*Math.PI):0;
    cloud.scale.setScalar((mobile?.55:1)*(1+tunnel*3)*(1+gallery*.25)*(1+travel*.22)*(1-finale.reveal*.46)*(1-.24*finale.orbit*(1-finale.reveal))*(1+finale.focus*(1-finale.passage)*.28));
    material.uniforms.alpha.value=p<.5 ? 1 : p<.93 ? .65+travel*.25 : .7*(1-finale.passage*(1-finale.reveal)*.8);
    material.uniforms.pointScale.value=p>.93 ? 1.15:1;
    camera.position.set(Math.sin(clock*.19)*.08,.4,(mobile?11.4:10.7)-travel*.85-tunnel*2-Math.sin(clock*.3)*.12); camera.lookAt(0,.55,0);
    camera.updateMatrixWorld();cloud.updateMatrixWorld();
    const outgoingWeight=state.projectPhase>=.30?1-phase(state.projectPhase,.30,.49):0;
    const incomingWeight=phase(state.projectPhase,.86,1);
    const cardWeight=p>=.506&&p<.918?Math.max(outgoingWeight,incomingWeight):0;
    const artIndex=incomingWeight>0?Math.min(8,state.projectIndex+1):state.projectIndex;
    const card=canvas.closest('section').querySelector('[data-ad-card]');
    const cardRect=card?.getBoundingClientRect(),canvasRect=canvas.getBoundingClientRect();
    const corner=(x,y)=>{const v=new THREE.Vector3((x-canvasRect.left)/width*2-1,-(y-canvasRect.top)/height*2+1,.5).unproject(camera);v.sub(camera.position).normalize();v.multiplyScalar(-camera.position.z/v.z).add(camera.position);return cloud.worldToLocal(v);};
    const topLeft=cardWeight&&cardRect?corner(cardRect.left,cardRect.top):null;
    const bottomRight=cardWeight&&cardRect?corner(cardRect.right,cardRect.bottom):null;
    material.uniforms.alpha.value=Math.max(material.uniforms.alpha.value,cardWeight*.95);
    const portalPresence=phase(p,.408,.439)*(1-phase(p,.492,.515));
    satellites.forEach(({object,kind,index})=>{
      object.visible=portalPresence>0;
      if(!object.visible)return;
      object.material.opacity=portalPresence*(kind==='project'?.85:.38)*(1-phase(p,.46,.483));
      const angle=index/(kind==='project'?9:5)*Math.PI*2+clock*(kind==='project'?.09:-.06);
      const radius=kind==='project'?1.6:4.3;
      object.position.set(Math.cos(angle)*radius*(mobile?.58:1),.65+Math.sin(angle)*radius*(mobile?.55:.63),Math.sin(angle*2)*.65-tunnel*1.5);
      object.scale.setScalar((kind==='project'?.26:.28)*(mobile?.68:1)*(1+tunnel*1.5));
      object.rotation.set(Math.sin(clock*.25+index)*.16,Math.sin(clock*.22+index)*.25,Math.sin(clock*.3+index)*.06);
      if(kind==='project'&&index===0){const focus=phase(p,.455,.475);object.position.multiplyScalar(1-focus);object.position.y+=.65*focus;object.scale.setScalar((.26+focus*1.1)*(mobile?.55:1));object.material.opacity=portalPresence*.9*(1-phase(p,.478,.49));}
    });
    const logoPresence=finale.orbit;
    logos.forEach((object,index)=>{
      object.visible=logoPresence>0;object.material.opacity=logoPresence*.9*(1-finale.passage*(1-finale.reveal));
      const angle=index/10*Math.PI*2+clock*.13,r=2.45+.18*Math.sin(clock*.4+index),scale=mobile?.55:1;
      object.position.set(cloud.position.x+Math.cos(angle)*r*scale,cloud.position.y+.4+Math.sin(angle)*r*.55*scale,Math.sin(angle)*.8);
      object.scale.setScalar((.42+.07*Math.sin(angle))*scale);
    });
    const invitationAngle=9/10*Math.PI*2+clock*.13,invitationScale=mobile?.55:1;
    invitation.visible=logoPresence>0&&finale.passage<1;
    invitationMaterial.opacity=logoPresence*(1-phase(p,.993,.997));
    invitation.position.set(Math.cos(invitationAngle)*2.45*invitationScale*(1-finale.focus),(.4+Math.sin(invitationAngle)*1.35)*invitationScale*(1-finale.focus)+.65*finale.focus,Math.sin(invitationAngle)*.8*(1-finale.focus)+finale.passage*5);
    invitation.scale.setScalar((.56+.05*Math.sin(clock*3.8)) * invitationScale * (1+finale.focus*3+finale.passage*32));
    if(pointerActive && !still){raycaster.setFromCamera(pointer,camera);raycaster.ray.intersectPlane(plane,mouse);cloud.worldToLocal(mouse);}
    const a=forms[from],b=forms[to];
    for(let i=0;i<count;i++){
      const offset=i*3;
      const curl=Math.sin(mix*Math.PI)*Math.sin(i*.17+clock*.3)*.22;
      let tx=a[offset]+(b[offset]-a[offset])*mix;
      let ty=a[offset+1]+(b[offset+1]-a[offset+1])*mix+curl;
      let tz=a[offset+2]+(b[offset+2]-a[offset+2])*mix;
      if(topLeft){const u=(i%96+.5)/96,v=(Math.floor(i/96)+.5)/64;tx=tx*(1-cardWeight)+(topLeft.x+(bottomRight.x-topLeft.x)*u)*cardWeight;ty=ty*(1-cardWeight)+(topLeft.y+(bottomRight.y-topLeft.y)*v)*cardWeight;tz=tz*(1-cardWeight)+(topLeft.z+(bottomRight.z-topLeft.z)*v)*cardWeight;}
      if(!still){const breath=Math.sin(clock*1.1+i*.012)*.028;tx+=breath;ty+=Math.cos(clock*.8+i*.018)*.035;tz+=Math.sin(clock*.7+i*.01)*.09;}
      if(p>=.924){
        const {gather,pulse,burst}=finale;
        const azimuth=i*2.399963,y=1-2*(i+.5)/count,r=Math.sqrt(1-y*y);
        const ballRadius=1.25+.045*Math.sin(clock*3+i*.02);
        tx=(tx*(1-gather)+Math.cos(azimuth+clock*.15)*r*ballRadius*gather)*pulse+Math.cos(azimuth)*r*burst*11;
        ty=(ty*(1-gather)+y*ballRadius*gather)*pulse+y*burst*8;
        tz=(tz*(1-gather)+Math.sin(azimuth+clock*.15)*r*ballRadius*gather)*pulse+Math.sin(azimuth)*r*burst*7;
      }
      const dx=tx-mouse.x,dy=ty-mouse.y;
      const distance=Math.sqrt(dx*dx+dy*dy);
      const push=pointerActive&&!still ? Math.max(0,1-distance/1.05) : 0;
      for(let axis=0;axis<3;axis++){
        const target=axis===0?tx:axis===1?ty:tz;
        const force=axis===0?dx:axis===1?dy:.65;
        if(still){positions[offset+axis]=target;velocities[offset+axis]=0;}
        else{
          velocities[offset+axis]=(velocities[offset+axis]+(target-positions[offset+axis])*.065+force*push*.11)*.79;
          positions[offset+axis]+=velocities[offset+axis];
        }
      }
    }
    geometry.attributes.position.needsUpdate=true;
    const projectColor=projectColors[state.projectIndex];
    const nextColor=projectColors[Math.min(8,state.projectIndex+1)];
    for(let i=0;i<count;i++){
      const color=i%7<5?accent:secondary;
      const blend=gallery*.7;
      colors[i*3]=color.r*(1-blend)+(projectColor.r+(nextColor.r-projectColor.r)*state.projectBlend)*blend;
      colors[i*3+1]=color.g*(1-blend)+(projectColor.g+(nextColor.g-projectColor.g)*state.projectBlend)*blend;
      colors[i*3+2]=color.b*(1-blend)+(projectColor.b+(nextColor.b-projectColor.b)*state.projectBlend)*blend;
      const pixels=artworkColors[artIndex];
      if(cardWeight&&pixels){for(let axis=0;axis<3;axis++){const channel=pixels[i*4+axis]/255;const linear=channel<=.04045?channel/12.92:Math.pow((channel+.055)/1.055,2.4);colors[i*3+axis]=colors[i*3+axis]*(1-cardWeight)+linear*cardWeight;}}
    }
    geometry.attributes.color.needsUpdate=true;
    grid.material.opacity=phase(p,.4,.5)*(1-exit)*.3;
    dust.rotation.z=clock*.003;
    renderer.render(scene,camera);
    if(visible&&!document.hidden&&!still) frame=requestAnimationFrame(draw);
  }
  function requestDraw(){if(disposed||!visible||frame)return;if(document.hidden)draw(performance.now());else frame=requestAnimationFrame(draw);}
  function resize(){cancelAnimationFrame(frame);frame=0;width=canvas.parentElement.clientWidth;height=canvas.parentElement.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/Math.max(1,height);camera.updateProjectionMatrix();draw(performance.now());}
  function move(event){if(still||event.pointerType==='touch')return;const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);pointerActive=true;requestDraw();}
  function leave(){pointerActive=false;pointer.set(0,0);}
  function visibility(){cancelAnimationFrame(frame);frame=0;if(visible&&!document.hidden){last=performance.now();requestDraw();}}
  const host=canvas.closest('section');host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility();});observer.observe(canvas);
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas.parentElement);
  document.addEventListener('visibilitychange',visibility);resize();
  return {redraw:requestDraw,dispose(){disposed=true;artworkImages.forEach(image=>{image.onload=null;});cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);geometry.dispose();material.dispose();satellites.forEach(({object})=>{object.geometry.dispose();object.material.dispose();});logos.forEach(object=>object.material.dispose());invitationMaterial.dispose();logoTextures.forEach(texture=>texture.dispose());starsGeometry.dispose();starsMaterial.dispose();grid.geometry.dispose();grid.material.dispose();renderer.dispose();}};
}
