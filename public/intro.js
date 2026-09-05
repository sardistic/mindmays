const menuList = document.querySelector("#main-menu");
const statusLine = document.querySelector("#menu-status");
const panel = document.querySelector("#panel");
const panelTitle = document.querySelector("#panel-title");
const panelBody = document.querySelector("#panel-body");
const panelFooter = document.querySelector("#panel-footer");
const noticeWindow = document.querySelector("#notice-window");
const noticeText = document.querySelector("#notice-text");

const CLASSIC_ROOMS = 100;
const LORE_GOAL = 20000;
const RANKS = [[0, "Page of the Outer Ward"], [1500, "Squire of the Archive"], [5000, "Knight of the Written Word"], [11000, "Master Scholar"], [LORE_GOAL, "Keeper of the Unwritten Keep"]];

function readNumber(key) { return Number(localStorage.getItem(key)) || 0; }
function readList(key) { try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } }
function record() {
  const visited = readList("wikimaze-classic-visited");
  return { score: readNumber("wikimaze-score"), chambers: Math.max(1, visited.length), seals: readNumber("wikimaze-classic-solved"), articles: readList("wikimaze-classic-articles"), flames: localStorage.getItem("wikimaze-classic-flames") === null ? 5 : readNumber("wikimaze-classic-flames"), floor: readNumber("wikimaze-floor") || 1, started: visited.length > 1 || readNumber("wikimaze-score") > 0 };
}
function rankOf(score) { return RANKS.filter(([threshold]) => score >= threshold).pop()[1]; }
function scholarSettings() { try { return JSON.parse(localStorage.getItem("wikimaze-settings") || "{}"); } catch { return {}; } }

const MENU = [
  { id: "quest", key: "B", go: "/classic.html", label: () => (record().started ? "Continue the Quest" : "Begin the Quest"), accel: () => (record().started ? "C" : "B"), note: () => (record().started ? `Chamber ${record().chambers} of ${CLASSIC_ROOMS}` : "Classic 2D"), status: () => (record().started ? `Return to the fixed-view keep with ${record().chambers} of ${CLASSIC_ROOMS} chambers found and ${record().flames} matches remaining.` : "Enter the classic fixed-view keep: one hundred painted chambers, doors sealed by knowledge, and five cartographer's matches.") },
  { id: "new", key: "N", label: () => "New Quest", note: () => "Clears the record", status: () => "Clear route memory, opened seals, discoveries, and score, then start again at Chamber 1." },
  { id: "walk", key: "W", go: "/walk.html", label: () => "Walk the Keep", note: () => "First person 3D", status: () => "Move freely through the three-dimensional castle with the keyboard, or with the touch pad on a phone." },
  { id: "sudden", key: "D", go: "/sudden.html", label: () => "Sudden Death", note: () => "Ten seals, one life", status: () => "Ten typed answers descending from familiar knowledge into specialist terms. One mistake closes the corridor." },
  { id: "scholar", key: "S", label: () => "Choose Your Scholar", note: () => scholarSettings().name || "Unnamed", status: () => "Set the name, marker colour, and shared keep that other competitors will see." },
  { id: "help", key: "H", label: () => "How to Play", note: () => "Instructions", status: () => "Doors, knowledge seals, matches, areas of interest, and the four levels of difficulty." },
  { id: "fame", key: "F", label: () => "Hall of Fame", note: () => `${record().score.toLocaleString()} lore`, status: () => "Your recovered lore, chambers found, seals answered, and the articles you have opened." },
  { id: "about", key: "A", label: () => "About WikiMaze", note: () => "Credits", status: () => "Credits, the encyclopedia behind every question, and what this keep is not." },
];

let selected = 0;

