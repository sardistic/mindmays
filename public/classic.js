import { EXPANDED_QUESTIONS } from "./classic-question-bank.js";

const DIRECTIONS = ["north", "east", "south", "west"];
const VECTORS = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
const RELATIVE_LABELS = { left: "Left passage", forward: "Passage ahead", right: "Right passage" };
const GRID = 8;
const ROOM_COUNT = GRID * GRID;

const THEMES = [
  { id: "solar", domain: "Courtly histories", texture: "plaster-panel.png", prop: "armor.png", propTitle: "Armour", propTopic: "Plate armour", wall: "#8d744d", dark: "#302218", floor: "#62452c", accent: "#8c4d32", names: ["The Amber Solar", "A Retired Audience Room", "The Long Afternoon"], description: "Late light lies across a chamber built for audiences that no longer take place. The oak panels have been polished at shoulder height.", observations: ["One chair faces the wall.", "The heraldic device belongs to no recorded house."] },
  { id: "library", domain: "Books and languages", texture: "bookcase.png", prop: "curiosity-cabinet.png", propTitle: "Cabinet of Unreturned Things", propTopic: "Cabinet of curiosities", wall: "#70583c", dark: "#261a12", floor: "#4f3725", accent: "#694047", names: ["The Lower Scriptorium", "Library of Unreturned Books", "The Indexing Room"], description: "Books have been fitted into the masonry so closely that the room seems held together by their spines.", observations: ["The shelf marks begin with the letter after Z.", "A page turns whenever the room is silent."] },
  { id: "observatory", domain: "Astronomy and time", texture: "cartographers-wall.png", prop: "orrery.png", propTitle: "The Contrary Orrery", propTopic: "Orrery", wall: "#53636a", dark: "#1d262b", floor: "#41474a", accent: "#426a72", names: ["The Astronomer's Parlour", "The Room of Turning Heavens", "The Meridian Chamber"], description: "A ceiling the color of deep water has been pricked with stars. Several constellations are almost, but not quite, familiar.", observations: ["The brass planets turn when you look away.", "The meridian line points several degrees beneath the floor."] },
  { id: "herbarium", domain: "Life and classification", texture: "specimen-wall.png", prop: "specimen-vitrine.png", propTitle: "A Comparative Cabinet", propTopic: "Natural history", wall: "#69734d", dark: "#22291c", floor: "#4b5035", accent: "#5f7142", names: ["The Dry Garden", "Cabinet of Living Forms", "The Green Physic Room"], description: "Pressed leaves sleep between warped panes of glass. Their labels describe climates that have never existed together.", observations: ["Fresh soil gathers beneath a sealed case.", "One specimen is filed under your surname."] },
  { id: "gallery", domain: "Art and interpretation", texture: "tapestry.png", prop: "armor.png", propTitle: "The Watchful Harness", propTopic: "History of armour", wall: "#71433d", dark: "#2d1715", floor: "#5b3b32", accent: "#853e37", names: ["Gallery of Echoes", "The Unfinished Portrait Hall", "The Red Tapestry Room"], description: "The gallery is longer in its reflections than in the room itself. Every canvas has been varnished except the newest one.", observations: ["The smallest portrait has no visible sitter.", "Dust avoids a narrow path behind you."] },
  { id: "reliquary", domain: "Objects and invention", texture: "plaster-panel.png", prop: "astronomical-clock.png", propTitle: "The Thirteenth Dial", propTopic: "Astronomical clock", wall: "#817045", dark: "#2c2515", floor: "#58513d", accent: "#70582b", names: ["The Cabinet of Measures", "Hall of Small Wonders", "The Collector's Antechamber"], description: "Each niche preserves an instrument whose use is obvious until one tries to describe it.", observations: ["The clock loses a minute when watched.", "A label records tomorrow's accession date."] },
  { id: "chapel", domain: "Belief and ritual", texture: "chapel-fresco.png", prop: "chapel-altar.png", propTitle: "The Empty Reliquary", propTopic: "Reliquary", wall: "#87643f", dark: "#2f2418", floor: "#594c3b", accent: "#744232", names: ["The Chapel of the Missing Saint", "The Votive Room", "An Unconsecrated Apse"], description: "The apse waits beneath a damaged fresco. Every candle bends toward the empty central recess.", observations: ["The newest wax is still warm.", "All the flames cast one fewer shadow than they should."] },
  { id: "cartography", domain: "Maps and disputed places", texture: "cartographers-wall.png", prop: "astronomical-clock.png", propTitle: "The Coastline Clock", propTopic: "History of cartography", wall: "#4e6c6c", dark: "#172729", floor: "#3f4947", accent: "#406b69", names: ["The Cartographer's Workroom", "Atlas Room of Inland Seas", "The Chamber of Disputed Roads"], description: "Maps overlap from floor to cornice. A red route ends at the exact place where you are standing.", observations: ["A coastline changes when you stop measuring it.", "North has been corrected twice in different hands."] },
  { id: "specimen", domain: "Anatomy and adaptation", texture: "specimen-wall.png", prop: "specimen-vitrine.png", propTitle: "The Pinned Wing Cabinet", propTopic: "Entomological collection", wall: "#687242", dark: "#222819", floor: "#414833", accent: "#65713a", names: ["The Pinned Wing Cabinet", "The Comparative Anatomy Room", "Museum of Quiet Species"], description: "Glass cases make a second, smaller architecture inside the room. The specimens are arranged by an obsolete theory of kinship.", observations: ["A pinned wing closes once behind the glass.", "The specimen count changes between shelves."] },
  { id: "nursery", domain: "Memory and childhood", texture: "nursery-wall.png", prop: "covered-rocking-horse.png", propTitle: "The Covered Horse", propTopic: "Rocking horse", wall: "#786b70", dark: "#292227", floor: "#5b514c", accent: "#72515e", names: ["The Nursery Without a Door", "The Lessons Room", "The Small Blue Parlour"], description: "Faded lessons circle the walls beneath a paper border. The room smells faintly of dust and rain-wet wool.", observations: ["The rocking stopped before you entered.", "The wallpaper horses are facing the wall now."] },
];

const PAINTINGS = [
  { title: "Antikythera mechanism", image: "/assets/wall-art/antikythera-mechanism.png" },
  { title: "Great Zimbabwe", image: "/assets/wall-art/great-zimbabwe.png" },
  { title: "Voyager Golden Record", image: "/assets/wall-art/voyager-golden-record.png" },
  { title: "Quipu", image: "/assets/wall-art/quipu.png" },
  { title: "Library of Alexandria", image: "/assets/wall-art/library-of-alexandria.png" },
  { title: "Bioluminescence", image: "/assets/wall-art/bioluminescence.png" },
  { title: "Mansa Musa", image: "/assets/wall-art/mansa-musa.png" },
];

const CHARACTERS = {
  archivist: { name: "Orin Vale", role: "Keeper of the Unwritten Index", image: "archivist", speech: "You arrived with an encyclopedia in your pocket and no map in your hand. Good. This keep rewards curiosity, not certainty.", actions: [["Ask about the rooms", "There are sixty-four today. Do not be comforted by the number; yesterday there were sixty-three."], ["Ask why there is no map", "A map would make the keep an answer. It was built to remain a question."]] },
  jester: { name: "The Riddle Keeper", role: "Examiner of Seals", image: "jester", speech: "A closed door is merely a question that has remembered how to stand upright.", actions: [["Ask about wrong answers", "The keep forgets mistakes faster than scholars do. Return to the seal and it will ask differently."], ["Ask who writes the questions", "Some come from books. Some come from the room behind the door. Those are less polite."]] },
  cartographer: { name: "Ilex Venn", role: "Spectral Cartographer", image: "cartographer", speech: "I mapped every road, then the castle forgot them. I recommend memory in small doses and fire in emergencies.", actions: [["Ask about the flame", "It will not show you a map. Only the next useful direction. The distinction matters to the keep."], ["Ask what lies at the center", "Every route I drew placed a different room there. On the final map, the center was behind me."]] },
  "bell-widow": { name: "The Bell Widow", role: "Keeper of Hours That Did Not Happen", image: "bell-widow", speech: "I keep the keys, not the doors. A distinction the doors are very particular about.", actions: [["Ask about the cracked bell", "It rang once for someone who had not yet arrived. When you entered the Gatehouse, the crack grew wider."], ["Listen to the smallest key", "It opens the little room between one moment and the next. You would not like the dust in there."]] },
  "brother-moth": { name: "Brother Moth", role: "Curator of Nocturnal Reading", image: "brother-moth", speech: "They gather wherever someone reads after midnight. Look closely: they face the page, not the flame.", actions: [["Examine his field notes", "article:Lepidoptera"], ["Ask what lives in the lantern", "Nothing that was born there. Nothing that has found a way out, either. Please do not count them."]] },
  measurer: { name: "The Measurer", role: "Surveyor of Improper Corners", image: "measurer", speech: "This floor contains sixty-five rooms. Yes, I know what the folio says. I have measured the new room from every side and have not found its door.", actions: [["Ask where the new room is", "Roughly the distance of one held breath behind you. Do not turn on my account. It moves when embarrassed."], ["Ask about the chalk lines", "Corrections. The castle insists its corners are square. The string and I do not contradict it within earshot."]] },
  naturalist: { name: "Doctor Clade", role: "Keeper of Resemblances", image: "archivist", speech: "The flower opened when you entered. It has no season, no genus, and until this morning, no interest in faces.", actions: [["Ask about the skeleton", "A teaching model. Very patient. It has allowed me to revise it three times."], ["Look through her lens", "Your left eye contains a branching structure I have only seen in roots. Please hold still while it remembers you."]] },
  cook: { name: "Master Salter", role: "Steward of the Unserved Feast", image: "measurer", speech: "You are late. The covered dish has asked for you twice, though I never told it your name.", actions: [["Ask what is under the lid", "A course prepared for the guest who answers last. I have never had to serve it."], ["Ask why the hearth is cold", "It went out the moment the bread began breathing. Sensible fire."]] },
  tuner: { name: "Vesper Reed", role: "Examiner of Unheard Notes", image: "brother-moth", speech: "There. That frequency again. It begins whenever you think of leaving and stops when you decide not to.", actions: [["Ask about the tuning fork", "It is tuned to the room beyond the left door. The room beyond the left door insists it does not exist."], ["Ask him to strike it again", "I did not strike it the first time. Neither did you. That narrows our list only slightly."]] },
  navigator: { name: "Mara Quoin", role: "Pilot of Disputed Shores", image: "bell-widow", speech: "The compass has stopped pointing north. It points at whichever door you are least likely to choose.", actions: [["Ask about the eye patch", "The covered eye sees coastlines. The uncovered one sees what replaced them."], ["Ask where the map leads", "Back to this table, eventually. Every accurate map of the keep does."]] },
};
const CHARACTER_ROOMS = new Map([[0, "archivist"], [10, "jester"], [21, "cartographer"], [33, "bell-widow"], [46, "brother-moth"], [59, "measurer"]]);
const AVATAR_KEYS = ["archivist", "jester", "cartographer", "bell-widow", "brother-moth", "measurer"];

