const assert=require('node:assert/strict'),M=require('./models.js');
assert(Math.abs(M.ancient(0)-.72)<1e-10);
assert(M.ancient(2)>3&&M.ancient(2)<4);
assert(M.multiplication({age:0})<1);
assert(M.multiplication({age:2})>1);
assert(M.multiplication({age:2,water:0})===0);
assert(M.multiplication({age:2,size:1})<1);
for(const e of ['Nd','Ru'])assert(Math.abs(M.mixture(e,.72).reduce((a,b)=>a+b)-100)<.001);
let centered=M.scan('oklo',0,16,()=>.5),biased=M.scan('oklo',.8,16,()=>.5);
assert.equal(centered.u,.6);assert(biased.u>centered.u);assert.equal(biased.valid,false);
let wet=M.initial(.8),dry=M.initial(.8),cfg={age:2,grade:35,size:6,shape:1,enrichment:1,maxWater:.65};
for(let i=0;i<4000;i++){wet=M.step(wet,{...cfg,refill:.035});dry=M.step(dry,{...cfg,refill:0});for(let s of [wet,dry])assert(s.w>=0&&s.w<=1&&s.temp>=25&&Number.isFinite(s.p));}
assert(wet.cycles>=2);assert.equal(dry.cycles,1);assert(dry.p<.08);
assert.deepEqual(M.xenon(30,150,.8),M.xeTarget);
assert(M.xenon(30,150,.8,false).every(x=>x<1e-5));
console.log('All model assertions passed. Cycling control:',wet.cycles,'wet episodes;',dry.cycles,'dry episode.');
