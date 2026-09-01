const canvas = document.querySelector("#viewport");
const ctx = canvas.getContext("2d", { alpha: false });
const mapCanvas = document.querySelector("#minimap");
const mapCtx = mapCanvas.getContext("2d");

const QUESTIONS = [
  { category: "History", difficulty: 1, source: "Rosetta Stone", prompt: "Which three scripts appear on the Rosetta Stone?", answers: ["Greek, Demotic, and Egyptian hieroglyphs", "Latin, Greek, and Phoenician", "Cuneiform, Aramaic, and Greek", "Hieroglyphs, Latin, and Coptic"], correct: 0, explanation: "The decree is written in Ancient Greek, Demotic Egyptian, and Egyptian hieroglyphs, making the stone central to decipherment." },
  { category: "Life Science", difficulty: 1, source: "Tardigrade", prompt: "A tardigrade survives severe environmental stress by entering which suspended state?", answers: ["Diapause", "Cryptobiosis", "Hibernation", "Estivation"], correct: 1, explanation: "In cryptobiosis, metabolic activity falls to an almost undetectable level until conditions improve." },
  { category: "Geography", difficulty: 1, source: "Continental divide", prompt: "What does a continental divide separate?", answers: ["Tectonic plates", "Countries with different climates", "Drainage basins flowing toward different seas", "Continents joined by land bridges"], correct: 2, explanation: "A drainage divide directs precipitation into river systems that ultimately empty into different seas or oceans." },
  { category: "Arts", difficulty: 1, source: "Fresco", prompt: "In true fresco painting, pigment is applied to what surface?", answers: ["Dry wooden panels", "Wet lime plaster", "Wax-coated canvas", "Polished marble"], correct: 1, explanation: "Buon fresco uses water-mixed pigment on fresh, wet lime plaster; the color binds as the plaster cures." },
  { category: "Astronomy", difficulty: 1, source: "Phases of Venus", prompt: "Galileo’s observation of the full set of Venusian phases strongly contradicted which model?", answers: ["A geocentric model in which Venus always orbits between Earth and the Sun", "The existence of elliptical orbits", "The rotation of Earth", "The idea that sunlight reflects from planets"], correct: 0, explanation: "Venus appearing nearly full requires it to pass beyond the Sun, which the standard Ptolemaic arrangement did not allow." },
  { category: "Technology", difficulty: 1, source: "World Wide Web", prompt: "Which trio formed the original technical foundation of the World Wide Web?", answers: ["HTML, HTTP, and URLs", "TCP, Java, and DNS", "C, FTP, and Ethernet", "XML, SMTP, and IP"], correct: 0, explanation: "Tim Berners-Lee’s early Web combined HTML documents, HTTP transfer, and URL/URI identifiers." },

  { category: "History", difficulty: 2, source: "Treaty of Tordesillas", prompt: "The 1494 Treaty of Tordesillas divided newly encountered lands primarily between which kingdoms?", answers: ["France and England", "Spain and Portugal", "Venice and Genoa", "Castile and Aragon"], correct: 1, explanation: "Spain and Portugal agreed to divide lands outside Europe along a meridian west of the Cape Verde islands." },
  { category: "Life Science", difficulty: 2, source: "Endosymbiont", prompt: "Which evidence most directly supports the endosymbiotic origin of mitochondria?", answers: ["They are found only in animal cells", "They contain circular DNA and bacterial-like ribosomes", "They are assembled by the Golgi apparatus", "They share a membrane with the nucleus"], correct: 1, explanation: "Mitochondria retain their own circular genomes, divide in a bacteria-like manner, and contain bacterial-type ribosomes." },
  { category: "Physics", difficulty: 2, source: "Foucault pendulum", prompt: "A Foucault pendulum provides a direct, visible demonstration of what?", answers: ["Earth’s rotation", "Earth’s orbit around the Sun", "The speed of sound", "Gravitational time dilation"], correct: 0, explanation: "The pendulum’s swing plane remains nearly fixed in inertial space while Earth rotates beneath it." },
  { category: "Literature", difficulty: 2, source: "Frame story", prompt: "Which work uses a pilgrimage to Canterbury as the frame for a collection of tales?", answers: ["The Decameron", "The Canterbury Tales", "The Divine Comedy", "Le Morte d’Arthur"], correct: 1, explanation: "Geoffrey Chaucer’s pilgrims tell stories while traveling to the shrine of Thomas Becket at Canterbury." },
  { category: "Geography", difficulty: 2, source: "Salar de Uyuni", prompt: "Salar de Uyuni, the world’s largest salt flat, lies in which country?", answers: ["Chile", "Argentina", "Bolivia", "Peru"], correct: 2, explanation: "The salar occupies part of Bolivia’s Altiplano and formed from prehistoric lakes." },
  { category: "Music", difficulty: 2, source: "Well temperament", prompt: "What did well temperament make practical for keyboard instruments?", answers: ["Playing only in unison", "Playing in all major and minor keys without retuning", "Producing notes without strings", "Keeping absolute pitch through temperature changes"], correct: 1, explanation: "Well-tempered tuning distributed discrepancies so all keys were usable, though they could retain distinct characters." },

  { category: "History", difficulty: 3, source: "Haitian Revolution", prompt: "Why was the Haitian Revolution historically unprecedented?", answers: ["It was the first conflict to use artillery", "It created the first modern state governed by a former king", "It was the only successful large-scale slave uprising to found an independent state", "It ended all European colonies in the Americas"], correct: 2, explanation: "Enslaved people defeated colonial and expeditionary armies, abolished slavery, and established independent Haiti in 1804." },
  { category: "Life Science", difficulty: 3, source: "Horizontal gene transfer", prompt: "Which process allows bacteria to take up free DNA directly from their environment?", answers: ["Conjugation", "Transduction", "Transformation", "Binary fission"], correct: 2, explanation: "Transformation is uptake of extracellular DNA; conjugation uses cell contact, while transduction is mediated by viruses." },
  { category: "Astronomy", difficulty: 3, source: "Chandrasekhar limit", prompt: "What is predicted when a non-rotating white dwarf exceeds the Chandrasekhar limit?", answers: ["It stabilizes as a red giant", "Electron degeneracy pressure can no longer support it", "Hydrogen fusion begins at its surface", "It becomes less dense as mass increases"], correct: 1, explanation: "Above roughly 1.4 solar masses, electron degeneracy pressure cannot maintain a stable white dwarf, enabling collapse or explosion." },
  { category: "Technology", difficulty: 3, source: "Byzantine fault", prompt: "In distributed computing, Byzantine fault tolerance addresses systems where components may do what?", answers: ["Only stop responding", "Fail in arbitrary or contradictory ways", "Run at different clock speeds", "Use incompatible programming languages"], correct: 1, explanation: "A Byzantine component can send inconsistent or malicious information, so consensus must tolerate more than simple crashes." },
  { category: "Arts", difficulty: 3, source: "Lost-wax casting", prompt: "In lost-wax casting, what happens to the original wax model?", answers: ["It becomes the metal object’s core", "It melts out of the mold before molten metal is poured", "It is pressed onto the finished metal", "It chemically transforms into ceramic"], correct: 1, explanation: "Heating removes the wax from an investment mold, leaving a cavity into which molten metal is cast." },
  { category: "Geography", difficulty: 3, source: "Endorheic basin", prompt: "What distinguishes an endorheic drainage basin?", answers: ["It drains beneath a glacier", "Its water has no outflow to an ocean", "It crosses the equator", "It contains no permanent rivers"], correct: 1, explanation: "Water terminates internally in lakes, swamps, or evaporation rather than reaching the global ocean." },

  { category: "History", difficulty: 4, source: "Peace of Westphalia", prompt: "The Peace of Westphalia ended the Thirty Years’ War and formally recognized the independence of which two republics?", answers: ["Venice and Genoa", "The Dutch Republic and the Swiss Confederacy", "Ragusa and San Marino", "Poland and Lithuania"], correct: 1, explanation: "The 1648 settlements recognized Dutch independence from Spain and the Swiss Confederacy’s independence from the Holy Roman Empire." },
  { category: "Physics", difficulty: 4, source: "Noether's theorem", prompt: "According to Noether’s theorem, conservation of energy follows from which symmetry?", answers: ["Rotational symmetry", "Spatial translation symmetry", "Time translation symmetry", "Gauge symmetry alone"], correct: 2, explanation: "If the laws describing a system do not change over time, the associated conserved quantity is energy." },
  { category: "Life Science", difficulty: 4, source: "Hox gene", prompt: "What is the central developmental role of Hox genes in animals?", answers: ["Setting segment identity along the head-to-tail axis", "Repairing all DNA replication errors", "Producing cellular energy", "Determining only biological sex"], correct: 0, explanation: "Hox transcription factors specify regional identity along the anterior–posterior body axis in many animal lineages." },
  { category: "Language", difficulty: 4, source: "Grammaticalization", prompt: "Which change is an example of grammaticalization?", answers: ["A grammatical ending becoming an independent noun", "A lexical verb gradually becoming an auxiliary marker", "A language borrowing a place name", "A consonant changing due only to neighboring vowels"], correct: 1, explanation: "Grammaticalization turns lexical material into grammatical markers—for example, motion or possession verbs developing auxiliary functions." },
  { category: "Mathematics", difficulty: 4, source: "Gödel's incompleteness theorems", prompt: "Gödel’s first incompleteness theorem applies to consistent formal systems capable of expressing enough arithmetic. What does it establish?", answers: ["Every true statement can be mechanically proved", "Such a system contains statements that are true but unprovable within it", "Arithmetic is inconsistent", "No formal system can contain axioms"], correct: 1, explanation: "Any suitable consistent, effectively axiomatized formal system is incomplete: some statements cannot be proved or disproved inside it." },
  { category: "Astronomy", difficulty: 4, source: "Lagrange point", prompt: "Why can the Sun–Earth L2 region be useful for space observatories?", answers: ["It lies inside Earth’s atmosphere", "The Sun, Earth, and Moon remain in roughly the same direction for shielding and communication", "Gravity is completely absent there", "Objects there never require trajectory corrections"], correct: 1, explanation: "Near L2, major bright bodies remain on one side, aiding stable thermal shielding and communications; halo orbits still require station-keeping." },
];

const PAINTINGS = [
  { title: "Antikythera mechanism", art: "/assets/wall-art/antikythera-mechanism.png" },
  { title: "Great Zimbabwe", art: "/assets/wall-art/great-zimbabwe.png" },
  { title: "Voyager Golden Record", art: "/assets/wall-art/voyager-golden-record.png" },
  { title: "Quipu", art: "/assets/wall-art/quipu.png" },
  { title: "Library of Alexandria", art: "/assets/wall-art/library-of-alexandria.png" },
  { title: "Bioluminescence", art: "/assets/wall-art/bioluminescence.png" },
  { title: "Mansa Musa", art: "/assets/wall-art/mansa-musa.png" },
  { title: "History of the Internet", art: null },
];

const CHARACTER_IMAGES = {
  archivist: loadImage("/assets/characters/archivist-cutout.png"),
  jester: loadImage("/assets/characters/jester-cutout.png"),
  cartographer: loadImage("/assets/characters/cartographer-cutout.png"),
  "bell-widow": loadImage("/assets/characters/bell-widow-cutout.png"),
  "brother-moth": loadImage("/assets/characters/brother-moth-cutout.png"),
  measurer: loadImage("/assets/characters/measurer-cutout.png"),
};
const REMOTE_AVATAR_KEYS = ["archivist", "jester", "cartographer", "bell-widow", "brother-moth", "measurer"];
const REMOTE_AVATAR_IMAGES = Object.fromEntries(REMOTE_AVATAR_KEYS.map((key) => [key, loadImage(`/assets/characters/${key}.png`)]));
const PROP_IMAGES = {
  armor: loadImage("/assets/props/armor.png"),
  orrery: loadImage("/assets/props/orrery.png"),
  cabinet: loadImage("/assets/props/curiosity-cabinet.png"),
  clock: loadImage("/assets/props/astronomical-clock.png"),
  altar: loadImage("/assets/props/chapel-altar.png"),
  vitrine: loadImage("/assets/props/specimen-vitrine.png"),
  rockingHorse: loadImage("/assets/props/covered-rocking-horse.png"),
};

