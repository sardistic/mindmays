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
  await delay(1400);

  const start = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (start.totalRooms !== 64) throw new Error(`Expected 64 classic chambers, found ${start.totalRooms}`);
  if (start.reachableRooms !== 64 || start.roomPlates < 14 || start.uniqueRoomPlates < 14 || start.closePlates !== start.inhabitedPlates || start.uninhabitedPlates < 4) throw new Error(`Classic room variety or connectivity is incomplete: ${JSON.stringify(start)}`);
  if (start.questions !== 400 || start.uniqueQuestions !== start.questions || start.questionsByLevel.some((count) => count < 95) || start.characters < 10) throw new Error(`Classic knowledge or inhabitant depth is incomplete: ${JSON.stringify(start)}`);
  if (start.visibleExits < 1 || start.openExits !== 0 || start.lockedExits !== start.visibleExits) throw new Error("Every uncleared starting passage must carry a knowledge seal");
  if (start.routeGridCells !== 64 || start.revealedRouteCells !== 0) throw new Error("The route board must begin blank except for the current-room marker");

  peer = new WebSocket("ws://localhost:4173/multiplayer");
  await new Promise((resolve, reject) => { peer.once("open", resolve); peer.once("error", reject); });
  peer.send(JSON.stringify({ type: "join", room: `classic-${keepName}`, name: "Visiting Antiquarian", color: "#78a8a2" }));
  peer.send(JSON.stringify({ type: "state", x: start.currentRoom % 8 + .5, y: Math.floor(start.currentRoom / 8) + .5, angle: 0, score: 640 }));
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
  await evaluate("window.__wikimazeClassicTest.answerWrong()");
  await delay(1350);
  const replacementQuestion = String(await evaluate("window.__wikimazeClassicDebug().activeQuestion"));
  if (!replacementQuestion || replacementQuestion === questionBeforeFailure || Number(await evaluate("window.__wikimazeClassicDebug().questionAttempts")) < 1 || Number(await evaluate("window.__wikimazeClassicDebug().recentQuestions")) < sampledQuestions.length + 1) throw new Error("A failed seal did not replace and remember its question");
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

  const sealed = await evaluate("window.__wikimazeClassicTest.openLockedChallenge()");
  if (!sealed || !await evaluate("!document.querySelector('#challenge-dialog').hidden && document.querySelectorAll('#question-answers button').length === 4")) throw new Error("A question-sealed passage did not open a full challenge");
  const questionScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(new URL("../artifacts/classic-question.png", import.meta.url), Buffer.from(questionScreenshot.data, "base64"));
  const scoreBeforeAnswer = Number(await evaluate("window.__wikimazeClassicDebug().score"));
  await evaluate("window.__wikimazeClassicTest.answerCorrect()");
  await delay(1700);
  const afterAnswer = JSON.parse(await evaluate("JSON.stringify(window.__wikimazeClassicDebug())"));
  if (afterAnswer.score <= scoreBeforeAnswer || afterAnswer.currentRoom !== sealed.next) throw new Error("Correct trivia answer did not award lore and open the sealed passage");

  console.log(`classic=ok rooms=${start.totalRooms} plates=${start.roomPlates} empty-plates=${start.uninhabitedPlates} closeups=${start.closePlates} route-grid=${start.routeGridCells} questions=${start.questions} inhabitants=${start.characters} every-door-sealed=ok failed-question-replaced=ok click-through=ok return=ok hidden-route=ok empty-object-room=ok object-push=ok wikipedia=ok character-closeup=ok dialogue-irritation=ok sealed-trivia=ok multiplayer-room-presence=ok`);
} finally {
  peer?.close(); socket?.close(); browser.kill();
  await new Promise((resolve) => { browser.once("exit", resolve); setTimeout(resolve, 1000); });
  await rm(profile, { recursive: true, force: true, maxRetries: 3 }).catch(() => {});
}
