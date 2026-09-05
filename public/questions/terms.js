// A dictionary of useful terms. Every family here is asked in both directions.
import { soft } from "./case.js";
const NAVIGATION = [
  ["The angle of a course measured clockwise from north", "Bearing (navigation)", "A bearing"],
  ["The distance north or south of the equator", "Latitude", "Latitude"],
  ["The distance east or west of the prime meridian", "Longitude", "Longitude"],
  ["A line joining points of equal height on a map", "Contour line", "A contour line"],
  ["A line joining points of equal atmospheric pressure", "Isobar", "An isobar"],
  ["A line joining points of equal temperature", "Contour line", "An isotherm"],
  ["The ratio of map distance to real distance", "Scale (map)", "The scale"],
  ["A flat representation of the curved Earth", "Map projection", "A map projection"],
  ["An instrument showing magnetic north", "Compass", "A compass"],
  ["An instrument measuring the angle of a star above the horizon", "Sextant", "A sextant"],
  ["The apparent difference between magnetic and true north", "Magnetic declination", "Magnetic declination"],
  ["A person who draws maps", "Cartography", "A cartographer"],
];

const SHIPS_AND_SEA = [
  ["The front of a ship", "Bow (watercraft)", "The bow"], ["The rear of a ship", "Stern", "The stern"],
  ["The left side facing forward", "Port and starboard", "Port"], ["The right side facing forward", "Port and starboard", "Starboard"],
  ["The depth of a ship below the waterline", "Draft (hull)", "The draught"], ["The kitchen aboard a ship", "Galley (kitchen)", "The galley"],
  ["The steering surface at the stern", "Rudder", "The rudder"], ["The heavy device dropped to hold a ship in place", "Anchor", "The anchor"],
  ["The daily record of a voyage", "Logbook", "The log"], ["A ship's small boat for going ashore", "Ship's tender", "A tender"],
  ["The rise and fall of the sea", "Tide", "The tide"], ["A sudden violent storm at sea", "Squall", "A squall"],
];

const BUILDING_AND_CRAFT = [
  ["A person who works with wood", "Carpentry", "A carpenter"], ["A person who works with stone", "Stonemasonry", "A stonemason"],
  ["A person who shoes horses and works iron", "Farrier", "A farrier"], ["A person who makes barrels", "Cooper (profession)", "A cooper"],
  ["A person who makes or repairs shoes", "Shoemaking", "A cobbler"], ["A person who works with clay", "Pottery", "A potter"],
  ["A person who works with glass", "Glassblowing", "A glassblower"], ["A person who binds books", "Bookbinding", "A bookbinder"],
  ["A person who copies manuscripts by hand", "Scribe", "A scribe"], ["A person who makes clocks", "Clockmaker", "A clockmaker"],
  ["A person who works precious metals", "Goldsmith", "A goldsmith"], ["A person who thatches roofs", "Thatching", "A thatcher"],
];

const MEASUREMENT_TERMS = [
  ["An instrument measuring temperature", "Thermometer", "A thermometer"], ["An instrument measuring time", "Clock", "A clock"],
  ["An instrument measuring mass by balancing", "Weighing scale", "A balance"], ["An instrument measuring electric current", "Ammeter", "An ammeter"],
  ["An instrument measuring voltage", "Voltmeter", "A voltmeter"], ["An instrument measuring altitude by pressure", "Altimeter", "An altimeter"],
  ["An instrument measuring distance travelled", "Odometer", "An odometer"], ["An instrument measuring speed", "Speedometer", "A speedometer"],
  ["An instrument measuring earthquakes", "Seismometer", "A seismometer"], ["An instrument measuring radiation", "Geiger counter", "A Geiger counter"],
  ["An instrument measuring angles in surveying", "Theodolite", "A theodolite"], ["An instrument measuring very small lengths", "Micrometer (device)", "A micrometer"],
];

const FOOD_TERMS = [
  ["Cooking in water just below boiling", "Poaching (cooking)", "Poaching"], ["Cooking in hot fat in a shallow pan", "Frying", "Frying"],
  ["Cooking with dry heat in an oven", "Baking", "Baking"], ["Cooking over direct heat on a rack", "Grilling", "Grilling"],
  ["Cooking slowly in liquid in a closed pot", "Braising", "Braising"], ["Cooking in the steam above boiling water", "Steaming", "Steaming"],
  ["Browning food quickly at high heat", "Searing", "Searing"], ["Soaking food in a seasoned liquid", "Marination", "Marinating"],
  ["Whisking to introduce air", "Whisk", "Whisking"], ["Cutting food into small even cubes", "Dicing", "Dicing"],
  ["Preserving food by removing water", "Food drying", "Drying"], ["Preserving food in vinegar or brine", "Pickling", "Pickling"],
];