const CHARACTER_IRRITATION = {
  archivist: ["I have already indexed that answer for you.", "You are repeating yourself. The shelves noticed before you did.", "Ask once more and I shall file you under Echoes, Unhelpful."],
  jester: ["A repeated question is only half a riddle, and not the clever half.", "Yes, yes—the same little door in your head again.", "Ask it once more. I should like to see whether your voice comes out or mine."],
  cartographer: ["We have already stood at this coordinate in the conversation.", "You are walking the same sentence in a circle.", "There is now a small map of your persistence. It is not flattering."],
  "bell-widow": ["That key has already turned.", "You keep asking as though the answer might die between hearings.", "The smallest key has begun to shake. I suggest you stop before it chooses a lock."],
  "brother-moth": ["I answered. Even the moths remember.", "Your question has worn a pale groove through the page.", "Say it again and I will let the lantern answer. It has fewer manners than I do."],
  measurer: ["The answer remains the same length.", "I measured the interval between your repetitions. It is shrinking.", "One more repetition and I shall include you in the room’s dimensions."],
  naturalist: ["Yes. I recorded your first asking as a repetitive behavior.", "Interesting—you return to the same stimulus despite receiving an answer.", "Please continue only if you consent to being labeled as the specimen."],
  cook: ["I heard you the first time. The covered dish heard you too.", "Questions, like onions, do not improve merely because you serve the same one again.", "Ask once more and I will lift the lid. Whatever answers is yours to clear away."],
  tuner: ["That phrase again. Precisely the same pitch.", "You are becoming the note I warned you about.", "Repeat it once more and the room will tune itself to you. Permanently."],
  navigator: ["We have sailed past that question already.", "Your conversation is a coast that refuses to stay behind us.", "Ask again and I will mark this spot Here Be You. Nothing returns from there improved."],
};

