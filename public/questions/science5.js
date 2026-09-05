// Where the elements sit, and more of the vocabulary of the laboratory and the field.
import { soft } from "./case.js";
const ELEMENT_PERIODS = [
  ["Hydrogen", "Hydrogen", "1"], ["Helium", "Helium", "1"], ["Lithium", "Lithium", "2"], ["Carbon", "Carbon", "2"],
  ["Nitrogen", "Nitrogen", "2"], ["Oxygen", "Oxygen", "2"], ["Fluorine", "Fluorine", "2"], ["Neon", "Neon", "2"],
  ["Sodium", "Sodium", "3"], ["Magnesium", "Magnesium", "3"], ["Aluminium", "Aluminium", "3"], ["Silicon", "Silicon", "3"],
  ["Phosphorus", "Phosphorus", "3"], ["Sulfur", "Sulfur", "3"], ["Chlorine", "Chlorine", "3"], ["Argon", "Argon", "3"],
  ["Potassium", "Potassium", "4"], ["Calcium", "Calcium", "4"], ["Iron", "Iron", "4"], ["Copper", "Copper", "4"],
  ["Zinc", "Zinc", "4"], ["Bromine", "Bromine", "4"], ["Krypton", "Krypton", "4"], ["Silver", "Silver", "5"],
  ["Tin", "Tin", "5"], ["Iodine", "Iodine", "5"], ["Xenon", "Xenon", "5"], ["Gold", "Gold", "6"],
  ["Platinum", "Platinum", "6"], ["Mercury", "Mercury (element)", "6"], ["Lead", "Lead", "6"], ["Radon", "Radon", "6"],
  ["Uranium", "Uranium", "7"], ["Plutonium", "Plutonium", "7"], ["Radium", "Radium", "7"], ["Francium", "Francium", "7"],
];

const ELEMENT_USES = [
  ["Tungsten", "Tungsten", "Lamp filaments and hard cutting tools"], ["Titanium", "Titanium", "Aircraft parts and medical implants"],
  ["Copper", "Copper", "Electrical wiring and plumbing"], ["Aluminium", "Aluminium", "Cans, foil and aircraft bodies"],
  ["Silicon", "Silicon", "Semiconductors and glass"], ["Helium", "Helium", "Balloons and cryogenic cooling"],
  ["Neon", "Neon", "Bright discharge lighting"], ["Argon", "Argon", "An inert atmosphere for welding and bulbs"],
  ["Chlorine", "Chlorine", "Disinfecting water and making PVC"], ["Fluorine", "Fluorine", "Toothpaste additives and non-stick coatings"],
  ["Iodine", "Iodine", "Antiseptics and thyroid function"], ["Uranium", "Uranium", "Nuclear fuel"],
  ["Lead", "Lead", "Batteries and radiation shielding"], ["Mercury", "Mercury (element)", "Thermometers and older switches"],
  ["Zinc", "Zinc", "Galvanising steel against rust"], ["Lithium", "Lithium", "Rechargeable batteries"],
  ["Cobalt", "Cobalt", "Blue pigments and battery cathodes"], ["Platinum", "Platinum", "Catalytic converters and jewellery"],
];

const BIOCHEMISTRY = [
  ["The process by which plants make food from light", "Photosynthesis", "Photosynthesis"],
  ["The release of energy from food inside cells", "Cellular respiration", "Respiration"],
  ["A protein that speeds a biological reaction", "Enzyme", "An enzyme"],
  ["The green pigment that captures light in plants", "Chlorophyll", "Chlorophyll"],
  ["The movement of water across a membrane", "Osmosis", "Osmosis"],
  ["The movement of particles from high to low concentration", "Diffusion", "Diffusion"],
  ["Movement across a membrane that requires energy", "Active transport", "Active transport"],
  ["The loss of water vapour from a plant's leaves", "Transpiration", "Transpiration"],
  ["The maintenance of stable internal conditions", "Homeostasis", "Homeostasis"],
  ["The sum of the chemical reactions in an organism", "Metabolism", "Metabolism"],
  ["The programmed death of a cell", "Apoptosis", "Apoptosis"],
  ["The engulfing of particles by a cell", "Phagocytosis", "Phagocytosis"],
];