const DIFFICULTY = ["", "I · Wayfarer", "II · Seeker", "III · Scholar", "IV · Sage"];
const ROOM_NAMES = ["The Gatehouse", "Gallery of Echoes", "The Scriptorium", "Hall of Measures", "The Astronomer’s Walk", "Cabinet of Living Forms", "The Broken Cloister", "Vault of Languages", "The King’s Long Gallery", "The Unwritten Stair"];
const ROOM_THEMES = [
  { id: "solar", prop: "armor", floorStyle: "parquet", ceilingStyle: "coffer", names: ["The Amber Solar", "A Retired Audience Room", "The Long Afternoon"], tint: [147, 101, 48], floor: [[117, 91, 58], [62, 48, 35]], rug: [[104, 44, 32], [143, 104, 48]], ceiling: [92, 70, 43] },
  { id: "library", prop: "cabinet", floorStyle: "boards", ceilingStyle: "beams", names: ["The Lower Scriptorium", "Library of Unreturned Books", "The Indexing Room"], tint: [102, 72, 45], floor: [[82, 61, 42], [45, 35, 29]], rug: [[54, 48, 66], [115, 89, 46]], ceiling: [70, 54, 38] },
  { id: "observatory", prop: "orrery", floorStyle: "slate", ceilingStyle: "stars", names: ["The Astronomer’s Parlour", "The Room of Turning Heavens", "The Meridian Chamber"], tint: [55, 78, 100], floor: [[74, 80, 81], [38, 41, 44]], rug: [[38, 48, 70], [117, 91, 51]], ceiling: [56, 62, 69] },
  { id: "herbarium", prop: "vitrine", floorStyle: "stone", ceilingStyle: "panels", names: ["The Dry Garden", "Cabinet of Living Forms", "The Green Physic Room"], tint: [67, 91, 57], floor: [[89, 84, 61], [42, 47, 37]], rug: [[48, 68, 46], [113, 92, 47]], ceiling: [70, 69, 48] },
  { id: "gallery", prop: "armor", floorStyle: "parquet", ceilingStyle: "coffer", names: ["Gallery of Echoes", "The Unfinished Portrait Hall", "The Red Tapestry Room"], tint: [112, 52, 52], floor: [[104, 85, 66], [53, 47, 43]], rug: [[91, 31, 36], [145, 105, 43]], ceiling: [82, 62, 48] },
  { id: "reliquary", prop: "cabinet", floorStyle: "checker", ceilingStyle: "panels", names: ["The Cabinet of Measures", "Hall of Small Wonders", "The Collector’s Antechamber"], tint: [103, 82, 40], floor: [[91, 79, 59], [45, 43, 40]], rug: [[66, 45, 55], [138, 105, 50]], ceiling: [74, 63, 45] },
  { id: "chapel", prop: "altar", floorStyle: "mosaic", ceilingStyle: "vault", names: ["The Chapel of the Missing Saint", "The Votive Room", "An Unconsecrated Apse"], tint: [134, 92, 43], floor: [[118, 101, 73], [53, 48, 42]], rug: [[75, 42, 43], [154, 121, 59]], ceiling: [88, 74, 52] },
  { id: "cartography", prop: "clock", floorStyle: "checker", ceilingStyle: "stars", names: ["The Cartographer’s Workroom", "Atlas Room of Inland Seas", "The Chamber of Disputed Roads"], tint: [44, 80, 83], floor: [[76, 75, 67], [38, 44, 43]], rug: [[45, 62, 70], [130, 94, 43]], ceiling: [48, 64, 66] },
  { id: "specimen", prop: "vitrine", floorStyle: "stone", ceilingStyle: "panels", names: ["The Pinned Wing Cabinet", "The Comparative Anatomy Room", "Museum of Quiet Species"], tint: [81, 94, 50], floor: [[81, 85, 58], [39, 45, 35]], rug: [[56, 68, 42], [116, 92, 45]], ceiling: [59, 66, 45] },
  { id: "nursery", prop: "rockingHorse", floorStyle: "boards", ceilingStyle: "cracked", names: ["The Nursery Without a Door", "The Lessons Room", "The Small Blue Parlour"], tint: [105, 85, 94], floor: [[106, 94, 88], [58, 54, 53]], rug: [[80, 58, 69], [139, 111, 83]], ceiling: [99, 91, 86] },
];
const THEME_WHISPERS = {
  chapel: ["Every candle bends toward the empty recess.", "The wax is warm. Nobody has been here."],
  cartography: ["One red route ends at your present position.", "The coastline changes when you stop measuring it."],
  specimen: ["A pinned wing closes once behind the glass.", "The labels list one specimen more than the cabinet contains."],
  nursery: ["The rocking stops before you enter.", "The wallpaper horses are facing the wall now."],
};
const ASSET_NOTES = {
  armor: ["The armor is warm at the left gauntlet.", "Scratches inside the visor form five tally marks."],
  orrery: ["Seven planets are represented. An eighth orbit has been worn smooth.", "The smallest brass sphere turns against the others."],
  cabinet: ["The inventory card describes an object that is not present.", "One drawer is labeled in your own handwriting."],
  clock: ["The dial repeats thirteen. The pendulum disagrees with the hands.", "It loses one minute whenever you look directly at it."],
  altar: ["The central recess is polished by repeated use.", "All the candles cast one fewer shadow than they should."],
  vitrine: ["The specimen count changes between shelves.", "A pinned moth has folded its wings since you approached."],
  rockingHorse: ["The runners are dusty except for the final inch.", "Beneath the sheet, the smaller shape is not part of the toy."],
};
const ASSET_SCALES = { cabinet: .82, armor: .72, orrery: .68, clock: .86, altar: .72, vitrine: .84, rockingHorse: .64 };
const UNSETTLING_LINES = [
  "Somewhere behind you, a page turns.",
  "The mortar smells briefly of rain.",
  "A bell sounds from one floor below. There is no floor below.",
  "Someone has been counting your footsteps incorrectly.",
  "The torchlight leans toward an unopened door.",
  "For a moment, another set of footsteps matches yours.",
  "You remember this corridor being narrower.",
  "A voice in the wall quietly supplies the wrong answer.",
  "The keep settles around a room you have not entered.",
  "One of the portraits has stopped pretending to be asleep.",
];
const ROOM_GRID = 10;
const ROOM_SPAN = 6;
const ROOM_CENTER = 3;
const MAP_SIZE = ROOM_GRID * ROOM_SPAN + 1;
const FOV = Math.PI / 3;
const player = { x: ROOM_CENTER + .5, y: ROOM_CENTER + .5, angle: 0, score: Number(localStorage.getItem("wikimaze-score")) || 0 };
const game = { floor: Number(localStorage.getItem("wikimaze-floor")) || 1, torches: Number(localStorage.getItem("wikimaze-torches")) || 5, mapUntil: 0, won: false, apparition: null, nextUnease: performance.now() + 24000, nextShift: performance.now() + 18000, compassUntil: 0 };
const keys = new Set();
const remotePlayers = new Map();
const textures = createTextures();
let maze;
let route;
let doors = [];
let dynamicPassages = [];
let worldObjects = [];
let interaction = null;
let activeChallenge = null;
let socket;
let playerId;
let lastFrame = performance.now();
let lastNetworkUpdate = 0;
let toastTimer;
let whisperTimer;
let lastCell = `${ROOM_CENTER},${ROOM_CENTER}`;
let visitedCells = new Map([[lastCell, 1]]);
let lastRoomKey = "0,0";
let visitedRooms = new Set([lastRoomKey]);
let audioContext;
let ambienceGain;
let ambienceEnabled = false;

function loadImage(src) {
  const image = new Image();
  if (/^https?:/i.test(src)) image.crossOrigin = "anonymous";
  image.src = src;
  return image;
}

PAINTINGS.forEach((painting) => { if (painting.art) painting.image = loadImage(painting.art); });

async function hydrateWikipediaWallArt() {
  for (const painting of PAINTINGS.filter((item) => !item.image)) {
    try {
      const response = await fetch(`/api/wiki?title=${encodeURIComponent(painting.title)}`);
      const article = await response.json();
      if (article.thumbnail) painting.image = loadImage(article.thumbnail);
    } catch {
      // The carved frame still renders if Wikipedia image delivery is temporarily unavailable.
    }
  }
}

function loadTexture(src) {
  const texture = document.createElement("canvas"); texture.width = texture.height = 256; texture.ready = false;
  const image = new Image();
  image.addEventListener("load", () => { texture.getContext("2d").drawImage(image, 0, 0, texture.width, texture.height); texture.ready = true; });
  image.src = src;
  return texture;
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stableStringHash(value) {
  let hash = 2166136261;
  for (const character of String(value || "Scholar")) { hash ^= character.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return hash >>> 0;
}

function generateMaze(seed) {
  const random = seededRandom(seed);
  dynamicPassages = [];
  const grid = Array.from({ length: MAP_SIZE }, () => Array(MAP_SIZE).fill("1"));
  for (let roomY = 0; roomY < ROOM_GRID; roomY++) {
    for (let roomX = 0; roomX < ROOM_GRID; roomX++) {
      const baseX = roomX * ROOM_SPAN, baseY = roomY * ROOM_SPAN;
      for (let y = baseY + 1; y < baseY + ROOM_SPAN; y++) {
        for (let x = baseX + 1; x < baseX + ROOM_SPAN; x++) grid[y][x] = "0";
      }
    }
  }
  const visited = new Set(["0,0"]);
  const stack = [[0, 0]];
  while (stack.length) {
    const [roomX, roomY] = stack.at(-1);
    const options = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      .map(([dx, dy]) => [roomX + dx, roomY + dy, dx, dy])
      .filter(([nextX, nextY]) => nextX >= 0 && nextY >= 0 && nextX < ROOM_GRID && nextY < ROOM_GRID && !visited.has(`${nextX},${nextY}`))
      .sort(() => random() - .5);
    if (!options.length) { stack.pop(); continue; }
    const [nextX, nextY, dx, dy] = options[0];
    const centerX = roomX * ROOM_SPAN + ROOM_CENTER;
    const centerY = roomY * ROOM_SPAN + ROOM_CENTER;
    grid[centerY + dy * ROOM_CENTER][centerX + dx * ROOM_CENTER] = "0";
    visited.add(`${nextX},${nextY}`);
    stack.push([nextX, nextY]);
  }
  for (let roomY = 0; roomY < ROOM_GRID; roomY++) {
    for (let roomX = 0; roomX < ROOM_GRID; roomX++) {
      const candidates = [];
      if (roomX < ROOM_GRID - 1) candidates.push([(roomX + 1) * ROOM_SPAN, roomY * ROOM_SPAN + ROOM_CENTER]);
      if (roomY < ROOM_GRID - 1) candidates.push([roomX * ROOM_SPAN + ROOM_CENTER, (roomY + 1) * ROOM_SPAN]);
      for (const [x, y] of candidates) {
        if (grid[y][x] !== "1") continue;
        const chance = random();
        if (chance < .12) grid[y][x] = "0";
        else if (chance < .18) { grid[y][x] = "P"; dynamicPassages.push({ id: `p${game.floor}-${x}-${y}`, x, y, open: false }); }
      }
    }
  }
  return grid;
}

function findRoute(startX, startY, endX, endY) {
  const queue = [[startX, startY]];
  const seen = new Map([[`${startX},${startY}`, null]]);
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === endX && y === endY) break;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy, key = `${nx},${ny}`;
      if (["1", "P"].includes(maze[ny]?.[nx]) || seen.has(key)) continue;
      seen.set(key, [x, y]); queue.push([nx, ny]);
    }
  }
  const path = [];
  let current = [endX, endY];
  while (current) { path.unshift(current); current = seen.get(`${current[0]},${current[1]}`); }
  return path;
}