const BASE_QUESTIONS = [
  { category: "History", difficulty: 1, source: "Rosetta Stone", prompt: "Which three scripts appear on the Rosetta Stone?", answers: ["Greek, Demotic, and Egyptian hieroglyphs", "Latin, Greek, and Phoenician", "Cuneiform, Aramaic, and Greek", "Hieroglyphs, Latin, and Coptic"], correct: 0, explanation: "The decree appears in Ancient Greek, Demotic Egyptian, and Egyptian hieroglyphs." },
  { category: "Life Science", difficulty: 1, source: "Tardigrade", prompt: "A tardigrade survives severe environmental stress by entering which suspended state?", answers: ["Diapause", "Cryptobiosis", "Hibernation", "Estivation"], correct: 1, explanation: "In cryptobiosis, metabolic activity falls to an almost undetectable level." },
  { category: "Geography", difficulty: 1, source: "Continental divide", prompt: "What does a continental divide separate?", answers: ["Tectonic plates", "Political climates", "Drainage basins flowing toward different seas", "Continents joined by land bridges"], correct: 2, explanation: "A drainage divide directs water into river systems that ultimately reach different seas." },
  { category: "Arts", difficulty: 1, source: "Fresco", prompt: "In true fresco painting, pigment is applied to what surface?", answers: ["Dry wood", "Wet lime plaster", "Waxed canvas", "Polished marble"], correct: 1, explanation: "Buon fresco applies water-mixed pigment to fresh lime plaster." },
  { category: "Astronomy", difficulty: 1, source: "Phases of Venus", prompt: "Galileo's observation of the full set of Venusian phases contradicted which arrangement?", answers: ["Venus always orbiting between Earth and the Sun", "Elliptical planetary orbits", "Earth rotating daily", "Planets reflecting sunlight"], correct: 0, explanation: "A nearly full Venus must pass beyond the Sun, which the standard Ptolemaic arrangement did not allow." },
  { category: "Technology", difficulty: 1, source: "World Wide Web", prompt: "Which trio formed the original technical foundation of the World Wide Web?", answers: ["HTML, HTTP, and URLs", "TCP, Java, and DNS", "C, FTP, and Ethernet", "XML, SMTP, and IP"], correct: 0, explanation: "The early Web combined HTML documents, HTTP transfer, and URL/URI identifiers." },
  { category: "History", difficulty: 2, source: "Treaty of Tordesillas", prompt: "The 1494 Treaty of Tordesillas divided newly encountered lands primarily between which kingdoms?", answers: ["France and England", "Spain and Portugal", "Venice and Genoa", "Denmark and Sweden"], correct: 1, explanation: "Spain and Portugal divided lands outside Europe along a meridian west of Cape Verde." },
  { category: "Biology", difficulty: 2, source: "Mitochondrion", prompt: "Which evidence directly supports the endosymbiotic origin of mitochondria?", answers: ["They occur only in animals", "They contain circular DNA and bacterial-like ribosomes", "The Golgi assembles them", "They share the nuclear membrane"], correct: 1, explanation: "Mitochondria retain circular genomes and bacterial-type ribosomes." },
  { category: "Physics", difficulty: 2, source: "Foucault pendulum", prompt: "A Foucault pendulum provides a direct visible demonstration of what?", answers: ["Earth's rotation", "Earth's orbit", "The speed of sound", "Gravitational time dilation"], correct: 0, explanation: "Its swing plane stays nearly fixed while Earth rotates beneath it." },
  { category: "Literature", difficulty: 2, source: "Frame story", prompt: "Which work uses a pilgrimage to Canterbury as the frame for a collection of tales?", answers: ["The Decameron", "The Canterbury Tales", "The Divine Comedy", "Le Morte d'Arthur"], correct: 1, explanation: "Chaucer's pilgrims tell stories while traveling to the shrine of Thomas Becket." },
  { category: "Geography", difficulty: 2, source: "Salar de Uyuni", prompt: "Salar de Uyuni, the world's largest salt flat, lies in which country?", answers: ["Chile", "Argentina", "Bolivia", "Peru"], correct: 2, explanation: "The salar occupies part of Bolivia's Altiplano." },
  { category: "Music", difficulty: 2, source: "Well temperament", prompt: "What did well temperament make practical for keyboard instruments?", answers: ["Playing only in unison", "Playing in all major and minor keys", "Producing notes without strings", "Holding absolute pitch through temperature changes"], correct: 1, explanation: "Well-tempered systems distributed tuning discrepancies so all major and minor keys remained usable." },
  { category: "History", difficulty: 3, source: "Haitian Revolution", prompt: "Why was the Haitian Revolution historically unprecedented?", answers: ["It first used artillery", "It restored a former king", "A large-scale slave uprising founded an independent state", "It ended every American colony"], correct: 2, explanation: "Enslaved people defeated colonial armies, abolished slavery, and established Haiti." },
  { category: "Genetics", difficulty: 3, source: "Horizontal gene transfer", prompt: "Which process allows bacteria to take up free DNA directly from their environment?", answers: ["Conjugation", "Transduction", "Transformation", "Binary fission"], correct: 2, explanation: "Transformation is the uptake of extracellular DNA." },
  { category: "Astronomy", difficulty: 3, source: "Chandrasekhar limit", prompt: "What happens when a non-rotating white dwarf exceeds the Chandrasekhar limit?", answers: ["It stabilizes as a red giant", "Electron degeneracy pressure can no longer support it", "Surface hydrogen fusion begins", "It becomes less dense"], correct: 1, explanation: "Above roughly 1.4 solar masses, electron degeneracy pressure cannot maintain a stable white dwarf." },
  { category: "Computing", difficulty: 3, source: "Byzantine fault", prompt: "Byzantine fault tolerance addresses components that may do what?", answers: ["Only stop responding", "Present different symptoms to different observers", "Run at different clock speeds", "Use different languages"], correct: 1, explanation: "A Byzantine fault can present different, even contradictory, symptoms to different observers." },
  { category: "Arts", difficulty: 3, source: "Lost-wax casting", prompt: "In lost-wax casting, what happens to the original wax model?", answers: ["It becomes the core", "It melts out before metal is poured", "It is pressed onto the metal", "It turns into ceramic"], correct: 1, explanation: "Heating removes the wax, leaving a cavity for molten metal." },
  { category: "History", difficulty: 4, source: "Peace of Westphalia", prompt: "The Peace of Westphalia formally recognized the independence of which two republics?", answers: ["Venice and Genoa", "The Dutch Republic and Swiss Confederacy", "Ragusa and San Marino", "Poland and Lithuania"], correct: 1, explanation: "The settlements recognized Dutch and Swiss independence." },
  { category: "Physics", difficulty: 4, source: "Noether's theorem", prompt: "According to Noether's theorem, conservation of energy follows from which symmetry?", answers: ["Rotational symmetry", "Spatial translation", "Time translation", "Gauge symmetry alone"], correct: 2, explanation: "If physical laws do not change over time, energy is the associated conserved quantity." },
  { category: "Mathematics", difficulty: 4, source: "Gödel's incompleteness theorems", prompt: "What does Gödel's first incompleteness theorem establish for suitable consistent formal systems?", answers: ["Every truth is provable", "Some true statements are unprovable within the system", "Arithmetic is inconsistent", "Formal systems cannot have axioms"], correct: 1, explanation: "A suitable consistent, effectively axiomatized system is incomplete." },
  { category: "Language", difficulty: 4, source: "Grammaticalization", prompt: "Which change is an example of grammaticalization?", answers: ["An ending becoming a noun", "A lexical verb becoming an auxiliary marker", "Borrowing a place name", "A neighboring-vowel sound change"], correct: 1, explanation: "Grammaticalization turns lexical material into grammatical markers." },
  { category: "Astronomy", difficulty: 4, source: "Lagrange point", prompt: "Why is the Sun–Earth L2 region useful for space observatories?", answers: ["It is inside the atmosphere", "Bright bodies remain in roughly one direction for shielding", "Gravity is absent", "No station-keeping is required"], correct: 1, explanation: "Near L2, the Sun, Earth, and Moon remain on one side, aiding shielding and communication." },
  { category: "History", difficulty: 1, source: "Magna Carta", prompt: "In which year was Magna Carta first sealed by King John of England?", answers: ["1066", "1215", "1348", "1485"], correct: 1, explanation: "King John sealed Magna Carta at Runnymede in 1215." },
  { category: "History", difficulty: 1, source: "Cuneiform", prompt: "Cuneiform writing was normally impressed into tablets made from what material?", answers: ["Clay", "Papyrus", "Silk", "Marble"], correct: 0, explanation: "Scribes pressed wedge-shaped marks into soft clay tablets." },
  { category: "History", difficulty: 1, source: "Silk Road", prompt: "The Silk Road was best described as what?", answers: ["One paved imperial highway", "A network of connected trade routes", "A sea lane around Africa", "A Roman military wall"], correct: 1, explanation: "The name describes overlapping land and sea routes linking regions across Eurasia." },
  { category: "Life Science", difficulty: 1, source: "Chloroplast", prompt: "In plant cells, photosynthesis primarily occurs in which organelle?", answers: ["Nucleus", "Mitochondrion", "Chloroplast", "Golgi apparatus"], correct: 2, explanation: "Chloroplasts contain the pigments and membranes used to capture light energy." },
  { category: "Biology", difficulty: 1, source: "Mammal", prompt: "Which feature is unique to mammals among living vertebrates?", answers: ["Lungs", "Milk-producing mammary glands", "A backbone", "Four limbs"], correct: 1, explanation: "Mammary glands producing milk are the defining feature for which mammals are named." },
  { category: "Geography", difficulty: 1, source: "Equator", prompt: "What latitude is assigned to the Equator?", answers: ["0 degrees", "23.5 degrees north", "66.5 degrees south", "180 degrees"], correct: 0, explanation: "The Equator is the reference parallel at zero degrees latitude." },
  { category: "Geography", difficulty: 1, source: "Andes", prompt: "Along which side of South America do the Andes principally run?", answers: ["Eastern", "Western", "Northern", "Southern coast only"], correct: 1, explanation: "The Andes extend along the continent's western margin." },
  { category: "Arts", difficulty: 1, source: "Perspective (graphical)", prompt: "In linear perspective, parallel lines receding from the viewer appear to meet at what?", answers: ["A color wheel", "A vanishing point", "The picture frame", "A contour line"], correct: 1, explanation: "Receding parallel lines converge visually toward a vanishing point on the horizon." },
  { category: "Music", difficulty: 1, source: "Tempo", prompt: "In music, what does tempo describe?", answers: ["The speed of a piece", "Its key signature", "Its loudest note", "The number of instruments"], correct: 0, explanation: "Tempo indicates how quickly or slowly the beat proceeds." },
  { category: "Physics", difficulty: 1, source: "Boiling point", prompt: "At standard atmospheric pressure, pure water boils at what Celsius temperature?", answers: ["0 °C", "50 °C", "100 °C", "212 °C"], correct: 2, explanation: "At one standard atmosphere, water's boiling point is 100 degrees Celsius." },
  { category: "Astronomy", difficulty: 1, source: "Tide", prompt: "Which celestial body has the strongest influence on Earth's ocean tides?", answers: ["Mars", "The Moon", "Venus", "Polaris"], correct: 1, explanation: "The Moon's nearby gravitational pull is the largest contributor to Earth's tides." },
  { category: "History", difficulty: 2, source: "Printing press", prompt: "Johannes Gutenberg's European printing system was especially enabled by which reusable component?", answers: ["Movable metal type", "Papyrus rolls", "Steam power", "Photographic plates"], correct: 0, explanation: "Reusable movable metal type allowed pages to be composed and printed efficiently." },
  { category: "History", difficulty: 2, source: "Columbian exchange", prompt: "The Columbian Exchange refers to transfers between which regions after 1492?", answers: ["The Americas and the Old World", "India and China only", "Northern and southern Africa", "Rome and Carthage"], correct: 0, explanation: "Plants, animals, people, diseases, and ideas moved between the Americas and Afro-Eurasia." },
  { category: "History", difficulty: 2, source: "Meiji Restoration", prompt: "The Meiji Restoration of 1868 returned political authority in Japan to whom?", answers: ["The Tokugawa shogun", "The emperor", "The daimyo council", "The Mongol khan"], correct: 1, explanation: "The restoration formally returned imperial rule under Emperor Meiji." },
  { category: "Biology", difficulty: 2, source: "Xylem", prompt: "Which plant tissue transports water and dissolved minerals upward from the roots?", answers: ["Phloem", "Xylem", "Epidermis", "Cambium alone"], correct: 1, explanation: "Xylem conducts water and minerals and also helps support the plant." },
  { category: "Life Science", difficulty: 2, source: "Lichen", prompt: "A lichen is primarily a partnership between a fungus and what photosynthetic organism?", answers: ["An alga or cyanobacterium", "A moss", "A fern", "A protozoan"], correct: 0, explanation: "The fungal partner lives with an alga or cyanobacterium capable of photosynthesis." },
  { category: "Geography", difficulty: 2, source: "Ring of Fire", prompt: "The volcanic Ring of Fire surrounds most of which ocean?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2, explanation: "Dense plate boundaries around the Pacific produce frequent earthquakes and volcanoes." },
  { category: "Geography", difficulty: 2, source: "Rain shadow", prompt: "A rain shadow most often forms on which side of a mountain range?", answers: ["Windward", "Leeward", "Equatorial", "Seaward regardless of wind"], correct: 1, explanation: "Air loses moisture while rising windward, then descends warmer and drier on the leeward side." },
  { category: "Geography", difficulty: 2, source: "Mercator projection", prompt: "What does the Mercator projection increasingly exaggerate toward the poles?", answers: ["Area", "Longitude count", "Ocean depth", "Elevation"], correct: 0, explanation: "Mercator preserves local angles but greatly enlarges high-latitude areas." },
  { category: "Arts", difficulty: 2, source: "Chiaroscuro", prompt: "Chiaroscuro creates pictorial volume chiefly through strong contrasts of what?", answers: ["Scale and symmetry", "Light and dark", "Texture and scent", "Line and meter"], correct: 1, explanation: "Chiaroscuro models form through pronounced transitions between illumination and shadow." },
  { category: "Literature", difficulty: 2, source: "Sonnet", prompt: "How many lines does a traditional sonnet contain?", answers: ["Eight", "Twelve", "Fourteen", "Sixteen"], correct: 2, explanation: "The major Italian and English sonnet traditions use fourteen lines." },
  { category: "Physics", difficulty: 2, source: "Spectroscopy", prompt: "Why can an element be identified from its spectral lines?", answers: ["Every element has characteristic electron energy transitions", "All elements emit the same colors", "Spectra measure atomic weight directly", "Light removes every electron"], correct: 0, explanation: "Quantized electron transitions produce a characteristic pattern of emitted or absorbed wavelengths." },
  { category: "History", difficulty: 3, source: "Edict of Nantes", prompt: "What did the Edict of Nantes grant French Huguenots in 1598?", answers: ["The French throne", "Limited religious and civil rights", "Control of the papacy", "Independence for Brittany"], correct: 1, explanation: "Henry IV granted substantial, though limited, protections to French Protestants." },
  { category: "History", difficulty: 3, source: "Berlin Conference", prompt: "The Berlin Conference of 1884–85 established rules chiefly for what process?", answers: ["European claims and trade in Africa", "German reunification", "Decolonizing Asia", "Founding the League of Nations"], correct: 0, explanation: "European powers set procedures for occupation and commerce during the partition of Africa." },
  { category: "Genetics", difficulty: 3, source: "CRISPR gene editing", prompt: "In CRISPR-Cas9 editing, what normally directs Cas9 to a matching DNA sequence?", answers: ["A guide RNA", "A lipid membrane", "A ribosomal protein", "A transfer RNA carrying an amino acid"], correct: 0, explanation: "A designed guide RNA base-pairs with the target and positions the Cas9 nuclease." },
  { category: "Genetics", difficulty: 3, source: "Hardy–Weinberg principle", prompt: "Which condition is required for Hardy–Weinberg equilibrium?", answers: ["Strong natural selection", "Random mating", "A very small population", "Continuous mutation"], correct: 1, explanation: "The idealized equilibrium assumes random mating and no selection, migration, mutation, or genetic drift." },
  { category: "Geography", difficulty: 3, source: "Coriolis force", prompt: "In which direction does the Coriolis effect deflect large-scale motion in the Northern Hemisphere?", answers: ["To its right", "To its left", "Always east", "Straight upward"], correct: 0, explanation: "Relative to its direction of travel, motion is deflected right in the Northern Hemisphere." },
  { category: "Geography", difficulty: 3, source: "Karst", prompt: "Karst landscapes most commonly develop through dissolution of which rock?", answers: ["Granite", "Limestone", "Basalt", "Quartzite"], correct: 1, explanation: "Slightly acidic water dissolves soluble carbonate rock, especially limestone, forming caves and sinkholes." },
  { category: "Arts", difficulty: 3, source: "Contrapposto", prompt: "In sculpture, contrapposto describes a figure posed with what arrangement?", answers: ["Weight resting mainly on one leg", "Both arms held symmetrically overhead", "The body carved without joints", "The face shown in strict profile"], correct: 0, explanation: "The weight shift creates an asymmetrical, natural relationship among hips, shoulders, and limbs." },
  { category: "Music", difficulty: 3, source: "Fugue", prompt: "What is the subject of a fugue?", answers: ["A musical theme that recurs", "The final chord only", "A percussion pattern", "Its performance venue"], correct: 0, explanation: "The subject is a musical theme that recurs as voices introduce and develop it contrapuntally." },
  { category: "Astronomy", difficulty: 3, source: "Redshift", prompt: "A galaxy's spectral lines shifted toward longer wavelengths generally indicate what?", answers: ["Approach toward the observer", "Recession from the observer", "The absence of hydrogen", "A lower telescope magnification"], correct: 1, explanation: "Cosmological and Doppler redshift move observed features toward longer, redder wavelengths." },
  { category: "Computing", difficulty: 3, source: "RSA cryptosystem", prompt: "The practical security of ordinary RSA most directly relies on the difficulty of what task?", answers: ["Factoring a large composite integer", "Sorting a list", "Adding prime numbers", "Compressing a text file"], correct: 0, explanation: "Recovering the private key from the public modulus is tied to factoring a product of large primes." },
  { category: "History", difficulty: 4, source: "Investiture Controversy", prompt: "The medieval Investiture Controversy centered on who could appoint which officials?", answers: ["Bishops and abbots", "Guild masters", "Roman senators", "University rectors"], correct: 0, explanation: "Popes and secular rulers contested authority to invest senior church officials." },
  { category: "History", difficulty: 4, source: "Devshirme", prompt: "Under the Ottoman devshirme system, recruited Christian boys were commonly trained for what?", answers: ["Janissary and palace service", "Hereditary feudal knighthood", "Election to the papacy", "Merchant guild monopolies"], correct: 0, explanation: "Recruits were converted and educated for elite military or administrative service." },
  { category: "Biology", difficulty: 4, source: "Allosteric regulation", prompt: "An allosteric regulator changes enzyme activity by binding where?", answers: ["Only at the active site", "At a distinct regulatory site", "To the product's nucleus", "Permanently to every substrate"], correct: 1, explanation: "Binding at an allosteric site alters the enzyme's conformation and activity." },
  { category: "Genetics", difficulty: 4, source: "Hox gene", prompt: "What do Hox genes chiefly help specify during animal development?", answers: ["Body-region identity along an axis", "The exact DNA mutation rate", "Blood oxygen concentration", "Only the sex of offspring"], correct: 0, explanation: "Hox transcription factors assign positional identities to developing body regions." },
  { category: "Biology", difficulty: 4, source: "Cladistics", prompt: "In cladistics, a synapomorphy is what kind of trait?", answers: ["A shared derived character", "Any ancestral character", "A trait caused only by diet", "A feature unique to every organism"], correct: 0, explanation: "Shared derived characters provide evidence for a clade's common ancestry." },
  { category: "Geography", difficulty: 4, source: "Isostasy", prompt: "Isostasy describes gravitational equilibrium between the crust and what underlying layer?", answers: ["The atmosphere", "The mantle", "The solid inner core", "The ocean surface"], correct: 1, explanation: "Earth's crust or lithosphere sits in gravitational balance with the mantle." },
  { category: "Geography", difficulty: 4, source: "Thermohaline circulation", prompt: "What two seawater properties chiefly drive thermohaline circulation?", answers: ["Temperature and salinity", "Color and wave height", "Latitude and longitude", "Acidity and cloud cover"], correct: 0, explanation: "Temperature and salinity control seawater density and help drive deep-ocean circulation." },
  { category: "Literature", difficulty: 4, source: "Negative capability", prompt: "John Keats's idea of negative capability praises a writer's ability to remain in what condition?", answers: ["Uncertainties and mysteries without reaching after fact or reason", "Strict obedience to classical unities", "Complete autobiographical accuracy", "Permanent political neutrality"], correct: 0, explanation: "Keats valued remaining in uncertainties, mysteries, and doubts without irritably reaching after fact or reason." },
  { category: "Physics", difficulty: 4, source: "Bell's theorem", prompt: "Bell's theorem shows quantum mechanics to be incompatible with which broad class of explanations, given its basic measurement assumptions?", answers: ["Local hidden-variable theories", "Theories conserving energy and momentum", "Wave-particle descriptions", "Theories with space and time dimensions"], correct: 0, explanation: "Bell's theorem rules out local hidden-variable theories as complete reproductions of quantum predictions, given its basic assumptions." },
  { category: "Mathematics", difficulty: 4, source: "Cantor's diagonal argument", prompt: "Cantor's diagonal argument proves that which set is uncountable?", answers: ["The integers", "The rational numbers", "The real numbers", "The prime numbers"], correct: 2, explanation: "A new real number can be constructed that differs from every entry in any proposed complete list." },
];

const QUESTIONS = [...BASE_QUESTIONS, ...EXPANDED_QUESTIONS];

const UNEASY_LINES = [
  "Somewhere outside the picture, a page turns.",
  "The room appears to contain one more corner than before.",
  "A bell sounds from one floor below. There is no floor below.",
  "For a moment, the passage behind you is breathing.",
  "Someone has written your last answer in the dust.",
  "The portrait waits until you blink.",
  "Another set of footsteps stops when yours do.",
  "The keep has remembered this room differently.",
];

const ROOM_PLATES = [
  { id: "astronomer", asset: "/assets/classic/astronomer.png", close: "/assets/classic/astronomer-close.png", names: ["The Astronomer's Study", "The Meridian Room", "The Blue Orrery"], character: "cartographer", topic: "History of astronomy", note: "The telescope is trained on a patch of stone wall.", char: [20, 24, 17, 66], knowledge: [31, 55, 38, 38] },
  { id: "alchemist", asset: "/assets/classic/alchemist.png", close: "/assets/classic/alchemist-close.png", names: ["The Still Room", "The Green Retort", "The Alchemist's Kitchen"], character: "bell-widow", topic: "Alchemy", note: "The green liquid gives off no reflection.", char: [59, 25, 18, 68], knowledge: [21, 43, 38, 49] },
  { id: "royal", asset: "/assets/classic/royal.png", close: "/assets/classic/royal-close.png", names: ["The Anxious Audience", "The Empty Throne Room", "The Chamber of Small Honors"], character: "measurer", topic: "Heraldry", note: "No two quarters of the shield agree on the same kingdom.", char: [20, 24, 18, 68], knowledge: [61, 44, 22, 34] },
  { id: "library", asset: "/assets/classic/library.png", close: "/assets/classic/library-close.png", names: ["The Parrot's Library", "The Lower Reading Room", "The Book of Inland Seas"], character: "brother-moth", topic: "History of encyclopedias", note: "The parrot turns a page without touching it.", char: [53, 22, 18, 70], knowledge: [26, 42, 24, 43] },
  { id: "chapel", asset: "/assets/classic/chapel.png", close: "/assets/classic/chapel-close.png", names: ["The Chapel of the Missing Saint", "The Leaning Candles", "The Empty Reliquary"], character: "archivist", topic: "Reliquary", note: "Every flame leans toward the empty recess.", char: [22, 24, 18, 66], knowledge: [35, 34, 35, 42] },
  { id: "nursery", asset: "/assets/classic/nursery.png", close: "/assets/classic/nursery-close.png", names: ["The Lessons Room", "The Nursery Without a Door", "The Fool's Primer"], character: "jester", topic: "History of education", note: "The portrait miniatures disagree about where you are standing.", char: [64, 23, 17, 68], knowledge: [13, 42, 25, 40] },
  { id: "conservatory", asset: "/assets/classic/conservatory.png", close: "/assets/classic/conservatory-close.png", names: ["The Pale Flower Room", "Cabinet of Resemblances", "The Conservatory of Wrong Seasons"], character: "naturalist", topic: "History of botany", note: "The pale flower has turned to face you.", char: [18, 23, 19, 68], knowledge: [30, 48, 42, 42] },
  { id: "kitchen", asset: "/assets/classic/kitchen.png", close: "/assets/classic/kitchen-close.png", names: ["The Unserved Kitchen", "The Cold Hearth", "The Last Course"], character: "cook", topic: "Medieval cuisine", note: "Something beneath the copper lid taps once.", char: [65, 23, 18, 70], knowledge: [21, 54, 48, 36] },
  { id: "music", asset: "/assets/classic/music.png", close: "/assets/classic/music-close.png", names: ["The Unheard Note", "Chamber of Small Resonances", "The Tuning Room"], character: "tuner", topic: "Acoustics", note: "The tuning fork vibrates before it is struck.", char: [23, 22, 19, 70], knowledge: [59, 35, 27, 47] },
  { id: "maproom", asset: "/assets/classic/maproom.png", close: "/assets/classic/maproom-close.png", names: ["The Disputed Coast", "The Navigator's Table", "Atlas of Returning Roads"], character: "navigator", topic: "History of cartography", note: "The compass points directly at the door behind you.", char: [65, 23, 18, 68], knowledge: [23, 50, 45, 39] },
  { id: "astrolabe", asset: "/assets/classic/astrolabe.png", names: ["The Unreflected Reliquary", "Cabinet of the Brass Sky", "The Pointer Room"], character: null, topic: "Astrolabe", note: "The glass reflects every part of the room except the astrolabe. Its pointer follows you.", knowledge: [36, 35, 34, 55] },
  { id: "clock", asset: "/assets/classic/clock.png", names: ["The Thirteenth Hour", "The Contrary Clock Room", "Chamber of the Late Moon"], character: null, topic: "Astronomical clock", note: "There are thirteen marks on the dial. The pendulum's shadow swings before the pendulum does.", knowledge: [35, 8, 31, 72] },
  { id: "manuscript", asset: "/assets/classic/manuscript.png", names: ["The Book of This Room", "The Blank Scriptorium", "The Doorway Folio"], character: null, topic: "Illuminated manuscript", note: "The pages are blank except for a painted doorway identical to the one behind you.", knowledge: [31, 43, 39, 45] },
  { id: "cabinet", asset: "/assets/classic/cabinet.png", names: ["Cabinet of Quiet Species", "The Listening Shell", "Museum of Uncatalogued Shores"], character: null, topic: "Cabinet of curiosities", note: "Fingerprints cloud the inside of the bell jar. The shell's opening is warm.", knowledge: [37, 18, 27, 66] },
];

const state = {
  current: 0,
  facing: 1,
  history: [],
  visited: new Set(JSON.parse(localStorage.getItem("wikimaze-classic-visited") || "[0]")),
  unlocked: new Set(JSON.parse(localStorage.getItem("wikimaze-classic-unlocked") || "[]")),
  score: Number(localStorage.getItem("wikimaze-score")) || 0,
  flames: Number(localStorage.getItem("wikimaze-classic-flames")) || 5,
  solved: Number(localStorage.getItem("wikimaze-classic-solved")) || 0,
  articles: JSON.parse(localStorage.getItem("wikimaze-classic-articles") || "[]"),
  questionAttempts: JSON.parse(localStorage.getItem("wikimaze-classic-question-attempts") || "{}"),
  questionHistory: JSON.parse(localStorage.getItem("wikimaze-classic-question-history") || "[]"),
  dialogueCounts: JSON.parse(localStorage.getItem("wikimaze-classic-dialogue-counts") || "{}"),
  activeChallenge: null,
  routeUntil: 0,
  moving: false,
  level: Number(localStorage.getItem("wikimaze-classic-level")) || 1,
  subject: localStorage.getItem("wikimaze-classic-subject") || "All",
  encounter: null,
};

const roomScene = document.querySelector("#room-scene");
const transitionCurtain = document.querySelector("#transition-curtain");
const remotePlayers = new Map();
const articleCache = new Map();
let rooms;
let roomDepths;
let socket;
let playerId;
let audioContext;
let ambienceGain;
let ambienceOn = localStorage.getItem("wikimaze-classic-sound") === "on";
let soundCueCount = 0;
let whisperTimer;
let routeTimer;
let encounterTimer;

function mulberry32(seed) {
  return () => { let value = seed += 0x6D2B79F5; value = Math.imul(value ^ value >>> 15, value | 1); value ^= value + Math.imul(value ^ value >>> 7, value | 61); return ((value ^ value >>> 14) >>> 0) / 4294967296; };
}
function hash(value) { let result = 2166136261; for (const character of String(value)) { result ^= character.charCodeAt(0); result = Math.imul(result, 16777619); } return result >>> 0; }
function roomIndex(x, y) { return y * GRID + x; }
function neighbor(index, direction) { const room = rooms[index], vector = VECTORS[direction]; const x = room.x + vector.x, y = room.y + vector.y; return x >= 0 && x < GRID && y >= 0 && y < GRID ? roomIndex(x, y) : -1; }
function opposite(direction) { return (direction + 2) % 4; }
function edgeKey(from, to) { return `${Math.min(from, to)}-${Math.max(from, to)}`; }
function edgeDoorId(key) { const [a, b] = key.split("-"); return `f90-${a}-${b}`; }

function buildKeep() {
  const random = mulberry32(0x51A7C4);
  rooms = Array.from({ length: ROOM_COUNT }, (_, index) => ({ index, x: index % GRID, y: Math.floor(index / GRID), exits: new Set() }));
  const visited = new Set([0]), stack = [0];
  while (stack.length) {
    const current = stack.at(-1);
    const candidates = DIRECTIONS.map((_, direction) => ({ direction, next: neighbor(current, direction) })).filter(({ next }) => next >= 0 && !visited.has(next));
    if (!candidates.length) { stack.pop(); continue; }
    const choice = candidates[Math.floor(random() * candidates.length)];
    rooms[current].exits.add(choice.direction); rooms[choice.next].exits.add(opposite(choice.direction));
    visited.add(choice.next); stack.push(choice.next);
  }
  for (let attempt = 0; attempt < 22; attempt++) {
    const current = Math.floor(random() * ROOM_COUNT), direction = Math.floor(random() * 4), next = neighbor(current, direction);
    if (next >= 0 && rooms[current].exits.size < 3 && rooms[next].exits.size < 3) { rooms[current].exits.add(direction); rooms[next].exits.add(opposite(direction)); }
  }
  roomDepths = Array(ROOM_COUNT).fill(Infinity); roomDepths[0] = 0;
  const queue = [0];
  while (queue.length) {
    const current = queue.shift();
    for (const direction of rooms[current].exits) { const next = neighbor(current, direction); if (roomDepths[next] > roomDepths[current] + 1) { roomDepths[next] = roomDepths[current] + 1; queue.push(next); } }
  }
  state.facing = [...rooms[0].exits][0] ?? 1;
}

function roomTheme(room) { return THEMES[(room.x * 3 + room.y * 7 + room.index) % THEMES.length]; }
function roomPainting(room) { return PAINTINGS[(room.index * 5 + room.y) % PAINTINGS.length]; }
function roomPlate(room) { return ROOM_PLATES[(room.x * 5 + room.y * 3 + room.index) % ROOM_PLATES.length]; }
function roomTitle(room) { const plate = roomPlate(room); return plate.names[(room.x + room.y * 2) % plate.names.length]; }
function isLocked(from, to) {
  return !state.unlocked.has(edgeKey(from, to));
}
function roomStatus(plate) { return plate.character ? `${CHARACTERS[plate.character].name} is here. Click a painted door to continue.` : `No inhabitant waits here. ${plate.topic} can be examined.`; }
function relativeDirection(relative) { return positiveMod(state.facing + ({ left: -1, forward: 0, right: 1 }[relative]), 4); }
function positiveMod(value, divisor) { return ((value % divisor) + divisor) % divisor; }
function cardinalLabel(direction) { return DIRECTIONS[direction][0].toUpperCase() + DIRECTIONS[direction].slice(1); }

function renderRoom() {
  const room = rooms[state.current], plate = roomPlate(room);
  document.querySelector("#room-plate-image").src = plate.asset;
  document.querySelector("#room-plate-image").alt = roomTitle(room);
  document.querySelector("#room-title").textContent = roomTitle(room);
  document.querySelector("#room-bearing").textContent = `Chamber ${String(room.index + 1).padStart(2, "0")} · facing ${DIRECTIONS[state.facing]}`;
  document.querySelector("#room-status").textContent = roomStatus(plate);
  const characterHotspot = document.querySelector("#character-hotspot"), hasInhabitant = Boolean(plate.character);
  characterHotspot.hidden = !hasInhabitant;
  if (hasInhabitant) { roomScene.style.setProperty("--char-left", `${plate.char[0]}%`); roomScene.style.setProperty("--char-top", `${plate.char[1]}%`); roomScene.style.setProperty("--char-width", `${plate.char[2]}%`); roomScene.style.setProperty("--char-height", `${plate.char[3]}%`); characterHotspot.dataset.character = plate.character; characterHotspot.title = `Speak to ${CHARACTERS[plate.character].name}`; }
  roomScene.style.setProperty("--knowledge-left", `${plate.knowledge[0]}%`); roomScene.style.setProperty("--knowledge-top", `${plate.knowledge[1]}%`); roomScene.style.setProperty("--knowledge-width", `${plate.knowledge[2]}%`); roomScene.style.setProperty("--knowledge-height", `${plate.knowledge[3]}%`);
  document.querySelector("#painting-hotspot").title = `Examine: ${plate.topic}`;

  let choices = [...room.exits].filter((direction) => direction !== opposite(state.facing));
  if (!choices.length && room.exits.has(opposite(state.facing))) choices = [opposite(state.facing)];
  if (!state.history.length) choices = [...room.exits];
  choices = choices.slice(0, 2);
  for (const [index, button] of [document.querySelector("#exit-left"), document.querySelector("#exit-right")].entries()) {
    const direction = choices[index]; button.hidden = direction === undefined;
    if (direction === undefined) continue;
    const next = neighbor(room.index, direction), locked = isLocked(room.index, next);
    button.dataset.direction = String(direction); button.classList.toggle("locked", locked);
    button.querySelector("span").textContent = `${locked ? "SEALED" : "OPEN"} · ${cardinalLabel(direction)}`;
    button.setAttribute("aria-label", `${locked ? "Question-sealed" : "Open"} ${DIRECTIONS[direction]} door`);
  }
  document.querySelector("#previous-room").disabled = state.history.length === 0;
  renderMazeGrid(state.routeUntil > performance.now()); renderRemoteScholars(); updateJournal(); updateHud(); sendState();
}

function moveThrough(direction) {
  if (state.moving) return;
  const next = neighbor(state.current, direction);
  if (next < 0 || !rooms[state.current].exits.has(direction)) return;
  if (isLocked(state.current, next)) { openChallenge(direction); return; }
  playCue("door");
  state.moving = true; transitionCurtain.classList.remove("moving"); void transitionCurtain.offsetWidth; transitionCurtain.classList.add("moving");
  setTimeout(() => {
    state.history.push({ room: state.current, facing: state.facing });
    state.current = next; state.facing = direction; state.visited.add(next); persist(); renderRoom(); maybeWhisper();
  }, 220);
  setTimeout(() => { state.moving = false; transitionCurtain.classList.remove("moving"); }, 510);
}

function returnToPrevious() {
  if (!state.history.length || state.moving) return;
  playCue("door");
  state.moving = true; transitionCurtain.classList.remove("moving"); void transitionCurtain.offsetWidth; transitionCurtain.classList.add("moving");
  setTimeout(() => { const previous = state.history.pop(); state.current = previous.room; state.facing = previous.facing; renderRoom(); }, 220);
  setTimeout(() => { state.moving = false; transitionCurtain.classList.remove("moving"); }, 510);
}
function turnAround() { if (state.moving) return; state.facing = opposite(state.facing); renderRoom(); }

function questionFor(direction) {
  const groups = { History: ["History"], Life: ["Life Science", "Biology", "Genetics"], Arts: ["Arts", "Literature", "Music", "Language"], Geography: ["Geography"], Science: ["Physics", "Chemistry", "Astronomy", "Technology", "Computing", "Mathematics"] };
  let candidates = QUESTIONS.filter((question) => question.difficulty === state.level && (state.subject === "All" || groups[state.subject]?.includes(question.category)));
  if (!candidates.length) candidates = QUESTIONS.filter((question) => question.difficulty === state.level);
  const next = neighbor(state.current, direction), key = edgeKey(state.current, next), attempt = state.questionAttempts[key] || 0;
  const unseen = candidates.filter((question) => !state.questionHistory.includes(question.prompt));
  if (!unseen.length) return [...candidates].sort((a, b) => state.questionHistory.indexOf(b.prompt) - state.questionHistory.indexOf(a.prompt))[0];
  return unseen[(hash(`${key}-${state.level}-${state.subject}`) + attempt) % unseen.length];
}
function openChallenge(direction) {
  playCue("seal");
  const question = questionFor(direction), dialog = document.querySelector("#challenge-dialog");
  state.questionHistory = [question.prompt, ...state.questionHistory.filter((prompt) => prompt !== question.prompt)].slice(0, 96); persist();
  state.activeChallenge = { direction, question, researched: false, answered: false };
  document.querySelector("#question-category").textContent = question.category;
  document.querySelector("#question-rank").textContent = `Level ${question.difficulty}`;
  document.querySelector("#question-value").textContent = `${[0, 256, 512, 1024, 2048][question.difficulty]} points`;
  document.querySelector("#question-prompt").textContent = question.prompt;
  document.querySelector("#question-result").textContent = "";
  document.querySelector("#research-drawer").hidden = true;
  const answerBox = document.querySelector("#question-answers"); answerBox.replaceChildren();
  question.answers.forEach((answer, index) => { const button = document.createElement("button"); button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`; button.dataset.answer = String(index); button.addEventListener("click", () => answerQuestion(index)); answerBox.append(button); });
  dialog.hidden = false;
}
function answerQuestion(index) {
  const challenge = state.activeChallenge;
  if (!challenge || challenge.answered) return;
  challenge.answered = true;
  const buttons = [...document.querySelectorAll("#question-answers button")], correct = index === challenge.question.correct;
  buttons.forEach((button, buttonIndex) => { button.disabled = true; if (buttonIndex === challenge.question.correct) button.classList.add("correct"); if (buttonIndex === index && !correct) button.classList.add("wrong"); });
  if (correct) {
    playCue("correct");
    const target = neighbor(state.current, challenge.direction), key = edgeKey(state.current, target), reward = Math.round([0, 256, 512, 1024, 2048][challenge.question.difficulty] * (challenge.researched ? .5 : 1));
    state.unlocked.add(key); delete state.questionAttempts[key]; state.score += reward; state.solved += 1; persist(); updateHud();
    document.querySelector("#question-result").textContent = `${challenge.question.explanation} Correct! ${reward} points added to your score.`;
    if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "unlock", doorId: edgeDoorId(key) }));
    setTimeout(() => { document.querySelector("#challenge-dialog").hidden = true; state.activeChallenge = null; renderRoom(); moveThrough(challenge.direction); }, 1050);
  } else {
    playCue("wrong");
    const target = neighbor(state.current, challenge.direction), key = edgeKey(state.current, target);
    state.questionAttempts[key] = (state.questionAttempts[key] || 0) + 1; persist();
    document.querySelector("#question-result").textContent = `${challenge.question.explanation} The seal rejects that answer and is choosing another question…`;
    setTimeout(() => { if (state.activeChallenge === challenge) openChallenge(challenge.direction); }, 1150);
  }
}

async function researchActiveQuestion() {
  const challenge = state.activeChallenge; if (!challenge) return;
  challenge.researched = true;
  document.querySelector("#question-value").textContent = "Half lore · research used";
  const drawer = document.querySelector("#research-drawer"); drawer.hidden = false;
  document.querySelector("#research-title").textContent = "Consulting the living encyclopedia…"; document.querySelector("#research-extract").textContent = "";
  const article = await fetchArticle(challenge.question.source);
  document.querySelector("#research-title").textContent = article.title; document.querySelector("#research-extract").textContent = article.extract; document.querySelector("#research-link").href = article.url;
}

async function fetchArticle(title) {
  if (articleCache.has(title)) return articleCache.get(title);
  try {
    const response = await fetch(`/api/wiki?title=${encodeURIComponent(title)}`); if (!response.ok) throw new Error("archive unavailable");
    const article = await response.json(); articleCache.set(title, article); return article;
  } catch { return { title, extract: "The living encyclopedia could not be reached. The subject remains recorded in the room, awaiting a connection.", url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`, thumbnail: null }; }
}
async function openArticle(title, image, note = "", kind = "The living encyclopedia") {
  const dialog = document.querySelector("#article-dialog");
  document.querySelector("#article-kind").textContent = kind; document.querySelector("#article-title").textContent = "Opening the archive…"; document.querySelector("#article-extract").textContent = "";
  const illustration = document.querySelector("#article-image"); illustration.src = image; illustration.alt = title;
  const objectNote = document.querySelector("#object-note"); objectNote.hidden = !note; objectNote.textContent = note;
  dialog.hidden = false;
  const article = await fetchArticle(title); document.querySelector("#article-title").textContent = article.title; document.querySelector("#article-extract").textContent = article.extract; document.querySelector("#article-link").href = article.url;
  if (!state.articles.includes(article.title)) { state.articles.unshift(article.title); state.articles = state.articles.slice(0, 20); persist(); updateJournal(); }
}

function openCharacter(key) {
  const character = CHARACTERS[key], dialog = document.querySelector("#character-dialog");
  const plate = roomPlate(rooms[state.current]), plateCharacter = document.querySelector("#dialog-character-image");
  plateCharacter.src = plate.asset; plateCharacter.alt = character.name; plateCharacter.style.objectPosition = `${plate.char[0] + plate.char[2] / 2}% ${plate.char[1] + plate.char[3] / 2}%`;
  document.querySelector("#character-role").textContent = character.role; document.querySelector("#character-name").textContent = character.name;
  dialog.classList.remove("irritated"); dialog.dataset.irritation = "0"; roomScene.classList.remove("dialogue-irritated");
  const speech = document.querySelector("#character-speech"); speech.textContent = character.speech;
  const actions = document.querySelector("#character-actions"); actions.replaceChildren();
  character.actions.forEach(([label, response], actionIndex) => {
    const button = document.createElement("button"); button.textContent = label;
    button.addEventListener("click", () => {
      const countKey = `${key}:${actionIndex}`, count = (state.dialogueCounts[countKey] || 0) + 1;
      state.dialogueCounts[countKey] = count; persist();
      if (count > 1) {
        const irritation = Math.min(3, count - 1), lines = CHARACTER_IRRITATION[key] || ["I already answered that.", "You are repeating yourself.", "That is enough."];
        playCue("irritated", irritation);
        speech.textContent = lines[irritation - 1]; dialog.classList.add("irritated"); dialog.dataset.irritation = String(irritation); roomScene.classList.add("dialogue-irritated"); button.classList.add("asked-again");
        document.querySelector("#room-status").textContent = `${character.name} is no longer pretending not to mind.`;
        return;
      }
      playCue("dialogue");
      if (response.startsWith("article:")) { dialog.hidden = true; endEncounter(); setTimeout(() => openArticle(response.slice(8), `/assets/characters/${character.image}.png`, `${character.name}'s annotations crowd the margins.`, "A borrowed field notebook"), 180); } else speech.textContent = response;
    });
    actions.append(button);
  });
  dialog.hidden = false;
}

function beginCharacterEncounter(key) {
  if (!key || !CHARACTERS[key] || state.encounter || state.moving) return;
  playCue("person");
  const plate = roomPlate(rooms[state.current]), roomImage = document.querySelector("#room-plate-image");
  state.encounter = "person"; roomScene.classList.add("encounter-active"); roomImage.classList.add("encounter-swap");
  document.querySelector("#room-status").textContent = `${CHARACTERS[key].name} has come much closer.`;
  encounterTimer = setTimeout(() => { roomImage.src = plate.close; roomImage.classList.remove("encounter-swap"); roomScene.classList.add("person-encounter"); }, 180);
  setTimeout(() => { if (state.encounter === "person") openCharacter(key); }, 560);
}

function beginObjectEncounter() {
  if (state.encounter || state.moving) return;
  playCue("object");
  const plate = roomPlate(rooms[state.current]);
  const focusX = plate.knowledge[0] + plate.knowledge[2] / 2, focusY = plate.knowledge[1] + plate.knowledge[3] / 2;
  state.encounter = "object"; roomScene.style.setProperty("--object-focus-x", `${focusX}%`); roomScene.style.setProperty("--object-focus-y", `${focusY}%`); roomScene.classList.add("encounter-active", "object-encounter");
  document.querySelector("#room-status").textContent = `You lean close to examine ${plate.topic.toLowerCase()}.`;
  encounterTimer = setTimeout(() => { if (state.encounter === "object") openArticle(plate.topic, plate.asset, plate.note, "Encyclopedia link"); }, 620);
}

function endEncounter() {
  clearTimeout(encounterTimer); state.encounter = null;
  const plate = roomPlate(rooms[state.current]), roomImage = document.querySelector("#room-plate-image");
  roomImage.classList.remove("encounter-swap"); roomImage.src = plate.asset; roomScene.classList.remove("encounter-active", "person-encounter", "object-encounter", "dialogue-irritated"); document.querySelector("#character-dialog").classList.remove("irritated");
  document.querySelector("#room-status").textContent = roomStatus(plate);
}

function revealRoute() {
  if (state.flames <= 0 || state.routeUntil > performance.now()) return;
  playCue("match");
  state.flames -= 1; state.routeUntil = performance.now() + 8000; persist(); updateHud();
  renderMazeGrid(true);
  document.querySelector("#room-status").textContent = "The match reveals only remembered rooms and the next useful chamber.";
  clearInterval(routeTimer); routeTimer = setInterval(() => { if (state.routeUntil <= performance.now()) { clearInterval(routeTimer); state.routeUntil = 0; renderMazeGrid(false); document.querySelector("#room-status").textContent = "The route has gone dark again."; } }, 200);
}
function findNearestUnvisited() {
  const queue = [{ room: state.current, first: null }], seen = new Set([state.current]);
  while (queue.length) { const current = queue.shift(); if (current.room !== state.current && !state.visited.has(current.room)) return { room: current.room, direction: current.first }; for (const direction of rooms[current.room].exits) { const next = neighbor(current.room, direction); if (!seen.has(next)) { seen.add(next); queue.push({ room: next, first: current.first ?? direction }); } } }
  return null;
}

function renderMazeGrid(reveal = false) {
  const grid = document.querySelector("#maze-grid");
  if (!grid.children.length) for (let index = 0; index < ROOM_COUNT; index++) { const cell = document.createElement("i"); cell.className = "maze-cell"; cell.dataset.room = String(index); grid.append(cell); }
  const target = reveal ? findNearestUnvisited()?.room : -1;
  [...grid.children].forEach((cell, index) => { cell.className = "maze-cell"; if (reveal && state.visited.has(index)) cell.classList.add("remembered"); if (index === target) cell.classList.add("hinted"); if (index === state.current) cell.classList.add("current"); });
}

function maybeWhisper() {
  if (state.visited.size < 3 || hash(`${state.current}-${state.history.length}`) % 4) return;
  const whisper = document.querySelector("#scene-whisper"); clearTimeout(whisperTimer); whisper.hidden = true; void whisper.offsetWidth; whisper.textContent = UNEASY_LINES[hash(state.current) % UNEASY_LINES.length]; whisper.hidden = false; whisperTimer = setTimeout(() => whisper.hidden = true, 5400);
}
function updateHud() {
  document.querySelector("#classic-score").textContent = state.score.toLocaleString(); document.querySelector("#classic-score-fill").style.width = `${Math.min(100, state.score / 20000 * 100)}%`;
  document.querySelector("#flame-count").textContent = state.flames; document.querySelector("#route-button").disabled = state.flames <= 0;
  document.querySelector("#rank-letter").textContent = ["P", "P", "S", "K", "M"][state.level];
  document.querySelectorAll("[data-level]").forEach((button) => button.classList.toggle("active", Number(button.dataset.level) === state.level));
  document.querySelectorAll("[data-match]").forEach((button, index) => { const spent = index >= state.flames; button.classList.toggle("spent", spent); button.disabled = spent; });
}
function updateJournal() {
  document.querySelector("#journal-rooms").textContent = `${state.visited.size} / ${ROOM_COUNT}`; document.querySelector("#journal-seals").textContent = state.solved; document.querySelector("#journal-articles").textContent = state.articles.length;
  const log = document.querySelector("#article-log"); log.replaceChildren(...(state.articles.length ? state.articles.map((title) => Object.assign(document.createElement("li"), { textContent: title })) : [Object.assign(document.createElement("li"), { textContent: "No entry yet." })]));
}
function persist() {
  localStorage.setItem("wikimaze-classic-visited", JSON.stringify([...state.visited])); localStorage.setItem("wikimaze-classic-unlocked", JSON.stringify([...state.unlocked])); localStorage.setItem("wikimaze-score", String(state.score)); localStorage.setItem("wikimaze-classic-flames", String(state.flames)); localStorage.setItem("wikimaze-classic-solved", String(state.solved)); localStorage.setItem("wikimaze-classic-articles", JSON.stringify(state.articles)); localStorage.setItem("wikimaze-classic-question-attempts", JSON.stringify(state.questionAttempts)); localStorage.setItem("wikimaze-classic-question-history", JSON.stringify(state.questionHistory)); localStorage.setItem("wikimaze-classic-dialogue-counts", JSON.stringify(state.dialogueCounts)); localStorage.setItem("wikimaze-classic-level", String(state.level)); localStorage.setItem("wikimaze-classic-subject", state.subject);
}

function settings() {
  const saved = JSON.parse(localStorage.getItem("wikimaze-settings") || "{}");
  return { name: document.querySelector("#player-name").value.trim() || saved.name || "Scholar", room: document.querySelector("#shared-keep").value.trim() || saved.room || "great-hall", color: document.querySelector("#player-color").value || saved.color || "#e9b95c" };
}
function connect() {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:"; socket = new WebSocket(`${protocol}//${location.host}/multiplayer`);
  socket.addEventListener("open", () => { document.querySelector("#classic-network-dot").classList.add("online"); joinKeep(); });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "welcome") playerId = message.id;
    if (message.type === "players") { remotePlayers.clear(); message.players.forEach((player) => remotePlayers.set(player.id, player)); renderRemoteScholars(); renderCompany(); }
    if (message.type === "doorState") message.doors.filter((id) => id.startsWith("f90-")).forEach(unlockSharedEdge);
    if (message.type === "doorUnlocked" && message.doorId.startsWith("f90-")) { unlockSharedEdge(message.doorId); renderRoom(); }
  });
  socket.addEventListener("close", () => { document.querySelector("#classic-network-dot").classList.remove("online"); document.querySelector("#classic-network-label").textContent = "Reopening the archive…"; setTimeout(connect, 2000); });
}
function unlockSharedEdge(doorId) { const [, a, b] = doorId.match(/^f90-(\d+)-(\d+)$/) || []; if (a !== undefined) { state.unlocked.add(edgeKey(Number(a), Number(b))); persist(); } }
function joinKeep() { if (socket?.readyState !== WebSocket.OPEN) return; const identity = settings(); document.querySelector("#classic-network-label").textContent = `KEEP: ${identity.room}`; document.querySelector("#player-display").textContent = identity.name; socket.send(JSON.stringify({ type: "join", room: `classic-${identity.room}`, name: identity.name, color: identity.color })); sendState(); }
function sendState() { if (socket?.readyState !== WebSocket.OPEN || !rooms) return; const room = rooms[state.current]; socket.send(JSON.stringify({ type: "state", x: room.x + .5, y: room.y + .5, angle: state.facing * Math.PI / 2, score: state.score })); }
function stableAvatar(player) { return AVATAR_KEYS[hash(player.id || player.name) % AVATAR_KEYS.length]; }
function playerRoomIndex(player) { return roomIndex(Math.floor(player.x), Math.floor(player.y)); }
function renderRemoteScholars() {
  if (!rooms) return;
  const container = document.querySelector("#remote-scholars"); container.replaceChildren();
  [...remotePlayers.values()].filter((player) => player.id !== playerId && playerRoomIndex(player) === state.current).slice(0, 3).forEach((player) => { const key = stableAvatar(player), figure = document.createElement("div"); figure.className = "remote-scholar"; figure.style.setProperty("--scholar-color", player.color); const image = document.createElement("img"); image.src = `/assets/characters/${key}.png`; image.alt = ""; const name = document.createElement("span"); name.textContent = player.name; figure.append(image, name); container.append(figure); });
}
function renderCompany() {
  const list = document.querySelector("#company-list"), players = [...remotePlayers.values()]; list.replaceChildren();
  if (!players.length) { list.append(Object.assign(document.createElement("li"), { textContent: "No footsteps answer yet." })); return; }
  players.forEach((player) => { const item = document.createElement("li"); item.style.setProperty("--company-color", player.color); const here = playerRoomIndex(player) === state.current; item.innerHTML = `${escapeHtml(player.name)}${player.id === playerId ? " (you)" : ""}<small>${here ? "in this chamber" : "elsewhere in the keep"} · ${Number(player.score || 0).toLocaleString()} lore</small>`; list.append(item); });
}
function escapeHtml(value) { const node = document.createElement("span"); node.textContent = value; return node.innerHTML; }

