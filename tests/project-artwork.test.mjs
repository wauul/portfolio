import test from 'node:test';
import assert from 'node:assert/strict';
import { projectArtwork, sampleProjectArtwork } from '../src/app/lib/project-artwork.mjs';
import { heroFrame, heroProgress, heroScrollProgress, ideaFrame } from '../src/app/lib/hero-world.mjs';
test('all nine artwork contours can become the same finite particle population',()=>{
  const signatures=new Set();
  for(let i=0;i<9;i++){
    signatures.add(JSON.stringify(projectArtwork(i)));
    const samples=sampleProjectArtwork(i,6111);
    assert.equal(samples.length,6111);
    assert.ok(samples.every(point=>point.length===3&&point.every(Number.isFinite)));
  }
  assert.equal(signatures.size,9);
});
test('project motion remains continuous as each next card becomes current',()=>{
  for(let i=1;i<9;i++){
    const boundary=.5+i*.43/9;
    const before=heroFrame(boundary-1e-7),after=heroFrame(boundary+1e-7);
    assert.ok(Math.abs((before.projectIndex+before.projectBlend)-(after.projectIndex+after.projectBlend))<1e-4);
  }
});
test('the idea appears after the explosion has returned to the identity',()=>{
  assert.equal(ideaFrame(.942).gather,1);
  assert.ok(ideaFrame(.945).pulse<1);
  assert.equal(ideaFrame(.958).burst,1);
  assert.equal(ideaFrame(.958).reveal,0);
  assert.equal(ideaFrame(.98).burst,0);
  assert.equal(ideaFrame(.98).gather,0);
  assert.equal(ideaFrame(.98).reveal,0);
  assert.equal(ideaFrame(.999).reveal,1);
});
test('the invitation has an orbit hold, then a blank-icon passage before copy appears',()=>{
  assert.equal(ideaFrame(.982).orbit,1);
  assert.equal(ideaFrame(.982).focus,0);
  assert.equal(ideaFrame(.982).reveal,0);
  assert.equal(ideaFrame(.99).reveal,0);
  assert.ok(ideaFrame(.99).focus>0 && ideaFrame(.99).passage>0);
  assert.equal(ideaFrame(.999).passage,1);
  for(let i=0;i<=100;i++){const p=i/100;assert.ok(Math.abs(heroProgress(heroScrollProgress(p))-p)<1e-12);}
  assert.equal(heroProgress(.8),.93);
});