function setupFloor() {
  maze = generateMaze(7331 + game.floor * 991);
  route = findRoute(ROOM_CENTER, ROOM_CENTER, MAP_SIZE - ROOM_CENTER - 1, MAP_SIZE - ROOM_CENTER - 1);
  doors = [];
  const targetDoors = Math.min(12, 5 + game.floor * 2);
  const connectors = route.filter(([x, y]) => (x % ROOM_SPAN === 0 && y % ROOM_SPAN === ROOM_CENTER) || (y % ROOM_SPAN === 0 && x % ROOM_SPAN === ROOM_CENTER));
  for (let index = 0; index < targetDoors && connectors.length; index++) {
    const [x, y] = connectors[Math.min(connectors.length - 1, Math.floor((index + 1) * connectors.length / (targetDoors + 1)))];
    const id = `f${game.floor}-${x}-${y}`;
    const unlocked = localStorage.getItem(`wikimaze-door-${id}`) === "open";
    const door = { x, y, id, unlocked, question: (game.floor * 7 + doors.length * 5) % QUESTIONS.length };
    doors.push(door);
    maze[y][x] = unlocked ? "0" : "D";
  }
  const routeRooms = [];
  const roomKeys = new Set();
  for (const [x, y] of route) {
    const roomX = Math.min(ROOM_GRID - 1, Math.floor(x / ROOM_SPAN)), roomY = Math.min(ROOM_GRID - 1, Math.floor(y / ROOM_SPAN));
    const key = `${roomX},${roomY}`;
    if (roomKeys.has(key)) continue;
    roomKeys.add(key); routeRooms.push([roomX * ROOM_SPAN + ROOM_CENTER, roomY * ROOM_SPAN + ROOM_CENTER]);
  }
  worldObjects = [];
  worldObjects.push({ kind: "asset", asset: "cabinet", themeId: "library", x: ROOM_CENTER + 1.35, y: ROOM_CENTER - 1.55, phase: 2.1 });
  worldObjects.push({ kind: "painting", x: ROOM_CENTER + .5, y: 1.35, ...PAINTINGS[0] });
  routeRooms.slice(1, 9).forEach(([x, y], index) => worldObjects.push({ kind: "painting", x: x + .5, y: y - 1.7, ...PAINTINGS[index] }));
  routeRooms.slice(1, 14).forEach(([x, y], index) => worldObjects.push({ kind: "torch", x: x - 1.75, y: y - .9, color: index % 2 ? "#f09a32" : "#ffd16c" }));
  routeRooms.slice(2, 18).filter((_, index) => index % 3 === 0).forEach(([x, y]) => worldObjects.push({ kind: "window", x: x + .5, y: y - 2.05, color: "#718e9d" }));
  for (let roomY = 0; roomY < ROOM_GRID; roomY++) {
    for (let roomX = 0; roomX < ROOM_GRID; roomX++) {
      if ((roomX === 0 && roomY === 0) || (roomX === ROOM_GRID - 1 && roomY === ROOM_GRID - 1)) continue;
      const hash = roomX * 17 + roomY * 29 + game.floor * 7;
      const theme = roomThemeAt(roomX * ROOM_SPAN + ROOM_CENTER, roomY * ROOM_SPAN + ROOM_CENTER);
      const isSignatureRoom = THEME_WHISPERS[theme.id] && Math.abs(hash) % 3 !== 0;
      const hasMainAsset = isSignatureRoom || hash % 7 === 0;
      if (hasMainAsset) {
        const nearWall = ["clock", "vitrine"].includes(theme.prop);
        worldObjects.push({ kind: "asset", asset: theme.prop, themeId: theme.id, x: roomX * ROOM_SPAN + (nearWall ? 4.25 : ROOM_CENTER + .5), y: roomY * ROOM_SPAN + ROOM_CENTER + .5, phase: hash * .37 });
      }
      if (hash % 5 === 0 && theme.id !== "nursery") worldObjects.push({ kind: "drapery", x: roomX * ROOM_SPAN + ROOM_CENTER - 1.35, y: roomY * ROOM_SPAN + ROOM_CENTER - 1.65, color: ["#6d2d32", "#344d54", "#665226"][Math.abs(hash) % 3], phase: hash });
    }
  }
  const archivistSpot = routeRooms[Math.min(1, routeRooms.length - 1)];
  worldObjects.push({ kind: "character", character: "archivist", x: archivistSpot[0] + .5, y: archivistSpot[1] + .5, name: "Orin Vale", role: "Archivist of unfinished histories" });
  const inhabitantSpots = [.27, .52, .74].map((ratio) => routeRooms[Math.min(routeRooms.length - 1, Math.floor(routeRooms.length * ratio))]);
  worldObjects.push({ kind: "character", character: "bell-widow", x: inhabitantSpots[0][0] + .5, y: inhabitantSpots[0][1] + .5, name: "The Bell Widow", role: "Keeper of hours the castle no longer uses" });
  worldObjects.push({ kind: "character", character: "brother-moth", x: inhabitantSpots[1][0] + .5, y: inhabitantSpots[1][1] + .5, name: "Brother Moth", role: "Natural philosopher of the lamp-lit species" });
  worldObjects.push({ kind: "character", character: "measurer", x: inhabitantSpots[2][0] + .5, y: inhabitantSpots[2][1] + .5, name: "The Measurer", role: "Surveyor of disputed dimensions" });
  worldObjects.push({ kind: "character", character: "cartographer", x: MAP_SIZE - ROOM_CENTER - .5, y: MAP_SIZE - ROOM_CENTER - .5, name: "Ysra of the Pale Compass", role: "Cartographer of roads not taken" });
  player.x = ROOM_CENTER + .5; player.y = ROOM_CENTER + .5; player.angle = firstOpenDirection(ROOM_CENTER, ROOM_CENTER);
  game.apparition = null; game.nextUnease = performance.now() + 22000 + Math.random() * 18000; game.nextShift = performance.now() + 16000 + Math.random() * 16000; game.compassUntil = 0;
  lastCell = `${ROOM_CENTER},${ROOM_CENTER}`; visitedCells = new Map([[lastCell, 1]]);
  lastRoomKey = "0,0"; visitedRooms = new Set([lastRoomKey]);
  interaction = null;
  updateHud();
}

function firstOpenDirection(x, y) {
  const option = [[1, 0, 0], [0, 1, Math.PI / 2], [-1, 0, Math.PI], [0, -1, -Math.PI / 2]].find(([dx, dy]) => maze[y + dy * ROOM_CENTER]?.[x + dx * ROOM_CENTER] === "0");
  return option?.[2] || 0;
}

function createTextures() {
  const make = (draw) => { const c = document.createElement("canvas"); c.width = c.height = 128; const cctx = c.getContext("2d"); draw(cctx); return c; };
  const random = seededRandom(919);
  const stone = make((c) => {
    c.fillStyle = "#514636"; c.fillRect(0, 0, 128, 128);
    for (let row = 0; row < 8; row++) {
      const y = row * 16, offset = row % 2 ? -20 : 0;
      for (let x = offset; x < 128; x += 40) {
        const shade = 54 + Math.floor(random() * 20);
        c.fillStyle = `rgb(${shade + 14},${shade + 6},${shade - 4})`; c.fillRect(x + 2, y + 2, 36, 12);
        c.fillStyle = "#2a241d"; c.fillRect(x, y, 40, 2); c.fillRect(x, y, 2, 16);
        c.fillStyle = "#806f56"; c.fillRect(x + 3, y + 3, 32, 1);
      }
    }
    for (let i = 0; i < 240; i++) { c.fillStyle = `rgba(0,0,0,${random() * .18})`; c.fillRect(random() * 128, random() * 128, 1, 1); }
  });
  const moss = make((c) => {
    c.drawImage(stone, 0, 0); const gradient = c.createLinearGradient(0, 0, 0, 128); gradient.addColorStop(0, "#1e322318"); gradient.addColorStop(1, "#33472fc7"); c.fillStyle = gradient; c.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 55; i++) { c.fillStyle = `rgba(55,80,44,${.12 + random() * .28})`; c.beginPath(); c.arc(random() * 128, 70 + random() * 58, 1 + random() * 5, 0, Math.PI * 2); c.fill(); }
  });
  const door = make((c) => {
    c.fillStyle = "#3a2013"; c.fillRect(0, 0, 128, 128);
    for (let x = 0; x < 128; x += 21) { c.fillStyle = x % 42 ? "#684226" : "#57341e"; c.fillRect(x + 2, 0, 18, 128); c.fillStyle = "#2a160d"; c.fillRect(x, 0, 2, 128); }
    c.fillStyle = "#17130f"; c.fillRect(0, 18, 128, 8); c.fillRect(0, 100, 128, 8);
    for (let x = 8; x < 128; x += 24) { c.fillStyle = "#987241"; c.beginPath(); c.arc(x, 22, 2.5, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(x, 104, 2.5, 0, Math.PI * 2); c.fill(); }
    c.strokeStyle = "#b18448"; c.lineWidth = 3; c.beginPath(); c.arc(64, 62, 17, 0, Math.PI * 2); c.stroke(); c.fillStyle = "#c2934c"; c.fillRect(61, 58, 6, 18);
  });
  return {
    stone, moss, door,
    plaster: loadTexture("/assets/textures/plaster-panel.png"),
    bookcase: loadTexture("/assets/textures/bookcase.png"),
    tapestry: loadTexture("/assets/textures/tapestry.png"),
    chapel: loadTexture("/assets/textures/chapel-fresco.png"),
    cartography: loadTexture("/assets/textures/cartographers-wall.png"),
    specimen: loadTexture("/assets/textures/specimen-wall.png"),
    nursery: loadTexture("/assets/textures/nursery-wall.png"),
  };
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  const scale = Math.min(devicePixelRatio, 1.45);
  canvas.width = Math.max(480, Math.floor(rect.width * scale));
  canvas.height = Math.max(270, Math.floor(rect.height * scale));
}
addEventListener("resize", resize);

function isBlocked(x, y) {
  const cell = maze[Math.floor(y)]?.[Math.floor(x)];
  return !cell || cell !== "0";
}

function move(dx, dy) {
  const radius = .19;
  if (!isBlocked(player.x + dx + Math.sign(dx) * radius, player.y) && !isBlocked(player.x + dx, player.y + radius) && !isBlocked(player.x + dx, player.y - radius)) player.x += dx;
  if (!isBlocked(player.x, player.y + dy + Math.sign(dy) * radius) && !isBlocked(player.x + radius, player.y + dy) && !isBlocked(player.x - radius, player.y + dy)) player.y += dy;
}

