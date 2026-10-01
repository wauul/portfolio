import test from 'node:test';
import assert from 'node:assert/strict';
import { identityPixels, particleIdentity, heroChapter, heroFrame, phase } from '../src/app/lib/hero-world.mjs';

test('hero chapters cover the full journey with deterministic boundaries', () => {
  assert.deepEqual([0, .079, .08, .399, .4, .499, .5, .929, .93, 1].map(heroChapter), [0,0,1,1,2,2,3,3,4,4]);
});
test('scrolling visits every project in order, one index per frame, in both directions', () => {
  const visited=[];
  for(let step=0;step<=1000;step++){
    const frame=heroFrame(.5+step/1000*.43);
    assert.ok(frame.projectIndex>=0&&frame.projectIndex<9);
    if(visited.at(-1)!==frame.projectIndex)visited.push(frame.projectIndex);
  }
  assert.deepEqual(visited,[0,1,2,3,4,5,6,7,8]);
  assert.deepEqual([8,7,6,5,4,3,2,1,0].map(index=>heroFrame(.5+(index+.4)*.43/9).projectIndex),[8,7,6,5,4,3,2,1,0]);
});
test('the five journey chapters precede the portal, and the idea follows the last project',()=>{
  assert.deepEqual([0,1,2,3,4].map(index=>heroFrame(.08+(index+.2)*.32/5).journeyActive),[0,1,2,3,4]);
  assert.equal(heroFrame(.445).chapter,2);
  assert.equal(heroFrame(.928).projectIndex,8);
  assert.equal(heroFrame(.97).chapter,4);
});
test('camera phase clamps overscroll and has continuous endpoints', () => {
  assert.equal(phase(-1, .1, .3), 0);
  assert.equal(phase(2, .1, .3), 1);
  assert.ok(Math.abs(phase(.2, .1, .3) - .5) < 1e-12);
  assert.ok(phase(.1001, .1, .3) < .00001);
});
test('identity voxels have finite, distinct starting positions', () => {
  const pixels = identityPixels();
  assert.ok(pixels.length > 200 && pixels.length < 600);
  assert.ok(pixels.every(pixel => Object.values(pixel).every(Number.isFinite)));
  assert.equal(new Set(pixels.map(p => `${p.x},${p.y},${p.z}`)).size, pixels.length);
});
test('particle strokes remain finite and preserve the W/F extents at full density',()=>{
  const points=particleIdentity(6111);
  assert.equal(points.length,6111);
  assert.ok(points.every(point=>point.every(Number.isFinite)));
  assert.ok(Math.min(...points.map(point=>point[0])) < -2.4);
  assert.ok(Math.max(...points.map(point=>point[0])) > 2.4);
});