function ensureAudio() {
  if (audioContext) { audioContext.resume(); return; }
  const Context = window.AudioContext || window.webkitAudioContext; if (!Context) return;
  audioContext = new Context(); ambienceGain = audioContext.createGain(); ambienceGain.gain.value = .0001; ambienceGain.connect(audioContext.destination);
  for (const frequency of [43, 64.5]) { const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(); oscillator.frequency.value = frequency; oscillator.type = "sine"; gain.gain.value = frequency === 43 ? .36 : .12; oscillator.connect(gain).connect(ambienceGain); oscillator.start(); }
  ambienceGain.gain.setTargetAtTime(ambienceOn ? .035 : .0001, audioContext.currentTime, .7);
}
function playCue(name, intensity = 1) {
  if (!ambienceOn) return;
  ensureAudio(); if (!audioContext) return; soundCueCount += 1;
  const patterns = {
    enable: [[220, 0, .08, .025, "sine"], [330, .07, .13, .02, "sine"]],
    door: [[82, 0, .2, .035, "sawtooth"], [61, .12, .28, .025, "triangle"]],
    seal: [[147, 0, .12, .035, "square"], [220, .1, .22, .022, "sine"]],
    correct: [[262, 0, .11, .026, "sine"], [330, .09, .12, .026, "sine"], [392, .18, .2, .025, "sine"]],
    wrong: [[196, 0, .15, .035, "sawtooth"], [139, .12, .28, .03, "sawtooth"]],
    dialogue: [[174, 0, .09, .018, "triangle"]],
    person: [[55, 0, .38, .025, "sine"], [58, .05, .38, .012, "sine"]],
    object: [[523, 0, .08, .018, "sine"], [349, .08, .2, .014, "sine"]],
    irritated: [[Math.max(46, 92 - intensity * 12), 0, .18 + intensity * .05, .03 + intensity * .008, "sawtooth"], [47, .08, .24, .022, "square"]],
    match: [[740, 0, .05, .012, "sine"], [988, .04, .09, .009, "sine"]],
  };
  const now = audioContext.currentTime;
  for (const [frequency, offset, duration, volume, type] of patterns[name] || []) {
    const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(), start = now + offset;
    oscillator.frequency.setValueAtTime(frequency, start); oscillator.type = type; gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .012); gain.gain.exponentialRampToValueAtTime(.0001, start + duration); oscillator.connect(gain).connect(audioContext.destination); oscillator.start(start); oscillator.stop(start + duration + .03);
  }
}
function toggleAmbience() {
  ambienceOn = !ambienceOn; localStorage.setItem("wikimaze-classic-sound", ambienceOn ? "on" : "off"); ensureAudio();
  if (ambienceGain) ambienceGain.gain.setTargetAtTime(ambienceOn ? .035 : .0001, audioContext.currentTime, .7);
  document.querySelector("#ambience-button").textContent = ambienceOn ? "♫ Listening" : "♫ Sound";
  if (ambienceOn) playCue("enable");
}

