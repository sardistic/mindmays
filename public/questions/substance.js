// Replaces the rote and playground families that were cut. Everything here is something
// an encyclopedia would actually answer.
import { soft } from "./case.js";

const SCIENTIFIC_WORKS = [
  ["Principia Mathematica of 1687", "Philosophiæ Naturalis Principia Mathematica", "Isaac Newton"],
  ["On the Origin of Species", "On the Origin of Species", "Charles Darwin"],
  ["On the Revolutions of the Heavenly Spheres", "De revolutionibus orbium coelestium", "Nicolaus Copernicus"],
  ["The Fabric of the Human Body", "De humani corporis fabrica", "Andreas Vesalius"],
  ["The Sceptical Chymist", "The Sceptical Chymist", "Robert Boyle"],
  ["Dialogue Concerning the Two Chief World Systems", "Dialogue Concerning the Two Chief World Systems", "Galileo Galilei"],
  ["Systema Naturae", "Systema Naturae", "Carl Linnaeus"],
  ["The Elements", "Euclid's Elements", "Euclid"],
  ["Almagest", "Almagest", "Ptolemy"],
  ["The Canon of Medicine", "The Canon of Medicine", "Avicenna"],
  ["The Book of Optics", "Book of Optics", "Ibn al-Haytham"],
  ["A Treatise on Electricity and Magnetism", "A Treatise on Electricity and Magnetism", "James Clerk Maxwell"],
  ["The Interpretation of Dreams", "The Interpretation of Dreams", "Sigmund Freud"],
  ["Silent Spring", "Silent Spring", "Rachel Carson"],
  ["The Double Helix", "The Double Helix", "James Watson"],
  ["A Brief History of Time", "A Brief History of Time", "Stephen Hawking"],
  ["The Structure of Scientific Revolutions", "The Structure of Scientific Revolutions", "Thomas Kuhn"],
  ["An Essay on the Principle of Population", "An Essay on the Principle of Population", "Thomas Robert Malthus"],
];

const NOBEL_DISCOVERIES = [
  ["The discovery of X-rays", "Wilhelm Röntgen", "Wilhelm Röntgen"],
  ["The discovery of the neutron", "James Chadwick", "James Chadwick"],
  ["The discovery of radioactivity in uranium", "Henri Becquerel", "Henri Becquerel"],
  ["The theory of the photoelectric effect", "Albert Einstein", "Albert Einstein"],
  ["The model of the atom with quantised orbits", "Niels Bohr", "Niels Bohr"],
  ["The discovery of the structure of DNA", "Francis Crick", "Francis Crick"],
  ["The discovery of penicillin", "Alexander Fleming", "Alexander Fleming"],
  ["The discovery of insulin", "Frederick Banting", "Frederick Banting"],
  ["The discovery of the electron", "J. J. Thomson", "J. J. Thomson"],
  ["The discovery of nuclear fission", "Otto Hahn", "Otto Hahn"],
  ["The explanation of nuclear fission's mechanism", "Lise Meitner", "Lise Meitner"],
  ["The discovery of pulsars", "Jocelyn Bell Burnell", "Jocelyn Bell Burnell"],
  ["The discovery of transposable genetic elements", "Barbara McClintock", "Barbara McClintock"],
  ["The discovery of the cosmic microwave background", "Arno Penzias", "Arno Penzias"],
];