function update(dt, now) {
  const walk = dt * (keys.has("shift") ? 3.1 : 2.0);
  const turn = dt * 1.75;
  if (keys.has("arrowleft") || keys.has("a")) player.angle -= turn;
  if (keys.has("arrowright") || keys.has("d")) player.angle += turn;
  const direction = (keys.has("w") || keys.has("arrowup") ? 1 : 0) - (keys.has("s") || keys.has("arrowdown") ? 1 : 0);
  if (direction) move(Math.cos(player.angle) * walk * direction, Math.sin(player.angle) * walk * direction);
  player.angle = ((player.angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  const cellKey = `${Math.floor(player.x)},${Math.floor(player.y)}`;
  if (cellKey !== lastCell) {
    lastCell = cellKey;
    visitedCells.set(cellKey, (visitedCells.get(cellKey) || 0) + 1);
    if (Math.random() < .035) alterUnseenPortrait();
  }
  const roomX = Math.floor(player.x / ROOM_SPAN), roomY = Math.floor(player.y / ROOM_SPAN), roomKey = `${roomX},${roomY}`;
  if (roomKey !== lastRoomKey) {
    lastRoomKey = roomKey;
    if (!visitedRooms.has(roomKey)) {
      visitedRooms.add(roomKey);
      const theme = roomThemeAt(player.x, player.y), lines = THEME_WHISPERS[theme.id];
      if (lines) {
        showWhisper(lines[theme.hash % lines.length]);
        if (theme.id === "cartography" && Math.random() < .35) { game.compassUntil = now + 3500; playDistantBell(); }
      }
    }
  }
  if (!document.querySelector("dialog[open]")) updateUnease(now, Boolean(direction));
  if (!document.querySelector("dialog[open]")) updateShiftingPassages(now);
  if (game.apparition && (now > game.apparition.expires || Math.hypot(game.apparition.x - player.x, game.apparition.y - player.y) < 2.15)) {
    game.apparition = null;
    if (Math.random() < .65) showWhisper("There is nobody at the end of the corridor.");
  }
  interaction = findInteraction();
  const prompt = document.querySelector("#prompt");
  prompt.hidden = !interaction;
  if (interaction) prompt.querySelector("span").textContent = interaction.label;
  updateLocation();
  if (game.mapUntil && now >= game.mapUntil) hideMap();
  if (game.mapUntil) document.querySelector("#map-countdown").textContent = Math.max(1, Math.ceil((game.mapUntil - now) / 1000));
  if (activeChallenge && !activeChallenge.answered && !activeChallenge.researching) {
    activeChallenge.remaining -= dt;
    document.querySelector("#timer-fill").style.width = `${Math.max(0, activeChallenge.remaining / activeChallenge.total * 100)}%`;
    if (activeChallenge.remaining <= 0) resolveAnswer(-1);
  }
}

function updateShiftingPassages(now) {
  if (now < game.nextShift || !dynamicPassages.length || game.mapUntil) return;
  const candidates = dynamicPassages.filter((passage) => {
    const centerX = passage.x + .5, centerY = passage.y + .5;
    if (Math.hypot(centerX - player.x, centerY - player.y) < 2.2) return false;
    return [...remotePlayers.values()].every((remote) => Math.hypot(centerX - remote.x, centerY - remote.y) >= 2.2);
  });
  const passage = candidates[Math.floor(Math.random() * candidates.length)];
  if (!passage) { game.nextShift = now + 3500; return; }
  passage.open = !passage.open;
  maze[passage.y][passage.x] = passage.open ? "0" : "P";
  if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "passage", passageId: passage.id, open: passage.open }));
  showWhisper(passage.open ? "A paneled wall has remembered that it was once a doorway." : "Somewhere nearby, a passage quietly becomes a wall.");
  playDistantBell();
  game.nextShift = now + 22000 + Math.random() * 34000;
}

function updateUnease(now, moving) {
  if (!moving || now < game.nextUnease || game.mapUntil) return;
  const line = UNSETTLING_LINES[Math.floor(Math.random() * UNSETTLING_LINES.length)];
  showWhisper(line);
  if (Math.random() < .48) spawnApparition(now);
  if (Math.random() < .34) game.compassUntil = now + 4200 + Math.random() * 2600;
  if (Math.random() < .28) playDistantBell();
  game.nextUnease = now + 30000 + Math.random() * 42000;
}

function spawnApparition(now) {
  const originX = Math.floor(player.x), originY = Math.floor(player.y);
  const directions = [[1,0],[-1,0],[0,1],[0,-1]].sort(() => Math.random() - .5);
  for (const [dx, dy] of directions) {
    let candidate = null;
    for (let step = 1; step <= 7; step++) {
      const x = originX + dx * step, y = originY + dy * step;
      if (maze[y]?.[x] !== "0") break;
      if (step >= 4) candidate = [x + .5, y + .5];
    }
    if (candidate) {
      game.apparition = { kind: "apparition", character: Math.random() < .5 ? "measurer" : "bell-widow", x: candidate[0], y: candidate[1], expires: now + 3200 };
      return;
    }
  }
}

function alterUnseenPortrait() {
  const candidates = worldObjects.filter((object) => object.kind === "painting" && !object.changed && Math.hypot(object.x - player.x, object.y - player.y) > 4);
  const portrait = candidates[Math.floor(Math.random() * candidates.length)];
  if (portrait) portrait.changed = true;
}

function findInteraction() {
  const facing = (x, y) => Math.abs(angleDifference(Math.atan2(y - player.y, x - player.x), player.angle));
  const candidates = [];
  for (const door of doors.filter((item) => !item.unlocked)) {
    const x = door.x + .5, y = door.y + .5, distance = Math.hypot(x - player.x, y - player.y);
    if (distance < 1.45 && facing(x, y) < .7) candidates.push({ type: "door", value: door, distance, label: "challenge the sealed door" });
  }
  for (const object of worldObjects) {
    const distance = Math.hypot(object.x - player.x, object.y - player.y);
    if (distance > 1.25 || facing(object.x, object.y) > .95) continue;
    if (object.kind === "painting") candidates.push({ type: "painting", value: object, distance, label: object.changed ? "examine the portrait that was not here" : `examine “${object.title}”` });
    if (object.kind === "character") candidates.push({ type: "character", value: object, distance, label: `speak with ${object.name}` });
    if (object.kind === "asset") candidates.push({ type: "asset", value: object, distance, label: "examine the object" });
  }
  return candidates.sort((a, b) => a.distance - b.distance)[0] || null;
}

function castRay(angle) {
  const rayX = Math.cos(angle), rayY = Math.sin(angle);
  let mapX = Math.floor(player.x), mapY = Math.floor(player.y);
  const deltaX = Math.abs(1 / (rayX || .00001)), deltaY = Math.abs(1 / (rayY || .00001));
  const stepX = rayX < 0 ? -1 : 1, stepY = rayY < 0 ? -1 : 1;
  let sideX = (rayX < 0 ? player.x - mapX : mapX + 1 - player.x) * deltaX;
  let sideY = (rayY < 0 ? player.y - mapY : mapY + 1 - player.y) * deltaY;
  let side = 0, insideX = mapX, insideY = mapY;
  while (maze[mapY]?.[mapX] === "0") {
    insideX = mapX; insideY = mapY;
    if (sideX < sideY) { sideX += deltaX; mapX += stepX; side = 0; }
    else { sideY += deltaY; mapY += stepY; side = 1; }
  }
  const distance = side === 0 ? (mapX - player.x + (1 - stepX) / 2) / rayX : (mapY - player.y + (1 - stepY) / 2) / rayY;
  const wallHit = side === 0 ? player.y + distance * rayY : player.x + distance * rayX;
  return { distance: Math.max(.001, distance), side, textureX: wallHit - Math.floor(wallHit), cell: maze[mapY]?.[mapX] || "1", mapX, mapY, insideX, insideY };
}

function renderWorld(now) {
  const { width, height } = canvas;
  const horizon = height * .49;
  renderRoomPlanes(horizon);

  const columns = Math.min(720, Math.floor(width));
  const columnWidth = width / columns;
  const depthBuffer = new Float32Array(columns);
  for (let i = 0; i < columns; i++) {
    const rayAngle = player.angle - FOV / 2 + (i / columns) * FOV;
    const hit = castRay(rayAngle);
    const depth = hit.distance * Math.cos(rayAngle - player.angle);
    depthBuffer[i] = depth;
    const wallHeight = Math.min(height * 2.3, height / depth * .98);
    const top = horizon - wallHeight / 2;
    const texture = chooseWallTexture(hit);
    const theme = roomThemeAt(hit.insideX, hit.insideY);
    let sourceX = Math.floor(hit.textureX * texture.width);
    if ((hit.side === 0 && Math.cos(rayAngle) > 0) || (hit.side === 1 && Math.sin(rayAngle) < 0)) sourceX = texture.width - sourceX - 1;
    if (texture === textures.tapestry) sourceX = positiveMod(sourceX + Math.round(Math.sin(now * .0014 + hit.mapX * .7 + hit.mapY) * 1.7), texture.width);
    if (texture === textures.cartography) sourceX = positiveMod(sourceX + Math.round(Math.sin(now * .00022 + hit.mapY) * .65), texture.width);
    if (texture === textures.nursery && positiveMod(Math.floor(now / 9000) + hit.mapX * 3 + hit.mapY, 11) === 0) sourceX = positiveMod(sourceX + 1, texture.width);
    ctx.drawImage(texture, sourceX, 0, 1, texture.height, i * columnWidth, top, columnWidth + 1, wallHeight);
    const lightPulse = Math.sin(now * .0022 + hit.mapX * .8 + hit.mapY * .37) * .018;
    const shade = Math.min(.84, Math.max(.04, depth * .047 + hit.side * .08 - lightPulse));
    ctx.fillStyle = `rgba(4,5,7,${shade})`; ctx.fillRect(i * columnWidth, top, columnWidth + 1, wallHeight);
    ctx.fillStyle = `rgba(${theme.tint[0]},${theme.tint[1]},${theme.tint[2]},${.018 + Math.max(0, lightPulse)})`; ctx.fillRect(i * columnWidth, top, columnWidth + 1, wallHeight);
  }
  renderSprites(depthBuffer, columns, columnWidth, horizon, now);
  renderMotes(now, horizon);
  renderRoomUndertone(now, horizon);
  const vignette = ctx.createRadialGradient(width / 2, height * .48, height * .12, width / 2, height * .48, width * .68); vignette.addColorStop(0, "transparent"); vignette.addColorStop(.62, "#0001"); vignette.addColorStop(1, "#000e"); ctx.fillStyle = vignette; ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = .045; ctx.fillStyle = "#dfc387"; for (let y = 0; y < height; y += 3) ctx.fillRect(0, y, width, 1); ctx.globalAlpha = 1;
}