function underlined(label, key) {
  const letter = key.toLowerCase();
  const words = [...label.matchAll(/\S+/g)].find((match) => match[0][0].toLowerCase() === letter);
  const index = words ? words.index : label.toLowerCase().indexOf(letter);
  const fragment = document.createElement("b");
  if (index < 0) { fragment.textContent = label; return fragment; }
  fragment.append(label.slice(0, index), Object.assign(document.createElement("u"), { textContent: label[index] }), label.slice(index + 1));
  return fragment;
}
function renderMenu() {
  menuList.replaceChildren(...MENU.map((item, index) => {
    const button = Object.assign(document.createElement("button"), { className: "menu-option", type: "button" });
    button.dataset.option = item.id;
    button.append(underlined(item.label(), (item.accel || (() => item.key))()), Object.assign(document.createElement("em"), { textContent: item.note() }));
    button.addEventListener("click", () => { select(index); activate(index); });
    button.addEventListener("mouseenter", () => select(index));
    button.setAttribute("role", "menuitem");
    const row = document.createElement("li");
    row.setAttribute("role", "none");
    row.append(button);
    return row;
  }));
  select(selected, true);
}
function select(index, silent = false) {
  selected = (index + MENU.length) % MENU.length;
  menuList.querySelectorAll(".menu-option").forEach((button, position) => button.classList.toggle("selected", position === selected));
  statusLine.textContent = MENU[selected].status();
  if (!silent) playCue("move");
}
function activate(index) {
  const item = MENU[index];
  playCue("select");
  if (item.go) { openMode(item.go); return; }
  if (item.id === "new") { askNewQuest(); return; }
  if (item.id === "scholar") openScholar();
  if (item.id === "help") openHelp();
  if (item.id === "fame") openFame();
  if (item.id === "about") openAbout();
}
function openMode(destination) {
  statusLine.textContent = "Opening…";
  setTimeout(() => { location.href = destination; }, ambienceOn ? 260 : 0);
}

function showPanel(title, build, actions = []) {
  panelTitle.textContent = title;
  panelBody.replaceChildren(...build());
  panelFooter.replaceChildren(...actions.map((action) => {
    const button = Object.assign(document.createElement("button"), { type: "button", textContent: action.label });
    button.addEventListener("click", action.run);
    return button;
  }), Object.assign(document.createElement("button"), { type: "button", textContent: "Close", onclick: closePanel }));
  panel.hidden = false;
  panel.querySelector("button, input")?.focus();
}
function closePanel() { panel.hidden = true; menuList.querySelectorAll(".menu-option")[selected]?.focus(); }
function element(tag, text) { return Object.assign(document.createElement(tag), text === undefined ? {} : { textContent: text }); }
function paragraph(text) { return element("p", text); }
function list(items) { const node = element("ul"); node.append(...items.map((text) => element("li", text))); return node; }

