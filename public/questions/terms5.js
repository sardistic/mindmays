// One last set: the words of the map room, the sickroom, the studio and the mine.
import { soft } from "./case.js";
const MAP_ROOM = [
  ["A raised relief model of a landscape", "Terrain cartography", "A relief model"],
  ["A globe showing the stars rather than the Earth", "Celestial globe", "A celestial globe"],
  ["A chart used for navigation at sea", "Nautical chart", "A nautical chart"],
  ["An early map showing the known world of its day", "Mappa mundi", "A mappa mundi"],
  ["A collection of charts bound as a book", "Atlas", "An atlas"],
  ["A survey marker fixed in the ground", "Benchmark (surveying)", "A benchmark"],
  ["The measurement of land areas and boundaries", "Surveying", "Surveying"],
  ["The measurement of the Earth's shape and gravity", "Geodesy", "Geodesy"],
  ["A description of the surface features of a place", "Topography", "Topography"],
  ["The study of place names", "Toponymy", "Toponymy"],
  ["An imaginary line joining places of equal magnetic declination", "Isogonic line", "An isogonic line"],
  ["A method of showing the Earth on a cylinder", "Mercator projection", "The Mercator projection"],
];

const SICKROOM = [
  ["A pad of material pressed on a wound", "Dressing (medical)", "A dressing"],
  ["A rigid support holding a broken limb still", "Splint (medicine)", "A splint"],
  ["A cloth loop supporting an injured arm", "Sling (medicine)", "A sling"],
  ["A hard casing set around a healed break", "Orthopedic cast", "A cast"],
  ["A stretcher for carrying the injured", "Stretcher", "A stretcher"],
  ["A tube delivering fluid into a vein", "Intravenous therapy", "A drip"],
  ["An instrument for listening to the chest", "Stethoscope", "A stethoscope"],
  ["A cuff and gauge measuring blood pressure", "Sphygmomanometer", "A sphygmomanometer"],
  ["A device delivering measured medicine to the lungs", "Inhaler", "An inhaler"],
  ["The removal of stitches or the stitches themselves", "Surgical suture", "Sutures"],
  ["The visible mark left by a healed wound", "Scar", "A scar"],
  ["A bruise caused by bleeding under the skin", "Bruise", "A bruise"],
];

const STUDIO = [
  ["The wooden frame supporting a canvas", "Easel", "An easel"],
  ["The board on which a painter mixes colours", "Palette", "A palette"],
  ["The frame over which canvas is stretched", "Stretcher bar", "A stretcher"],
  ["A preparatory layer applied before painting", "Primer (paint)", "A primer or ground"],
  ["A rapid preliminary drawing", "Sketch (drawing)", "A sketch"],
  ["A full-size preparatory drawing for a painting", "Cartoon", "A cartoon"],
  ["A framework of wire or wood supporting clay", "Armature (sculpture)", "An armature"],
  ["A mould taken from an original for casting", "Casting", "A mould"],
  ["The bronze-casting method using a wax model", "Lost-wax casting", "Lost-wax casting"],
  ["The clear protective coat applied over paint", "Varnish", "Varnish"],
  ["A shallow relief carved only slightly proud of its ground", "Relief", "Bas-relief"],
  ["The arrangement of elements within a picture", "Composition (visual arts)", "Composition"],
];

const MINE_AND_QUARRY = [
  ["A vertical passage sunk into the ground", "Shaft mining", "A shaft"],
  ["A horizontal passage into a hillside", "Adit", "An adit"],
  ["A mine worked from the surface downwards", "Open-pit mining", "An open-pit mine"],
  ["The waste rock left after ore is extracted", "Tailings", "Tailings"],
  ["The separation of metal from its ore by heat", "Smelting", "Smelting"],
  ["The purifying of a metal after smelting", "Refining", "Refining"],
  ["A vein of ore running through rock", "Vein (geology)", "A lode"],
  ["Loose deposits of valuable minerals in a riverbed", "Placer deposit", "A placer deposit"],
  ["Washing sediment to separate heavy minerals", "Gold panning", "Panning"],
  ["The gas explosion hazard in coal mines", "Firedamp", "Firedamp"],
  ["The bird once carried underground as a warning", "Sentinel species", "A canary"],
];

const KITCHEN_AND_TABLE = [
  ["A shallow dish for serving soup", "Bowl", "A bowl"],
  ["A vessel for pouring liquid at table", "Jug", "A jug"],
  ["The board on which food is cut", "Cutting board", "A chopping board"],
  ["A tool for grating cheese and vegetables", "Grater", "A grater"],
  ["A perforated bowl for draining", "Colander", "A colander"],
  ["A tool for removing corks", "Corkscrew", "A corkscrew"],
  ["A vessel for grinding with a pestle", "Mortar and pestle", "A mortar"],
  ["A pan with a heavy base for slow cooking", "Dutch oven", "A casserole"],
  ["A tool for pressing garlic", "Garlic press", "A garlic press"],
  ["The cloth spread over a dining table", "Tablecloth", "A tablecloth"],
];

