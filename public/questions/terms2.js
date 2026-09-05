// A second dictionary: the vocabulary of the sky, the body, the workshop and the page.
import { soft } from "./case.js";
const WEATHER_WORDS = [
  ["A long period of unusually low rainfall", "Drought", "A drought"],
  ["A storm of wind carrying sand or dust", "Dust storm", "A dust storm"],
  ["Snow driven by strong wind with poor visibility", "Blizzard", "A blizzard"],
  ["Rain that freezes on contact with the ground", "Freezing rain", "Freezing rain"],
  ["A whirling column of air over water", "Waterspout", "A waterspout"],
  ["A mass of air with uniform temperature and humidity", "Air mass", "An air mass"],
  ["The temperature at which air becomes saturated", "Dew point", "The dew point"],
  ["The percentage of water vapour the air is holding", "Humidity", "Relative humidity"],
  ["A seasonal reversal of prevailing winds", "Monsoon", "A monsoon"],
  ["A warm dry wind descending a mountainside", "Foehn wind", "A foehn wind"],
  ["The steady winds blowing towards the equator", "Trade winds", "The trade winds"],
  ["The fast narrow current of air high in the atmosphere", "Jet stream", "The jet stream"],
];

const GEOLOGY_WORDS = [
  ["Molten rock beneath the surface", "Magma", "Magma"], ["Molten rock that has reached the surface", "Lava", "Lava"],
  ["A break in rock along which movement has occurred", "Fault (geology)", "A fault"],
  ["A bend in layered rock", "Fold (geology)", "A fold"], ["The wearing away of rock by wind, water or ice", "Erosion", "Erosion"],
  ["The chemical and physical breakdown of rock in place", "Weathering", "Weathering"],
  ["Material laid down by water, wind or ice", "Sediment", "Sediment"],
  ["A body of rock holding usable groundwater", "Aquifer", "An aquifer"],
  ["A ridge of rock and debris left by a glacier", "Moraine", "A moraine"],
  ["A U-shaped valley carved by ice and flooded by sea", "Fjord", "A fjord"],
  ["A landscape of caves and sinkholes in soluble rock", "Karst", "Karst"],
  ["A mineral deposit worth mining", "Ore", "An ore"],
];

const BODY_WORDS = [
  ["The point where two bones meet", "Joint", "A joint"], ["The tissue joining muscle to bone", "Tendon", "A tendon"],
  ["The tissue joining bone to bone", "Ligament", "A ligament"], ["The smooth tissue cushioning joints", "Cartilage", "Cartilage"],
  ["A vessel carrying blood away from the heart", "Artery", "An artery"], ["A vessel carrying blood back to the heart", "Vein", "A vein"],
  ["The smallest blood vessels", "Capillary", "A capillary"], ["The fluid drained by the lymphatic system", "Lymph", "Lymph"],
  ["The clear fluid cushioning the brain", "Cerebrospinal fluid", "Cerebrospinal fluid"],
  ["The tissue lining internal surfaces and cavities", "Epithelium", "Epithelium"],
  ["The outer layer of the skin", "Epidermis", "The epidermis"],
  ["The layer of skin beneath the epidermis", "Dermis", "The dermis"],
];

const TOOLS = [
  ["A tool for driving nails", "Hammer", "A hammer"], ["A tool for cutting wood with teeth", "Saw", "A saw"],
  ["A tool for gripping and turning nuts", "Wrench", "A spanner"], ["A tool for turning screws", "Screwdriver", "A screwdriver"],
  ["A tool for making holes", "Drill", "A drill"], ["A tool for smoothing wood by shaving", "Plane (tool)", "A plane"],
  ["A tool for cutting or shaping by striking", "Chisel", "A chisel"], ["A tool for holding work firmly", "Vise", "A vice"],
  ["A tool for checking that a surface is horizontal", "Spirit level", "A spirit level"],
  ["A tool for drawing circles", "Compass (drawing tool)", "A pair of compasses"],
  ["A device turning rotation into linear force", "Screw", "A screw"], ["A tool for cutting metal by melting", "Welding", "A welding torch"],
];

const PRINTING_AND_PAPER = [
  ["The design of type on a page", "Typography", "Typography"], ["A complete set of characters in one design", "Typeface", "A typeface"],
  ["The small stroke finishing a letter", "Serif", "A serif"], ["A typeface without such strokes", "Sans-serif", "A sans-serif"],
  ["The space between lines of type", "Leading", "Leading"], ["The space between individual letters", "Letter spacing", "Tracking"],
  ["The adjustment of space between two letters", "Kerning", "Kerning"], ["The first large letter of a chapter", "Initial", "A drop cap"],
  ["The blank border around a printed page", "Margin (typography)", "The margin"],
  ["A trial print made before the full run", "Galley proof", "A galley proof"],
  ["A design pressed into paper visible against light", "Watermark", "A watermark"],
  ["The gathering of printed sheets folded together", "Section (bookbinding)", "A signature"],
];

const LOGIC_AND_REASON = [
  ["Reasoning from general rules to particular cases", "Deductive reasoning", "Deduction"],
  ["Reasoning from particular cases to general rules", "Inductive reasoning", "Induction"],
  ["Reasoning to the most likely explanation", "Abductive reasoning", "Abduction"],
  ["An argument with two premises and a conclusion", "Syllogism", "A syllogism"],
  ["A flaw that makes an argument unsound", "Fallacy", "A fallacy"],
  ["Attacking the person rather than the argument", "Ad hominem", "An ad hominem"],
  ["Misrepresenting an argument to attack it", "Straw man", "A straw man"],
  ["Assuming what one is trying to prove", "Begging the question", "Begging the question"],
  ["Presenting only two options when more exist", "False dilemma", "A false dilemma"],
  ["A statement that contradicts itself yet may be true", "Paradox", "A paradox"],
  ["A proposition assumed without proof", "Axiom", "An axiom"],
  ["A statement proved from axioms", "Theorem", "A theorem"],
];

const HERALDRY = [
  ["The shield at the centre of a coat of arms", "Escutcheon (heraldry)", "The escutcheon"],
  ["The figures placed on either side of a shield", "Supporter", "Supporters"],
  ["The motto scroll beneath a coat of arms", "Motto", "The motto"],
  ["The device above the helmet in a coat of arms", "Crest (heraldry)", "The crest"],
  ["The red tincture in heraldry", "Gules", "Gules"], ["The blue tincture in heraldry", "Azure (heraldry)", "Azure"],
  ["The black tincture in heraldry", "Sable (heraldry)", "Sable"], ["The green tincture in heraldry", "Vert (heraldry)", "Vert"],
  ["The gold or yellow tincture in heraldry", "Or (heraldry)", "Or"], ["The silver or white tincture in heraldry", "Argent", "Argent"],
];

export const TERMS2_FAMILIES = [
  {
    category: "Earth Science", levels: [2, 4], facts: WEATHER_WORDS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: GEOLOGY_WORDS, describe: true,
    forms: [{ prompt: (definition) => `In geology, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Life Science", levels: [1, 3], facts: BODY_WORDS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Technology", levels: [1, 2], facts: TOOLS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Arts", levels: [3, 4], facts: PRINTING_AND_PAPER, describe: true,
    forms: [{ prompt: (definition) => `In printing and typography, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Mathematics", levels: [2, 4], facts: LOGIC_AND_REASON, describe: true,
    forms: [{ prompt: (definition) => `In logic, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "History", levels: [3, 4], facts: HERALDRY, describe: true,
    forms: [{ prompt: (definition) => `In heraldry, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
];