document.querySelectorAll(".door-hotspot").forEach((button) => button.addEventListener("click", () => moveThrough(Number(button.dataset.direction))));
document.querySelector("#turn-around").addEventListener("click", turnAround); document.querySelector("#previous-room").addEventListener("click", returnToPrevious); document.querySelector("#route-button").addEventListener("click", revealRoute); document.querySelector("#ambience-button").addEventListener("click", toggleAmbience);
document.querySelector("#painting-hotspot").addEventListener("click", beginObjectEncounter);
document.querySelector("#character-hotspot").addEventListener("click", (event) => beginCharacterEncounter(event.currentTarget.dataset.character));
document.querySelector("#research-question").addEventListener("click", researchActiveQuestion);
document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => { const dialog = button.closest("dialog"); dialog.close(); if (dialog.id === "challenge-dialog") state.activeChallenge = null; }));
document.querySelectorAll("[data-close-panel]").forEach((button) => button.addEventListener("click", () => { const panel = button.closest(".in-scene-window"); panel.hidden = true; if (panel.id === "challenge-dialog") state.activeChallenge = null; if (["article-dialog", "character-dialog"].includes(panel.id)) endEncounter(); }));
document.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => { state.level = Number(button.dataset.level); persist(); updateHud(); }));
document.querySelectorAll('input[name="subject"]').forEach((radio) => { radio.checked = radio.value === state.subject; radio.addEventListener("change", () => { state.subject = radio.value; persist(); }); });
document.querySelectorAll("[data-match]").forEach((button) => button.addEventListener("click", revealRoute));
document.querySelector("#scorecard-button").addEventListener("click", () => document.querySelector("#scorecard-dialog").showModal());
document.querySelector("#new-game-button").addEventListener("click", () => { document.querySelector("#notice-text").textContent = "Begin a new maze? Route memory and opened seals will be cleared."; document.querySelector("#notice-window").hidden = false; });
document.querySelector("#notice-ok").addEventListener("click", () => { state.current = 0; state.history = []; state.visited = new Set([0]); state.unlocked.clear(); state.questionAttempts = {}; state.questionHistory = []; state.dialogueCounts = {}; state.score = 0; state.flames = 5; state.solved = 0; state.articles = []; state.facing = [...rooms[0].exits][0] ?? 1; persist(); document.querySelector("#notice-window").hidden = true; renderRoom(); });

