import { SUDDEN_QUESTIONS as QUESTIONS } from "./sudden-questions.js";

const $ = (selector) => document.querySelector(selector);
const corridor = $("#corridor");
const panels = ["#intro-panel","#question-panel","#failure-panel","#reward-panel"];
let step = 0;
let ended = false;
let audioContext;
let master;
let ambience;
let soundOn = localStorage.getItem("wikimaze-sudden-sound") === "on";
let heartbeatTimer;
let cueCount = 0;

function normalize(value){ return String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim(); }
function show(selector){ panels.forEach((panel) => $(panel).hidden = panel !== selector); }
function renderMarkers(){ $("#path-markers").replaceChildren(...QUESTIONS.map((_,index)=>{ const marker=document.createElement("li"); if(index<step)marker.className="passed"; if(index===step&&!ended)marker.className="current"; marker.setAttribute("aria-label",`Seal ${index+1}${index<step?" cleared":""}`); return marker; })); }

function startRun(){
  step=0; ended=false; corridor.classList.remove("dead"); show("#question-panel"); renderQuestion(); if(soundOn)wakeAudio();
}
function renderQuestion(){
  const question=QUESTIONS[step];
  $("#seal-number").textContent=`Seal ${toRoman(step+1)} of X`;
  $("#depth-name").textContent=question.depth;
  $("#depth-fill").style.width=`${(step+1)*10}%`;
  $("#question-domain").textContent=question.domain;
  $("#death-question").textContent=question.prompt;
  $("#typed-answer").value=""; $("#typed-answer").disabled=false;
  $("#answer-form button").disabled=false; $("#answer-status").textContent="";
  renderMarkers(); setTimeout(()=>$("#typed-answer").focus(),60); scheduleHeartbeat();
}
function submitAnswer(event){
  event.preventDefault(); if(ended)return;
  const question=QUESTIONS[step], attempt=normalize($("#typed-answer").value);
  if(!attempt)return;
  $("#typed-answer").disabled=true; $("#answer-form button").disabled=true;
  if(question.aliases.map(normalize).includes(attempt)){
    cue("correct",1+step*.07); $("#answer-status").textContent=`Correct. ${question.answer}. The next seal is listening.`;
    step+=1; renderMarkers();
    if(step===QUESTIONS.length){ ended=true; setTimeout(win,850); } else setTimeout(renderQuestion,780);
  } else {
    ended=true; cue("wrong",1.25); corridor.classList.add("dead");
    $("#failure-copy").textContent=`Seal ${step+1} expected “${question.answer}.” No second answer is permitted. You reached ${step} of 10.`;
    setTimeout(()=>{ show("#failure-panel"); renderMarkers(); },720);
  }
}
function win(){
  clearTimeout(heartbeatTimer); corridor.classList.remove("dead"); show("#reward-panel"); renderMarkers(); cue("win",1.2);
}
function toRoman(number){ return ["I","II","III","IV","V","VI","VII","VIII","IX","X"][number-1]; }

function buildAudio(){
  if(audioContext)return;
  const Audio=window.AudioContext||window.webkitAudioContext; if(!Audio)return;
  audioContext=new Audio(); master=audioContext.createGain(); ambience=audioContext.createGain(); master.gain.value=.82; ambience.gain.value=.05;
  ambience.connect(master); master.connect(audioContext.destination);
  for(const [frequency,volume] of [[38,.24],[57,.1],[76,.045]]){ const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(); oscillator.type="sine"; oscillator.frequency.value=frequency; gain.gain.value=volume; oscillator.connect(gain).connect(ambience); oscillator.start(); }
  const length=audioContext.sampleRate*3, buffer=audioContext.createBuffer(1,length,audioContext.sampleRate), data=buffer.getChannelData(0); let last=0;
  for(let i=0;i<length;i++){ last=(last*.986+(Math.random()*2-1)*.014); data[i]=last; }
  const noise=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),gain=audioContext.createGain(); noise.buffer=buffer;noise.loop=true;filter.type="lowpass";filter.frequency.value=280;gain.gain.value=.22;noise.connect(filter).connect(gain).connect(ambience);noise.start();
}
async function wakeAudio(){
  buildAudio(); if(!audioContext)return; await audioContext.resume(); soundOn=true; localStorage.setItem("wikimaze-sudden-sound","on"); ambience.gain.setTargetAtTime(.065,audioContext.currentTime,.5); $("#death-sound").textContent="♫ Corridor awake"; $("#death-sound").setAttribute("aria-pressed","true"); cue("wake"); scheduleHeartbeat();
}
function silenceAudio(){ soundOn=false;localStorage.setItem("wikimaze-sudden-sound","off");if(ambience)ambience.gain.setTargetAtTime(0,audioContext.currentTime,.25);clearTimeout(heartbeatTimer);$("#death-sound").textContent="♫ Wake corridor";$("#death-sound").setAttribute("aria-pressed","false"); }
function tone(frequency,at,duration,volume,type="sine"){
  if(!soundOn||!audioContext)return; const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,at);gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(volume,at+.02);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);oscillator.connect(gain).connect(master);oscillator.start(at);oscillator.stop(at+duration+.02);
}
function cue(name,intensity=1){
  if(!soundOn||!audioContext)return;cueCount++;const now=audioContext.currentTime;
  if(name==="correct"){tone(174,now,.26,.11*intensity);tone(261,now+.09,.38,.08*intensity);}
  if(name==="wrong"){tone(91,now,.8,.19*intensity,"sawtooth");tone(46,now+.08,1.1,.16*intensity);}
  if(name==="win"){[130,196,261,392].forEach((f,i)=>tone(f,now+i*.15,1.8,.1,"triangle"));}
  if(name==="wake")tone(110,now,.45,.08,"triangle");
  if(name==="beat"){tone(46,now,.12,.12+step*.008);tone(39,now+.16,.15,.08+step*.006);}
}
function scheduleHeartbeat(){ clearTimeout(heartbeatTimer); if(!soundOn||ended)return; heartbeatTimer=setTimeout(()=>{ cue("beat"); scheduleHeartbeat(); },Math.max(760,1500-step*70)); }

$("#begin-run").addEventListener("click",startRun);$("#retry-run").addEventListener("click",startRun);$("#new-descent").addEventListener("click",startRun);$("#answer-form").addEventListener("submit",submitAnswer);
$("#death-sound").addEventListener("click",()=>soundOn?silenceAudio():wakeAudio());
renderMarkers(); if(soundOn)wakeAudio().catch(()=>silenceAudio());
window.__wikimazeSuddenDebug=()=>({step,total:QUESTIONS.length,ended,panel:panels.find((panel)=>!$(panel).hidden),soundOn,audioState:audioContext?.state||"uninitialized",cueCount,answer:QUESTIONS[step]?.answer||null});
if(new URLSearchParams(location.search).has("debug"))window.__wikimazeSuddenTest={start:startRun,correct(){if(ended)return;$("#typed-answer").value=QUESTIONS[step].aliases[0];$("#answer-form").requestSubmit();},wrong(){if(ended)return;$("#typed-answer").value="certainly wrong";$("#answer-form").requestSubmit();}};