const CLOTH_AND_TEXTILE = [
  ["Cloth made by interlacing threads at right angles", "Weaving", "Woven cloth"],
  ["Cloth made by interlocking loops of yarn", "Knitting", "Knitted cloth"],
  ["Cloth made by matting fibres together", "Felt", "Felt"],
  ["A fibre from the flax plant", "Linen", "Linen"], ["A fibre from the cotton plant", "Cotton", "Cotton"],
  ["A fibre spun by silkworms", "Silk", "Silk"], ["A fibre from sheep", "Wool", "Wool"],
  ["A fibre from the fleece of a goat", "Cashmere wool", "Cashmere"],
  ["Decorative needlework on fabric", "Embroidery", "Embroidery"], ["Fabric dyed by tying areas to resist colour", "Tie-dye", "Tie-dye"],
];

const MONEY_TERMS = [
  ["The study of coins and currency", "Numismatics", "Numismatics"], ["The front of a coin", "Obverse and reverse", "The obverse"],
  ["The back of a coin", "Obverse and reverse", "The reverse"], ["The place where coins are made", "Mint (facility)", "A mint"],
  ["Money that has value only by government decree", "Fiat money", "Fiat money"],
  ["A currency backed by a fixed quantity of gold", "Gold standard", "The gold standard"],
  ["Money in the form of notes and coins", "Cash", "Cash"], ["An extremely rapid rise in prices", "Hyperinflation", "Hyperinflation"],
  ["A written promise to pay a stated sum", "Promissory note", "A promissory note"], ["A tax levied on inherited property", "Inheritance tax", "Inheritance tax"],
];

const SCHOOL_AND_LEARNING = [
  ["A book listing words and their meanings", "Dictionary", "A dictionary"],
  ["A book of general knowledge arranged by subject", "Encyclopedia", "An encyclopedia"],
  ["A book of synonyms", "Thesaurus", "A thesaurus"], ["A book of maps", "Atlas", "An atlas"],
  ["A yearly book of dates and facts", "Almanac", "An almanac"], ["A list of sources cited in a work", "Bibliography", "A bibliography"],
  ["An alphabetical list of topics with page numbers", "Index (publishing)", "An index"],
  ["A short summary at the head of a paper", "Abstract (summary)", "An abstract"],
  ["A note at the foot of a page", "Note (typography)", "A footnote"],
  ["A written account of a person's life by another", "Biography", "A biography"],
  ["A written account of one's own life", "Autobiography", "An autobiography"],
  ["A long piece of research written for a degree", "Thesis", "A thesis"],
];

const THEATRE_TERMS = [
  ["The area of the stage nearest the audience", "Blocking (stage)", "Downstage"],
  ["The area of the stage furthest from the audience", "Blocking (stage)", "Upstage"],
  ["The space beside the stage out of the audience's view", "Stagecraft", "The wings"],
  ["The person who directs the actors", "Theatre director", "The director"],
  ["The written text of a play", "Screenplay", "The script"],
  ["A practice performance before an audience arrives", "Rehearsal", "A rehearsal"],
  ["A speech addressed to the audience alone", "Aside", "An aside"],
  ["The raised platform on which a play is performed", "Stage (theatre)", "The stage"],
  ["The painted background of a scene", "Theatrical scenery", "The scenery"],
  ["The person who prompts forgotten lines", "Prompt (theatre)", "The prompter"],
];

export const TERMS_FAMILIES = [
  {
    category: "Geography", levels: [2, 4], facts: NAVIGATION, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Technology", levels: [2, 4], facts: SHIPS_AND_SEA, describe: true,
    forms: [{ prompt: (definition) => `At sea, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [2, 4], facts: BUILDING_AND_CRAFT, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Physics", levels: [1, 3], facts: MEASUREMENT_TERMS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Life Science", levels: [1, 3], facts: FOOD_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In cooking, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Technology", levels: [2, 3], facts: CLOTH_AND_TEXTILE, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [2, 4], facts: MONEY_TERMS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Literature", levels: [1, 2], facts: SCHOOL_AND_LEARNING, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Arts", levels: [2, 3], facts: THEATRE_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In the theatre, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
];