const TREATY_TERMS = [
  ["The treaty that ended the Thirty Years' War", "Peace of Westphalia", "The Peace of Westphalia"],
  ["The treaty that ended the Napoleonic settlement of Europe", "Congress of Vienna", "The Congress of Vienna"],
  ["The treaty that divided the New World between Spain and Portugal", "Treaty of Tordesillas", "The Treaty of Tordesillas"],
  ["The treaty that ended the First World War with Germany", "Treaty of Versailles", "The Treaty of Versailles"],
  ["The agreement that founded the European Economic Community", "Treaty of Rome", "The Treaty of Rome"],
  ["The charter that limited the English king in 1215", "Magna Carta", "Magna Carta"],
  ["The treaty that transferred Alaska to the United States", "Alaska Purchase", "The Alaska Purchase"],
  ["The agreement that opened Japan to American trade in 1854", "Convention of Kanagawa", "The Convention of Kanagawa"],
  ["The treaty that ended the Crimean War", "Treaty of Paris (1856)", "The Treaty of Paris of 1856"],
  ["The accord that set Ireland's partition in 1921", "Anglo-Irish Treaty", "The Anglo-Irish Treaty"],
  ["The treaty banning nuclear weapons in Latin America", "Treaty of Tlatelolco", "The Treaty of Tlatelolco"],
  ["The treaty reserving Antarctica for peaceful science", "Antarctic Treaty System", "The Antarctic Treaty"],
];

const RIVERS_AND_CITIES = [
  ["Vienna", "Danube", "The Danube"], ["Budapest", "Danube", "The Danube"], ["Belgrade", "Danube", "The Danube"],
  ["Cologne", "Rhine", "The Rhine"], ["Basel", "Rhine", "The Rhine"], ["Rotterdam", "Rhine", "The Rhine"],
  ["Florence", "Arno", "The Arno"], ["Pisa", "Arno", "The Arno"], ["Turin", "Po (river)", "The Po"],
  ["Seville", "Guadalquivir", "The Guadalquivir"], ["Zaragoza", "Ebro", "The Ebro"], ["Porto", "Douro", "The Douro"],
  ["Lyon", "Rhône", "The Rhône"], ["Bordeaux", "Garonne", "The Garonne"], ["Nantes", "Loire", "The Loire"],
  ["Hamburg", "Elbe", "The Elbe"], ["Dresden", "Elbe", "The Elbe"], ["Krakow", "Vistula", "The Vistula"],
  ["Saint Petersburg", "Neva", "The Neva"], ["Cairo", "Nile", "The Nile"], ["Baghdad", "Tigris", "The Tigris"],
  ["Lahore", "Ravi River", "The Ravi"], ["Kolkata", "Hooghly River", "The Hooghly"], ["Shanghai", "Huangpu River", "The Huangpu"],
  ["Montreal", "Saint Lawrence River", "The Saint Lawrence"], ["New Orleans", "Mississippi River", "The Mississippi"],
  ["Buenos Aires", "Río de la Plata", "The Río de la Plata"], ["Brisbane", "Brisbane River", "The Brisbane"],
  ["Rome", "Tiber", "The Tiber"], ["Prague", "Vltava", "The Vltava"], ["Ghent", "Scheldt", "The Scheldt"],
  ["Antwerp", "Scheldt", "The Scheldt"], ["Bremen", "Weser", "The Weser"], ["Frankfurt", "Main (river)", "The Main"],
  ["Geneva", "Rhône", "The Rhône"], ["Verona", "Adige", "The Adige"], ["Toledo", "Tagus", "The Tagus"],
  ["Newcastle upon Tyne", "River Tyne", "The Tyne"], ["Glasgow", "River Clyde", "The Clyde"], ["Dublin", "River Liffey", "The Liffey"],
  ["Cork", "River Lee (Ireland)", "The Lee"], ["Bristol", "River Avon, Bristol", "The Avon"], ["Norwich", "River Wensum", "The Wensum"],
  ["Kyiv", "Dnieper", "The Dnieper"], ["Rostov-on-Don", "Don (river)", "The Don"], ["Volgograd", "Volga", "The Volga"],
  ["Omsk", "Irtysh", "The Irtysh"], ["Seoul", "Han River (Korea)", "The Han"], ["Guangzhou", "Pearl River (China)", "The Pearl"],
  ["Phnom Penh", "Mekong", "The Mekong"], ["Yangon", "Yangon River", "The Yangon"], ["Khartoum", "Blue Nile", "The Blue Nile"],
  ["Bamako", "Niger River", "The Niger"], ["Kinshasa", "Congo River", "The Congo"],
];