const savedSettings = JSON.parse(localStorage.getItem("wikimaze-settings") || "{}");
document.querySelector("#player-name").value = savedSettings.name || `Scholar ${Math.floor(Math.random() * 90 + 10)}`; document.querySelector("#shared-keep").value = new URLSearchParams(location.search).get("room") || savedSettings.room || "great-hall"; document.querySelector("#player-color").value = savedSettings.color || "#e9b95c";
document.querySelector("#player-display").textContent = document.querySelector("#player-name").value;
document.querySelector("#identity-button").addEventListener("click", () => document.querySelector("#settings-dialog").showModal());
document.querySelector("#settings-form").addEventListener("submit", (event) => { event.preventDefault(); localStorage.setItem("wikimaze-settings", JSON.stringify(settings())); document.querySelector("#player-display").textContent = settings().name; joinKeep(); document.querySelector("#settings-dialog").close(); });
addEventListener("keydown", (event) => { if (document.querySelector("dialog[open], .in-scene-window:not([hidden])")) return; if (event.key === "ArrowLeft") document.querySelector("#exit-left:not([hidden])")?.click(); if (event.key === "ArrowRight") document.querySelector("#exit-right:not([hidden])")?.click(); if (event.key.toLowerCase() === "b") returnToPrevious(); if (event.key.toLowerCase() === "m") revealRoute(); });