function renderRoomUndertone(now, horizon) {
  const theme = roomThemeAt(player.x, player.y);
  ctx.save();
  if (theme.id === "nursery") {
    const side = Math.sin(now * .00013) > 0 ? -1 : 1;
    ctx.globalAlpha = .025 + Math.max(0, Math.sin(now * .00031)) * .018; ctx.fillStyle = "#020306";
    ctx.beginPath(); ctx.ellipse(side < 0 ? -canvas.width * .03 : canvas.width * 1.03, horizon * .86, canvas.width * .12, canvas.height * .46, 0, 0, Math.PI * 2); ctx.fill();
  }
  if (theme.id === "chapel") {
    const glow = ctx.createRadialGradient(canvas.width * .5, horizon * .8, 1, canvas.width * .5, horizon * .8, canvas.width * .42);
    glow.addColorStop(0, `rgba(156,82,30,${.025 + Math.sin(now * .011) * .006})`); glow.addColorStop(1, "transparent"); ctx.fillStyle = glow; ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (theme.id === "specimen") { ctx.globalAlpha = .018; ctx.fillStyle = "#7d963f"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.restore();
}

const floorPlane = document.createElement("canvas");
const ceilingPlane = document.createElement("canvas");
floorPlane.width = ceilingPlane.width = 320;
floorPlane.height = ceilingPlane.height = 180;

function renderRoomPlanes(horizon) {
  const planeWidth = floorPlane.width, planeHeight = floorPlane.height;
  const floorContext = floorPlane.getContext("2d"), ceilingContext = ceilingPlane.getContext("2d");
  const floorPixels = floorContext.createImageData(planeWidth, planeHeight), ceilingPixels = ceilingContext.createImageData(planeWidth, planeHeight);
  const leftX = Math.cos(player.angle - FOV / 2), leftY = Math.sin(player.angle - FOV / 2);
  const rightX = Math.cos(player.angle + FOV / 2), rightY = Math.sin(player.angle + FOV / 2);
  for (let py = 0; py < planeHeight; py++) {
    const normalizedY = (py + .5) / planeHeight;
    const distance = 1.05 / Math.max(.014, normalizedY);
    let worldX = player.x + distance * leftX, worldY = player.y + distance * leftY;
    const stepX = distance * (rightX - leftX) / planeWidth, stepY = distance * (rightY - leftY) / planeWidth;
    const fog = Math.max(.18, 1 - distance * .052);
    for (let px = 0; px < planeWidth; px++) {
      const offset = (py * planeWidth + px) * 4;
      const tileX = Math.floor(worldX * 1.15), tileY = Math.floor(worldY * 1.15);
      const tileEdge = positiveMod(worldX * 1.15, 1) < .045 || positiveMod(worldY * 1.15, 1) < .045;
      const roomX = Math.max(0, Math.min(ROOM_GRID - 1, Math.floor(worldX / ROOM_SPAN)));
      const roomY = Math.max(0, Math.min(ROOM_GRID - 1, Math.floor(worldY / ROOM_SPAN)));
      const localX = positiveMod(worldX, ROOM_SPAN), localY = positiveMod(worldY, ROOM_SPAN);
      const roomHash = Math.abs(roomX * 17 + roomY * 29 + game.floor * 7);
      const theme = roomX === 0 && roomY === 0 ? ROOM_THEMES[0] : ROOM_THEMES[roomHash % ROOM_THEMES.length];
      const onRug = (roomHash % 4 === 0 || (roomX === 0 && roomY === 0)) && localX > 1.15 && localX < 4.85 && localY > 1.25 && localY < 4.75;
      let floorColor;
      if (onRug) {
        const border = localX < 1.35 || localX > 4.65 || localY < 1.45 || localY > 4.55;
        floorColor = border ? theme.rug[1] : ((tileX + tileY) % 3 === 0 ? theme.rug[0] : theme.rug[0].map((value) => value * .78));
      } else if (theme.floorStyle === "boards") {
        const board = Math.floor(worldY * 2.25), boardEdge = positiveMod(worldY * 2.25, 1) < .055;
        const staggeredJoint = positiveMod(worldX + (board % 2) * .9, 1.8) < .035;
        floorColor = boardEdge || staggeredJoint ? [33, 27, 25] : ((board + Math.floor(worldX / 1.8)) % 3 ? theme.floor[0] : theme.floor[1]);
      } else if (theme.floorStyle === "checker") {
        const checkX = Math.floor(worldX * .82), checkY = Math.floor(worldY * .82);
        floorColor = positiveMod(worldX * .82, 1) < .035 || positiveMod(worldY * .82, 1) < .035 ? [31, 29, 27] : ((checkX + checkY) % 2 ? theme.floor[0] : theme.floor[1]);
      } else if (theme.floorStyle === "mosaic") {
        const mosaicX = Math.floor((worldX + worldY) * 1.35), mosaicY = Math.floor((worldY - worldX) * 1.35);
        const grout = positiveMod((worldX + worldY) * 1.35, 1) < .05 || positiveMod((worldY - worldX) * 1.35, 1) < .05;
        floorColor = grout ? [38, 33, 29] : ((mosaicX + mosaicY) % 3 ? theme.floor[0] : theme.rug[1]);
      } else if (theme.floorStyle === "parquet") {
        const parquet = (Math.floor(worldX * 1.7) + Math.floor(worldY * 1.7)) % 2;
        const grain = positiveMod((parquet ? worldX : worldY) * 3.4, 1) < .04;
        floorColor = grain ? [42, 31, 24] : (parquet ? theme.floor[0] : theme.floor[1]);
      } else if (tileEdge) floorColor = [31, 27, 23];
      else floorColor = (tileX + tileY) % 2 ? theme.floor[0] : theme.floor[1];
      floorPixels.data[offset] = floorColor[0] * fog; floorPixels.data[offset + 1] = floorColor[1] * fog; floorPixels.data[offset + 2] = floorColor[2] * fog; floorPixels.data[offset + 3] = 255;

      const cofferX = positiveMod(worldX, 1.5), cofferY = positiveMod(worldY, 1.5);
      const majorBeam = positiveMod(worldX, ROOM_SPAN) < .16 || positiveMod(worldY, ROOM_SPAN) < .16;
      const beam = majorBeam || cofferX < .075 || cofferY < .075;
      let ceilingColor = theme.ceiling;
      if (theme.ceilingStyle === "coffer") ceilingColor = beam ? (majorBeam ? [36, 22, 13] : [58, 37, 20]) : theme.ceiling;
      if (theme.ceilingStyle === "beams") ceilingColor = majorBeam || cofferX < .11 ? [39, 24, 15] : theme.ceiling;
      if (theme.ceilingStyle === "panels") ceilingColor = beam ? [48, 39, 27] : ((Math.floor(worldX / 1.5) + Math.floor(worldY / 1.5)) % 2 ? theme.ceiling : theme.ceiling.map((value) => value * .82));
      if (theme.ceilingStyle === "vault") {
        const rib = Math.abs(localX - ROOM_CENTER) < .12 || Math.abs(localY - ROOM_CENTER) < .12 || Math.abs(localX - localY) < .08;
        ceilingColor = rib ? [132, 102, 51] : theme.ceiling;
      }
      if (theme.ceilingStyle === "stars") {
        const star = positiveMod(Math.floor(worldX * 7) * 17 + Math.floor(worldY * 7) * 31, 83) === 0;
        ceilingColor = star ? [166, 147, 90] : theme.ceiling;
      }
      if (theme.ceilingStyle === "cracked") {
        const crack = positiveMod(Math.floor(worldX * 9) * 11 + Math.floor(worldY * 9) * 7, 47) === 0;
        ceilingColor = crack ? [48, 44, 43] : theme.ceiling;
      }
      const ceilingFog = Math.max(.16, fog * .78);
      const ceilingOffset = ((planeHeight - 1 - py) * planeWidth + px) * 4;
      ceilingPixels.data[ceilingOffset] = ceilingColor[0] * ceilingFog; ceilingPixels.data[ceilingOffset + 1] = ceilingColor[1] * ceilingFog; ceilingPixels.data[ceilingOffset + 2] = ceilingColor[2] * ceilingFog; ceilingPixels.data[ceilingOffset + 3] = 255;
      worldX += stepX; worldY += stepY;
    }
  }
  floorContext.putImageData(floorPixels, 0, 0); ceilingContext.putImageData(ceilingPixels, 0, 0);
  ctx.drawImage(ceilingPlane, 0, 0, canvas.width, horizon);
  ctx.drawImage(floorPlane, 0, horizon, canvas.width, canvas.height - horizon);
}

function positiveMod(value, divisor) { return ((value % divisor) + divisor) % divisor; }

function roomThemeAt(worldX, worldY) {
  const roomX = Math.max(0, Math.min(ROOM_GRID - 1, Math.floor(worldX / ROOM_SPAN)));
  const roomY = Math.max(0, Math.min(ROOM_GRID - 1, Math.floor(worldY / ROOM_SPAN)));
  const hash = Math.abs(roomX * 17 + roomY * 29 + game.floor * 7);
  const theme = roomX === 0 && roomY === 0 ? ROOM_THEMES[0] : ROOM_THEMES[hash % ROOM_THEMES.length];
  return { ...theme, hash, roomX, roomY };
}

function chooseWallTexture(hit) {
  if (hit.cell === "D") return textures.door;
  const theme = roomThemeAt(hit.insideX, hit.insideY);
  const surface = Math.abs(hit.mapX * 13 + hit.mapY * 23 + game.floor * 11) % 10;
  let preferred = textures.plaster;
  if (theme.id === "library") preferred = surface < 7 ? textures.bookcase : textures.plaster;
  if (theme.id === "observatory") preferred = surface < 5 ? textures.tapestry : surface < 8 ? textures.plaster : textures.stone;
  if (theme.id === "herbarium") preferred = surface < 6 ? textures.moss : textures.plaster;
  if (theme.id === "gallery") preferred = surface < 6 ? textures.tapestry : textures.plaster;
  if (theme.id === "reliquary") preferred = surface < 4 ? textures.bookcase : surface < 7 ? textures.tapestry : textures.plaster;
  if (theme.id === "solar") preferred = surface < 8 ? textures.plaster : textures.tapestry;
  if (theme.id === "chapel") preferred = surface < 8 ? textures.chapel : textures.stone;
  if (theme.id === "cartography") preferred = surface < 8 ? textures.cartography : textures.bookcase;
  if (theme.id === "specimen") preferred = surface < 8 ? textures.specimen : textures.moss;
  if (theme.id === "nursery") preferred = surface < 9 ? textures.nursery : textures.plaster;
  return preferred.ready === false ? textures.stone : preferred;
}

function renderMotes(now, horizon) {
  ctx.save();
  const theme = roomThemeAt(player.x, player.y);
  const colors = { chapel: "#e5a75f", specimen: "#a9b87b", herbarium: "#9cad74", nursery: "#d1c3bf", observatory: "#aebbd0" };
  ctx.fillStyle = colors[theme.id] || "#d8ccb0";
  const count = theme.id === "specimen" || theme.id === "herbarium" ? 26 : 18;
  for (let index = 0; index < count; index++) {
    const direction = theme.id === "nursery" && index % 7 === 0 ? -1 : 1;
    const x = positiveMod(index * 193 + now * (.002 + index % 3 * .0007) * direction, canvas.width);
    const y = horizon * .25 + positiveMod(index * 97 + Math.sin(now * .0003 + index) * 38, canvas.height * .62);
    const alpha = .025 + (index % 5) * .008 + (theme.id === "chapel" ? .012 : 0);
    ctx.globalAlpha = alpha;
    ctx.fillRect(x, y, index % 4 === 0 ? 2 : 1, 1);
  }
  ctx.restore();
}

function renderFloorGrid(horizon) {
  const { width, height } = canvas;
  ctx.save(); ctx.globalAlpha = .22; ctx.strokeStyle = "#a58a63"; ctx.lineWidth = 1;
  for (let i = 1; i < 12; i++) { const t = i / 12; const y = horizon + (height - horizon) * t * t; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
  const drift = ((player.x + player.y) * 43) % 90;
  for (let x = -width; x < width * 2; x += 90) { ctx.beginPath(); ctx.moveTo(width / 2, horizon); ctx.lineTo(x - drift, height); ctx.stroke(); }
  ctx.restore();
}

function renderCeilingBeams(horizon) {
  const { width } = canvas;
  ctx.save(); ctx.globalAlpha = .34; ctx.fillStyle = "#160d08";
  for (let i = 0; i < 5; i++) { const y = horizon * (i / 5) ** 1.7; const beamHeight = 5 + i * 3; ctx.fillRect(0, y, width, beamHeight); }
  ctx.restore();
}

function renderSprites(depthBuffer, columns, columnWidth, horizon, now) {
  const sprites = [
    ...worldObjects,
    ...(game.apparition ? [game.apparition] : []),
    ...[...remotePlayers.values()].filter((item) => item.id !== playerId).map((item) => ({ ...item, kind: "player" })),
  ].map((item) => ({ ...item, distance: Math.hypot(item.x - player.x, item.y - player.y) })).sort((a, b) => b.distance - a.distance);
  for (const sprite of sprites) {
    const angle = angleDifference(Math.atan2(sprite.y - player.y, sprite.x - player.x), player.angle);
    if (Math.abs(angle) > FOV * .65 || sprite.distance < .18) continue;
    const screenX = canvas.width * (.5 + angle / FOV);
    const column = Math.floor(screenX / columnWidth);
    if (column < 0 || column >= columns || sprite.distance > depthBuffer[column] + .35) continue;
    let size = Math.min(canvas.height * .95, canvas.height / sprite.distance * .75);
    ctx.save();
    if (sprite.kind === "character" || sprite.kind === "apparition") {
      const image = CHARACTER_IMAGES[sprite.character];
      if (image.complete) {
        const aspect = image.width / image.height;
        const groundY = Math.min(canvas.height - 3, horizon + canvas.height / Math.max(.35, sprite.distance) * .49);
        ctx.globalAlpha = sprite.kind === "apparition" ? Math.min(.19, 1.1 / sprite.distance) : Math.min(1, 2.4 / sprite.distance);
        if (sprite.kind === "apparition") { ctx.filter = "grayscale(1) contrast(1.45) brightness(.72)"; ctx.globalCompositeOperation = "screen"; }
        ctx.drawImage(image, screenX - size * aspect / 2, groundY - size, size * aspect, size);
      }
    } else if (sprite.kind === "painting") {
      size *= .68;
      const painting = PAINTINGS.find((item) => item.title === sprite.title), image = sprite.image || painting?.image;
      const sourceAspect = image?.naturalWidth && image?.naturalHeight ? image.naturalWidth / image.naturalHeight : 1.2;
      const displayAspect = Math.max(.68, Math.min(1.48, sourceAspect));
      let drawHeight = size, drawWidth = drawHeight * displayAspect;
      if (drawWidth > size * 1.22) { drawWidth = size * 1.22; drawHeight = drawWidth / displayAspect; }
      const centerY = horizon - size * .04, drawX = screenX - drawWidth / 2, drawY = centerY - drawHeight / 2;
      ctx.shadowColor = "#000"; ctx.shadowBlur = size * .18;
      if (image?.complete && image.naturalWidth) {
        if (painting?.art) {
          ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        } else {
          const border = Math.max(3, size * .065);
          ctx.fillStyle = "#25150d"; ctx.fillRect(drawX - border, drawY - border, drawWidth + border * 2, drawHeight + border * 2);
          ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
          ctx.strokeStyle = "#a77a3a"; ctx.lineWidth = Math.max(1, border * .35); ctx.strokeRect(drawX - border * .62, drawY - border * .62, drawWidth + border * 1.24, drawHeight + border * 1.24);
        }
      } else {
        ctx.fillStyle = "#17110e"; ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
        ctx.strokeStyle = "#80613c"; ctx.lineWidth = Math.max(2, size * .045); ctx.strokeRect(drawX, drawY, drawWidth, drawHeight);
      }
      if (sprite.changed && size > 34) { const glance = Math.max(-size * .035, Math.min(size * .035, angle * size * .2)); ctx.globalAlpha = .34; ctx.fillStyle = "#ddd4b5"; ctx.beginPath(); ctx.arc(screenX - drawWidth * .08 + glance, centerY - drawHeight * .06, Math.max(1, size * .011), 0, Math.PI * 2); ctx.arc(screenX + drawWidth * .08 + glance, centerY - drawHeight * .06, Math.max(1, size * .011), 0, Math.PI * 2); ctx.fill(); }
    } else if (sprite.kind === "torch") {
      size *= .25; const flicker = 1 + Math.sin(now * .018 + sprite.x) * .13; ctx.shadowColor = "#ff8b25"; ctx.shadowBlur = size * 1.2; ctx.fillStyle = "#4d3320"; ctx.fillRect(screenX - size * .06, horizon - size * .05, size * .12, size * .7); ctx.fillStyle = "#ffbd45"; ctx.beginPath(); ctx.ellipse(screenX, horizon - size * .15, size * .18 * flicker, size * .34 * flicker, 0, 0, Math.PI * 2); ctx.fill();
    } else if (sprite.kind === "window") {
      size *= .5; const windowWidth = size * .48, windowHeight = size * .72, top = horizon - size * .55;
      const pulse = .82 + Math.sin(now * .0011 + sprite.x * .4) * .12;
      ctx.globalAlpha = pulse; ctx.shadowColor = "#7aa0b8"; ctx.shadowBlur = size * (.2 + pulse * .08); ctx.fillStyle = "#2b4658";
      ctx.beginPath(); ctx.moveTo(screenX - windowWidth / 2, top + windowWidth / 2); ctx.arc(screenX, top + windowWidth / 2, windowWidth / 2, Math.PI, 0); ctx.lineTo(screenX + windowWidth / 2, top + windowHeight); ctx.lineTo(screenX - windowWidth / 2, top + windowHeight); ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0; ctx.strokeStyle = "#9a825d"; ctx.lineWidth = Math.max(2, size * .025); ctx.stroke(); ctx.beginPath(); ctx.moveTo(screenX, top); ctx.lineTo(screenX, top + windowHeight); ctx.moveTo(screenX - windowWidth / 2, top + windowHeight * .55); ctx.lineTo(screenX + windowWidth / 2, top + windowHeight * .55); ctx.stroke();
    } else if (sprite.kind === "asset") {
      const image = PROP_IMAGES[sprite.asset];
      if (image?.complete && image.naturalWidth) {
        const aspect = image.naturalWidth / image.naturalHeight;
        size *= ASSET_SCALES[sprite.asset] || .72;
        const activeMotion = sprite.asset === "orrery" ? .018 : sprite.asset === "rockingHorse" ? .012 : 0;
        const motion = Math.sin(now * (sprite.asset === "rockingHorse" ? .00072 : .00125) + sprite.phase) * size * activeMotion;
        const drawWidth = size * aspect;
        const groundY = Math.min(canvas.height - 3, horizon + canvas.height / Math.max(.35, sprite.distance) * .49);
        const assetTop = groundY - size;
        ctx.shadowColor = ["orrery", "altar"].includes(sprite.asset) ? "#d0a753" : sprite.asset === "vitrine" ? "#87965b" : "#000";
        ctx.shadowBlur = ["orrery", "altar"].includes(sprite.asset) ? size * .18 : size * .09;
        ctx.drawImage(image, screenX - drawWidth / 2 + motion, assetTop, drawWidth, size);
        if (sprite.asset === "orrery") {
          ctx.strokeStyle = `rgba(235,194,102,${.16 + Math.sin(now * .002 + sprite.phase) * .07})`;
          ctx.lineWidth = Math.max(1, size * .012); ctx.beginPath(); ctx.ellipse(screenX, assetTop + size * .46, size * .34, size * .105, now * .00035, 0, Math.PI * 2); ctx.stroke();
        } else if (sprite.asset === "armor") {
          const glint = positiveMod(now * .035 + sprite.phase * 70, size * 1.8) - size * .9;
          ctx.globalAlpha = .14; ctx.strokeStyle = "#f4e7bc"; ctx.lineWidth = Math.max(1, size * .012); ctx.beginPath(); ctx.moveTo(screenX + glint * .18, assetTop + size * .08); ctx.lineTo(screenX + glint * .08, assetTop + size * .86); ctx.stroke();
        } else if (sprite.asset === "clock") {
          const dialY = assetTop + size * .23, handAngle = -now * .00017 - sprite.phase;
          ctx.globalAlpha = .34; ctx.strokeStyle = "#ecd080"; ctx.lineWidth = Math.max(1, size * .008); ctx.beginPath(); ctx.moveTo(screenX, dialY); ctx.lineTo(screenX + Math.sin(handAngle) * size * .09, dialY - Math.cos(handAngle) * size * .09); ctx.stroke();
          ctx.fillStyle = "#f0d58d"; ctx.beginPath(); ctx.arc(screenX, dialY, Math.max(1, size * .01), 0, Math.PI * 2); ctx.fill();
        } else if (sprite.asset === "altar") {
          const glow = ctx.createRadialGradient(screenX, assetTop + size * .42, 1, screenX, assetTop + size * .42, size * .42);
          glow.addColorStop(0, `rgba(255,177,67,${.13 + Math.sin(now * .012 + sprite.phase) * .025})`); glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow; ctx.fillRect(screenX - size * .52, assetTop, size * 1.04, size * .85);
        } else if (sprite.asset === "vitrine") {
          const mothX = screenX + Math.sin(now * .0017 + sprite.phase) * size * .035;
          ctx.globalAlpha = .26; ctx.fillStyle = "#d7c48b"; ctx.beginPath(); ctx.ellipse(mothX, assetTop + size * .42, size * .018, size * .009, Math.sin(now * .003) * .5, 0, Math.PI * 2); ctx.fill();
        } else if (sprite.asset === "rockingHorse") {
          ctx.globalAlpha = .095 + Math.max(0, Math.sin(now * .0007 + sprite.phase)) * .035; ctx.fillStyle = "#a9bac0";
          ctx.beginPath(); ctx.ellipse(screenX - drawWidth * .18 - motion, assetTop + size * .52, size * .055, size * .12, -.18, 0, Math.PI * 2); ctx.fill();
        }
      }
    } else if (sprite.kind === "drapery") {
      size *= .5; const sway = Math.sin(now * .001 + sprite.phase) * size * .035; const top = horizon - size * .52;
      ctx.shadowColor = "#000"; ctx.shadowBlur = size * .08; ctx.fillStyle = sprite.color;
      ctx.beginPath(); ctx.moveTo(screenX - size * .34, top); ctx.lineTo(screenX + size * .34, top); ctx.lineTo(screenX + size * .3 + sway, top + size * .79); ctx.quadraticCurveTo(screenX, top + size * .7 + sway, screenX - size * .31 + sway, top + size * .8); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = .22; ctx.strokeStyle = "#e5c98f"; ctx.lineWidth = Math.max(1, size * .014);
      for (const fold of [-.2, 0, .2]) { ctx.beginPath(); ctx.moveTo(screenX + size * fold, top); ctx.quadraticCurveTo(screenX + size * fold + sway * .4, top + size * .4, screenX + size * fold + sway, top + size * .75); ctx.stroke(); }
    } else if (sprite.kind === "player") {
      const avatarKey = REMOTE_AVATAR_KEYS[stableStringHash(sprite.id || sprite.name) % REMOTE_AVATAR_KEYS.length];
      const image = REMOTE_AVATAR_IMAGES[avatarKey];
      if (image?.complete && image.naturalWidth) {
        size *= .82;
        const groundY = Math.min(canvas.height - 3, horizon + canvas.height / Math.max(.35, sprite.distance) * .49);
        const drawWidth = size * .66, drawX = screenX - drawWidth / 2, drawY = groundY - size;
        const traceScholar = () => {
          ctx.beginPath();
          ctx.ellipse(screenX, drawY + size * .14, drawWidth * .16, size * .115, 0, 0, Math.PI * 2);
          ctx.moveTo(screenX - drawWidth * .19, drawY + size * .225);
          ctx.bezierCurveTo(screenX - drawWidth * .39, drawY + size * .25, screenX - drawWidth * .5, drawY + size * .37, screenX - drawWidth * .33, drawY + size * .57);
          ctx.bezierCurveTo(screenX - drawWidth * .25, drawY + size * .69, screenX - drawWidth * .36, drawY + size * .88, screenX - drawWidth * .27, groundY - size * .018);
          ctx.quadraticCurveTo(screenX - drawWidth * .12, groundY + size * .006, screenX, groundY - size * .012);
          ctx.quadraticCurveTo(screenX + drawWidth * .12, groundY + size * .006, screenX + drawWidth * .27, groundY - size * .018);
          ctx.bezierCurveTo(screenX + drawWidth * .36, drawY + size * .88, screenX + drawWidth * .25, drawY + size * .69, screenX + drawWidth * .33, drawY + size * .57);
          ctx.bezierCurveTo(screenX + drawWidth * .5, drawY + size * .37, screenX + drawWidth * .39, drawY + size * .25, screenX + drawWidth * .19, drawY + size * .225);
          ctx.closePath();
        };
        ctx.globalAlpha = Math.min(1, 2.6 / sprite.distance); ctx.shadowColor = "rgba(0,0,0,.9)"; ctx.shadowBlur = size * .11;
        traceScholar(); ctx.save(); ctx.clip(); ctx.drawImage(image, drawX, drawY, drawWidth, size); ctx.restore();
        ctx.globalAlpha = .32; ctx.strokeStyle = sprite.color; ctx.lineWidth = Math.max(1, size * .006); traceScholar(); ctx.stroke();
        const label = sprite.name;
        ctx.globalAlpha = 1; ctx.shadowBlur = 2; ctx.font = `${Math.max(10, size * .07)}px Georgia, serif`; ctx.textAlign = "center";
        const labelWidth = ctx.measureText(label).width + 18, labelY = Math.max(16, drawY - 8);
        ctx.fillStyle = "rgba(13,10,8,.68)"; ctx.beginPath(); ctx.roundRect(screenX - labelWidth / 2, labelY - 13, labelWidth, 18, 7); ctx.fill();
        ctx.fillStyle = sprite.color; ctx.beginPath(); ctx.arc(screenX - labelWidth / 2 + 7, labelY - 4, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#e9d8aa"; ctx.fillText(label, screenX + 3, labelY + 1);
      }
    }
    ctx.restore();
  }
}

function renderMap() {
  const cell = mapCanvas.width / MAP_SIZE;
  mapCtx.fillStyle = "#0e0a07"; mapCtx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
  maze.forEach((row, y) => row.forEach((value, x) => {
    mapCtx.fillStyle = value === "1" || value === "P" ? "#3b3023" : value === "D" ? "#9b6335" : "#17120d";
    mapCtx.fillRect(x * cell, y * cell, cell + .5, cell + .5);
  }));
  const currentRoute = findRoute(Math.floor(player.x), Math.floor(player.y), MAP_SIZE - ROOM_CENTER - 1, MAP_SIZE - ROOM_CENTER - 1);
  mapCtx.strokeStyle = "#e1b558"; mapCtx.lineWidth = Math.max(2, cell * .19); mapCtx.lineCap = "round"; mapCtx.beginPath();
  currentRoute.forEach(([x, y], index) => index ? mapCtx.lineTo((x + .5) * cell, (y + .5) * cell) : mapCtx.moveTo((x + .5) * cell, (y + .5) * cell)); mapCtx.stroke();
  mapCtx.fillStyle = "#8fc0bc"; mapCtx.fillRect((MAP_SIZE - ROOM_CENTER - .72) * cell, (MAP_SIZE - ROOM_CENTER - .72) * cell, cell * .45, cell * .45);
  mapCtx.save(); mapCtx.translate(player.x * cell, player.y * cell); mapCtx.rotate(player.angle); mapCtx.fillStyle = "#fff0b5"; mapCtx.beginPath(); mapCtx.moveTo(cell * .38, 0); mapCtx.lineTo(-cell * .25, -cell * .22); mapCtx.lineTo(-cell * .25, cell * .22); mapCtx.closePath(); mapCtx.fill(); mapCtx.restore();
}

function updateLocation() {
  const theme = roomThemeAt(player.x, player.y);
  const roomName = theme.roomX === 0 && theme.roomY === 0 ? ROOM_NAMES[0] : theme.names[theme.hash % theme.names.length];
  const visits = visitedCells.get(lastCell) || 1;
  document.querySelector("#room-name-display").textContent = visits > 3 && (Math.floor(player.x) * 7 + Math.floor(player.y) * 11) % 3 === 0 ? `${roomName} — again` : roomName;
  const directions = ["EAST", "SOUTH", "WEST", "NORTH"];
  const normalized = ((player.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const directionIndex = Math.round(normalized / (Math.PI / 2)) % 4;
  const disturbed = performance.now() < game.compassUntil;
  document.querySelector("#compass-display").textContent = disturbed ? directions[(directionIndex + 2) % 4] : directions[directionIndex];
  document.querySelector(".location-plaque").classList.toggle("disturbed", disturbed);
}

function angleDifference(a, b) { return Math.atan2(Math.sin(a - b), Math.cos(a - b)); }

function frame(now) {
  const dt = Math.min(.04, (now - lastFrame) / 1000); lastFrame = now;
  if (!document.querySelector("dialog[open]")) update(dt, now);
  else if (activeChallenge) update(dt, now);
  renderWorld(now);
  if (game.mapUntil) renderMap();
  if (now - lastNetworkUpdate > 100) { sendState(); lastNetworkUpdate = now; }
  requestAnimationFrame(frame);
}

function interact() {
  if (!interaction || document.querySelector("dialog[open]")) return;
  if (interaction.type === "door") beginChallenge(interaction.value);
  if (interaction.type === "painting") openPainting(interaction.value);
  if (interaction.type === "character") openCharacter(interaction.value);
  if (interaction.type === "asset") examineAsset(interaction.value);
}

function examineAsset(asset) {
  const notes = ASSET_NOTES[asset.asset] || ["It has been catalogued, but not explained."];
  showWhisper(notes[Math.abs(Math.floor(asset.phase || 0)) % notes.length]);
  if (asset.asset === "clock") game.compassUntil = performance.now() + 4200;
  if (["altar", "rockingHorse"].includes(asset.asset) && Math.random() < .45) playDistantBell();
}

function beginChallenge(door) {
  const floorMinimum = Math.min(4, Math.ceil(game.floor / 2));
  const available = QUESTIONS.filter((question) => question.difficulty >= floorMinimum);
  const question = available[(door.question + Math.floor(Math.random() * available.length)) % available.length];
  const total = Math.max(24, 46 - question.difficulty * 4);
  activeChallenge = { door, question, total, remaining: total, answered: false, researching: false, penalty: 1 };
  document.querySelector("#question-category").textContent = question.category;
  document.querySelector("#question-difficulty").textContent = DIFFICULTY[question.difficulty];
  document.querySelector("#question-points").textContent = `+${pointsFor(question)} lore`;
  document.querySelector("#question-text").textContent = question.prompt;
  document.querySelector("#question-result").textContent = "";
  document.querySelector("#timer-fill").style.width = "100%";
  document.querySelector("#research-drawer").hidden = true;
  document.querySelector("#research-button").disabled = false;
  const answers = document.querySelector("#question-answers"); answers.replaceChildren();
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button"); button.innerHTML = `<strong>${String.fromCharCode(65 + index)}</strong>&nbsp;&nbsp;${answer}`; button.addEventListener("click", () => resolveAnswer(index)); answers.append(button);
  });
  document.querySelector("#challenge-dialog").showModal();
}

function pointsFor(question) { return [0, 128, 256, 512, 1024][question.difficulty]; }

function resolveAnswer(index) {
  if (!activeChallenge || activeChallenge.answered) return;
  const { question, door } = activeChallenge;
  activeChallenge.answered = true;
  const buttons = [...document.querySelector("#question-answers").children];
  buttons.forEach((button, answerIndex) => { button.disabled = true; if (answerIndex === question.correct) button.classList.add("correct"); else if (answerIndex === index) button.classList.add("wrong"); });
  const result = document.querySelector("#question-result");
  if (index === question.correct) {
    const reward = Math.round(pointsFor(question) * activeChallenge.penalty);
    player.score += reward; localStorage.setItem("wikimaze-score", player.score);
    door.unlocked = true; maze[door.y][door.x] = "0"; localStorage.setItem(`wikimaze-door-${door.id}`, "open");
    if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "unlock", doorId: door.id }));
    result.textContent = `The lock yields. +${reward} lore. ${question.explanation}`;
    updateHud(); showToast("A sealed passage has opened.");
    setTimeout(() => { document.querySelector("#challenge-dialog").close(); activeChallenge = null; }, 3300);
    if (player.score >= 20000 && !game.won) { game.won = true; setTimeout(showVictory, 3600); }
  } else {
    result.textContent = `${index < 0 ? "The bell has run out." : "The lock rejects the answer."} ${question.explanation} Research it, then challenge this door again.`;
  }
}

async function researchQuestion() {
  if (!activeChallenge) return;
  const { question } = activeChallenge;
  activeChallenge.researching = true; activeChallenge.penalty = .5;
  document.querySelector("#research-button").disabled = true;
  document.querySelector("#research-drawer").hidden = false;
  document.querySelector("#research-title").textContent = question.source;
  document.querySelector("#research-extract").textContent = "The archive’s pages are turning…";
  document.querySelector("#question-points").textContent = `+${Math.round(pointsFor(question) * .5)} lore · researched`;
  const article = await fetchArticle(question.source);
  document.querySelector("#research-title").textContent = article.title;
  document.querySelector("#research-extract").textContent = article.extract;
  document.querySelector("#research-link").href = article.url;
  activeChallenge.researching = false;
}

async function fetchArticle(title) {
  try {
    const response = await fetch(`/api/wiki?title=${encodeURIComponent(title)}`);
    if (!response.ok) throw new Error("Archive unavailable");
    return await response.json();
  } catch {
    return { title, extract: "The live archive cannot be reached. Follow the article link to continue your research.", url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}` };
  }
}

async function openPainting(painting) {
  const dialog = document.querySelector("#painting-dialog");
  document.querySelector("#article-title").textContent = painting.title;
  document.querySelector("#article-extract").textContent = "";
  document.querySelector("#article-loading").hidden = false;
  dialog.showModal();
  const article = await fetchArticle(painting.title);
  document.querySelector("#article-loading").hidden = true;
  document.querySelector("#article-title").textContent = article.title;
  document.querySelector("#article-extract").textContent = article.extract;
  document.querySelector("#wikipedia-link").href = article.url;
}

function openCharacter(character) {
  const dialog = document.querySelector("#encounter-dialog");
  document.querySelector("#character-image").src = `/assets/characters/${character.character}.png`;
  document.querySelector("#character-image").alt = character.name;
  document.querySelector("#character-name").textContent = character.name;
  document.querySelector("#character-role").textContent = character.role;
  const speech = document.querySelector("#character-speech");
  const actions = document.querySelector("#character-actions"); actions.replaceChildren();
  if (character.character === "archivist") {
    speech.textContent = game.floor === 1 ? "You arrived with a library in your pocket and no map in your hand. Good. This keep rewards curiosity, not certainty. Walk its halls. Challenge its doors. When memory fails, open the living encyclopedia—and return wiser." : `Floor ${game.floor} has rearranged itself. The questions beyond these doors now reach deeper. Your route remains hidden, but knowledge already won is never lost.`;
    addAction(actions, "How do I navigate?", () => { speech.textContent = "Walk with W and S; turn with A and D. The maze is deliberately hidden. You carry five cartographer’s flames—press M or the flame button to reveal only the route ahead for eight heartbeats."; });
    addAction(actions, "How do questions work?", () => { speech.textContent = "Every sealed door demands an answer. Four ranks run from Wayfarer to Sage. Researching a linked Wikipedia article pauses the clock, but halves the lore reward. Learning is never punished; haste is merely rewarded."; });
  } else if (character.character === "cartographer") {
    const remaining = doors.filter((door) => !door.unlocked).length;
    speech.textContent = remaining ? `I mapped every road, then the castle forgot them. ${remaining} sealed ${remaining === 1 ? "door remains" : "doors remain"} on this floor. Spend a flame and the true path will burn briefly through the dark.` : "Every seal on this floor is broken. The stair behind me descends upward, as such stairs do in places built from unfinished ideas. Will you continue?";
    if (!remaining) addAction(actions, "Climb to the next floor", advanceFloor);
    addAction(actions, "Reveal the route", () => { dialog.close(); revealMap(); });
  } else if (character.character === "bell-widow") {
    speech.textContent = "I keep the keys, not the doors. A distinction the doors are very particular about. Listen: each bell marks an hour that happened somewhere else.";
    addAction(actions, "Ask which key opens the way", () => { speech.textContent = "None of mine. Your answers are the keys here. Mine open the little rooms between one moment and the next. You would not like the dust in them."; playDistantBell(); });
    addAction(actions, "Ask why the bell is cracked", () => { speech.textContent = "It rang once for someone who had not yet arrived. When you entered the gatehouse, the crack grew wider."; });
  } else if (character.character === "brother-moth") {
    speech.textContent = "They gather wherever someone reads after midnight. I thought they loved the flame, but look closely: they face the page. Perhaps all wings are a kind of question.";
    addAction(actions, "Examine his field notes", () => { dialog.close(); openPainting({ title: "Lepidoptera" }); });
    addAction(actions, "Ask what lives in the lantern", () => { speech.textContent = "Nothing that was born there. Nothing that has found a way out, either. Please do not count them; the number dislikes being known."; });
  } else if (character.character === "measurer") {
    const claimedRooms = 100 + game.floor;
    speech.textContent = `This floor contains ${claimedRooms} rooms. Yesterday it contained one fewer. I have measured the new room from every side. I have not found its door.`;
    addAction(actions, "Ask where the new room is", () => { speech.textContent = "At present? Roughly the distance of one held breath behind you. Do not turn on my account. It moves when embarrassed."; });
    addAction(actions, "Ask about the chalk lines", () => { speech.textContent = "Corrections. The castle insists its corners are square. The string and I have agreed not to contradict it within earshot."; });
  }
  addAction(actions, "Leave", () => dialog.close());
  dialog.showModal();
}

function addAction(container, label, handler) { const button = document.createElement("button"); button.textContent = label; button.addEventListener("click", handler); container.append(button); }

function advanceFloor() {
  document.querySelector("#encounter-dialog").close();
  game.floor += 1; game.torches = Math.min(5, game.torches + 2);
  localStorage.setItem("wikimaze-floor", game.floor); localStorage.setItem("wikimaze-torches", game.torches);
  setupFloor(); showToast(`The keep turns beneath you. Floor ${game.floor} begins.`);
}

function revealMap() {
  if (game.mapUntil) return;
  if (game.torches <= 0) { showToast("No cartographer’s flames remain on this floor."); return; }
  game.torches -= 1; localStorage.setItem("wikimaze-torches", game.torches); updateHud();
  game.mapUntil = performance.now() + 8000;
  document.querySelector("#map-reveal").hidden = false;
  renderMap();
}

function hideMap() { game.mapUntil = 0; document.querySelector("#map-reveal").hidden = true; }

function updateHud() {
  document.querySelector("#score").textContent = player.score.toLocaleString();
  document.querySelector("#score-fill").style.width = `${Math.min(100, player.score / 20000 * 100)}%`;
  document.querySelector("#torch-count").textContent = game.torches;
  document.querySelector("#torch-button").disabled = game.torches <= 0;
  document.querySelector("#floor-number").textContent = roman(game.floor);
}

function roman(number) { const values = [[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]]; let result = ""; for (const [value, mark] of values) while (number >= value) { result += mark; number -= value; } return result; }

function showToast(message) { const toast = document.querySelector("#toast"); toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.hidden = true, 2800); }
function showWhisper(message) {
  const whisper = document.querySelector("#whisper");
  clearTimeout(whisperTimer); whisper.hidden = true; void whisper.offsetWidth;
  whisper.textContent = message; whisper.hidden = false;
  whisperTimer = setTimeout(() => whisper.hidden = true, 5000);
}

async function toggleAmbience() {
  if (!audioContext) createAmbience();
  if (audioContext.state === "suspended") await audioContext.resume();
  ambienceEnabled = !ambienceEnabled;
  ambienceGain.gain.cancelScheduledValues(audioContext.currentTime);
  ambienceGain.gain.setTargetAtTime(ambienceEnabled ? .035 : .0001, audioContext.currentTime, .8);
  const button = document.querySelector("#ambience-button");
  button.setAttribute("aria-pressed", String(ambienceEnabled));
  button.textContent = ambienceEnabled ? "♫ The keep is listening" : "♫ Wake the keep";
}

function createAmbience() {
  audioContext = new AudioContext();
  ambienceGain = audioContext.createGain(); ambienceGain.gain.value = .0001; ambienceGain.connect(audioContext.destination);
  for (const [frequency, volume] of [[43, .42], [64.5, .16]]) {
    const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
    oscillator.type = "sine"; oscillator.frequency.value = frequency; gain.gain.value = volume;
    oscillator.connect(gain).connect(ambienceGain); oscillator.start();
  }
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = audioContext.createBufferSource(), filter = audioContext.createBiquadFilter(), noiseGain = audioContext.createGain();
  noise.buffer = buffer; noise.loop = true; filter.type = "lowpass"; filter.frequency.value = 170; noiseGain.gain.value = .045;
  noise.connect(filter).connect(noiseGain).connect(ambienceGain); noise.start();
}

function playDistantBell() {
  if (!ambienceEnabled || !audioContext) return;
  const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
  oscillator.type = "sine"; oscillator.frequency.setValueAtTime(146.83, audioContext.currentTime); oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 3.2);
  gain.gain.setValueAtTime(.0001, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.16, audioContext.currentTime + .03); gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + 3.2);
  oscillator.connect(gain).connect(ambienceGain); oscillator.start(); oscillator.stop(audioContext.currentTime + 3.3);
}
function showVictory() { showToast("20,000 lore recovered. The curse recognizes a new Keeper of Knowledge."); }

addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) event.preventDefault();
  if (event.repeat && ["e", "m"].includes(key)) return;
  keys.add(key);
  if (key === "e") interact();
  if (key === "m") revealMap();
  if (key === "escape" && game.mapUntil) hideMap();
});
addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));

document.querySelectorAll("[data-control]").forEach((button) => {
  const mapping = { left: "arrowleft", right: "arrowright", forward: "arrowup", back: "arrowdown" };
  const control = button.dataset.control;
  if (control === "interact") button.addEventListener("click", interact);
  else { button.addEventListener("pointerdown", () => keys.add(mapping[control])); for (const event of ["pointerup", "pointercancel", "pointerleave"]) button.addEventListener(event, () => keys.delete(mapping[control])); }
});
document.querySelector("#torch-button").addEventListener("click", revealMap);
document.querySelector("#ambience-button").addEventListener("click", toggleAmbience);
document.querySelector("#map-reveal").addEventListener("click", hideMap);
document.querySelector("#research-button").addEventListener("click", researchQuestion);
document.querySelector("#leave-challenge").addEventListener("click", () => { document.querySelector("#challenge-dialog").close(); activeChallenge = null; });
document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => { const dialog = button.closest("dialog"); dialog.close(); if (dialog.id === "challenge-dialog") activeChallenge = null; }));

const settingsDialog = document.querySelector("#settings-dialog");
const savedSettings = JSON.parse(localStorage.getItem("wikimaze-settings") || "{}");
document.querySelector("#player-name").value = savedSettings.name || `Scholar ${Math.floor(Math.random() * 90 + 10)}`;
document.querySelector("#room-name").value = new URLSearchParams(location.search).get("room") || savedSettings.room || "great-hall";
document.querySelector("#player-color").value = savedSettings.color || "#e9b95c";
document.querySelector("#identity-button").addEventListener("click", () => settingsDialog.showModal());
document.querySelector("#settings-form").addEventListener("submit", (event) => { event.preventDefault(); const settings = getSettings(); localStorage.setItem("wikimaze-settings", JSON.stringify(settings)); joinRoom(); settingsDialog.close(); });

function getSettings() { return { name: document.querySelector("#player-name").value.trim() || "Scholar", room: document.querySelector("#room-name").value.trim() || "great-hall", color: document.querySelector("#player-color").value }; }
function connect() {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  socket = new WebSocket(`${protocol}//${location.host}/multiplayer`);
  socket.addEventListener("open", () => { document.querySelector("#network-dot").classList.add("online"); document.querySelector("#network-label").textContent = `Keep: ${getSettings().room}`; joinRoom(); });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "welcome") playerId = message.id;
    if (message.type === "players") { remotePlayers.clear(); message.players.forEach((remote) => remotePlayers.set(remote.id, remote)); const count = Math.max(1, message.players.length); document.querySelector("#party-count").textContent = `${count} ${count === 1 ? "scholar" : "scholars"}`; }
    if (message.type === "doorState") message.doors.forEach(unlockSharedDoor);
    if (message.type === "doorUnlocked") { unlockSharedDoor(message.doorId); if (message.by !== getSettings().name) showToast(`${message.by} opened a passage for the expedition.`); }
    if (message.type === "passageState") message.passages.forEach(([passageId, open]) => setSharedPassage(passageId, open));
    if (message.type === "passageChanged") setSharedPassage(message.passageId, message.open);
  });
  socket.addEventListener("close", () => { document.querySelector("#network-dot").classList.remove("online"); document.querySelector("#network-label").textContent = "Reconnecting…"; setTimeout(connect, 2000); });
}
function unlockSharedDoor(doorId) { const door = doors.find((item) => item.id === doorId); if (!door) return; door.unlocked = true; maze[door.y][door.x] = "0"; }
function setSharedPassage(passageId, open) { const passage = dynamicPassages.find((item) => item.id === passageId); if (!passage) return; passage.open = Boolean(open); maze[passage.y][passage.x] = passage.open ? "0" : "P"; }
function joinRoom() { if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "join", ...getSettings() })); }
function sendState() { if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "state", ...player })); }

