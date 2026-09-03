import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browserExecutable = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const debugPort = 9337;
const profile = await mkdtemp(join(tmpdir(), "wikimaze-sudden-smoke-"));
const browser = spawn(browserExecutable, ["--headless=new","--disable-gpu","--no-first-run","--window-size=1440,900",`--remote-debugging-port=${debugPort}`,`--user-data-dir=${profile}`,"http://localhost:4173/sudden.html?debug=1"], { stdio:"ignore", windowsHide:true });
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
let socket;
try{
  let page;
  for(let attempt=0;attempt<40;attempt++){ await delay(100); const pages=await fetch(`http://localhost:${debugPort}/json`).then((response)=>response.json()).catch(()=>[]); page=pages.find((item)=>item.type==="page"&&item.url.includes("sudden.html")); if(page)break; }
  if(!page)throw new Error("Could not attach to Sudden Death");
  const WebSocketImpl=(await import("ws")).default; socket=new WebSocketImpl(page.webSocketDebuggerUrl); await new Promise((resolve,reject)=>{socket.once("open",resolve);socket.once("error",reject);});
  let nextId=0; const command=(method,params={})=>new Promise((resolve,reject)=>{const id=++nextId;const onMessage=(raw)=>{const message=JSON.parse(raw);if(message.id!==id)return;socket.off("message",onMessage);message.error?reject(new Error(message.error.message)):resolve(message.result);};socket.on("message",onMessage);socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async(expression)=>{const result=await command("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});return result.result.value;};
  for(let attempt=0;attempt<60&&!await evaluate("typeof window.__wikimazeSuddenDebug === 'function'");attempt++)await delay(100);
  const initialRaw=await evaluate("typeof window.__wikimazeSuddenDebug === 'function' ? JSON.stringify(window.__wikimazeSuddenDebug()) : JSON.stringify({href:location.href,ready:document.readyState,title:document.title,scripts:[...document.scripts].map(s=>s.src),body:document.body.innerText.slice(0,120),html:document.documentElement.outerHTML.slice(0,180)})");
  const initial=JSON.parse(initialRaw);
  if(!("total" in initial))throw new Error(`Sudden Death module did not initialize: ${JSON.stringify(initial)}`);
  if(initial.total!==10||initial.panel!=="#intro-panel")throw new Error(`Sudden Death did not initialize ten seals: ${JSON.stringify(initial)}`);
  const soundRect=JSON.parse(await evaluate("JSON.stringify((()=>{const r=document.querySelector('#death-sound').getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};})())"));
  await command("Input.dispatchMouseEvent",{type:"mousePressed",x:soundRect.x,y:soundRect.y,button:"left",clickCount:1});await command("Input.dispatchMouseEvent",{type:"mouseReleased",x:soundRect.x,y:soundRect.y,button:"left",clickCount:1});await delay(220);
  await evaluate("window.__wikimazeSuddenTest.start(); window.__wikimazeSuddenTest.wrong()"); await delay(850);
  const failed=JSON.parse(await evaluate("JSON.stringify(window.__wikimazeSuddenDebug())"));
  if(!failed.ended||failed.panel!=="#failure-panel"||failed.audioState!=="running")throw new Error(`A wrong answer did not end the run: ${JSON.stringify(failed)}`);
  await evaluate("window.__wikimazeSuddenTest.start()");
  for(let seal=0;seal<10;seal++){await evaluate("window.__wikimazeSuddenTest.correct()");await delay(seal===9?950:850);}
  const won=JSON.parse(await evaluate("JSON.stringify(window.__wikimazeSuddenDebug())"));
  const reward=JSON.parse(await evaluate("JSON.stringify({text:document.querySelector('#reward-panel h2').textContent,href:document.querySelector('#ultimate-link').href,image:document.querySelector('#reward-panel img').complete&&document.querySelector('#reward-panel img').naturalWidth>0})"));
  if(won.step!==10||!won.ended||won.panel!=="#reward-panel"||!reward.text.includes("ultimate information")||!reward.href.includes("wikipedia.org/wiki/Special:Random")||!reward.image)throw new Error(`Ten correct answers did not reveal the Wikipedia chest: ${JSON.stringify({won,reward})}`);
  const screenshot=await command("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});await writeFile(new URL("../artifacts/sudden-reward.png",import.meta.url),Buffer.from(screenshot.data,"base64"));
  console.log(`sudden=ok questions=${won.total} typed-answer=ok one-wrong-ends=ok progressive-path=ok audio-running=ok wikipedia-chest=ok`);
}finally{socket?.close();browser.kill();await new Promise((resolve)=>{browser.once("exit",resolve);setTimeout(resolve,1000);});await rm(profile,{recursive:true,force:true,maxRetries:3}).catch(()=>{});}