function openScholar() {
  const saved = scholarSettings();
  showPanel("Competitors", () => {
    const form = element("form");
    form.id = "scholar-form";
    const name = Object.assign(document.createElement("input"), { id: "player-name", maxLength: 20, value: saved.name || `Scholar ${Math.floor(Math.random() * 90 + 10)}` });
    const keep = Object.assign(document.createElement("input"), { id: "shared-keep", maxLength: 40, value: saved.room || "great-hall" });
    const colour = Object.assign(document.createElement("input"), { id: "player-color", type: "color", value: saved.color || "#e9b95c" });
    for (const [caption, field] of [["Scholar name", name], ["Shared keep", keep], ["Marker colour", colour]]) { const label = element("label"); label.append(caption, field); form.append(label); }
    form.addEventListener("submit", (event) => { event.preventDefault(); saveScholar(); });
    const note = element("p", "Competitors who enter the same keep name appear inside the same chambers, and every seal one of you opens stays open for the others.");
    note.className = "fine-print";
    return [element("h3", "Choose your identity"), form, note];
  }, [{ label: "Save", run: saveScholar }]);
}
function saveScholar() {
  const settings = { name: document.querySelector("#player-name").value.trim() || "Scholar", room: document.querySelector("#shared-keep").value.trim() || "great-hall", color: document.querySelector("#player-color").value || "#e9b95c" };
  localStorage.setItem("wikimaze-settings", JSON.stringify(settings));
  playCue("select");
  statusLine.textContent = `Saved. ${settings.name} will enter the keep “${settings.room}”.`;
  closePanel();
  renderMenu();
}
function openHelp() {
  showPanel("How to Play", () => [
    element("h3", "The keep is opened with what you know"),
    paragraph("Every door in the classic keep carries a knowledge seal. Answer the question behind it and the door opens for good; answer wrongly and one of your five matches goes out while a different question takes its place. Lose the fifth match and the whole quest resets at Chamber 1."),
    element("h4", "Moving"),
    list(["Click a painted door, or press ← and →, to walk into the next chamber.", "Turn Around and Previous Room retrace your steps without spending anything.", "Press M, or click a match, to burn one and reveal the route you have already walked."]),
    element("h4", "Looking"),
    list(["Speak to a chamber's inhabitant for a close encounter. Ask the same thing too often and they will let you know.", "Examine the objects in a room to open the article behind them.", "Search Wikipedia from inside any seal — researching is not cheating here."]),
    element("h4", "Choosing the questions"),
    list(["Twelve areas of interest narrow the subject matter, from History to Language.", "Four levels raise both the difficulty and the lore each seal is worth.", "448 questions are in rotation, and the last 160 you were asked are held back."]),
  ]);
}
function openFame() {
  const state = record();
  showPanel("WikiMaze Score Card", () => {
    const definitions = element("dl");
    for (const [caption, value] of [["Lore recovered", `${state.score.toLocaleString()} / ${LORE_GOAL.toLocaleString()}`], ["Chambers found", `${state.chambers} / ${CLASSIC_ROOMS}`], ["Seals answered", String(state.seals)], ["Articles opened", String(state.articles.length)], ["Matches remaining", `${state.flames} / 5`], ["Castle floor reached", String(state.floor)]]) {
      const row = element("div");
      row.append(element("dt", caption), element("dd", value));
      definitions.append(row);
    }
    const rank = element("p", rankOf(state.score));
    rank.className = "record-rank";
    const recent = state.articles.slice(-6).reverse();
    return [element("h3", scholarSettings().name || "Scholar"), definitions, rank, element("h4", "Latest articles opened"), recent.length ? list(recent) : paragraph("No article has been opened yet.")];
  });
}
function openAbout() {
  showPanel("About WikiMaze", () => [
    element("h3", "WikiMaze · The Unwritten Keep"),
    paragraph("A browser knowledge maze in the spirit of the encyclopedia adventure games that shipped on CD-ROM in the 1990s: a fixed-view castle, painted doors, inhabitants who remember you, and questions that send you to a real article."),
    element("h4", "Where the questions come from"),
    paragraph("Every one of the 458 prompts across Classic and Sudden Death cites a Wikipedia article, and an audit re-reads those articles to confirm each answer is still supported by the current text."),
    element("h4", "What this is not"),
    paragraph("No Encarta names, artwork, maps, text, or other protected material is used. The rooms, inhabitants, music, and questions are original to this project."),
    element("h4", "Credits"),
    list(["Rooms, inhabitants, and interface: original period-styled 640×480 plates", "Sound: procedural Web Audio, no sampled assets", "Knowledge: Wikipedia and its contributors, CC BY-SA"]),
  ]);
}

let noticeConfirm = null;
function askNewQuest() {
  noticeText.textContent = "Begin a new quest? Route memory, opened seals, discoveries, and your score will be cleared.";
  noticeConfirm = () => openMode("/classic.html?new=1");
  noticeWindow.hidden = false;
  document.querySelector("#notice-ok").focus();
}
function closeNotice() { noticeWindow.hidden = true; noticeConfirm = null; menuList.querySelectorAll(".menu-option")[selected]?.focus(); }

let audioContext = null;
let audioMasterGain = null;
let ambienceGain = null;
let ambienceTextureTimer = 0;
let soundCueCount = 0;
let ambienceOn = localStorage.getItem("wikimaze-classic-sound") === "on";