buildKeep(); renderRoom(); connect();
document.querySelector("#ambience-button").textContent = ambienceOn ? "♫ Listening" : "♫ Sound";
window.__wikimazeClassicDebug = () => ({ currentRoom: state.current, facing: DIRECTIONS[state.facing], visitedRooms: state.visited.size, totalRooms: ROOM_COUNT, reachableRooms: roomDepths.filter(Number.isFinite).length, visibleExits: [...document.querySelectorAll(".door-hotspot:not([hidden])")].length, openExits: [...document.querySelectorAll(".door-hotspot:not([hidden]):not(.locked)")].length, lockedExits: [...document.querySelectorAll(".door-hotspot:not([hidden]).locked")].length, roomPlates: ROOM_PLATES.length, uniqueRoomPlates: new Set(rooms.map((room) => roomPlate(room).id)).size, inhabitedPlates: ROOM_PLATES.filter((plate) => plate.character).length, uninhabitedPlates: ROOM_PLATES.filter((plate) => !plate.character).length, closePlates: ROOM_PLATES.filter((plate) => plate.close).length, currentPlate: roomPlate(rooms[state.current]).id, hasInhabitant: Boolean(roomPlate(rooms[state.current]).character), roomImage: document.querySelector("#room-plate-image").getAttribute("src"), encounter: state.encounter, questionAttempts: Object.values(state.questionAttempts).reduce((sum, attempts) => sum + attempts, 0), recentQuestions: state.questionHistory.length, activeQuestion: state.activeChallenge?.question.prompt || null, questions: QUESTIONS.length, uniqueQuestions: new Set(QUESTIONS.map((question) => question.prompt)).size, questionsByLevel: [1, 2, 3, 4].map((level) => QUESTIONS.filter((question) => question.difficulty === level).length), characters: Object.keys(CHARACTERS).length, dialogueRepeats: Object.values(state.dialogueCounts).reduce((sum, count) => sum + Math.max(0, count - 1), 0), dialogueIrritation: Number(document.querySelector("#character-dialog").dataset.irritation || 0), soundEnabled: ambienceOn, soundCues: soundCueCount, score: state.score, routeGridCells: document.querySelectorAll(".maze-cell").length, revealedRouteCells: document.querySelectorAll(".maze-cell.remembered, .maze-cell.hinted").length, remotePlayers: [...remotePlayers.values()].filter((player) => player.id !== playerId).length, roomScholars: [...remotePlayers.values()].filter((player) => player.id !== playerId && playerRoomIndex(player) === state.current).length });
if (new URLSearchParams(location.search).has("debug")) {
  window.__wikimazeClassicTest = {
    openLockedChallenge() {
      for (const room of rooms) for (const direction of room.exits) {
        const next = neighbor(room.index, direction);
        if (isLocked(room.index, next)) { state.current = room.index; state.facing = direction; state.history = []; renderRoom(); openChallenge(direction); return { room: room.index, next }; }
      }
      return null;
    },
    answerCorrect() { if (state.activeChallenge) answerQuestion(state.activeChallenge.question.correct); },
    answerWrong() { if (state.activeChallenge) answerQuestion((state.activeChallenge.question.correct + 1) % state.activeChallenge.question.answers.length); },
    visitPlate(id) { const room = rooms.find((candidate) => roomPlate(candidate).id === id); if (!room) return false; state.current = room.index; state.history = []; renderRoom(); return true; },
  };
}
