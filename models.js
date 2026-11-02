/* Pure scientific models. No UI or persistence dependencies. See SCIENCE.md. */
(function(root){
'use strict';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const samples={reference:{name:'Certified reference',u:.720},oklo:{name:'Oklo • shipment 72-41',u:.600},core:{name:'Oklo • sealed core B',u:.612},outside:{name:'Adjacent unaltered ore',u:.719}};
const isotopes={Nd:{masses:[142,143,144,145,146,148,150],natural:[27.2,12.2,23.8,8.3,17.2,5.7,5.6],fission:[0,25,24,17,19,9,6]},Ru:{masses:[96,98,99,100,101,102,104],natural:[5.54,1.87,12.76,12.60,17.06,31.55,18.62],fission:[0,0,21,18,23,25,13]}};
function normalize(a){const s=a.reduce((x,y)=>x+y,0);return a.map(x=>100*x/s);}
function mixture(element,f){let d=isotopes[element];return d.natural.map((x,i)=>x*(1-f)+d.fission[i]*f);}
function scan(sample,offset,dwell,rng=Math.random){const bias=.045*offset;const sigma=.012/Math.sqrt(dwell);const noise=(rng()+rng()+rng()+rng()-2)*Math.sqrt(3)*sigma;let u=clamp(samples[sample].u+bias+noise,.05,2);return {sample,u,u238:100-u,sigma,offset,dwell,valid:Math.abs(offset)<=.06,time:new Date().toISOString()};}
function ancient(age){let r=(.720/99.280)*Math.exp(Math.LN2*age*(1/.7038-1/4.468));return 100*r/(1+r);}
// Thermal utilization, resonance escape and diffusion leakage; phenomenological, not transport.
function multiplication({age=2,grade=35,size=6,water=.65,shape=1,enrichment=1}={}){const x=ancient(age)*enrichment/100;const eta=2.43*585*x/(683*x+2.68*(1-x));const moderation=1-Math.exp(-water*6);const utilization=grade/(grade+6+7*water);const resonance=.82+.14*moderation;const leakage=1/(1+Math.pow(2.4/(size*shape),2));const dilution=1/(1+.04*Math.pow(water/.8,3));return eta*moderation*utilization*resonance*leakage*dilution;}
function initial(water=.8){return {t:0,p:.06,temp:28,w:water,vent:false,cycles:0};}
function step(s,cfg,dt=.15){const k=multiplication({...cfg,water:s.w});let p=clamp(s.p+dt*(.8*(k-1)*s.p+.0008),.001,3);let vent=s.vent;if(s.temp>99)vent=true;if(s.temp<68)vent=false;const boil=vent?.075*s.w:0;const refill=!vent?cfg.refill*Math.max(0,(cfg.maxWater??1)-s.w):0;let w=clamp(s.w+dt*(refill-boil),0,1);let temp=clamp(s.temp+dt*(7*p-.032*(s.temp-25)-100*boil),25,130);return {t:s.t+dt,p,temp,w,vent,cycles:s.cycles+(!s.vent&&vent?1:0),k};}
// A single effective precursor per proxy: retention during off-time only.
// Synthetic teaching proxies, NOT measured Xe isotope ratios or a fit to the paper.
function xenon(on,off,retention,decay=true){return [10,40,180].map(half=>{const l=decay?Math.LN2/half:1e-9;return retention*(1-Math.exp(-l*on))/(l*on)*(1-Math.exp(-l*off));});}
const xeTarget=xenon(30,150,.8);
const API={clamp,samples,isotopes,normalize,mixture,scan,ancient,multiplication,initial,step,xenon,xeTarget};root.Science=API;if(typeof module!=='undefined')module.exports=API;
})(typeof window!=='undefined'?window:globalThis);