function updateSoundButton(label) {
  const button = document.querySelector("#ambience-button");
  button.textContent = label || (ambienceOn ? "♫ Sound On" : "♫ Sound Off");
  button.setAttribute("aria-pressed", String(ambienceOn));
  button.title = ambienceOn ? "Sound is on. Click to mute the menu." : "Sound is off. Click to enable the menu ambience.";
}
async function ensureAudio() {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return false;
  let created = false;
  if (!audioContext) {
    created = true;
    audioContext = new Context();
    audioMasterGain = audioContext.createGain();
    audioMasterGain.gain.value = .9;
    const compressor = audioContext.createDynamicsCompressor();
    audioMasterGain.connect(compressor).connect(audioContext.destination);
    ambienceGain = audioContext.createGain();
    ambienceGain.gain.value = .0001;
    ambienceGain.connect(audioMasterGain);
    for (const [frequency, volume, type] of [[54, .05, "sine"], [81, .028, "triangle"], [108, .018, "sine"]]) {
      const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
      oscillator.frequency.value = frequency; oscillator.type = type; gain.gain.value = volume;
      oscillator.connect(gain).connect(ambienceGain); oscillator.start();
    }
    const noiseLength = audioContext.sampleRate * 4, noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate), noiseData = noiseBuffer.getChannelData(0);
    let brown = 0;
    for (let index = 0; index < noiseLength; index++) { brown = brown * .988 + (Math.random() * 2 - 1) * .012; noiseData[index] = brown; }
    const air = audioContext.createBufferSource(), airFilter = audioContext.createBiquadFilter(), airGain = audioContext.createGain();
    air.buffer = noiseBuffer; air.loop = true; airFilter.type = "bandpass"; airFilter.frequency.value = 215; airFilter.Q.value = .6; airGain.gain.value = .3;
    air.connect(airFilter).connect(airGain).connect(ambienceGain); air.start();
  }
  try { if (audioContext.state !== "running") await audioContext.resume(); } catch { return false; }
  if (created && ambienceOn && audioContext.state === "running") { ambienceGain.gain.setTargetAtTime(.07, audioContext.currentTime, .4); scheduleAmbienceTexture(); }
  return audioContext.state === "running";
}
async function playCue(name) {
  if (!ambienceOn || !await ensureAudio()) return false;
  soundCueCount += 1;
  const patterns = {
    enable: [[392, 0, .2, .13, "sine"], [494, .16, .22, .12, "sine"], [587, .33, .3, .11, "sine"], [784, .5, .5, .1, "sine"]],
    move: [[622, 0, .06, .055, "square"], [784, .04, .08, .04, "sine"]],
    select: [[330, 0, .12, .1, "sine"], [494, .09, .16, .09, "sine"], [659, .19, .26, .085, "sine"]],
    farBell: [[392, 0, 1.4, .03, "sine"], [196, .08, 1.8, .025, "sine"]],
    timber: [[72, 0, .52, .05, "sawtooth"], [68, .28, .7, .035, "triangle"]],
    room: [[110, 0, .45, .035, "sine"], [103, .12, .58, .028, "triangle"]],
  };
  const now = audioContext.currentTime;
  for (const [frequency, offset, duration, volume, type] of patterns[name] || []) {
    const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(), start = now + offset;
    oscillator.frequency.setValueAtTime(frequency, start); oscillator.type = type;
    gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .018); gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain).connect(audioMasterGain); oscillator.start(start); oscillator.stop(start + duration + .04);
  }
  return true;
}
function scheduleAmbienceTexture() {
  clearTimeout(ambienceTextureTimer);
  if (!ambienceOn) return;
  ambienceTextureTimer = setTimeout(async () => { const roll = Math.floor(Math.random() * 5); await playCue(roll === 0 ? "farBell" : roll < 3 ? "timber" : "room"); scheduleAmbienceTexture(); }, 7000 + Math.floor(Math.random() * 7000));
}
async function toggleAmbience() {
  if (ambienceOn) {
    ambienceOn = false; localStorage.setItem("wikimaze-classic-sound", "off"); clearTimeout(ambienceTextureTimer);
    if (ambienceGain && audioContext) ambienceGain.gain.setTargetAtTime(.0001, audioContext.currentTime, .18);
    updateSoundButton(); statusLine.textContent = "Sound muted."; return;
  }
  ambienceOn = true;
  if (!await ensureAudio()) {
    ambienceOn = false; localStorage.setItem("wikimaze-classic-sound", "off"); updateSoundButton("♫ Sound Blocked");
    statusLine.textContent = "The browser blocked audio. Check site permissions, then press Sound again."; return;
  }
  localStorage.setItem("wikimaze-classic-sound", "on");
  ambienceGain.gain.setTargetAtTime(.07, audioContext.currentTime, .4);
  updateSoundButton(); statusLine.textContent = "Sound on. The keep is listening.";
  await playCue("enable"); scheduleAmbienceTexture();
}

