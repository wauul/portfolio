import test from 'node:test';
import assert from 'node:assert/strict';
import {journeyFrame} from '../src/app/lib/journey.mjs';
test('journey has no empty frames, including reverse scroll and chapter boundaries',()=>{
 for(let n=10000;n>=0;n--){const {weights,active}=journeyFrame(n/10000); assert.ok(Math.abs(weights.reduce((a,b)=>a+b,0)-1)<1e-10);assert.ok(weights[active]>=.5);assert.ok(weights.every(w=>w>=0&&w<=1));}
 assert.deepEqual(journeyFrame(0).weights,[1,0,0,0,0]);assert.deepEqual(journeyFrame(1).weights,[0,0,0,0,1]);
});
test('reduced motion keeps exactly one readable scene at every position',()=>{for(let n=0;n<=100;n++){const {weights}=journeyFrame(n/100,5,true);assert.equal(weights.filter(w=>w===1).length,1);assert.equal(weights.filter(w=>w!==0).length,1);}});
