import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import WebSocket from "ws";

const browserExecutable = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const debugPort = 9335;
const keepName = `classic-smoke-${Date.now()}`;
const profile = await mkdtemp(join(tmpdir(), "wikimaze-classic-smoke-"));
const browser = spawn(browserExecutable, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--window-size=1440,900", `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`, `http://localhost:4173/classic.html?debug=1&room=${keepName}`,
], { stdio: "ignore", windowsHide: true });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let peer;
try {
  let page;
  for (let attempt = 0; attempt < 40; attempt++) {
    await delay(100);
    const pages = await fetch(`http://localhost:${debugPort}/json`).then((response) => response.json()).catch(() => []);
    page = pages.find((item) => item.type === "page" && item.url.includes("classic.html"));
    if (page) break;
  }
  if (!page) throw new Error("Could not attach to the classic edition");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.once("open", resolve); socket.once("error", reject); });
  let nextId = 0;
  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    const onMessage = (raw) => { const message = JSON.parse(raw); if (message.id !== id) return; socket.off("message", onMessage); message.error ? reject(new Error(message.error.message)) : resolve(message.result); };
    socket.on("message", onMessage); socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => { const result = await command("Runtime.evaluate", { expression, returnByValue: true }); return result.result.value; };
  const MAP_PROBE = `JSON.stringify((()=>{const debug=window.__wikimazeClassicDebug();const cell=[...document.querySelectorAll(".maze-cell")][debug.currentRoom];const drawn=["n","e","s","w"].filter((side)=>cell.classList.contains("open-"+side));const doors=[...document.querySelectorAll(".door-hotspot:not([hidden]):not(.locked)")].map((button)=>["north","east","south","west"][Number(button.dataset.direction)][0]);return{drawn,doors,current:cell.classList.contains("current")};})())`;
  const CLEARED_PROBE = `JSON.stringify({visited:localStorage.getItem("wikimaze-classic-visited"),score:localStorage.getItem("wikimaze-score"),unlocked:localStorage.getItem("wikimaze-classic-unlocked"),trail:localStorage.getItem("wikimaze-classic-trail"),flames:localStorage.getItem("wikimaze-classic-flames")})`;
  for (let attempt = 0; attempt < 60 && !await evaluate("typeof window.__wikimazeClassicDebug === 'function'"); attempt++) await delay(100);
  const startRaw = await evaluate("typeof window.__wikimazeClassicDebug === 'function' ? JSON.stringify(window.__wikimazeClassicDebug()) : JSON.stringify({ready:document.readyState,title:document.title,scripts:[...document.scripts].map(s=>s.src),body:document.body.innerText.slice(0,120)})");
  const start = JSON.parse(startRaw);
  if (!("totalRooms" in start)) { const moduleError = await evaluate("import('/classic.js').then(()=>'none').catch((error)=>String(error.stack||error))"); throw new Error(`Classic module did not initialize: ${JSON.stringify(start)} MODULE ${moduleError}`); }
  if (start.totalRooms !== 100) throw new Error(`Expected 100 classic chambers, found ${start.totalRooms}`);
  if (start.reachableRooms !== 100 || start.roomPlates < 16 || start.uniqueRoomPlates < 16 || start.closePlates !== start.inhabitedPlates || start.uninhabitedPlates < 4) throw new Error(`Classic room variety or connectivity is incomplete: ${JSON.stringify(start)}`);
  if (start.wings !== 4) throw new Error(`Expected four wings, found ${start.wings}`);
  if (start.questions < 10000 || start.uniqueQuestions !== start.questions || start.questionsByLevel.some((count) => count < 1000) || start.characters < 12) throw new Error(`Classic knowledge or inhabitant depth is incomplete: ${JSON.stringify(start)}`);
  if (start.visibleExits < 1 || start.openExits !== 0 || start.lockedExits !== start.visibleExits) throw new Error("Every uncleared starting passage must carry a knowledge seal");
  if (start.routeGridCells !== 100 || start.revealedRouteCells !== 0) throw new Error("The route board must begin blank except for the current-room marker");
  const soundButtonRect = JSON.parse(await evaluate("JSON.stringify((() => { const rect = document.querySelector('#ambience-button').getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; })())"));
  await command("Input.dispatchMouseEvent", { type: "mousePressed", x: soundButtonRect.x, y: soundButtonRect.y, button: "left", clickCount: 1 });
  await command("Input.dispatchMouseEvent", { type: "mouseReleased", x: soundButtonRect.x, y: soundButtonRect.y, button: "left", clickCount: 1 });
  await delay(500);
  const soundStarted = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (!soundStarted.soundSupported || !soundStarted.soundEnabled || soundStarted.audioState !== "running" || soundStarted.audioMasterLevel < .8 || soundStarted.ambienceLevel < .02 || soundStarted.soundCues < 1) throw new Error(`The user-gated audible signal path did not start: ${JSON.stringify(soundStarted)}`);
  const soundButton = JSON.parse(await evaluate("JSON.stringify({ label: document.querySelector('#ambience-button').textContent, pressed: document.querySelector('#ambience-button').getAttribute('aria-pressed') })"));
  if (soundButton.label !== "♫ Sound On" || soundButton.pressed !== "true") throw new Error(`Sound control state is unclear: ${JSON.stringify(soundButton)}`);
  await command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }); await delay(80);
  const mobileSoundDisplay = await evaluate("getComputedStyle(document.querySelector('#ambience-button')).display");
  await command("Emulation.clearDeviceMetricsOverride");
  if (mobileSoundDisplay === "none") throw new Error("The Sound control is hidden in the mobile layout");

  peer = new WebSocket("ws://localhost:4173/multiplayer");
  await new Promise((resolve, reject) => { peer.once("open", resolve); peer.once("error", reject); });
  peer.send(JSON.stringify({ type: "join", room: `classic-${keepName}`, name: "Visiting Antiquarian", color: "#78a8a2" }));
  peer.send(JSON.stringify({ type: "state", x: start.currentRoom % 10 + .5, y: Math.floor(start.currentRoom / 10) + .5, angle: 0, score: 640 }));
  await delay(450);
  const company = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (company.roomScholars < 1) throw new Error("A multiplayer scholar did not appear in the same classic chamber");

  const screenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(new URL("../artifacts/classic-room.png", import.meta.url), Buffer.from(screenshot.data, "base64"));

  await evaluate("document.querySelector('.door-hotspot:not([hidden]).locked').click()");
  await delay(150);
  const firstQuestion = String(await evaluate("window.__wikimazeClassicDebug().activeQuestion"));
  if (!firstQuestion || firstQuestion === "null") throw new Error("The first uncleared door did not open a question");
  const sampledQuestions = [firstQuestion];
  for (let sample = 0; sample < 5; sample++) {
    await evaluate("document.querySelector('#challenge-dialog [data-close-panel]').click(); document.querySelector('.door-hotspot:not([hidden]).locked').click()");
    await delay(40);
    sampledQuestions.push(String(await evaluate("window.__wikimazeClassicDebug().activeQuestion")));
  }
  if (new Set(sampledQuestions).size !== sampledQuestions.length) throw new Error(`A question repeated before the available pool was exhausted: ${JSON.stringify(sampledQuestions)}`);
  const questionBeforeFailure = sampledQuestions.at(-1);
  const flamesBeforeFailure = Number(await evaluate("window.__wikimazeClassicDebug().flames"));
  await evaluate("window.__wikimazeClassicTest.answerWrong()");
  await delay(1350);
  const failedAnswer = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (!failedAnswer.activeQuestion || failedAnswer.activeQuestion === questionBeforeFailure || failedAnswer.questionAttempts < 1 || failedAnswer.recentQuestions < sampledQuestions.length + 1 || failedAnswer.flames !== flamesBeforeFailure - 1) throw new Error(`A failed seal did not replace its question and extinguish exactly one flame: ${JSON.stringify(failedAnswer)}`);
  await evaluate("window.__wikimazeClassicTest.answerCorrect()");
  await delay(1700);
  const moved = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (moved.currentRoom === start.currentRoom || moved.visitedRooms < 2 || moved.score <= start.score) throw new Error("Question-gated click-through room navigation failed");
  await evaluate("document.querySelector('#previous-room').click()");
  await delay(650);
  const returned = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (returned.currentRoom !== start.currentRoom) throw new Error("Classic return navigation failed");

  await evaluate("window.__wikimazeClassicTest.visitPlate('astrolabe')");
  const emptyRoom = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (emptyRoom.hasInhabitant || !await evaluate("document.querySelector('#character-hotspot').hidden")) throw new Error("The unoccupied artifact chamber still exposes an inhabitant");
  const emptyRoomScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(new URL("../artifacts/classic-empty-room.png", import.meta.url), Buffer.from(emptyRoomScreenshot.data, "base64"));
  await evaluate("document.querySelector('#painting-hotspot').click()");
  await delay(360);
  const objectEncounter = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (objectEncounter.encounter !== "object") throw new Error("Object examination did not begin its camera push");
  const objectScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(new URL("../artifacts/classic-object-close.png", import.meta.url), Buffer.from(objectScreenshot.data, "base64"));
  await delay(420);
  const articleOpen = await evaluate("!document.querySelector('#article-dialog').hidden");
  if (!articleOpen) throw new Error("Framed Wikipedia object did not open its article dialog");
  await evaluate("document.querySelector('#article-dialog [data-close-panel]').click(); document.querySelector('#route-button').click()");
  const routeVisible = await evaluate("window.__wikimazeClassicDebug().revealedRouteCells > 0");
  if (!routeVisible) throw new Error("Memory-only cartographer hint failed");

  await evaluate("window.__wikimazeClassicTest.visitPlate('astronomer'); document.querySelector('#character-hotspot').click()");
  await delay(700);
  if (!await evaluate("!document.querySelector('#character-dialog').hidden && document.querySelector('#character-name').textContent.length > 0")) throw new Error("Starting inhabitant encounter failed");
  const personEncounter = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (personEncounter.encounter !== "person" || !personEncounter.roomImage.includes("-close.png")) throw new Error(`Inhabitant did not replace the room with an alternate close plate: ${JSON.stringify(personEncounter)}`);
  const dialogueResponses = [];
  for (let repeat = 0; repeat < 4; repeat++) {
    await evaluate("document.querySelector('#character-actions button').click()");
    dialogueResponses.push(String(await evaluate("document.querySelector('#character-speech').textContent")));
  }
  const irritated = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (new Set(dialogueResponses).size !== 4 || irritated.dialogueRepeats < 3 || irritated.dialogueIrritation !== 3 || !await evaluate("document.querySelector('#character-dialog').classList.contains('irritated')")) throw new Error(`Repeated dialogue did not escalate character irritation: ${JSON.stringify({ dialogueResponses, irritated })}`);
  const personScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(new URL("../artifacts/classic-person-close.png", import.meta.url), Buffer.from(personScreenshot.data, "base64"));
  await evaluate("document.querySelector('#character-dialog [data-close-panel]').click()");
  const restoredEncounter = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (restoredEncounter.encounter !== null || restoredEncounter.roomImage.includes("-close.png")) throw new Error("The room plate did not restore after closing the encounter");

  await evaluate("window.__wikimazeClassicTest.visitPlate('anatomy'); document.querySelector('#character-hotspot').click()");
  await delay(720);
  const newInhabitant = JSON.parse(await evaluate("JSON.stringify({name:document.querySelector('#character-name').textContent,zoom:document.querySelector('#room-scene').classList.contains('zoom-close'),image:document.querySelector('#room-plate-image').getAttribute('src'),loaded:document.querySelector('#room-plate-image').complete&&document.querySelector('#room-plate-image').naturalWidth===640})"));
  if (newInhabitant.name !== "Doctor Vellum" || newInhabitant.zoom || !newInhabitant.loaded || !newInhabitant.image.includes("anatomy-close-pixel.png")) throw new Error(`The new anatomy inhabitant lacks an authored 640×480 close encounter: ${JSON.stringify(newInhabitant)}`);
  await evaluate("document.querySelector('#character-dialog [data-close-panel]').click()");
  await evaluate("window.__wikimazeClassicTest.visitPlate('glossary'); document.querySelector('#character-hotspot').click()");
  await delay(720);
  const glossatorEncounter = JSON.parse(await evaluate("JSON.stringify({name:document.querySelector('#character-name').textContent,image:document.querySelector('#room-plate-image').getAttribute('src'),loaded:document.querySelector('#room-plate-image').complete&&document.querySelector('#room-plate-image').naturalWidth===640})"));
  if (glossatorEncounter.name !== "The Glossator" || !glossatorEncounter.loaded || !glossatorEncounter.image.includes("glossary-close-pixel.png")) throw new Error(`The Glossator lacks an authored 640×480 close encounter: ${JSON.stringify(glossatorEncounter)}`);
  await evaluate("document.querySelector('#character-dialog [data-close-panel]').click()");

  const sealed = await evaluate("window.__wikimazeClassicTest.openLockedChallenge()");
  if (!sealed || !await evaluate("!document.querySelector('#challenge-dialog').hidden && document.querySelectorAll('#question-answers button').length === 4")) throw new Error("A question-sealed passage did not open a full challenge");
  const questionScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(new URL("../artifacts/classic-question.png", import.meta.url), Buffer.from(questionScreenshot.data, "base64"));
  const scoreBeforeAnswer = Number(await evaluate("window.__wikimazeClassicDebug().score"));
  await evaluate("window.__wikimazeClassicTest.answerCorrect()");
  await delay(1700);
  const afterAnswer = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (afterAnswer.score <= scoreBeforeAnswer || afterAnswer.currentRoom !== sealed.next) throw new Error("Correct trivia answer did not award lore and open the sealed passage");
  if (afterAnswer.soundCues < 8) throw new Error(`Expected interaction sound cues throughout the run, found ${afterAnswer.soundCues}`);

  // The route board must describe the same keep the painted doors do.
  const board = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (board.trail < 1 || board.revealedRouteCells < 1 || board.mappedOpenings < 1) throw new Error(`The route map did not record the walked chambers and opened doors: ${JSON.stringify({ trail: board.trail, remembered: board.revealedRouteCells, openings: board.mappedOpenings })}`);
  const mapAgrees = JSON.parse(await evaluate(MAP_PROBE));
  if (!mapAgrees.current) throw new Error("The route map does not mark the chamber you are standing in");
  for (const side of mapAgrees.doors) if (!mapAgrees.drawn.includes(side)) throw new Error(`An open painted door is missing from the route map: ${JSON.stringify(mapAgrees)}`);

  // Each level is a different wing with its own chambers and inhabitants.
  const wings = [];
  for (const level of [1, 2, 3, 4]) {
    await evaluate(`window.__wikimazeClassicTest.setLevel(${level})`);
    await delay(160);
    wings.push(JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())")));
  }
  const wingIds = wings.map((wing) => wing.wing);
  if (new Set(wingIds).size !== 4) throw new Error(`Levels must enter distinct wings: ${wingIds.join(",")}`);
  for (const [index, wing] of wings.entries()) {
    if (!wing.wingPlates.length || !wing.wingInhabitants.length) throw new Error(`Wing ${index + 1} has no chambers or inhabitants`);
    if (wings.filter((other) => other.wingPlates.join() === wing.wingPlates.join()).length !== 1) throw new Error(`Wing ${index + 1} is not distinct from the others`);
  }
  if (new Set(wings.flatMap((wing) => wing.wingPlates)).size < 16) throw new Error("The four wings do not use every authored chamber plate");
  if (new Set(wings.flatMap((wing) => wing.wingInhabitants)).size < 8) throw new Error("The wings do not progress through different inhabitants");

  // A wing's own offer is a real choice with a real effect.
  await evaluate("window.__wikimazeClassicTest.setLevel(1)");
  await delay(160);
  await evaluate("window.__wikimazeClassicTest.setFlames(2)");
  const beforeChoice = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (!await evaluate("window.__wikimazeClassicTest.takeRoomChoice()")) throw new Error("No chamber in the first wing offered its choice");
  await delay(240);
  const afterChoice = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (afterChoice.flames !== beforeChoice.flames + 1 || !afterChoice.roomChoiceTaken) throw new Error(`The candle stub did not relight a match: ${JSON.stringify({ before: beforeChoice.flames, after: afterChoice.flames, taken: afterChoice.roomChoiceTaken })}`);

  // The room answers the seal standing in front of it.
  if (!await evaluate("window.__wikimazeClassicTest.openLockedChallenge()")) throw new Error("No locked passage remained for the room-hint test");
  await delay(240);
  if (!await evaluate("window.__wikimazeClassicTest.askRoom()")) throw new Error("The room refused to answer the seal");
  await delay(220);
  const hinted = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (!hinted.hintShown || hinted.eliminatedAnswers !== 1) throw new Error(`Asking the room must strike out exactly one wrong answer: ${JSON.stringify({ shown: hinted.hintShown, struck: hinted.eliminatedAnswers })}`);
  if (!hinted.hintText.includes("It is not")) throw new Error(`The room's hint does not name what it rules out: ${hinted.hintText}`);
  await evaluate("window.__wikimazeClassicTest.answerCorrect()");
  await delay(1300);

  // Opening a fourth seal relights a match, so a long run can recover.
  await evaluate("window.__wikimazeClassicTest.setFlames(2)");
  let relit = null;
  for (let seal = 0; seal < 8 && !relit; seal++) {
    if (!await evaluate("window.__wikimazeClassicTest.openLockedChallenge()")) break;
    await delay(220);
    const before = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
    await evaluate("window.__wikimazeClassicTest.answerCorrect()");
    await delay(1300);
    const after = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
    if (after.flames > before.flames) relit = after.solved;
  }
  if (relit === null) throw new Error("Opening seals never relit a match, so a long run cannot recover");

  const fatalSeal = await evaluate("window.__wikimazeClassicTest.openLockedChallenge()");
  if (!fatalSeal) throw new Error("No locked passage remained for the final-flame test");
  await evaluate("window.__wikimazeClassicTest.setFlames(1); window.__wikimazeClassicTest.answerWrong()");
  await delay(2800);
  const landed = await evaluate("location.pathname");
  if (landed !== "/") throw new Error(`Losing the final match must return the player to the main menu, landed on ${landed}`);
  for (let attempt = 0; attempt < 60 && !await evaluate("typeof window.__wikimazeIntroDebug === 'function'"); attempt++) await delay(100);
  const menu = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeIntroDebug())"));
  if (!menu.noticeOpen || !menu.noticeText.includes("fifth match")) throw new Error(`The main menu did not report the lost run: ${JSON.stringify({ open: menu.noticeOpen, text: menu.noticeText })}`);
  if (menu.started) throw new Error("A lost run must leave no quest to continue");
  const cleared = JSON.parse(await evaluate(CLEARED_PROBE));
  if (cleared.visited !== "[0]" || cleared.score !== "0" || cleared.unlocked !== "[]" || cleared.trail !== "[]" || cleared.flames !== "5") throw new Error(`The lost run did not clear the record: ${JSON.stringify(cleared)}`);

  console.log(`classic=ok rooms=${start.totalRooms} plates=${start.roomPlates} empty-plates=${start.uninhabitedPlates} closeups=${start.closePlates} route-grid=${start.routeGridCells} questions=${start.questions} inhabitants=${start.characters} every-door-sealed=ok failed-question-replaced=ok wrong-answer-flame-loss=ok fifth-flame-reset=ok click-through=ok return=ok route-map=ok wings=4 room-choice=ok room-hint=ok relit-match=ok returns-to-menu=ok empty-object-room=ok object-push=ok wikipedia=ok audio-running=ok mobile-sound-control=ok sound-cues=ok character-closeup=ok anatomy-closeup=ok glossator-closeup=ok dialogue-irritation=ok sealed-trivia=ok multiplayer-room-presence=ok`);
} finally {
  peer?.close(); socket?.close(); browser.kill();
  await new Promise((resolve) => { browser.once("exit", resolve); setTimeout(resolve, 1000); });
  await rm(profile, { recursive: true, force: true, maxRetries: 3 }).catch(() => {});
}