hydrateWikipediaWallArt(); setupFloor(); resize(); connect(); updateHud(); requestAnimationFrame(frame);
const debugParams = new URLSearchParams(location.search);
if (debugParams.has("showcase")) {
  const requestedShowcase = debugParams.get("showcase");
  const wallArtShowcase = requestedShowcase === "wall-art" ? worldObjects.find((object) => object.kind === "painting") : null;
  const showcase = requestedShowcase === "multiplayer" ? null : wallArtShowcase || worldObjects.find((object) => object.kind === "asset" && (object.asset === requestedShowcase || object.themeId === requestedShowcase)) || worldObjects.find((object) => object.kind === "asset");
  if (showcase?.kind === "painting") { player.x = showcase.x; player.y = showcase.y + 1.8; player.angle = -Math.PI / 2; }
  else if (showcase) { player.x = showcase.x - 1.8; player.y = showcase.y; player.angle = 0; }
}
if (debugParams.has("debug")) {
  window.__wikimazeDebug = () => ({ x: player.x, y: player.y, angle: player.angle, floor: game.floor, torches: game.torches, mapVisible: Boolean(game.mapUntil), nearby: interaction?.type || null, roomTheme: roomThemeAt(player.x, player.y).id, roomThemes: ROOM_THEMES.length, remotePlayerCount: [...remotePlayers.values()].filter((remote) => remote.id !== playerId).length, wallArtLoaded: PAINTINGS.filter((painting) => painting.image?.complete && painting.image.naturalWidth).length, mapSize: MAP_SIZE, logicalRooms: ROOM_GRID * ROOM_GRID, furnishings: worldObjects.filter((object) => ["furniture", "chandelier", "window", "asset", "drapery"].includes(object.kind)).length, dynamicPassages: dynamicPassages.length, openDynamicPassages: dynamicPassages.filter((passage) => passage.open).length, generatedProps: worldObjects.filter((object) => object.kind === "asset").length, assetKinds: [...new Set(worldObjects.filter((object) => object.kind === "asset").map((object) => object.asset))], propImagesLoaded: Object.values(PROP_IMAGES).filter((image) => image.complete && image.naturalWidth).length, texturesLoaded: Object.values(textures).filter((texture) => texture.ready !== false).length, inhabitants: worldObjects.filter((object) => object.kind === "character").length, characterImagesLoaded: Object.values(CHARACTER_IMAGES).filter((image) => image.complete && image.naturalWidth).length });
}
setTimeout(() => {
  const archivist = worldObjects.find((item) => item.character === "archivist");
  if (!debugParams.has("debug") && !localStorage.getItem("wikimaze-introduced")) { localStorage.setItem("wikimaze-introduced", "yes"); openCharacter(archivist); }
}, 600);