const MEDICAL_ADVANCES = [
  ["The first use of ether as a surgical anaesthetic", "History of general anesthesia", "The 1840s"],
  ["The first successful vaccination against smallpox", "Smallpox vaccine", "1796"],
  ["The discovery that cholera spread through water", "1854 Broad Street cholera outbreak", "1854"],
  ["The first X-ray image of a human body part", "Wilhelm Röntgen", "1895"],
  ["The first successful human heart transplant", "Christiaan Barnard", "1967"],
  ["The eradication of smallpox declared worldwide", "Smallpox", "1980"],
  ["The first test-tube baby", "Louise Brown", "1978"],
  ["The completion of the Human Genome Project", "Human Genome Project", "2003"],
];

const PHILOSOPHY_IDEAS = [
  ["The claim that the unexamined life is not worth living", "Socrates", "Socrates"],
  ["The theory of forms", "Theory of forms", "Plato"],
  ["The golden mean between excess and deficiency", "Golden mean (philosophy)", "Aristotle"],
  ["The categorical imperative", "Categorical imperative", "Immanuel Kant"],
  ["The veil of ignorance", "Veil of ignorance", "John Rawls"],
  ["The idea of the social contract as the basis of the state", "Social contract", "Thomas Hobbes"],
  ["The wager that belief in God is the prudent bet", "Pascal's wager", "Blaise Pascal"],
  ["The razor that the simplest explanation should be preferred", "Occam's razor", "William of Ockham"],
  ["The declaration that God is dead", "God is dead", "Friedrich Nietzsche"],
  ["The dialectic of thesis and antithesis", "Dialectic", "Georg Wilhelm Friedrich Hegel"],
  ["The argument that history is driven by class struggle", "Historical materialism", "Karl Marx"],
  ["The idea that language limits the bounds of thought", "Linguistic relativity", "Benjamin Lee Whorf"],
];

const ENGINEERING_FEATS = [
  ["The canal joining the Mediterranean to the Red Sea", "Suez Canal", "The Suez Canal"],
  ["The canal joining the Atlantic to the Pacific", "Panama Canal", "The Panama Canal"],
  ["The dam that created Lake Nasser", "Aswan Dam", "The Aswan High Dam"],
  ["The dam that created Lake Mead", "Hoover Dam", "The Hoover Dam"],
  ["The largest power station in the world by capacity", "Three Gorges Dam", "The Three Gorges Dam"],
  ["The rail tunnel joining England and France", "Channel Tunnel", "The Channel Tunnel"],
  ["The barrier protecting London from tidal surges", "Thames Barrier", "The Thames Barrier"],
  ["The sea defences shielding the south-west Netherlands", "Delta Works", "The Delta Works"],
  ["The observatory that first detected gravitational waves", "LIGO", "LIGO"],
  ["The accelerator that found the Higgs boson", "Large Hadron Collider", "The Large Hadron Collider"],
  ["The bridge that spans the Bosporus at Istanbul", "15 July Martyrs Bridge", "The Bosporus Bridge"],
  ["The tunnel bored beneath the Alps between Erstfeld and Bodio", "Gotthard Base Tunnel", "The Gotthard Base Tunnel"],
  ["The aqueduct at Nîmes built by Rome", "Pont du Gard", "The Pont du Gard"],
  ["The lighthouse rebuilt four times on the Eddystone Rocks", "Eddystone Lighthouse", "The Eddystone Lighthouse"],
  ["The telescope array on the Atacama plateau", "Atacama Large Millimeter Array", "ALMA"],
];

