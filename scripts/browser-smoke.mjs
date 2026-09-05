import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import WebSocket from "ws";

const browserExecutable = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const debugPort = 9334;
const showcase = process.argv[2] || "nursery";
const profile = await mkdtemp(join(tmpdir(), "wikimaze-smoke-"));
const browser = spawn(browserExecutable, [
  "--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`,
  `http://localhost:4173/walk.html?debug=1&showcase=${encodeURIComponent(showcase)}`,
], { stdio: "ignore", windowsHide: true });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let peerSocket;
try {
  let page;
  for (let attempt = 0; attempt < 30; attempt++) {
    await delay(100);
    const pages = await fetch(`http://localhost:${debugPort}/json`).then((response) => response.json()).catch(() => []);
    page = pages.find((item) => item.type === "page" && item.url.includes("localhost:4173"));
    if (page) break;
  }
  if (!page) throw new Error("Could not attach to the browser page");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.once("open", resolve); socket.once("error", reject); });
  let nextId = 0;
  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    const onMessage = (raw) => { const message = JSON.parse(raw); if (message.id !== id) return; socket.off("message", onMessage); message.error ? reject(new Error(message.error.message)) : resolve(message.result); };
    socket.on("message", onMessage); socket.send(JSON.stringify({ id, method, params }));
  });
  await delay(900);
  await command("Runtime.evaluate", { expression: "document.querySelector('dialog[open]')?.close(); localStorage.setItem('wikimaze-introduced','yes')" });
  if (showcase === "multiplayer") {
    const position = await command("Runtime.evaluate", { expression: "JSON.stringify(window.__wikimazeDebug())", returnByValue: true });
    const local = JSON.parse(position.result.value);
    peerSocket = new WebSocket("ws://localhost:4173/multiplayer");
    await new Promise((resolve, reject) => { peerSocket.once("open", resolve); peerSocket.once("error", reject); });
    peerSocket.send(JSON.stringify({ type: "join", room: "great-hall", name: "Illustrated Scholar", color: "#79a9b3" }));
    peerSocket.send(JSON.stringify({ type: "state", x: local.x + Math.cos(local.angle) * 1.5, y: local.y + Math.sin(local.angle) * 1.5, angle: local.angle + Math.PI, score: 384 }));
    await delay(450);
  }
  const screenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  const screenshotName = showcase === "nursery" ? "dynamic-room.png" : `dynamic-${showcase}.png`;
  await writeFile(new URL(`../artifacts/${screenshotName}`, import.meta.url), Buffer.from(screenshot.data, "base64"));
  const before = await command("Runtime.evaluate", { expression: "JSON.stringify(window.__wikimazeDebug())", returnByValue: true });
  await command("Input.dispatchKeyEvent", { type: "keyDown", key: "w", code: "KeyW", windowsVirtualKeyCode: 87 });
  await delay(650);
  await command("Input.dispatchKeyEvent", { type: "keyUp", key: "w", code: "KeyW", windowsVirtualKeyCode: 87 });
  const after = await command("Runtime.evaluate", { expression: "JSON.stringify(window.__wikimazeDebug())", returnByValue: true });
  const start = JSON.parse(before.result.value), end = JSON.parse(after.result.value);
  if (start.inhabitants < 5) throw new Error(`Expected at least five in-world inhabitants, found ${start.inhabitants}`);
  if (start.characterImagesLoaded < 6) throw new Error(`Expected six character images, loaded ${start.characterImagesLoaded}`);
  if (start.propImagesLoaded < 7) throw new Error(`Expected seven generated prop images, loaded ${start.propImagesLoaded}`);
  if (start.wallArtLoaded < 7) throw new Error(`Expected seven illustrated wall artworks, loaded ${start.wallArtLoaded}`);
  if (start.texturesLoaded < 10) throw new Error(`Expected all themed wall textures to load, found ${start.texturesLoaded}`);
  if (start.roomThemes < 10) throw new Error(`Expected ten room identities, found ${start.roomThemes}`);
  if (start.assetKinds.length < 7) throw new Error(`Expected all seven prop families in the keep, found ${start.assetKinds.join(", ")}`);
  if (start.generatedProps < 8) throw new Error(`Expected generated props throughout the keep, found ${start.generatedProps}`);
  if (start.dynamicPassages < 2) throw new Error(`Expected optional shifting passages, found ${start.dynamicPassages}`);
  if (start.logicalRooms !== 100 || start.mapSize !== 61) throw new Error(`Expected 100 chambers on a 61-cell plan, found ${start.logicalRooms} on ${start.mapSize}`);
  if (start.furnishings < 25) throw new Error(`Expected a furnished keep, found only ${start.furnishings} decorative objects`);
  if (showcase === "multiplayer" && start.remotePlayerCount < 1) throw new Error("Expected the illustrated remote scholar to be present");
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  if (distance < .35) throw new Error(`Forward movement failed (${distance.toFixed(3)} cells)`);
  const expectedInteraction = showcase === "wall-art" ? "painting" : "asset";
  if (showcase !== "multiplayer" && end.nearby !== expectedInteraction) throw new Error(`Expected the ${expectedInteraction} to become examinable, found ${end.nearby || "no interaction"}`);
  if (showcase === "wall-art") {
    await command("Input.dispatchKeyEvent", { type: "keyDown", key: "e", code: "KeyE", windowsVirtualKeyCode: 69 });
    await command("Input.dispatchKeyEvent", { type: "keyUp", key: "e", code: "KeyE", windowsVirtualKeyCode: 69 });
    await delay(350);
    const article = await command("Runtime.evaluate", { expression: "JSON.stringify({ open: document.querySelector('#painting-dialog').open, title: document.querySelector('#article-title').textContent })", returnByValue: true });
    const articleState = JSON.parse(article.result.value);
    if (!articleState.open || !articleState.title) throw new Error("Illustrated wall artwork did not open its Wikipedia entry");
    await command("Runtime.evaluate", { expression: "document.querySelector('#painting-dialog').close()" });
  }
  await command("Input.dispatchKeyEvent", { type: "keyDown", key: "s", code: "KeyS", windowsVirtualKeyCode: 83 });
  await delay(420);
  await command("Input.dispatchKeyEvent", { type: "keyUp", key: "s", code: "KeyS", windowsVirtualKeyCode: 83 });
  const backed = await command("Runtime.evaluate", { expression: "JSON.stringify(window.__wikimazeDebug())", returnByValue: true });
  const backPosition = JSON.parse(backed.result.value);
  const backDistance = Math.hypot(backPosition.x - end.x, backPosition.y - end.y);
  if (backDistance < .25) throw new Error(`Backward movement failed (${backDistance.toFixed(3)} cells)`);
  await command("Runtime.evaluate", { expression: "document.querySelector('#torch-button').click()" });
  const map = await command("Runtime.evaluate", { expression: "JSON.stringify(window.__wikimazeDebug())", returnByValue: true });
  if (!JSON.parse(map.result.value).mapVisible) throw new Error("Route reveal failed");
  console.log(`browser=ok forward=${distance.toFixed(2)} backward=${backDistance.toFixed(2)} rooms=${start.logicalRooms} themes=${start.roomThemes} furnishings=${start.furnishings} generated-props=${start.generatedProps} prop-families=${start.assetKinds.length} textures=${start.texturesLoaded} shifting-passages=${start.dynamicPassages} inhabitants=${start.inhabitants} portraits=${start.characterImagesLoaded} map=hidden-by-default reveal=ok`);
} finally {
  peerSocket?.close();
  socket?.close();
  browser.kill();
  await new Promise((resolve) => { browser.once("exit", resolve); setTimeout(resolve, 1000); });
  await rm(profile, { recursive: true, force: true, maxRetries: 3 }).catch(() => {});
}
