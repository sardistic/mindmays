import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browserExecutable = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const debugPort = 9338;
const profile = await mkdtemp(join(tmpdir(), "wikimaze-intro-smoke-"));
const browser = spawn(browserExecutable, ["--headless=new","--disable-gpu","--no-first-run","--window-size=1440,1080",`--remote-debugging-port=${debugPort}`,`--user-data-dir=${profile}`,"http://localhost:4173/"], { stdio:"ignore", windowsHide:true });
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
let socket;
try{
  let page;
  for(let attempt=0;attempt<40;attempt++){ await delay(100); const pages=await fetch(`http://localhost:${debugPort}/json`).then((response)=>response.json()).catch(()=>[]); page=pages.find((item)=>item.type==="page"&&item.url.includes("localhost:4173")); if(page)break; }
  if(!page)throw new Error("Could not attach to the main menu");
  const WebSocketImpl=(await import("ws")).default; socket=new WebSocketImpl(page.webSocketDebuggerUrl); await new Promise((resolve,reject)=>{socket.once("open",resolve);socket.once("error",reject);});
  let nextId=0; const command=(method,params={})=>new Promise((resolve,reject)=>{const id=++nextId;const onMessage=(raw)=>{const message=JSON.parse(raw);if(message.id!==id)return;socket.off("message",onMessage);message.error?reject(new Error(message.error.message)):resolve(message.result);};socket.on("message",onMessage);socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async(expression)=>{const result=await command("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});return result.result.value;};
  const state=async()=>JSON.parse(await evaluate("JSON.stringify(window.__wikimazeIntroDebug())"));
  const key=async(text,code,virtualKey)=>{const params={key:text,code,windowsVirtualKeyCode:virtualKey,nativeVirtualKeyCode:virtualKey};if(text.length===1)params.text=text;await command("Input.dispatchKeyEvent",{type:"keyDown",...params});await command("Input.dispatchKeyEvent",{type:"keyUp",key:text,code,windowsVirtualKeyCode:virtualKey,nativeVirtualKeyCode:virtualKey});await delay(120);};
  const clickSelector=async(selector)=>{const box=JSON.parse(await evaluate(`JSON.stringify((()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};})())`));await command("Input.dispatchMouseEvent",{type:"mousePressed",x:box.x,y:box.y,button:"left",clickCount:1});await command("Input.dispatchMouseEvent",{type:"mouseReleased",x:box.x,y:box.y,button:"left",clickCount:1});await delay(260);};

  for(let attempt=0;attempt<60&&!await evaluate("typeof window.__wikimazeIntroDebug === 'function'");attempt++)await delay(100);
  if(!await evaluate("typeof window.__wikimazeIntroDebug === 'function'"))throw new Error(`The main menu module did not initialize: ${await evaluate("JSON.stringify({href:location.href,title:document.title,body:document.body.innerText.slice(0,160)})")}`);

  const initial=await state();
  if(initial.options!==8)throw new Error(`Expected eight menu options, found ${initial.options}`);
  if(!initial.titleText.includes("WikiMaze"))throw new Error(`The title lockup is missing: ${initial.titleText}`);
  if(!initial.plateLoaded)throw new Error("The title backdrop plate did not load");
  if(initial.selected!==0||!initial.selectedLabel.includes("Begin the Quest"))throw new Error(`A fresh menu must open on Begin the Quest: ${JSON.stringify(initial)}`);
  for(const destination of ["/classic.html","/walk.html","/sudden.html"])if(!initial.destinations.includes(destination))throw new Error(`The menu does not reach ${destination}`);
  const accelerators=new Set(initial.accelerators.map((letter)=>letter.toLowerCase()));
  if(accelerators.size!==initial.options)throw new Error(`Menu accelerators must be unique: ${initial.accelerators.join("")}`);
  if(!initial.labels.every((label)=>label.trim().length>0))throw new Error("Every menu option needs a label");

  await key("ArrowDown","ArrowDown",40);await key("ArrowDown","ArrowDown",40);
  const moved=await state();
  if(moved.selected!==2||!moved.selectedLabel.includes("Walk the Keep"))throw new Error(`Arrow keys did not move the highlight: ${JSON.stringify(moved)}`);
  if(!moved.status.includes("three-dimensional"))throw new Error(`The status line does not describe the highlighted option: ${moved.status}`);
  await key("ArrowUp","ArrowUp",38);await key("ArrowUp","ArrowUp",38);await key("ArrowUp","ArrowUp",38);
  const wrapped=await state();
  if(wrapped.selected!==initial.options-1)throw new Error(`The highlight must wrap to the last option, landed on ${wrapped.selected}`);

  await key("h","KeyH",72);
  const help=await state();
  if(!help.panelOpen||help.panelTitle!=="How to Play"||!help.panelText.includes("knowledge seal"))throw new Error(`The How to Play accelerator did not open instructions: ${JSON.stringify({open:help.panelOpen,title:help.panelTitle})}`);
  await key("Escape","Escape",27);
  if((await state()).panelOpen)throw new Error("Escape did not close the panel");

  await key("f","KeyF",70);
  const fame=await state();
  if(!fame.panelOpen||fame.panelTitle!=="WikiMaze Score Card"||!fame.panelText.includes("Chambers found"))throw new Error(`The Hall of Fame did not report the record: ${JSON.stringify({title:fame.panelTitle,text:fame.panelText.slice(0,120)})}`);
  await clickSelector("#panel header button");

  await key("s","KeyS",83);
  if(!(await state()).panelOpen)throw new Error("The scholar panel did not open");
  await evaluate("document.querySelector('#player-name').value='Smoke Scholar';document.querySelector('#shared-keep').value='smoke-keep'");
  await clickSelector("#panel footer button");
  const saved=await state();
  if(saved.panelOpen||saved.scholar!=="Smoke Scholar")throw new Error(`Saving the scholar identity failed: ${JSON.stringify({open:saved.panelOpen,scholar:saved.scholar})}`);
  if(JSON.parse(await evaluate("localStorage.getItem('wikimaze-settings')")).room!=="smoke-keep")throw new Error("The shared keep was not persisted for the other editions");

  await clickSelector("#ambience-button");
  await delay(420);
  const sound=await state();
  if(!sound.soundEnabled||sound.audioState!=="running"||!(sound.audioMasterLevel>0)||!(sound.ambienceLevel>0)||sound.soundCues<1)throw new Error(`The menu ambience did not start: ${JSON.stringify(sound)}`);
  if(await evaluate("localStorage.getItem('wikimaze-classic-sound')")!=="on")throw new Error("The menu must persist the shared sound preference");

  await key("n","KeyN",78);
  if(!(await state()).noticeOpen)throw new Error("New Quest must confirm before clearing the record");
  await clickSelector("#notice-cancel");
  if((await state()).noticeOpen)throw new Error("Cancelling the New Quest notice did not close it");

  const screenshot=await command("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});
  await writeFile(new URL("../artifacts/main-menu.png",import.meta.url),Buffer.from(screenshot.data,"base64"));

  await command("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:0,mobile:true});
  await delay(340);
  const narrow=JSON.parse(await evaluate("JSON.stringify((()=>{const options=[...document.querySelectorAll('.menu-option')].map((button)=>{const r=button.getBoundingClientRect();return{visible:r.width>0&&r.height>0&&r.right<=innerWidth+1};});const sound=document.querySelector('#ambience-button').getBoundingClientRect();return{options:options.length,hidden:options.filter((option)=>!option.visible).length,sound:sound.width>0&&sound.right<=innerWidth+1,overflow:document.documentElement.scrollWidth>innerWidth+1};})())"));
  if(narrow.hidden>0||!narrow.sound||narrow.overflow)throw new Error(`The menu does not fit a 390px screen: ${JSON.stringify(narrow)}`);
  const narrowShot=await command("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});
  await writeFile(new URL("../artifacts/main-menu-mobile.png",import.meta.url),Buffer.from(narrowShot.data,"base64"));
  await command("Emulation.clearDeviceMetricsOverride");
  await delay(240);

  await evaluate("localStorage.setItem('wikimaze-classic-visited','[0,1,2,3]');localStorage.setItem('wikimaze-score','1800')");
  await evaluate("location.reload()");
  await delay(900);
  for(let attempt=0;attempt<60&&!await evaluate("typeof window.__wikimazeIntroDebug === 'function'");attempt++)await delay(100);
  const resumed=await state();
  if(!resumed.started||!resumed.selectedLabel.includes("Continue the Quest")||!resumed.selectedLabel.includes("Chamber 4"))throw new Error(`A saved quest must offer Continue with its progress: ${JSON.stringify(resumed)}`);
  if(resumed.accelerators[0]!=="C")throw new Error(`Continue the Quest must take the C accelerator, found ${resumed.accelerators[0]}`);

  await clickSelector(".menu-option");
  await delay(1200);
  const landed=await evaluate("location.pathname");
  if(landed!=="/classic.html")throw new Error(`Continue the Quest did not open the classic keep, landed on ${landed}`);
  for(let attempt=0;attempt<60&&!await evaluate("typeof window.__wikimazeClassicDebug === 'function'");attempt++)await delay(100);
  const carried=JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if(carried.visitedRooms!==4||carried.score!==1800)throw new Error(`Continue must keep the saved quest: ${JSON.stringify({visited:carried.visitedRooms,score:carried.score})}`);

  await evaluate("location.href='/classic.html?new=1'");
  await delay(1200);
  for(let attempt=0;attempt<60&&!await evaluate("typeof window.__wikimazeClassicDebug === 'function'");attempt++)await delay(100);
  const cleared=JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if(cleared.visitedRooms!==1||cleared.score!==0||cleared.currentRoom!==0||cleared.flames!==5)throw new Error(`New Quest did not clear the record: ${JSON.stringify(cleared)}`);
  if(await evaluate("location.search"))throw new Error("The New Quest marker must be dropped so a refresh does not clear the record again");

  console.log(`intro=ok options=${initial.options} keyboard=ok accelerators=ok panels=ok scholar=ok sound-running=ok mobile-390=ok continue=ok new-quest-reset=ok routes=${initial.destinations.join(",")}`);
}finally{socket?.close();browser.kill();await new Promise((resolve)=>{browser.once("exit",resolve);setTimeout(resolve,1000);});await rm(profile,{recursive:true,force:true,maxRetries:3}).catch(()=>{});}