const STARGAZING = [
  ["A telescope that gathers light with lenses", "Refracting telescope", "A refractor"],
  ["A telescope that gathers light with mirrors", "Reflecting telescope", "A reflector"],
  ["The mounting that follows the sky's rotation on one axis", "Equatorial mount", "An equatorial mount"],
  ["The small telescope used to aim a larger one", "Finderscope", "A finderscope"],
  ["The measure of a telescope's light-gathering power", "Aperture", "The aperture"],
  ["The smallest detail a telescope can distinguish", "Angular resolution", "The resolving power"],
  ["An instrument spreading light into its component colours", "Spectrograph", "A spectrograph"],
  ["A dome-shaped theatre projecting the night sky", "Planetarium", "A planetarium"],
  ["Artificial brightness that hides the stars", "Light pollution", "Light pollution"],
  ["The blurring of images by the atmosphere", "Astronomical seeing", "Seeing"],
];

const POSTAL_AND_TRADE = [
  ["A charge paid for carrying a letter", "Postage stamp", "Postage"],
  ["The mark showing where and when a letter was posted", "Postmark", "A postmark"],
  ["A letter whose delivery must be signed for", "Registered mail", "Registered post"],
  ["A box in which letters are posted", "Post box", "A post box"],
  ["A written order to a bank to pay a sum", "Cheque", "A cheque"],
  ["A document listing goods and the sum owed", "Invoice", "An invoice"],
  ["Proof that a payment has been received", "Receipt", "A receipt"],
  ["A list of goods carried by a ship or aircraft", "Manifest (transportation)", "A manifest"],
  ["The duty charged on goods entering a country", "Customs", "Customs duty"],
  ["A building where goods are stored", "Warehouse", "A warehouse"],
  ["A place where goods are loaded onto ships", "Port", "A port"],
  ["A public place where goods are sold from stalls", "Marketplace", "A market"],
];

const CLOCKS_AND_TIME = [
  ["A clock driven by a swinging weight", "Pendulum clock", "A pendulum clock"],
  ["A clock measuring time by falling sand", "Hourglass", "An hourglass"],
  ["A device telling time by the sun's shadow", "Sundial", "A sundial"],
  ["A clock measuring time by dripping water", "Water clock", "A water clock"],
  ["A portable timepiece used to find longitude at sea", "Marine chronometer", "A marine chronometer"],
  ["A watch worn on the wrist", "Watch", "A wristwatch"],
  ["The escapement wheel that regulates a mechanical clock", "Escapement", "The escapement"],
  ["A clock kept accurate by the vibration of atoms", "Atomic clock", "An atomic clock"],
  ["A second added occasionally to keep clocks in step with the Earth", "Leap second", "A leap second"],
  ["A thousandth of a second", "Millisecond", "A millisecond"],
  ["A millionth of a second", "Microsecond", "A microsecond"],
  ["A billionth of a second", "Nanosecond", "A nanosecond"],
];

const WEIGHTS_AND_MEASURES = [
  ["The imperial unit of length equal to three feet", "Yard", "A yard"],
  ["The imperial unit of length equal to twelve inches", "Foot (unit)", "A foot"],
  ["The unit of distance equal to 1,760 yards", "Mile", "A mile"],
  ["The nautical unit of distance of about 1,852 metres", "Nautical mile", "A nautical mile"],
  ["The unit of speed of one nautical mile per hour", "Knot (unit)", "A knot"],
  ["The imperial unit of weight of sixteen ounces", "Pound (mass)", "A pound"],
  ["The British unit of weight of fourteen pounds", "Stone (unit)", "A stone"],
  ["The metric unit of area of ten thousand square metres", "Hectare", "A hectare"],
  ["The imperial unit of area of 4,840 square yards", "Acre", "An acre"],
  ["The unit of volume equal to eight pints", "Gallon", "A gallon"],
  ["The unit of a jeweller's weight for gemstones", "Carat (mass)", "A carat"],
  ["The measure of gold purity out of twenty-four", "Fineness", "A karat"],
];

export const TERMS5_FAMILIES = [
  {
    category: "Geography", levels: [3, 4], facts: MAP_ROOM, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Life Science", levels: [1, 3], facts: SICKROOM, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Arts", levels: [2, 4], facts: STUDIO, describe: true,
    forms: [{ prompt: (definition) => `In an artist's studio, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Earth Science", levels: [3, 4], facts: MINE_AND_QUARRY, describe: true,
    forms: [{ prompt: (definition) => `In mining, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Technology", levels: [1, 2], facts: KITCHEN_AND_TABLE, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Astronomy", levels: [2, 4], facts: STARGAZING, describe: true,
    forms: [{ prompt: (definition) => `In astronomy, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [2, 4], facts: POSTAL_AND_TRADE, describe: true,
    forms: [{ prompt: (definition) => `In trade and the post, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Technology", levels: [2, 4], facts: CLOCKS_AND_TIME, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Mathematics", levels: [2, 4], facts: WEIGHTS_AND_MEASURES, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
];