const ENVIRONMENT_TERMS = [
  ["A species found nowhere else", "Endemism", "An endemic species"],
  ["A species introduced that harms its new habitat", "Invasive species", "An invasive species"],
  ["A species whose loss would reshape its ecosystem", "Keystone species", "A keystone species"],
  ["The number of organisms an environment can support", "Carrying capacity", "Carrying capacity"],
  ["A sequence of who eats whom", "Food chain", "A food chain"],
  ["The interlocking set of such sequences", "Food web", "A food web"],
  ["The build-up of toxins up a food chain", "Biomagnification", "Biomagnification"],
  ["The enrichment of water causing algal blooms", "Eutrophication", "Eutrophication"],
  ["Rain made acidic by industrial gases", "Acid rain", "Acid rain"],
  ["The gradual replacement of one community by another", "Ecological succession", "Succession"],
  ["A protected area set aside for wildlife", "Nature reserve", "A nature reserve"],
  ["The measure of greenhouse gases a activity releases", "Carbon footprint", "A carbon footprint"],
];

const ASTRONOMY_MEASURES = [
  ["The apparent brightness of a star as seen from Earth", "Apparent magnitude", "Apparent magnitude"],
  ["The true brightness of a star at a standard distance", "Absolute magnitude", "Absolute magnitude"],
  ["The apparent shift of a nearby star against the background", "Stellar parallax", "Parallax"],
  ["The total energy a star radiates each second", "Luminosity", "Luminosity"],
  ["The path of one body around another", "Orbit", "An orbit"],
  ["The elongation of an orbit from a circle", "Orbital eccentricity", "Eccentricity"],
  ["The time a body takes to spin once", "Rotation period", "The rotation period"],
  ["The time a body takes to complete one orbit", "Orbital period", "The orbital period"],
  ["The point where two orbits or gravity balance", "Lagrange point", "A Lagrange point"],
  ["The speed needed to break free of a body's gravity", "Escape velocity", "Escape velocity"],
];

const MATERIALS = [
  ["A material that conducts electricity well", "Electrical conductor", "A conductor"],
  ["A material that resists the flow of electricity", "Insulator (electricity)", "An insulator"],
  ["A material between the two, used in chips", "Semiconductor", "A semiconductor"],
  ["A material with no electrical resistance at low temperature", "Superconductivity", "A superconductor"],
  ["A material that returns to shape after being deformed", "Elasticity (physics)", "An elastic material"],
  ["A material that breaks rather than bends", "Brittleness", "A brittle material"],
  ["A material that can be drawn into a wire", "Ductility", "A ductile material"],
  ["A material that can be hammered into sheets", "Malleability", "A malleable material"],
  ["A material combining two or more distinct substances", "Composite material", "A composite"],
  ["A material that resists high temperature", "Refractory", "A refractory material"],
];

export const SCIENCE5_FAMILIES = [
  {
    category: "Chemistry", levels: [3, 4], facts: ELEMENT_PERIODS,
    forms: [
      { prompt: (element) => `In which period of the periodic table is ${soft(element)}?`, explain: (element, period) => `${element} sits in period ${period}.` },
    ],
  },
  {
    category: "Chemistry", levels: [2, 3], facts: ELEMENT_USES, identify: true,
    forms: [
      { prompt: (element) => `What is ${soft(element)} chiefly used for?`, explain: (element, use) => `${element}: ${soft(use)}.` },
    ],
  },
  {
    category: "Biology", levels: [1, 3], facts: BIOCHEMISTRY, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Earth Science", levels: [2, 4], facts: ENVIRONMENT_TERMS, describe: true,
    forms: [{ prompt: (definition) => `In ecology, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Astronomy", levels: [2, 4], facts: ASTRONOMY_MEASURES, describe: true,
    forms: [{ prompt: (definition) => `In astronomy, what is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
  {
    category: "Physics", levels: [1, 3], facts: MATERIALS, describe: true,
    forms: [{ prompt: (definition) => `What is ${soft(definition)} called?`, explain: (definition, term) => `That is ${soft(term)}.` }],
  },
];