const ARCHAEOLOGY = [
  ["The tomb opened by Howard Carter in 1922", "Tutankhamun", "The tomb of Tutankhamun"],
  ["The buried army guarding a Chinese emperor", "Terracotta Army", "The Terracotta Army"],
  ["The Roman town buried by Vesuvius in 79", "Pompeii", "Pompeii"],
  ["The ship burial excavated in Suffolk in 1939", "Sutton Hoo", "Sutton Hoo"],
  ["The painted caves of the Dordogne found in 1940", "Lascaux", "Lascaux"],
  ["The Neolithic settlement uncovered by a storm in Orkney", "Skara Brae", "Skara Brae"],
  ["The stone that unlocked Egyptian hieroglyphs", "Rosetta Stone", "The Rosetta Stone"],
  ["The scrolls found in caves near the Dead Sea", "Dead Sea Scrolls", "The Dead Sea Scrolls"],
  ["The Bronze Age city on Crete excavated by Arthur Evans", "Knossos", "Knossos"],
  ["The mechanism recovered from a Greek shipwreck in 1901", "Antikythera mechanism", "The Antikythera mechanism"],
  ["The bog body found in Cheshire in 1984", "Lindow Man", "Lindow Man"],
  ["The frozen body found in the Ötztal Alps in 1991", "Ötzi", "Ötzi"],
  ["The city of the Indus Valley excavated from 1922", "Mohenjo-daro", "Mohenjo-daro"],
  ["The temple complex in Anatolia dated to the tenth millennium BC", "Göbekli Tepe", "Göbekli Tepe"],
  ["The Mycenaean site Schliemann believed was Troy", "Troy", "Troy"],
  ["The Maya city rediscovered in the Guatemalan rainforest", "Tikal", "Tikal"],
  ["The Nabataean city carved into rose-red rock", "Petra", "Petra"],
  ["The Inca site found by Hiram Bingham in 1911", "Machu Picchu", "Machu Picchu"],
];

export const SUBSTANCE_FAMILIES = [
  {
    category: "Science", levels: [2, 4], facts: SCIENTIFIC_WORKS,
    forms: [
      { prompt: (work) => `Who wrote ${soft(work)}?`, explain: (work, author) => `${work} is the work of ${author}.` },
      { reverse: true, prompt: (work, author) => `Which of these works is by ${author}?`, explain: (work, author) => `${author} wrote ${soft(work)}.` },
    ],
  },
  {
    category: "Physics", levels: [2, 4], facts: NOBEL_DISCOVERIES,
    forms: [
      { prompt: (finding) => `Who is credited with ${soft(finding)}?`, explain: (finding, person) => `${person} is credited with ${soft(finding)}.` },
      { reverse: true, prompt: (finding, person) => `${person} is credited with which of these?`, explain: (finding, person) => `${person}: ${soft(finding)}.` },
    ],
  },
  {
    category: "History", levels: [2, 4], facts: TREATY_TERMS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, name) => `That is ${soft(name)}.` }],
  },
  {
    category: "Geography", levels: [2, 4], facts: RIVERS_AND_CITIES,
    forms: [{ prompt: (city) => `Which river runs through ${city}?`, explain: (city, river) => `${river} runs through ${city}.` }],
  },
  {
    category: "Life Science", levels: [3, 4], facts: MEDICAL_ADVANCES,
    forms: [{ prompt: (event) => `When did ${soft(event)} happen?`, explain: (event, when) => `${event}: ${when}.` }],
  },
  {
    category: "Literature", levels: [3, 4], facts: PHILOSOPHY_IDEAS,
    forms: [
      { prompt: (idea) => `Which thinker is associated with ${soft(idea)}?`, explain: (idea, person) => `${person} is associated with ${soft(idea)}.` },
      { reverse: true, prompt: (idea, person) => `${person} is associated with which of these?`, explain: (idea, person) => `${person}: ${soft(idea)}.` },
    ],
  },
  {
    category: "Technology", levels: [2, 4], facts: ENGINEERING_FEATS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, name) => `That is ${soft(name)}.` }],
  },
  {
    category: "History", levels: [2, 4], facts: ARCHAEOLOGY, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, name) => `That is ${soft(name)}.` }],
  },
];