document.querySelector("#ambience-button").addEventListener("click", toggleAmbience);
document.querySelectorAll("[data-close-panel]").forEach((button) => button.addEventListener("click", closePanel));
document.querySelector("#notice-cancel").addEventListener("click", closeNotice);
document.querySelector("#notice-ok").addEventListener("click", () => { const run = noticeConfirm; closeNotice(); run?.(); });
document.querySelectorAll("[data-menu-key]").forEach((button) => button.addEventListener("click", () => {
  const index = MENU.findIndex((item) => item.key === button.dataset.menuKey);
  if (index < 0) return;
  select(index);
  if (button.dataset.menuKey !== "B") activate(index);
}));

addEventListener("keydown", (event) => {
  if (!noticeWindow.hidden) {
    if (event.key === "Escape") { event.preventDefault(); closeNotice(); }
    return;
  }
  if (!panel.hidden) {
    if (event.key === "Escape") { event.preventDefault(); closePanel(); }
    return;
  }
  if (event.key === "ArrowDown") { event.preventDefault(); select(selected + 1); return; }
  if (event.key === "ArrowUp") { event.preventDefault(); select(selected - 1); return; }
  if (event.key === "Home") { event.preventDefault(); select(0); return; }
  if (event.key === "End") { event.preventDefault(); select(MENU.length - 1); return; }
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(selected); return; }
  if (event.key.length !== 1) return;
  const typed = event.key.toLowerCase();
  const index = MENU.findIndex((item) => [(item.accel || (() => item.key))(), item.key].some((letter) => letter.toLowerCase() === typed));
  if (index < 0) return;
  event.preventDefault(); select(index); activate(index);
});

renderMenu();
updateSoundButton();
window.__wikimazeIntroDebug = () => ({
  options: MENU.length,
  labels: [...menuList.querySelectorAll(".menu-option")].map((button) => button.textContent),
  accelerators: MENU.map((item) => (item.accel || (() => item.key))()),
  destinations: MENU.filter((item) => item.go).map((item) => item.go),
  selected,
  selectedLabel: menuList.querySelectorAll(".menu-option")[selected]?.textContent || "",
  status: statusLine.textContent,
  panelOpen: !panel.hidden,
  panelTitle: panelTitle.textContent,
  panelText: panel.hidden ? "" : panelBody.textContent,
  noticeOpen: !noticeWindow.hidden,
  plateLoaded: document.querySelector(".stage-plate")?.complete === true && document.querySelector(".stage-plate").naturalWidth > 0,
  titleText: document.querySelector(".title-lockup h1").textContent,
  started: record().started,
  soundEnabled: ambienceOn,
  audioState: audioContext?.state || "uninitialized",
  audioMasterLevel: audioMasterGain?.gain.value || 0,
  ambienceLevel: ambienceGain?.gain.value || 0,
  soundCues: soundCueCount,
  scholar: scholarSettings().name || "",
});
